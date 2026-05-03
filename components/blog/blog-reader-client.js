"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { BLOGS } from "@/lib/blog-data";
import { getCustomBlogs } from "@/lib/admin-store";
import BlogPostContent from "@/components/blog/blog-post-content";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Loader2 } from "lucide-react";

export default function BlogReaderClient() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const staticBlog = BLOGS.find(b => b.id.toString() === id);
    if (staticBlog) {
      setBlog(staticBlog);
      setLoading(false);
      return;
    }

    const localBlogs = getCustomBlogs();
    const localBlog = localBlogs.find(b => b.id.toString() === id);
    if (localBlog) {
      setBlog(localBlog);
    }
    
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-[#9f0202]" size={32} />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <MaxWidthWrapper className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Post not found.</h1>
          <p className="text-gray-500 mt-2">The article you are looking for may have been removed or moved.</p>
        </MaxWidthWrapper>
      </div>
    );
  }

  return <BlogPostContent blog={blog} />;
}
