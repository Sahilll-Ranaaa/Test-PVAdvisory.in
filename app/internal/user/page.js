"use client";

import { useState, useEffect, useMemo } from "react";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { 
  LayoutDashboard, 
  BookOpen, 
  Download, 
  Users, 
  Trash2, 
  Plus, 
  FileText, 
  Search, 
  Star, 
  CheckCircle2, 
  Upload,
  ChevronLeft,
  ChevronRight,
  Edit2,
  LogOut,
  Loader2
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  getCustomBlogs, 
  saveBlog, 
  deleteBlog, 
  updateBlog,
  getCustomResources, 
  saveResource, 
  deleteResource,
  updateResource,
  getLeads
} from "@/lib/admin-store";
import { cn } from "@/lib/utils";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [blogs, setBlogs] = useState([]);
  const [resources, setResources] = useState([]);
  const [leads, setLeads] = useState([]);
  const [isLoadingLeads, setIsLoadingLeads] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  // Lead Filtering State
  const [leadSearch, setLeadSearch] = useState("");
  const [leadFilter, setLeadFilter] = useState("all");
  
  const router = useRouter();

  // Blog Form State
  const [editingId, setEditingId] = useState(null);
  const [blogForm, setBlogForm] = useState({
    title: "",
    description: "",
    content: "",
    category: "Strategy",
    image_url: "",
    is_published: true,
    is_featured: false
  });

  // Resource Form State
  const [resourceForm, setResourceForm] = useState({ title: "", description: "", category: "Strategy", type: "PDF Guide", size: "1.0 MB", fileName: "", fileData: null });

  const checkAuth = async () => {
    if (!supabase) return;
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push("/internal/login");
    }
  };

  const refreshData = async () => {
    setIsLoadingLeads(true);
    try {
      // 1. Fetch Blogs from Supabase
      if (supabase) {
        const { data: blogData, error: blogError } = await supabase
          .from('PvAdvisoryBlogs')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (!blogError) setBlogs(blogData || []);
      }

      // 2. Fetch Leads from Supabase
      if (supabase) {
        const { data: leadData, error: leadError } = await supabase
          .from('PvAdvisoryLeadData')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (!leadError) setLeads(leadData || []);
      }

      setResources(getCustomResources());
    } catch (err) {
      console.error("Data refresh failed:", err);
      // Fallback to local storage if supabase fails
      setBlogs(getCustomBlogs());
    } finally {
      setIsLoadingLeads(false);
    }
  };

  const filteredLeads = useMemo(() => {
    return leads.filter(lead => {
      const matchesSearch = 
        (lead.name?.toLowerCase().includes(leadSearch.toLowerCase())) ||
        (lead.email?.toLowerCase().includes(leadSearch.toLowerCase())) ||
        (lead.company_name?.toLowerCase().includes(leadSearch.toLowerCase()));
      
      const matchesFilter = 
        leadFilter === "all" || 
        lead.activity_type?.toLowerCase().includes(leadFilter.toLowerCase());

      return matchesSearch && matchesFilter;
    });
  }, [leads, leadSearch, leadFilter]);

  useEffect(() => {
    checkAuth();
    refreshData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    router.push("/internal/login");
  };

  const handleFileUpload = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    if (type === 'blog') {
      // For blogs, we'll store the file to upload later
      setBlogForm({ ...blogForm, imageFile: file, image_url: URL.createObjectURL(file) });
    } else {
      setResourceForm({ ...resourceForm, fileName: file.name, fileData: file, size: `${(file.size / (1024 * 1024)).toFixed(1)} MB` });
    }
  };

  const handleSaveBlog = async () => {
    if (!blogForm.title || !blogForm.content) {
      alert("Title and Content are required");
      return;
    }

    setIsSaving(true);
    try {
      let finalImageUrl = blogForm.image_url;

      // 1. Upload image if a new file was selected
      if (blogForm.imageFile && supabase) {
        const fileExt = blogForm.imageFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `blog-images/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('pvadvisory-blog-storage')
          .upload(filePath, blogForm.imageFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('pvadvisory-blog-storage')
          .getPublicUrl(filePath);
        
        finalImageUrl = publicUrl;
      }

      // 2. Save to Database
      if (supabase) {
        const blogData = {
          title: blogForm.title,
          description: blogForm.description,
          content: blogForm.content,
          category: blogForm.category,
          image_url: finalImageUrl,
          is_published: blogForm.is_published,
          is_featured: blogForm.is_featured
        };

        if (editingId) {
          const { error } = await supabase
            .from('PvAdvisoryBlogs')
            .update(blogData)
            .eq('id', editingId);
          if (error) throw error;
        } else {
          const { error } = await supabase
            .from('PvAdvisoryBlogs')
            .insert([blogData]);
          if (error) throw error;
        }
      }

      setBlogForm({ title: "", description: "", content: "", category: "Strategy", image_url: "", is_published: true, is_featured: false });
      setEditingId(null);
      refreshData();
      alert(editingId ? "Post updated successfully!" : "Post published successfully!");
      setActiveTab("blogs");
    } catch (err) {
      console.error("Save blog failed:", err);
      alert("Error saving blog: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteBlog = async (id) => {
    if (confirm("Are you sure you want to delete this post?")) {
      if (supabase) {
        const { error } = await supabase.from('PvAdvisoryBlogs').delete().eq('id', id);
        if (!error) refreshData();
      }
    }
  };

  const handleEditBlog = (blog) => {
    setEditingId(blog.id);
    setBlogForm({
      title: blog.title,
      description: blog.description,
      content: blog.content,
      category: blog.category,
      image_url: blog.image_url,
      is_published: blog.is_published,
      is_featured: blog.is_featured
    });
    setActiveTab("add-blog");
  };

  const handleSaveResource = () => {
    if (editingId) {
      updateResource(editingId, resourceForm);
    } else {
      saveResource(resourceForm);
    }
    setResourceForm({ title: "", description: "", category: "Strategy", type: "PDF Guide", size: "1.0 MB", fileName: "", fileData: null });
    setEditingId(null);
    setResources(getCustomResources());
    setActiveTab("resources");
  };

  return (
    <div className="flex h-screen bg-[#fafafa] font-poppins">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col shrink-0">
        <div className="p-8 pb-4">
          <div className="flex items-center gap-2 mb-8">
            <Image src="/pv-logo.png" alt="PV Advisory" width={120} height={32} className="h-8 w-auto" />
            <span className="font-black uppercase tracking-widest text-[10px]">Admin Panel</span>
          </div>
          
          <nav className="space-y-1">
            <button onClick={() => setActiveTab("dashboard")} className={cn("w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all", activeTab === "dashboard" ? "bg-[#9f0202] text-white shadow-lg shadow-[#9f0202]/10" : "text-gray-500 hover:bg-gray-50")}>
              <LayoutDashboard size={18} /> Dashboard
            </button>
            <button onClick={() => setActiveTab("blogs")} className={cn("w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all", activeTab === "blogs" ? "bg-[#9f0202] text-white shadow-lg shadow-[#9f0202]/10" : "text-gray-500 hover:bg-gray-50")}>
              <BookOpen size={18} /> Blog Posts
            </button>
            <button onClick={() => setActiveTab("leads")} className={cn("w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all", activeTab === "leads" ? "bg-[#9f0202] text-white shadow-lg shadow-[#9f0202]/10" : "text-gray-500 hover:bg-gray-50")}>
              <Users size={18} /> User Leads
            </button>
          </nav>
        </div>

        <div className="mt-auto p-8">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pt-28 px-12 pb-12">
        <div className="max-w-6xl mx-auto">
          {activeTab === "dashboard" && (
            <div className="space-y-12">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Welcome back, Admin</h1>
                <p className="text-gray-400 font-medium">Here&apos;s what&apos;s happening with your platform.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-2">
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 mb-2">
                    <BookOpen size={24} />
                  </div>
                  <div className="text-3xl font-bold text-gray-900">{blogs.length}</div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Blog Posts</div>
                </div>
                <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-2">
                  <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-500 mb-2">
                    <Users size={24} />
                  </div>
                  <div className="text-3xl font-bold text-gray-900">{leads.length}</div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Captured Leads</div>
                </div>
                <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-2">
                  <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-500 mb-2">
                    <Star size={24} />
                  </div>
                  <div className="text-3xl font-bold text-gray-900">{blogs.filter(b => b.is_featured).length}</div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Featured Posts</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "add-blog" && (
            <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-4">
                <button onClick={() => setActiveTab("blogs")} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-all">
                  <ChevronLeft size={18} />
                </button>
                <h2 className="text-xl font-bold text-gray-900">{editingId ? "Edit Blog Post" : "Create New Post"}</h2>
              </div>

              <div className="bg-white rounded-[2rem] border border-gray-100 p-8 space-y-6 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <Label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Post Title</Label>
                      <Input value={blogForm.title} onChange={e => setBlogForm({ ...blogForm, title: e.target.value })} placeholder="Enter a catchy title..." className="h-12 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-[#9f0202] text-base font-bold" />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Short Description</Label>
                      <Textarea value={blogForm.description} onChange={e => setBlogForm({ ...blogForm, description: e.target.value })} placeholder="A brief summary..." className="rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-[#9f0202] min-h-[80px] text-sm" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-1.5">
                         <Label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Category</Label>
                         <select value={blogForm.category} onChange={e => setBlogForm({ ...blogForm, category: e.target.value })} className="w-full h-10 rounded-lg bg-gray-50 border-transparent px-3 text-xs font-medium">
                           {["Strategy", "Operations", "Compliance", "Insights", "Finance"].map(c => <option key={c} value={c}>{c}</option>)}
                         </select>
                       </div>
                       <div className="flex items-center gap-4 pt-6 px-1">
                          <label className="flex items-center gap-2 cursor-pointer group">
                             <input type="checkbox" checked={blogForm.is_featured} onChange={e => setBlogForm({ ...blogForm, is_featured: e.target.checked })} className="w-3.5 h-3.5 rounded border-gray-300 text-[#9f0202] focus:ring-[#9f0202]" />
                             <span className="text-[10px] font-bold text-gray-500 group-hover:text-gray-900 transition-colors uppercase tracking-widest">Featured</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer group">
                             <input type="checkbox" checked={blogForm.is_published} onChange={e => setBlogForm({ ...blogForm, is_published: e.target.checked })} className="w-3.5 h-3.5 rounded border-gray-300 text-[#9f0202] focus:ring-[#9f0202]" />
                             <span className="text-[10px] font-bold text-gray-500 group-hover:text-gray-900 transition-colors uppercase tracking-widest">Published</span>
                          </label>
                       </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Cover Image</Label>
                    <div className="aspect-[16/10] bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center overflow-hidden relative group">
                      {blogForm.image_url ? (
                        <>
                          <Image src={blogForm.image_url} alt="Preview" width={400} height={250} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                            <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black rounded-full h-8 text-xs px-4" onClick={() => document.getElementById('blog-upload').click()}>Change Image</Button>
                          </div>
                        </>
                      ) : (
                        <button onClick={() => document.getElementById('blog-upload').click()} className="flex flex-col items-center gap-2 text-gray-400 hover:text-[#9f0202] transition-colors">
                          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm"><Upload size={20} /></div>
                          <span className="text-[10px] font-bold uppercase tracking-widest">Upload Banner</span>
                        </button>
                      )}
                      <input id="blog-upload" type="file" className="hidden" onChange={e => handleFileUpload(e, 'blog')} accept="image/*" />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Post Content (HTML allowed)</Label>
                  <Textarea value={blogForm.content} onChange={e => setBlogForm({ ...blogForm, content: e.target.value })} placeholder="Write your masterpiece here..." className="rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-[#9f0202] min-h-[300px] font-poppins text-sm leading-relaxed" />
                </div>
                
                <Button onClick={handleSaveBlog} disabled={isSaving} className="w-full h-12 bg-[#9f0202] hover:bg-[#7a0101] text-white font-bold rounded-xl text-base shadow-lg shadow-[#9f0202]/10">
                  {isSaving ? (
                    <>
                      <Loader2 className="animate-spin mr-2" size={18} />
                      {editingId ? "Updating..." : "Publishing..."}
                    </>
                  ) : (
                    editingId ? "Update Published Post" : "Publish to Thought Leadership"
                  )}
                </Button>
              </div>
            </div>
          )}

          {activeTab === "blogs" && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Manage Insights</h2>
                <Button onClick={() => { setEditingId(null); setBlogForm({ title: "", description: "", content: "", category: "Strategy", image_url: "", is_published: true, is_featured: false }); setActiveTab("add-blog"); }} variant="outline" className="border-[#9f0202] text-[#9f0202] hover:bg-[#9f0202] hover:text-white rounded-xl px-6 font-bold">
                  <Plus className="mr-2" size={18} /> New Post
                </Button>
              </div>

              {isLoadingLeads ? (
                <div className="flex items-center justify-center py-20"><Loader2 className="animate-spin text-[#9f0202]" /></div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {blogs.map(blog => (
                    <div key={blog.id} className="bg-white rounded-[2rem] border border-gray-100 p-6 space-y-4 group">
                      <div className="h-40 bg-gray-100 rounded-2xl overflow-hidden relative">
                        {blog.image_url && <Image src={blog.image_url} alt={blog.title} width={400} height={160} className="w-full h-full object-cover" />}
                        <div className="absolute top-3 left-3 flex gap-2">
                          <div className="px-3 py-1 bg-white/90 backdrop-blur rounded-full text-[8px] font-black text-[#9f0202] uppercase tracking-widest">{blog.category}</div>
                          {blog.is_featured && <div className="px-3 py-1 bg-yellow-400 text-black rounded-full text-[8px] font-black uppercase tracking-widest">★ Featured</div>}
                          {!blog.is_published && <div className="px-3 py-1 bg-gray-500 text-white rounded-full text-[8px] font-black uppercase tracking-widest">Draft</div>}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-bold text-gray-900 line-clamp-1">{blog.title}</h4>
                        <p className="text-xs text-gray-400 line-clamp-2">{blog.description}</p>
                      </div>
                      <div className="pt-4 flex gap-2 border-t border-gray-50">
                        <Button onClick={() => handleEditBlog(blog)} className="flex-1 bg-gray-50 hover:bg-[#9f0202] hover:text-white text-gray-600 rounded-xl font-bold transition-all"><Edit2 size={16} className="mr-2" /> Edit</Button>
                        <Button onClick={() => handleDeleteBlog(blog.id)} className="bg-red-50 hover:bg-red-500 hover:text-white text-red-500 rounded-xl font-bold transition-all"><Trash2 size={16} /></Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "leads" && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <h2 className="text-2xl font-bold text-gray-900">Captured Leads</h2>
                <div className="flex flex-1 max-w-2xl gap-3 w-full">
                   <div className="relative flex-1">
                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                     <Input 
                        placeholder="Search by name, email or company..." 
                        value={leadSearch}
                        onChange={(e) => setLeadSearch(e.target.value)}
                        className="pl-10 h-10 rounded-xl bg-white border-gray-200 text-xs"
                     />
                   </div>
                   <select 
                      value={leadFilter}
                      onChange={(e) => setLeadFilter(e.target.value)}
                      className="h-10 rounded-xl bg-white border-gray-200 px-4 text-xs font-bold text-gray-500 outline-none focus:ring-1 focus:ring-[#9f0202]/20"
                   >
                      <option value="all">All Activities</option>
                      <option value="Survey">Survey Assessments</option>
                      <option value="Resource">Knowledge Repo</option>
                   </select>
                </div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{filteredLeads.length} Leads</span>
              </div>

              <div className="bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50/50 border-b border-gray-50 text-[9px] font-black text-gray-400 uppercase tracking-widest">
                      <tr>
                        <th className="px-6 py-5 text-center w-12">#</th>
                        <th className="px-8 py-5">User Details</th>
                        <th className="px-8 py-5">Contact Info</th>
                        <th className="px-8 py-5">Activity / Purpose</th>
                        <th className="px-8 py-5 text-center">Report / File</th>
                        <th className="px-8 py-5 text-right">Timestamp</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {filteredLeads.map((lead, index) => (
                        <tr key={lead.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-6 py-6 text-center text-[10px] font-bold text-gray-300">
                            {index + 1}
                          </td>
                          <td className="px-8 py-6">
                            <div className="font-bold text-gray-900">{lead.name}</div>
                            {lead.metadata?.company && <div className="text-[10px] text-gray-400 font-medium">{lead.metadata.company}</div>}
                          </td>
                          <td className="px-8 py-6">
                            <div className="font-bold text-gray-800 text-xs">{lead.email}</div>
                            <div className="text-[10px] text-gray-400 font-medium mt-0.5">{lead.company_name || "N/A"}</div>
                          </td>
                          <td className="px-8 py-6">
                            <div className="font-bold text-gray-900 text-xs">{lead.activity_title || "Untitled Activity"}</div>
                            <div className="text-[10px] text-[#9f0202] font-black uppercase tracking-widest mt-1 opacity-70">{lead.activity_type}</div>
                          </td>
                          <td className="px-8 py-6 text-center">
                            {lead.report_url ? (
                              <a 
                                href={lead.report_url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-600 rounded-lg text-[10px] font-bold hover:bg-green-100 transition-all"
                              >
                                <Download size={12} /> View Report
                              </a>
                            ) : lead.metadata?.source === 'Knowledge Repository' ? (
                              <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest italic">Digital Resource</span>
                            ) : (
                              <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest italic">No File</span>
                            )}
                          </td>
                          <td className="px-8 py-6 text-right">
                            <div className="text-[11px] font-bold text-gray-900">{new Date(lead.created_at).toLocaleDateString()}</div>
                            <div className="text-[9px] text-gray-400 font-medium">{new Date(lead.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {leads.length === 0 && (
                  <div className="py-20 text-center space-y-4">
                     <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300"><Users size={24} /></div>
                     <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">No leads captured yet</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
