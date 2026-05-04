"use client";

import { useState, useMemo, useEffect } from "react";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Search, Calendar, Clock, ArrowRight, ChevronRight, ChevronLeft } from "lucide-react";
import { BLOGS } from "@/lib/blog-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { getCustomBlogs } from "@/lib/admin-store";

export default function ThoughtLeadershipPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [allBlogs, setAllBlogs] = useState(BLOGS);
  const blogsPerPage = 6;

  useEffect(() => {
    // Merge static blogs with custom blogs from admin store
    const custom = getCustomBlogs();
    const merged = [...custom, ...BLOGS];
    setAllBlogs(merged);
  }, []);

  const filteredBlogs = useMemo(() => {
    return allBlogs.filter(blog => 
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, allBlogs]);

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const currentBlogs = filteredBlogs.slice((currentPage - 1) * blogsPerPage, currentPage * blogsPerPage);

  const featuredBlogs = allBlogs.slice(0, 6);

  return (
    <div className="min-h-screen bg-[#fafafa] pt-32 pb-24">
      {/* Centered Header Section */}
      <section className="mb-16">
        <MaxWidthWrapper className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
              Discover our <span className="text-[#9f0202]">latest news</span>
            </h1>
            <p className="text-gray-500 text-base leading-relaxed">
              Explore the latest insights, industry breakthroughs, and consulting frameworks from the PV Advisory team.
            </p>

            {/* Search Bar */}
            <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xl mx-auto">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <Input 
                  placeholder="Search insights..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-11 h-14 bg-white border-gray-200 rounded-xl focus:ring-[#9f0202] shadow-sm"
                />
              </div>
              <Button className="h-14 px-8 bg-[#9f0202] hover:bg-[#7a0101] text-white font-bold rounded-xl shrink-0 w-full sm:w-auto transition-all shadow-lg shadow-[#9f0202]/10">
                Find Now
              </Button>
            </div>
          </motion.div>
        </MaxWidthWrapper>
      </section>

      <MaxWidthWrapper>
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar Section (NOW ON LEFT) */}
          <aside className="w-full lg:w-[280px] space-y-12 order-2 lg:order-1">
            {/* Featured List */}
            <div className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 pb-4 border-b border-gray-100">Featured</h3>
              <div className="space-y-5">
                {featuredBlogs.map((blog) => (
                  <Link key={blog.id} href={`/thought-leadership/post?id=${blog.id}`} className="flex gap-4 group">
                    <div className="relative w-16 h-16 shrink-0 rounded-xl overflow-hidden shadow-sm">
                      {blog.image ? (
                        <Image src={blog.image} alt={blog.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-300 font-bold">PVA</div>
                      )}
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-[9px] text-[#9f0202] font-bold uppercase tracking-tight">{blog.category}</p>
                      <h4 className="text-xs font-bold text-gray-900 group-hover:text-[#9f0202] transition-colors line-clamp-2 leading-snug">
                        {blog.title}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </aside>

          {/* Main Feed Section (NOW ON RIGHT, 3 CARDS IN A ROW) */}
          <div className="flex-1 space-y-10 order-1 lg:order-2">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Expert Insights</h2>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{filteredBlogs.length} Articles</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {currentBlogs.map((blog, index) => (
                  <motion.article 
                    layout
                    key={blog.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-50 flex flex-col h-full"
                  >
                    {/* Compact Image Section */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                      {blog.image ? (
                        <Image 
                          src={blog.image} 
                          alt={blog.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-300 font-bold text-2xl tracking-tighter">PV ADVISORY</div>
                      )}
                      <div className="absolute top-3 left-3">
                        <div className="px-2 py-0.5 bg-white/90 backdrop-blur-md text-[7px] font-black text-[#9f0202] uppercase tracking-[0.2em] rounded-md shadow-sm">
                          {blog.category}
                        </div>
                      </div>
                    </div>

                    {/* Compact Content Section */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-[8px] text-gray-400 font-bold uppercase tracking-widest">
                           <span>{blog.date}</span>
                           <span>•</span>
                           <span>{blog.readTime || "5 MIN READ"}</span>
                        </div>
                        <h3 className="text-base font-bold text-gray-900 leading-tight group-hover:text-[#9f0202] transition-colors line-clamp-2">
                          {blog.title}
                        </h3>
                        <p className="text-gray-500 text-[11px] leading-relaxed line-clamp-2">
                          {blog.excerpt}
                        </p>
                      </div>
                      
                      <Link href={`/thought-leadership/post?id=${blog.id}`} className="inline-flex items-center text-[10px] font-bold text-[#9f0202] group/link">
                        Read More <ChevronRight className="ml-1 h-3 w-3 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>

            {/* Pagination / Navigation Section */}
            {totalPages > 1 && (
              <div className="pt-8 flex items-center justify-center gap-1.5">
                <Button 
                  variant="ghost" 
                  disabled={currentPage === 1}
                  onClick={() => {
                    setCurrentPage(p => p - 1);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-8 h-8 p-0 rounded-lg hover:bg-[#9f0202] hover:text-white transition-colors"
                >
                  <ChevronLeft size={16} />
                </Button>
                
                {[...Array(totalPages)].map((_, i) => (
                  <Button
                    key={i + 1}
                    onClick={() => {
                      setCurrentPage(i + 1);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={cn(
                      "w-8 h-8 p-0 rounded-lg text-xs font-bold transition-all",
                      currentPage === i + 1 
                        ? "bg-[#9f0202] text-white shadow-md shadow-[#9f0202]/10" 
                        : "bg-white text-gray-400 hover:bg-gray-100 border border-gray-100"
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
                  className="w-8 h-8 p-0 rounded-lg hover:bg-[#9f0202] hover:text-white transition-colors"
                >
                  <ChevronRight size={16} />
                </Button>
              </div>
            )}
          </div>

        </div>
      </MaxWidthWrapper>
    </div>
  );
}
