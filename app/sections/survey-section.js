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
import { saveLead } from "@/lib/admin-store";
import { PhoneInput } from "@/components/ui/phone-input";
import { isValidPhoneNumber } from "react-phone-number-input";
import { validateProfessionalEmail } from "@/lib/email-validator";
import { supabase } from "@/lib/supabase";

// ---------------------

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email format").refine(val => {
    const res = validateProfessionalEmail(val);
    return res.isValid;
  }, {
    message: "Please provide a valid professional email address"
  }),
  mobile: z.string().min(10, "Phone number must be at least 10 digits"),
});

export default function SurveySection({ preselectedType = null, isStandalone = false }) {
  const [selectedSurvey, setSelectedSurvey] = useState(preselectedType);
  const [step, setStep] = useState(preselectedType ? 1 : -1); 
  const [answers, setAnswers] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    let timer;
    if (step === 101 && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      
      if (countdown === 1) {
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      }
    }
    return () => clearInterval(timer);
  }, [step, countdown]);

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
    setValue,
    watch,
    trigger, // Added trigger for manual re-validation
  } = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange", // Enable real-time validation
    defaultValues: {
      mobile: "",
    }
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
      const scoreSum = dimQuestions.reduce((acc, q) => acc + (answers[q.id] || 0), 0);
      
      if (selectedSurvey === 'finance') {
        // Finance: 5 questions * max 5 = 25
        results[dim] = scoreSum;
      } else {
        // Pay-ally: 2 questions * max 5 = 10. Scale to 25.
        results[dim] = (scoreSum / 10) * 25;
      }
    });
    return results;
  };

  const handleFinalSubmit = async (data) => {
    console.log("handleFinalSubmit triggered with data:", data);
    setIsGenerating(true);
    const dimensionScores = calculateDimensionScores();
    const totalScore = Object.values(dimensionScores).reduce((acc, curr) => acc + curr, 0);
    const questions = surveyData[selectedSurvey].questions;

    const reportData = {
      name: data.name,
      email: data.email,
      mobile: data.mobile,
      score: totalScore, 
      dimensionScores, 
      answers,
      surveyType: surveyData[selectedSurvey].title
    };

    console.log("Submission Started. Report Data:", reportData);

    // Save lead to local admin store
    saveLead(reportData);

    // 1. Generate PDF
    let pdfResult;
    try {
      console.log("STEP 1: Starting PDF Generation...");
      if (!reportData.surveyType) throw new Error("Missing surveyType in report data");
      
      pdfResult = await generateReport(reportData, false); // Set to false to prevent automatic download on spot
      console.log("STEP 1 SUCCESS: PDF Generated. Size:", pdfResult.blob?.size);
    } catch (err) {
      console.error("CRITICAL ERROR in STEP 1:", err);
      alert("Error generating report: " + err.message);
      setIsGenerating(false);
      return;
    }

    // 2. Save lead to local admin store (Backup)
    try {
      console.log("STEP 2: Saving to Local Storage...");
      saveLead(reportData);
    } catch (err) {
      console.error("STEP 2 ERROR:", err);
    }

    // 2. Save lead to Supabase (Database + Storage)
    let reportUrl = null;
    try {
      if (supabase) {
        console.log("STEP 3: Supabase detected. Starting Storage upload...");
        const fileName = `report_${Date.now()}_${data.name.replace(/\s+/g, '_')}.pdf`;

        const { error: uploadError } = await supabase.storage
          .from('pvadvisory-reports')
          .upload(fileName, pdfResult.blob, {
            contentType: 'application/pdf',
            cacheControl: '3600',
            upsert: false
          });

        if (uploadError) {
          console.error("Supabase Storage Error:", uploadError.message);
        } else {
          const { data: { publicUrl } } = supabase.storage
            .from('pvadvisory-reports')
            .getPublicUrl(fileName);
          reportUrl = publicUrl;
          console.log("PDF uploaded to Storage. URL:", reportUrl);
        }

        console.log("STEP 4: Inserting record into PvAdvisoryLeadData...");
        const { error: dbError } = await supabase
          .from('PvAdvisoryLeadData')
          .insert([{
            name: data.name,
            email: data.email,
            mobile: data.mobile,
            activity_title: reportData.surveyType,
            activity_type: "Survey Assessment",
            score: totalScore,
            dimension_scores: dimensionScores,
            answers: answers,
            report_url: reportUrl
          }]);
        
        if (dbError) console.error("Supabase DB Error:", dbError.message);
        else console.log("Lead record saved to DB successfully.");
      } else {
        console.warn("Supabase not configured, skipping cloud storage.");
      }
    } catch (supaErr) {
      console.error("Unexpected Supabase Error:", supaErr);
    }

    try {
      console.log("STEP 5: Sending Emails...");
      const userReportUri = pdfResult.dataUri;
      const internalAuditUri = await generateInternalReport(reportData, questions); 
      
      console.log("Email PDFs ready. Sending now...");
      // 3. Prepare text-based Q&A for fail-safe
      let qaText = "";
      questions.forEach((q, i) => {
        const score = answers[q.id] || 0;
        const selected = q.options.find(o => o.score === score);
        qaText += `${i+1}. ${q.question}\n   Answer: ${selected ? selected.text : "Skipped"} (${score} pts)\n\n`;
      });

      // 5. Success is handled via setStep(101)
      setStep(101); 
      setTimeout(() => { 
         window.location.href = "/";
      }, 10000);

    } catch (error) {
      console.error("Submission error:", error);
      alert("Notice: There was a technical glitch triggering the auto-download. Please try clicking 'Get Detailed Report' again or contact support.");
    } finally {
      setIsGenerating(false);
    }
  };

  const onInvalid = (errors) => {
    console.warn("Form Validation Errors:", errors);
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
                  <button onClick={() => handleSurveySelect('finance')} className="group flex items-center p-4 bg-gray-50 border border-transparent rounded-xl hover:border-[#9f0202] hover:bg-white transition-all text-left shadow-sm">
                    <div className="w-10 h-10 bg-[#9f0202]/5 rounded-xl flex items-center justify-center text-[#9f0202] mr-3 group-hover:scale-105 transition-transform"><BarChart3 size={20} /></div>
                    <div>
                      <h4 className="text-gray-900 font-bold text-base">Finance Health Checkup</h4>
                      <p className="text-gray-500 text-[10px]">Deep dive into governance and technology readiness.</p>
                    </div>
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
                <form onSubmit={handleSubmit(handleFinalSubmit, onInvalid)} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label className="text-[9px] text-gray-600 font-bold uppercase tracking-widest">Full Name*</Label>
                    <Input {...register("name")} className="bg-gray-50 border-transparent h-10 rounded-lg focus:border-[#9f0202] text-sm px-4" placeholder="Enter your name" />
                    {errors.name && <p className="text-[9px] text-red-500 mt-1">{errors.name.message}</p>}
                  </div>
                  
                  <div className="space-y-1.5">
                    <Label className="text-[9px] text-gray-600 font-bold uppercase tracking-widest">Email*</Label>
                    <Input {...register("email")} className="bg-gray-50 border-transparent h-10 rounded-lg focus:border-[#9f0202] text-sm px-4" placeholder="name@company.com" />
                    {errors.email && <p className="text-[9px] text-red-500 mt-1">{errors.email.message}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-[9px] text-gray-600 font-bold uppercase tracking-widest">Mobile Number*</Label>
                    <PhoneInput 
                      defaultCountry="IN"
                      value={watch("mobile")}
                      onChange={(val) => setValue("mobile", val, { shouldValidate: true })}
                      className="bg-gray-50 rounded-lg border-transparent h-10 flex items-center overflow-hidden focus-within:ring-1 focus-within:ring-[#9f0202]"
                    />
                    {errors.mobile && <p className="text-[9px] text-red-500 mt-1">{errors.mobile.message}</p>}
                  </div>

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
                  <p className="text-xs text-gray-500">Thank you! Your detailed report has been sent to your email address.</p>
                  <p className="text-[10px] font-bold text-[#9f0202] uppercase tracking-tighter mt-2">
                    Redirecting to home in {countdown} seconds...
                  </p>
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
