

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

const BlogReader = dynamic(() => import("@/components/blog/blog-reader-client"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="animate-spin text-[#9f0202]" size={32} />
    </div>
  ),
});

export default function BlogReaderPage() {
  return <BlogReader />;
}
