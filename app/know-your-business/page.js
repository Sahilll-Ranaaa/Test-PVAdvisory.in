"use client";

import SurveySection from "@/app/sections/survey-section";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer";

export default function KnowYourBusinessPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-24 pb-12">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-4xl md:text-6xl font-extrabold text-app dark:text-white tracking-tight">
              Know Your <span className="text-[#9f0202]">Business</span>
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              A comprehensive assessment tool to help you understand your business&apos;s financial and operational health.
            </p>
          </div>
          <SurveySection />
        </div>
      </div>
      <Footer />
    </main>
  );
}
