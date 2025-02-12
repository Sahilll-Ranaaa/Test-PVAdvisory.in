import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ReadMoreBtn({ link }) {
  return (
    <Link
      href={link}
      className="flex items-center gap-2 text-gray-800 text-sm py-2 px-3 hover:bg-gray-300 rounded-full "
    >
      Read More
      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-app">
        <ArrowRight color="white" size={14} />
      </div>
    </Link>
  );
}
