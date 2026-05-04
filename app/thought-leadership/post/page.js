import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

const BlogReader = dynamic(() => import("@/components/blog/blog-reader-client"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center text-[#9f0202]">
       <Loader2 className="animate-spin" size={32} />
    </div>
  ),
});

export default function BlogReaderPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center text-[#9f0202]">
        <Loader2 className="animate-spin" size={32} />
      </div>
    }>
      <BlogReader />
    </Suspense>
  );
}
