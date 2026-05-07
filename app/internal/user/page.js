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
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingLeads, setIsLoadingLeads] = useState(true);
  
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
      alert(editingId ? "Post updated!" : "Post published!");
    } catch (err) {
      console.error("Save blog failed:", err);
      alert("Error saving blog: " + err.message);
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
    <div className="flex h-screen bg-[#fafafa]">
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
      <main className="flex-1 overflow-y-auto p-12">
        <div className="max-w-6xl mx-auto">
          {activeTab === "dashboard" && (
            <div className="space-y-12">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Welcome back, Admin</h1>
                  <p className="text-gray-400 font-medium">Here&apos;s what&apos;s happening with your platform.</p>
                </div>
                <div className="flex gap-4">
                  <Button onClick={() => { setEditingId(null); setBlogForm({ title: "", description: "", content: "", category: "Strategy", image_url: "", is_published: true, is_featured: false }); setActiveTab("add-blog"); }} className="bg-[#9f0202] hover:bg-[#7a0101] text-white rounded-xl px-6 font-bold shadow-lg shadow-[#9f0202]/10">
                    <Plus className="mr-2" size={18} /> Create Post
                  </Button>
                </div>
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
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-4">
                <button onClick={() => setActiveTab("blogs")} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-all">
                  <ChevronLeft size={20} />
                </button>
                <h2 className="text-2xl font-bold text-gray-900">{editingId ? "Edit Blog Post" : "Create New Post"}</h2>
              </div>

              <div className="bg-white rounded-[2.5rem] border border-gray-100 p-10 space-y-8 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Post Title</Label>
                      <Input value={blogForm.title} onChange={e => setBlogForm({ ...blogForm, title: e.target.value })} placeholder="Enter a catchy title..." className="h-14 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-[#9f0202] text-lg font-bold" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Short Description</Label>
                      <Textarea value={blogForm.description} onChange={e => setBlogForm({ ...blogForm, description: e.target.value })} placeholder="A brief summary for the card..." className="rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-[#9f0202] min-h-[100px]" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-2">
                         <Label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Category</Label>
                         <select value={blogForm.category} onChange={e => setBlogForm({ ...blogForm, category: e.target.value })} className="w-full h-12 rounded-xl bg-gray-50 border-transparent px-4 text-sm font-medium">
                           {["Strategy", "Operations", "Compliance", "Insights", "Finance"].map(c => <option key={c} value={c}>{c}</option>)}
                         </select>
                       </div>
                       <div className="flex items-center gap-6 pt-8 px-2">
                          <label className="flex items-center gap-2 cursor-pointer group">
                             <input type="checkbox" checked={blogForm.is_featured} onChange={e => setBlogForm({ ...blogForm, is_featured: e.target.checked })} className="w-4 h-4 rounded border-gray-300 text-[#9f0202] focus:ring-[#9f0202]" />
                             <span className="text-xs font-bold text-gray-500 group-hover:text-gray-900 transition-colors uppercase tracking-widest">Featured</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer group">
                             <input type="checkbox" checked={blogForm.is_published} onChange={e => setBlogForm({ ...blogForm, is_published: e.target.checked })} className="w-4 h-4 rounded border-gray-300 text-[#9f0202] focus:ring-[#9f0202]" />
                             <span className="text-xs font-bold text-gray-500 group-hover:text-gray-900 transition-colors uppercase tracking-widest">Published</span>
                          </label>
                       </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Cover Image</Label>
                    <div className="aspect-[16/10] bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center overflow-hidden relative group">
                      {blogForm.image_url ? (
                        <>
                          <Image src={blogForm.image_url} alt="Preview" width={400} height={250} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                            <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black rounded-full px-6" onClick={() => document.getElementById('blog-upload').click()}>Change Image</Button>
                          </div>
                        </>
                      ) : (
                        <button onClick={() => document.getElementById('blog-upload').click()} className="flex flex-col items-center gap-3 text-gray-400 hover:text-[#9f0202] transition-colors">
                          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm"><Upload size={24} /></div>
                          <span className="text-xs font-bold uppercase tracking-widest">Upload Banner</span>
                        </button>
                      )}
                      <input id="blog-upload" type="file" className="hidden" onChange={e => handleFileUpload(e, 'blog')} accept="image/*" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Post Content (HTML allowed)</Label>
                  <Textarea value={blogForm.content} onChange={e => setBlogForm({ ...blogForm, content: e.target.value })} placeholder="Write your masterpiece here..." className="rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-[#9f0202] min-h-[400px] font-mono text-sm" />
                </div>
                
                <Button onClick={handleSaveBlog} className="w-full h-14 bg-[#9f0202] hover:bg-[#7a0101] text-white font-bold rounded-2xl text-lg shadow-xl shadow-[#9f0202]/10">
                  {editingId ? "Update Published Post" : "Publish to Thought Leadership"}
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
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Captured Leads</h2>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{leads.length} Total Leads</span>
              </div>

              <div className="bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50/50 border-b border-gray-50">
                      <tr>
                        <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Name \u0026 Company</th>
                        <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Email \u0026 Mobile</th>
                        <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Resource \u0026 Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {leads.map(lead => (
                        <tr key={lead.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-8 py-6">
                            <div className="font-bold text-gray-900">{lead.full_name || lead.name}</div>
                            <div className="text-[11px] text-gray-400 font-medium">{lead.company} &bull; {lead.job_title}</div>
                          </td>
                          <td className="px-8 py-6">
                            <div className="font-bold text-gray-900">{lead.email}</div>
                            <div className="text-[11px] text-gray-400 font-medium">{lead.mobile}</div>
                          </td>
                          <td className="px-8 py-6">
                            <div className="font-bold text-[#9f0202]">{lead.resource_title || lead.resourceTitle || "Survey Completed"}</div>
                            <div className="text-[11px] text-gray-400 font-medium">{new Date(lead.created_at || lead.timestamp).toLocaleDateString()}</div>
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
