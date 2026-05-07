"use client";

import { useState, useMemo, useEffect } from "react";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Search, Download, Filter, FileText, ChevronRight, CheckCircle2, Loader2, Mail, User, Phone, Briefcase, ChevronLeft } from "lucide-react";
import { STATIC_RESOURCES, CATEGORIES } from "@/lib/resource-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
  email: z.string().email("Invalid email address"),
  company: z.string().min(2, "Company name is required"),
  jobTitle: z.string().min(2, "Job title is required"),
  mobile: z.string().min(10, "Invalid mobile number"),
});

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [allResources, setAllResources] = useState(STATIC_RESOURCES);

  // Lead Gate State
  const [selectedResource, setSelectedResource] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

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
      const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          resource.description.toLowerCase().includes(searchQuery.toLowerCase());
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
    
    try {
      // 1. Store lead in Supabase
      if (supabase) {
        await supabase.from('PvAdvisoryLeadData').insert([{
          full_name: data.fullName,
          email: data.email,
          company: data.company,
          job_title: data.jobTitle,
          mobile: data.mobile,
          resource_title: selectedResource?.title,
          resource_category: selectedResource?.category,
          source: 'Knowledge Repository'
        }]);
      }

      // 2. Trigger automated download
      const link = document.createElement('a');
      link.href = selectedResource.downloadUrl || '#';
      link.download = selectedResource.fileName || 'pv-resource.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setIsSuccess(true);
      setTimeout(() => {
        setSelectedResource(null);
        setIsGenerating(false);
        reset();
      }, 2000);
    } catch (error) {
      console.error("Lead storage failed:", error);
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">

      {/* COMPACT HERO HEADER */}
      <section className="relative pt-24 pb-10 bg-white border-b border-gray-100 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#9f0202]/[0.02] -skew-x-12 transform origin-top" />
        <MaxWidthWrapper>
          <div className="relative z-10 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#9f0202]/5 rounded-full border border-[#9f0202]/10">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#9f0202]">Resource Library</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                Knowledge <span className="text-[#9f0202]">Repository</span>
              </h1>
              <p className="text-gray-500 text-base leading-relaxed max-w-2xl">
                Expert-vetted frameworks, automated tools, and strategic guides designed to scale your finance operations with precision.
              </p>
            </motion.div>
          </div>
        </MaxWidthWrapper>
      </section>

      <MaxWidthWrapper className="py-12">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* LEFT SIDEBAR */}
          <aside className="w-full lg:w-[280px] space-y-10">
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Search</h3>
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#9f0202] transition-colors" size={18} />
                <Input
                  placeholder="Find a tool or guide..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-11 bg-white border-gray-100 rounded-xl shadow-sm focus:border-[#9f0202] focus:ring-0 transition-all text-xs font-medium"
                />
              </div>
            </div>

            {/* CATEGORIES */}
            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Categories</h3>
                <Filter size={14} className="text-gray-300" />
              </div>
              <div className="flex flex-col gap-1">
                {CATEGORIES.map(category => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={cn(
                      "flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300",
                      activeCategory === category
                        ? "bg-[#9f0202] text-white shadow-lg shadow-[#9f0202]/10"
                        : "text-gray-500 hover:bg-gray-100"
                    )}
                  >
                    <span>{category}</span>
                    {activeCategory === category && <ChevronRight size={14} />}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* MAIN CONTENT AREA */}
          <main className="flex-1 space-y-8">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-xl font-bold text-gray-900">Expert Resources</h2>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">{filteredResources.length} Assets Found</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {paginatedResources.map((resource) => (
                  <motion.div
                    layout
                    key={resource.id || resource.title}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    whileHover={{ y: -8 }}
                    onClick={() => handleDownloadClick(resource)}
                    className="bg-white rounded-[2rem] border border-gray-100 p-6 hover:shadow-2xl transition-all duration-500 group relative overflow-hidden flex flex-col min-h-[320px] cursor-pointer"
                  >
                    {/* Soft Maroon Effect */}
                    <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#9f0202]/[0.08] group-hover:bg-[#9f0202]/[0.15] blur-[80px] rounded-full transition-all duration-500 pointer-events-none" />

                    <div className="flex flex-col h-full space-y-6 relative z-10">
                      <div className="w-12 h-12 bg-white shadow-sm border border-gray-50 rounded-2xl flex items-center justify-center p-2 group-hover:scale-110 transition-transform duration-500">
                        <Image src="/pv-logo.png" alt="PV Advisory Logo" width={48} height={48} className="w-full h-full object-contain" />
                      </div>

                      <div className="space-y-3 flex-1">
                        <span className="text-[9px] font-bold text-[#9f0202] uppercase tracking-[0.2em]">{resource.category}</span>
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#9f0202] transition-colors leading-tight">{resource.title}</h3>
                        <p className="text-gray-500 text-[13px] leading-relaxed line-clamp-3">
                          {resource.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                         <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">{resource.type || "PDF Guide"}</span>
                         <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#9f0202] group-hover:text-white transition-all duration-300">
                            <Download size={14} />
                         </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Pagination UI */}
            {totalPages > 1 && (
              <div className="pt-10 flex items-center justify-center gap-2">
                <Button 
                  variant="ghost" 
                  disabled={currentPage === 1}
                  onClick={() => {
                    setCurrentPage(p => p - 1);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="h-10 w-10 p-0 rounded-xl hover:bg-[#9f0202] hover:text-white"
                >
                  <ChevronLeft size={18} />
                </Button>
                
                {[...Array(totalPages)].map((_, i) => (
                  <Button
                    key={i + 1}
                    onClick={() => {
                      setCurrentPage(i + 1);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={cn(
                      "h-10 w-10 p-0 rounded-xl text-xs font-bold transition-all",
                      currentPage === i + 1 
                        ? "bg-[#9f0202] text-white shadow-lg shadow-[#9f0202]/10" 
                        : "bg-white text-gray-400 hover:bg-gray-100 border border-gray-50"
                    )}
                  >
                    {i + 1}
                  </Button>
                ))}

                <Button 
                  variant="ghost" 
                  disabled={currentPage === totalPages}
                  onClick={() => {
                    setCurrentPage(p => p + 1);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="h-10 w-10 p-0 rounded-xl hover:bg-[#9f0202] hover:text-white"
                >
                  <ChevronRight size={18} />
                </Button>
              </div>
            )}
          </main>

        </div>
      </MaxWidthWrapper>

      {/* LEAD GATE MODAL */}
      <Dialog open={!!selectedResource} onOpenChange={() => setSelectedResource(null)}>
        <DialogContent className="sm:max-w-[440px] p-0 overflow-hidden rounded-[2.5rem] border-none shadow-2xl bg-white">
          <div className="relative h-32 bg-[#9f0202] overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <svg width="100%" height="100%" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 50 C 50 20, 100 80, 150 50 C 200 20, 250 80, 300 50 C 350 20, 400 80, 450 50" stroke="white" fill="transparent" strokeWidth="2" />
                <path d="M0 80 C 50 50, 100 110, 150 80 C 200 50, 250 110, 300 80 C 350 50, 400 110, 450 80" stroke="white" fill="transparent" strokeWidth="2" />
              </svg>
            </div>
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
              <DialogTitle className="text-white text-xl font-bold mb-1">Access Premium Resource</DialogTitle>
              <DialogDescription className="text-white/80 text-xs font-medium">
                Complete the details below to download your resource.
              </DialogDescription>
            </div>
          </div>

          <div className="p-8">
            {isSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-10 space-y-4 text-center"
              >
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-500 mb-2">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Success!</h3>
                <p className="text-gray-500 text-sm">Your download has started. Enjoy the insights!</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-black uppercase text-gray-400 ml-1">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                      <Input {...register("fullName")} placeholder="John Doe" className="pl-9 h-11 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:border-[#9f0202] text-xs transition-all" />
                    </div>
                    {errors.fullName && <p className="text-[10px] text-red-500 font-bold mt-1 ml-1">{errors.fullName.message}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-black uppercase text-gray-400 ml-1">Work Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                      <Input {...register("email")} placeholder="john@company.com" className="pl-9 h-11 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:border-[#9f0202] text-xs transition-all" />
                    </div>
                    {errors.email && <p className="text-[10px] text-red-500 font-bold mt-1 ml-1">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-black uppercase text-gray-400 ml-1">Company</Label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                      <Input {...register("company")} placeholder="Company Name" className="pl-9 h-11 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:border-[#9f0202] text-xs transition-all" />
                    </div>
                    {errors.company && <p className="text-[10px] text-red-500 font-bold mt-1 ml-1">{errors.company.message}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-black uppercase text-gray-400 ml-1">Mobile</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                      <Input {...register("mobile")} placeholder="+91 00000 00000" className="pl-9 h-11 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:border-[#9f0202] text-xs transition-all" />
                    </div>
                    {errors.mobile && <p className="text-[10px] text-red-500 font-bold mt-1 ml-1">{errors.mobile.message}</p>}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-[10px] font-black uppercase text-gray-400 ml-1">Job Title</Label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                    <Input {...register("jobTitle")} placeholder="e.g. Finance Director" className="pl-9 h-11 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:border-[#9f0202] text-xs transition-all" />
                  </div>
                  {errors.jobTitle && <p className="text-[10px] text-red-500 font-bold mt-1 ml-1">{errors.jobTitle.message}</p>}
                </div>

                <Button 
                  type="submit" 
                  disabled={isGenerating}
                  className="w-full h-12 bg-[#9f0202] hover:bg-[#800000] text-white font-bold rounded-xl shadow-lg shadow-[#9f0202]/20 transition-all mt-4 group"
                >
                  {isGenerating ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <div className="flex items-center gap-2">
                      Get Your Resource <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </Button>
              </form>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
