"use client";

import { useSearchParams } from "next/navigation";
import SurveySection from "../../app/sections/survey-section";

export default function AssessmentClient() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col relative">
      <nav className="w-full p-6 bg-white border-b border-gray-100 flex justify-center items-center shadow-sm z-50">
        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
          Secure Assessment Portal
        </div>
      </nav>

      <div className="flex-1 flex flex-col items-center justify-center py-8 px-4">
        <div className="w-full max-w-4xl flex justify-center">
          <SurveySection preselectedType={type} isStandalone={true} />
        </div>
      </div>

      <footer className="p-6 text-center text-gray-400 text-[10px] uppercase tracking-widest bg-white/50 border-t border-gray-100">
        &copy; 2026 PV Advisory • Confidential Business Health Assessment
      </footer>
    </div>
  );
}
