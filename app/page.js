"use client";

import { cn } from "@/lib/utils";
import HeroSection from "./sections/hero";
import ClientsSection from "./sections/clients";
import AboutSection from "./sections/about";
import WhatWeDoSection from "./sections/what-we-do";
import OurStory from "./sections/our-story";
import RecentProjectsTest from "./sections/case-studies";
import CTA from "./sections/cta";

export default function Home() {
  return (
    <main className={cn("min-h-screen")}>
      <HeroSection />
      <ClientsSection />
      <WhatWeDoSection />
      <CTA />
      <AboutSection />
      <OurStory />
      <RecentProjectsTest />
    </main>
  );
}
