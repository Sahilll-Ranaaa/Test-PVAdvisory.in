"use client";

import { GradualSpacing } from "@/components/text-animations/gradual-spacing";
import { TextFade } from "@/components/text-animations/text-fade";
import { AnimatePresence } from "framer-motion";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { ArrowDown } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import AnimatedImage from "@/components/animate/animated-image";
import Link from "next/link";

const carouselItems = [
  {
    id: 1,
    image: "/slide1.png",
    title: ["Your Finance", "Transformation Partner"],
    description: {
      text: "We are an implementation consulting firm. In the ever-evolving business landscape, we help you achieve full potential of your strategy and add long-term value to your business.",
    },
    url: "/",
  },
  {
    id: 2,
    image: "/slide2.webp",
    title: ["What do we bring", "to the table?"],
    description: {
      text: "With an overall combined expertise of over 65+ years in diverse industry verticals, we offer services in the space of business restructuring, finance effectiveness, performance improvement, tax and human resources to businesses of all sizes.",
    },
    url: "/",
  },
  {
    id: 3,
    image: "/slide3.webp",
    title: ["Leverage", "Transformation!"],
    description: {
      text: "We understand the importance of execution in your transformation journey. With our approach, we help you:",
      list: [
        "Diagnose obstacles and identify required changes",
        "Design an effective plan that aligns with your goals",
        "Ensure a smooth and measured implementation at all stages",
      ],
    },
    url: "/",
  },
];

export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % carouselItems.length
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  return (
    <section className="w-full relative">
      <AnimatePresence>
        <AnimatedImage
          className="absolute w-full h-full top-0 left-0"
          key={currentImageIndex}
        >
          <Image
            src={carouselItems[currentImageIndex].image}
            alt={carouselItems[currentImageIndex].title}
            width={2000}
            height={1500}
            className="w-full h-full object-cover object-right-top "
          />
        </AnimatedImage>
      </AnimatePresence>
      <div className="max-w-5xl mx-auto h-screen">
        <div className=" h-full max-w-lg relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 10000,
              }),
            ]}
            orientation="vertical"
            className="w-full max-w-5xl backdrop-blur-3xl"
          >
            <CarouselContent className="-mt-0 h-screen">
              {carouselItems.map((item, index) => (
                <CarouselItem key={index} className="">
                  <div className="p-5 md:p-10 h-full flex flex-col justify-center text-white">
                    <div className="flex flex-col justify-center mb-4">
                      {item.title.map((title, index) => (
                        <GradualSpacing
                          key={title}
                          text={title}
                          duration={0.5}
                          className="text-5xl sm:text-5xl md:text-5xl text-center md:text-left"
                          // containerClassName="justify-center md:justify-start space-y-1 md:space-y-0"
                        />
                      ))}
                    </div>
                    <TextFade
                      // className="text-center md:text-left"
                      // className="text-sm md:text-base"
                      direction="up"
                    >
                      <p>{item.description.text}</p>
                    </TextFade>
                    {item.description.list && (
                      <ul className="list-inside list-none">
                        <TextFade className="" direction="up">
                          {item.description.list.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </TextFade>
                      </ul>
                    )}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <Link
            className="absolute bottom-0 left-0 text-white p-3 flex items-center gap-2 text-xs"
            href={"#what-we-do"}
          >
            <ArrowDown size={14} />
            See how we help
          </Link>
        </div>
      </div>
    </section>
  );
}
