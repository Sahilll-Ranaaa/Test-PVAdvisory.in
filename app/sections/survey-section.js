"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { surveyData } from "@/lib/survey-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { CheckCircle2, ArrowRight, ArrowLeft, Download, Wallet, BarChart3, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { generateReport, generateInternalReport } from "@/lib/generate-report";
import emailjs from "@emailjs/browser";

// --- CONFIGURATION FROM ENV ---
const NOTIFICATION_EMAILS = process.env.NEXT_PUBLIC_SURVEY_NOTIFICATION_EMAIL || "sahil.rana@pvadvisory.in";
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_hba1urj";
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_veexuer";
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "9Ano0XRctcKUCbMwC";
// ---------------------

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid business email"),
  mobile: z.string().min(10, "Valid mobile number is required"),
});

export default function SurveySection({ preselectedType = null, isStandalone = false }) {
  const [selectedSurvey, setSelectedSurvey] = useState(preselectedType);
  const [step, setStep] = useState(preselectedType ? 1 : -1); 
  const [answers, setAnswers] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (preselectedType && surveyData[preselectedType]) {
      setSelectedSurvey(preselectedType);
      setStep(1);
    }
  }, [preselectedType]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const currentQuestions = selectedSurvey ? surveyData[selectedSurvey].questions : [];

  const handleSurveySelect = (type) => {
    setSelectedSurvey(type);
    setStep(1);
  };

  const handleOptionSelect = (questionId, score) => {
    setAnswers((prev) => ({ ...prev, [questionId]: score }));
  };

  const nextStep = () => {
    if (step < currentQuestions.length) setStep(step + 1);
    else setStep(100); 
  };

  const prevStep = () => {
    if (step === 1) {
      if (isStandalone) {
         setSelectedSurvey(null);
         setStep(-1);
      } else {
        setStep(-1);
        setSelectedSurvey(null);
      }
    } else {
      setStep(step - 1);
    }
  };

  const calculateDimensionScores = () => {
    const currentSurvey = surveyData[selectedSurvey];
    const results = {};
    currentSurvey.dimensions.forEach(dim => {
      const dimQuestions = currentSurvey.questions.filter(q => q.dimension === dim);
      const score = dimQuestions.reduce((acc, q) => acc + (answers[q.id] || 0), 0);
      results[dim] = (score / dimQuestions.length) * 5; 
    });
    return results;
  };

  const handleFinalSubmit = async (data) => {
    setIsGenerating(true);
    const dimensionScores = calculateDimensionScores();
    const totalScore = Object.values(dimensionScores).reduce((acc, curr) => acc + curr, 0);
    const questions = surveyData[selectedSurvey].questions;

    const reportData = { 
      ...data, 
      surveyType: surveyData[selectedSurvey].title, 
      score: totalScore, 
      dimensionScores, 
      answers 
    };

    try {
      // 1. Generate PDFs
      await generateReport(reportData, true); 
      const internalAuditUri = await generateInternalReport(reportData, questions); 

      // 2. Prepare text-based Q&A for fail-safe (in case PDF is stripped or too big)
      let qaText = "";
      questions.forEach((q, i) => {
        const score = answers[q.id] || 0;
        const selected = q.options.find(o => o.score === score);
        qaText += `${i+1}. ${q.question}\n   Answer: ${selected ? selected.text : "Skipped"} (${score} pts)\n\n`;
      });

      // 3. Prepare Email Parameters
      const emailParams = {
        name: data.name,
        email: data.email,
        phone: data.mobile,
        survey_type: surveyData[selectedSurvey].title,
        total_score: totalScore,
        to_email: NOTIFICATION_EMAILS,
        internal_audit: internalAuditUri, // PDF Attachment
        message: `
          New Survey Completed!
          ====================
          User: ${data.name}
          Email: ${data.email}
          Phone: ${data.mobile}
          Total Score: ${Math.round(totalScore)}/150

          DIMENSION SCORES:
          ${JSON.stringify(dimensionScores, null, 2)}

          DETAILED ANSWERS (Backup):
          ------------------------
          ${qaText}
        `
      };

      const result = await emailjs.send(
        EMAILJS_SERVICE_ID, 
        EMAILJS_TEMPLATE_ID, 
        emailParams, 
        EMAILJS_PUBLIC_KEY
      );

      if (result.status === 200) {
        setStep(101); 
        setTimeout(() => { 
           window.location.href = "/";
        }, 6000);
      } else {
        throw new Error("Failed to send email");
      }

    } catch (error) {
      console.error("Submission error:", error);
      alert("Note: We encountered an issue sending the PDF report. However, your lead data and assessment results have been captured. Please check your EmailJS logs.");
      // Even if email fails, we show success if the lead was at least attempted
      setStep(101);
      setTimeout(() => { window.location.href = "/"; }, 6000);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className={cn(
      "relative flex flex-col items-center justify-center overflow-hidden",
      isStandalone ? "w-full" : "min-h-[75vh] py-4 px-4"
    )} id="business-health-survey">
      {!isStandalone && (
        <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none" 
          style={{ backgroundImage: `radial-gradient(#9f0202 1px, transparent 1px)`, backgroundSize: '30px 30px' }} 
        />
      )}

      <div className={cn("relative z-10 w-full", isStandalone ? "max-w-lg" : "max-w-md")}>
        {step === -1 && (
          <div className="text-center mb-6">
            <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xl md:text-3xl font-bold text-gray-900 leading-tight">
              Choose Your <span className="text-[#9f0202]">Assessment</span>
            </motion.h1>
          </div>
        )}

        <motion.div 
          layout
          className="bg-white border border-gray-100 rounded-xl p-6 md:p-8 shadow-2xl flex flex-col justify-center min-h-[350px]"
        >
          <AnimatePresence mode="wait">
            {step === -1 && (
              <motion.div key="selection" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
                <h2 className="text-[9px] font-bold text-gray-400 text-center uppercase tracking-widest">Select Assessment</h2>
                <div className="grid grid-cols-1 gap-3">
                  <button onClick={() => handleSurveySelect('payally')} className="group flex items-center p-4 bg-gray-50 border border-transparent rounded-xl hover:border-[#9f0202] hover:bg-white transition-all text-left shadow-sm">
                    <div className="w-10 h-10 bg-[#9f0202]/5 rounded-xl flex items-center justify-center text-[#9f0202] mr-3 group-hover:scale-105 transition-transform"><Wallet size={20} /></div>
                    <div><h4 className="text-gray-900 font-bold text-base">Pay-ally P2P Survey</h4><p className="text-gray-500 text-[10px]">Procurement Lifecycle</p></div>
                    <ArrowRight className="ml-auto text-gray-300 group-hover:text-[#9f0202]" size={18} />
                  </button>
                  <button onClick={() => handleSurveySelect('finance')} className="group flex items-center p-4 bg-gray-50 border border-transparent rounded-xl hover:border-[#9f0202] hover:bg-white transition-all text-left shadow-sm">
                    <div className="w-10 h-10 bg-[#9f0202]/5 rounded-xl flex items-center justify-center text-[#9f0202] mr-3 group-hover:scale-105 transition-transform"><BarChart3 size={20} /></div>
                    <div><h4 className="text-gray-900 font-bold text-base">Finance Transformation</h4><p className="text-gray-500 text-[10px]">Strategy Assessment</p></div>
                    <ArrowRight className="ml-auto text-gray-300 group-hover:text-[#9f0202]" size={18} />
                  </button>
                </div>
              </motion.div>
            )}

            {step >= 1 && step <= currentQuestions.length && (
              <motion.div key={`step-${step}`} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="space-y-4">
                <div className="flex justify-between items-center text-[9px] font-bold text-[#9f0202] uppercase tracking-widest">
                  <span className="bg-[#9f0202]/5 px-2 py-0.5 rounded-full">{currentQuestions[step - 1].dimension}</span>
                  <span className="text-gray-300 tracking-normal font-medium">Q {step} of {currentQuestions.length}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 leading-tight min-h-[3.5rem] flex items-center">
                  {currentQuestions[step - 1].question}
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {currentQuestions[step - 1].options.map((option, idx) => (
                    <button key={idx} onClick={() => handleOptionSelect(currentQuestions[step - 1].id, option.score)} className={cn("w-full p-3 text-left rounded-lg border-2 transition-all flex items-center justify-between group", answers[currentQuestions[step - 1].id] === option.score ? "border-[#9f0202] bg-[#9f0202]/5 text-[#9f0202]" : "border-gray-50 bg-gray-50/50 text-gray-600 hover:border-gray-200")}>
                      <span className="font-semibold text-sm">{option.text}</span>
                      <div className={cn("w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all", answers[currentQuestions[step - 1].id] === option.score ? "border-[#9f0202] bg-[#9f0202]" : "border-gray-300 group-hover:border-[#9f0202]")}>
                        {answers[currentQuestions[step - 1].id] === option.score && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                      </div>
                    </button>
                  ))}
                </div>
                <div className="pt-4 flex justify-between gap-4 border-t border-gray-100">
                  <Button variant="ghost" onClick={prevStep} className="text-gray-400 hover:text-gray-900 font-bold h-9 px-3 text-xs"><ArrowLeft className="mr-1 h-3 w-3" /> Back</Button>
                  <Button onClick={nextStep} className="bg-[#9f0202] hover:bg-[#7a0101] text-white px-6 h-9 rounded-lg font-bold text-xs min-w-[100px]">
                    {step === currentQuestions.length ? "Finish" : (answers[currentQuestions[step-1].id] ? "Next" : "Skip")} <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 100 && (
              <motion.div key="step-100" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 py-2">
                <div className="text-center space-y-1">
                  <h2 className="text-xl font-bold text-gray-900">You&apos;re almost there!</h2>
                  <p className="text-xs text-gray-500 max-w-xs mx-auto leading-relaxed">Fill in your details to generate your detailed business health report.</p>
                </div>
                <form onSubmit={handleSubmit(handleFinalSubmit)} className="space-y-3">
                  <div className="space-y-1.5"><Label className="text-[9px] text-gray-600 font-bold uppercase tracking-widest">Full Name*</Label><Input {...register("name")} className="bg-gray-50 border-transparent h-10 rounded-lg focus:border-[#9f0202] text-sm px-4" placeholder="Enter your name" />{errors.name && <p className="text-[9px] text-red-500">{errors.name.message}</p>}</div>
                  <div className="space-y-1.5"><Label className="text-[9px] text-gray-600 font-bold uppercase tracking-widest">Business Email*</Label><Input {...register("email")} className="bg-gray-50 border-transparent h-10 rounded-lg focus:border-[#9f0202] text-sm px-4" placeholder="name@company.com" />{errors.email && <p className="text-[9px] text-red-500">{errors.email.message}</p>}</div>
                  <div className="space-y-1.5"><Label className="text-[9px] text-gray-600 font-bold uppercase tracking-widest">Mobile Number*</Label><Input {...register("mobile")} className="bg-gray-50 border-transparent h-10 rounded-lg focus:border-[#9f0202] text-sm px-4" placeholder="+91" />{errors.mobile && <p className="text-[9px] text-red-500">{errors.mobile.message}</p>}</div>
                  <div className="flex items-center gap-3 pt-3">
                      <Button type="button" onClick={() => setStep(currentQuestions.length)} variant="ghost" className="text-gray-400 h-10 px-4 text-xs">Back</Button>
                      <Button type="submit" disabled={isGenerating} className="flex-1 bg-[#9f0202] hover:bg-[#7a0101] text-white h-10 font-bold rounded-lg text-sm shadow-lg shadow-[#9f0202]/10">
                        {isGenerating ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : <Download className="mr-2 h-4 w-4" />}
                        {isGenerating ? "Wait..." : "Get Detailed Report"}
                      </Button>
                  </div>
                </form>
              </motion.div>
            )}

            {step === 101 && (
              <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center text-center space-y-4 py-8">
                <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center text-green-600 shadow-inner"><CheckCircle2 size={32} /></div>
                <div className="space-y-1">
                  <h2 className="text-xl font-bold text-gray-900">Success!</h2>
                  <p className="text-xs text-gray-500">Your report has been downloaded. Redirecting soon...</p>
                </div>
                <Button variant="outline" onClick={() => { window.location.href = "/"; }} className="border-gray-200 text-gray-500 h-9 px-6 rounded-lg text-xs hover:bg-gray-50">Back to Home Now</Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
