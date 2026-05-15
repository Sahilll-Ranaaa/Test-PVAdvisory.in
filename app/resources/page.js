"use client";

import { useState, useMemo, useEffect } from "react";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Loader2, Mail, User, Phone, Briefcase, ChevronLeft, Download,
  FileText, CheckCircle2, ChevronRight, Search, Filter,
  Rocket, Calendar, FileCheck, Wallet, Building2, Receipt,
  Settings, Target, ArrowRight, FileStack
} from "lucide-react";
import { STATIC_RESOURCES, CATEGORIES } from "@/lib/resource-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { PhoneInput } from "@/components/ui/phone-input";
import { validateProfessionalEmail } from "@/lib/email-validator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";

const formSchema = z.object({
  fullName: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email address").refine(val => {
    const res = validateProfessionalEmail(val);
    return res.isValid;
  }, {
    message: "Please provide a valid professional email address"
  }),
  mobile: z.string().min(10, "Invalid mobile number"),
});

const getCategoryIcon = (category) => {
  const cat = category.toLowerCase();
  if (cat.includes("business")) return Settings;
  if (cat.includes("assessment")) return Rocket;
  if (cat.includes("compliance")) return Calendar;
  if (cat.includes("reporting")) return FileCheck;
  if (cat.includes("finance")) return Wallet;
  if (cat.includes("company")) return Building2;
  if (cat.includes("invoicing")) return Receipt;
  if (cat.includes("operations")) return Settings;
  if (cat.includes("strategy")) return Target;
  return FileText;
};

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [allResources, setAllResources] = useState(STATIC_RESOURCES);

  // Lead Gate State
  const [selectedResource, setSelectedResource] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 20;

  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      mobile: "",
    }
  });

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeCategory]);

  const filteredResources = useMemo(() => {
    return allResources.filter(resource => {
      const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "All" || resource.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory, allResources]);

  const totalPages = Math.ceil(filteredResources.length / ITEMS_PER_PAGE);
  const paginatedResources = filteredResources.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleDownloadClick = (resource) => {
    setSelectedResource(resource);
    setIsSuccess(false);
  };

  const onSubmit = async (data) => {
    setIsGenerating(true);

    // Switch to success state immediately for premium feel
    setIsSuccess(true);
    setIsGenerating(false);

    try {
      if (supabase) {
        // Run DB operation in background
        supabase.from('PvAdvisoryLeadData').insert([{
          name: data.fullName,
          email: data.email,
          mobile: data.mobile,
          activity_title: selectedResource?.title,
          activity_type: "Resource Download",
          report_url: selectedResource?.downloadUrl,
          metadata: {
            category: selectedResource?.category,
            source: 'Knowledge Repository'
          }
        }]).then(({ error }) => {
          if (error) console.error("Lead storage failed:", error);
        });
      }
    } catch (error) {
      console.error("Background lead storage failed:", error);
    }

    // Keep success screen visible for 15 seconds as requested
    setTimeout(() => {
      setSelectedResource(null);
      setIsSuccess(false);
      reset();
    }, 15000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER SECTION */}
      <section className="pt-32 pb-16 border-b border-gray-50">
        <MaxWidthWrapper className="ml-[5vw] max-w-none">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#9f0202]/5 rounded-full border border-[#9f0202]/10">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#9f0202]">Resource Library</span>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 tracking-tight">
              Knowledge <span className="text-[#9f0202]">Repository</span>
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed max-w-2xl">
              Expert-vetted frameworks, automated tools, and strategic guides designed to scale your finance operations with precision.
            </p>
          </motion.div>
        </MaxWidthWrapper>
      </section>

      <MaxWidthWrapper className="pb-16 max-w-none ml-[5vw]">
        <div className="flex flex-col lg:grid lg:grid-cols-[220px_1fr] gap-12 lg:gap-16">

          {/* SIDEBAR */}
          <aside className="space-y-10">
            {/* SEARCH */}
            <div className="space-y-4">
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-1">Search</h3>
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#9f0202] transition-colors" size={16} />
                <input
                  type="text"
                  placeholder="Find a tool or guide..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 h-12 bg-gray-50/50 border border-transparent rounded-2xl focus:bg-white focus:border-[#9f0202]/20 focus:ring-0 transition-all text-sm"
                />
              </div>
            </div>

            {/* CATEGORIES */}
            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Categories</h3>
                <Filter size={14} className="text-gray-200" />
              </div>
              <div className="flex flex-col space-y-1">
                {CATEGORIES.map(category => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={cn(
                      "flex items-center justify-between px-4 py-3 rounded-xl text-[13px] font-bold transition-all duration-300",
                      activeCategory === category
                        ? "bg-[#8b0000] text-white shadow-lg shadow-[#8b0000]/10"
                        : "text-gray-500 hover:bg-gray-50"
                    )}
                  >
                    <span>{category}</span>
                    {activeCategory === category && <ChevronRight size={14} />}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* GRID */}
          <div className="flex-1 space-y-0 pt-[120px]">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              <AnimatePresence mode="popLayout">
                {paginatedResources.map((resource) => {
                  const Icon = getCategoryIcon(resource.category);
                  return (
                    <motion.div
                      layout
                      key={resource.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      whileHover={{ y: -4 }}
                      onClick={() => handleDownloadClick(resource)}
                      className="bg-white rounded-2xl border border-gray-200 border-l-4 border-l-[#9f0202] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(159,2,2,0.08)] transition-all duration-300 group cursor-pointer flex flex-col min-h-[200px] relative overflow-hidden"
                    >
                      <div className="flex justify-between items-start mb-6">
                        <div className="px-3 py-1 rounded-full bg-[#9f0202]/5 text-[#9f0202] text-[10px] font-bold tracking-tight">
                          {resource.category}
                        </div>
                      </div>

                      <h3 className="text-[15px] font-bold text-gray-900 leading-tight mb-4 flex-grow pr-2">
                        {resource.title}
                      </h3>

                      <div className="flex justify-between items-end mt-auto">
                        <div className="flex items-center gap-2 text-gray-400 text-[11px] font-medium">
                          <FileText size={14} />
                          <span>{resource.type} · PDF</span>
                        </div>
                        <div className="text-[#9f0202] transition-all duration-300">
                          <ArrowRight size={20} />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-12">
                <Button
                  variant="ghost"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => p - 1)}
                  className="w-10 h-10 rounded-xl hover:bg-gray-100"
                >
                  <ChevronLeft size={20} />
                </Button>
                {[...Array(totalPages)].map((_, i) => (
                  <Button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={cn(
                      "w-10 h-10 rounded-xl text-xs font-bold transition-all",
                      currentPage === i + 1
                        ? "bg-[#9f0202] text-white"
                        : "bg-white text-gray-400 hover:bg-gray-50 border border-gray-50"
                    )}
                  >
                    {i + 1}
                  </Button>
                ))}
                <Button
                  variant="ghost"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(p => p + 1)}
                  className="w-10 h-10 rounded-xl hover:bg-gray-100"
                >
                  <ChevronRight size={20} />
                </Button>
              </div>
            )}
          </div>
        </div>
      </MaxWidthWrapper>

      {/* LEAD GATE MODAL */}
      <Dialog open={!!selectedResource} onOpenChange={() => setSelectedResource(null)}>
        <DialogContent className="sm:max-w-[650px] p-0 overflow-hidden rounded-[2rem] border-none shadow-2xl bg-white">
          <div className="flex flex-col md:flex-row h-full min-h-[450px]">
            {/* Left Panel: Resource Context */}
            <div className="w-full md:w-[40%] bg-[#111111] p-8 flex flex-col relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-15 pointer-events-none">
                <svg width="100%" height="100%" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                      <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#9f0202" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>

              <div className="relative z-10 h-full flex flex-col">
                <div className="w-10 h-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl flex items-center justify-center p-2 mb-8">
                  <Image src="/pv-logo.png" alt="PV Logo" width={40} height={40} className="w-full h-full object-contain" />
                </div>

                <div className="space-y-4 mt-2">
                  <div className="text-[9px] font-black text-[#9f0202] uppercase tracking-[0.2em]">{selectedResource?.category}</div>
                  <h2 className="text-xl md:text-2xl font-bold text-white leading-tight">
                    {selectedResource?.title}
                  </h2>
                  <p className="text-gray-400 text-[12px] leading-relaxed max-w-[200px]">
                    {selectedResource?.description}
                  </p>
                </div>

                <div className="mt-auto pt-6">
                  <div className="h-px w-10 bg-[#9f0202]/30 mb-4" />
                  <div className="text-[9px] font-bold text-gray-500 uppercase tracking-[0.15em]">{selectedResource?.type || "INTERACTIVE PDF"}</div>
                </div>
              </div>
            </div>

            {/* Right Panel: Lead Form */}
            <div className="w-full md:w-[60%] p-8 md:p-10 bg-white relative">
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center space-y-4"
                >
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-500 mb-2 border-4 border-green-100">
                    <CheckCircle2 size={28} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-gray-900">Success!</h3>
                    <p className="text-gray-500 text-[13px] max-w-xs mx-auto">Check your email for the download link.</p>
                  </div>
                </motion.div>
              ) : (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <DialogTitle className="text-2xl font-bold text-gray-900 tracking-tight">Download Resource</DialogTitle>
                    <p className="text-gray-400 text-[13px] leading-relaxed">Provide your professional details to receive the asset.</p>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-1.5">
                      <Label className="text-[9px] font-black uppercase text-gray-400 tracking-widest ml-1">Full Name</Label>
                      <Input {...register("fullName")} placeholder="Your Name" className="h-11 bg-gray-50/50 border-transparent rounded-xl focus:bg-white focus:border-[#9f0202]/20 px-4 transition-all text-[13px]" />
                      {errors.fullName && <p className="text-[9px] text-red-500 font-bold mt-1 ml-1">{errors.fullName.message}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-[9px] font-black uppercase text-gray-400 tracking-widest ml-1">Email*</Label>
                      <Input {...register("email")} placeholder="name@company.com" className="h-11 bg-gray-50/50 border-transparent rounded-xl focus:bg-white focus:border-[#9f0202]/20 px-4 transition-all text-[13px]" />
                      {errors.email && <p className="text-[9px] text-red-500 font-bold mt-1 ml-1">{errors.email.message}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-[9px] font-black uppercase text-gray-400 tracking-widest ml-1">Mobile Number</Label>
                      <PhoneInput
                        defaultCountry="IN"
                        value={watch("mobile")}
                        onChange={(val) => setValue("mobile", val, { shouldValidate: true })}
                        className="bg-gray-50/50 rounded-xl border-transparent h-11 flex items-center overflow-hidden focus-within:ring-1 focus-within:ring-[#9f0202]/20 transition-all text-[13px]"
                      />
                      {errors.mobile && <p className="text-[9px] text-red-500 font-bold mt-1 ml-1">{errors.mobile.message}</p>}
                    </div>

                    <div className="pt-2 space-y-4">
                      <Button
                        type="submit"
                        disabled={isGenerating}
                        className="w-full h-12 bg-[#9f0202] hover:bg-[#800000] text-white font-bold rounded-xl shadow-[0_10px_20px_rgba(159,2,2,0.15)] transition-all active:scale-[0.98] relative overflow-hidden group text-sm"
                      >
                        <div className="relative z-10 flex items-center justify-center gap-2">
                          {isGenerating ? <Loader2 className="animate-spin" size={18} /> : <Download size={18} />}
                          {isGenerating ? "Processing..." : "Download Template"}
                        </div>
                      </Button>

                      <button
                        type="button"
                        onClick={() => setSelectedResource(null)}
                        className="w-full text-center text-[10px] font-bold text-gray-400 hover:text-gray-600 transition-colors uppercase tracking-widest"
                      >
                        Maybe later, take me back
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
