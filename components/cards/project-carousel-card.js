import { cn } from "@/lib/utils";
import Image from "next/image";
import { useCarousel } from "../ui/carousel";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { BorderBeam } from "../animate/border-beam";

export default function ProjectCard({ id, title, description, className }) {
  // const { api: emblaApi } = useCarousel();
  // const [activeIndex, setActiveIndex] = useState(null);

  // const logSlidesInView = useCallback((emblaApi) => {
  //   const slides = emblaApi.slidesInView();
  //   console.log(slides);
  //   console.log(emblaApi.selectedScrollSnap());
  //   if (slides && slides.length >= 1) setActiveIndex(slides[1]);
  // }, []);

  // useEffect(() => {
  //   if (emblaApi) emblaApi.on("slidesInView", logSlidesInView);
  // }, [emblaApi, logSlidesInView]);

  return (
    <div
      className={cn(
        "relative overflow-hidden flex items-stretch backdrop-blur-0 shadow-md",
        // activeIndex === id ? "bg-gray-200 scale-125" : "scale-75",
        className
      )}
    >
      <BorderBeam />
      <div className="">
        <div className="relative w-[240px] h-full">
          <Image
            src="/e2fd35a8-8b88-486d-9ff1-41a184962e5d.avif"
            alt="PV Logo"
            width={500}
            height={500}
            className="object-cover h-full w-full"
          />
        </div>
      </div>

      <div className="bg-white flex flex-col p-2 space-y-2 border border-l-0 pl-4">
        <h3 className="text-2xl">{title}</h3>
        <p className="font-normal line-clamp-4 text-gray-500">{description}</p>
        <div className="flex-1"></div>
        <button className="text-sm font-normal text-primary flex items-center gap-1">
          Read more
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
