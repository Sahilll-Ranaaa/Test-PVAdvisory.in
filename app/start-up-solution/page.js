"use client";

import { ArrowRight, ChevronRight, MoveRight } from "lucide-react";
import Image from "next/image";
import ServicesCard from "./services-card";
import { WordsPullUp } from "@/components/text-animations/words-pull-up";

const items = [
  "Managed Services",
  "Virtual CFO",
  "Financial Planning and Analysis",
  "Facilitate Business Strategy",
  "Analytics",
  "Policies, Processes and Procedures",
  "Due Diligence",
  "Investment Memorandum",
];

export default function StartUpSolution() {
  return (
    <main className="min-h-screen">
      <section className="bg-app space-y-5 p-11 pt-28">
        <div className="max-w-screen-lg mx-auto space-y-9">
          <div className="text-white flex items-center gap-1 text-xs">
            <span>What We Do?</span>
            <ChevronRight className="inline-block h-4 w-4" />
            <span>Start-up Solution</span>
          </div>
          <h1 className="text-6xl font-bold text-white">Start-up Solution</h1>
        </div>
      </section>
      <section className=" py-10">
        <div className="h-full max-w-screen-lg mx-auto flex items-center justify-center direction-reverse gap-8">
          <div className="flex-1 overflow-hidden h-full">
            <Image
              src="/start-up-solution-main-page-description.webp"
              alt="logo"
              width={600}
              height={600}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="text-sm w-1/2 py-10">
            <div className="space-y-2 max-w-lg">
              <p>
                Start-up solutions is an outsourced service that provides
                holistic ecosystem to start-ups and small and medium
                enterprises. It provides specialised services from setting up of
                the businesses to managing their support functions like finance,
                human resources and ongoing compliances. For an entrepreneur,
                managing these non-core activities consumes a lot of time and
                effort which can be invested in their core business.
              </p>
              <p>
                Start-ups and SMEs need a trusted business partner who can
                manage all the non-core functions so that the business owner can
                focus on their core businesses.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="max-w-screen-lg mx-auto py-10 space-y-5">
          <h1>
            <WordsPullUp
              className="text-3xl md:text-4xl font-bold tracking-[-0.02em] text-app dark:text-white md:leading-[5rem]"
              text="Key Services"
            />
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left text-xl px-4">
            <div className="flex flex-col gap-4 relative">
              <Image
                src="/services/start-up-solution-key-service-1.webp"
                alt="Key Service Section Image"
                width={600}
                height={600}
                className="absolute h-full w-full object-cover"
              />
              {items.slice(0, 4).map((item, idx) => (
                <ServicesCard key={idx} title={item} />
              ))}
            </div>
            <div className="flex flex-col gap-4 relative">
              <Image
                src="/services/start-up-solution-key-service-2.webp"
                alt="Key Service Section Image"
                width={600}
                height={600}
                className="absolute h-full w-full object-cover"
              />
              {items.slice(4, 8).map((item, idx) => (
                <ServicesCard key={idx} title={item} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
