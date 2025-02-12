import ReadMoreBtn from "@/components/buttons/read-more";
import ProjectCard from "@/components/cards/project-carousel-card";
import EmblaCarousel, {
  EmblaCarouselItem,
} from "@/components/embla-carousel/embla-scale-carousel";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const recentProjects = [
  {
    image: "/projects/p1.png",
    title:
      "Revolutionizing Accounting: Managing $500M+ Finances for Manufacturing Giant",
    description:
      "Handled the entire accounting process for a major manufacturing organization, streamlining financial reporting and ensuring secretarial compliance, enhancing operational accuracy and governance.",
  },
  {
    image: "/projects/p2.png",

    title:
      "Dual-Nation CFO Excellence: Enabled Tax-Smart Operations in Singapore & India",
    description:
      "Implemented robust forecasting, planning, and treasury management for a mid-sized firm, optimizing tax structures under the Double Taxation Avoidance Agreement and leveraging Special Economic Zone benefits.",
  },
  {
    image: "/projects/p3.png",
    title: "Pay-ally P2P Tool: 40% Cost Savings in Procurement Processes",
    description:
      "Deployed Pay-ally, a SaaS-based P2P tool that automated requisitions, vendor selection, orders, and payments. Integrated with existing systems, it enhanced visibility and reduced procurement cycle times by 50%, driving measurable cost savings.",
  },
  {
    image: "/projects/p4.webp",
    title: "Automated Cash Application: Reduced AR Cycle by 60%",
    description:
      "Automated the cash application process by eliminating manual effort through interface creation. Optimized receipt matching and receivables accounting, improving accuracy and accelerating cash flow turnaround by 60%.",
  },
];

export default function RecentProjectsTest({ autoplay = true }) {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % recentProjects.length);
  };

  const handlePrev = () => {
    setActive(
      (prev) => (prev - 1 + recentProjects.length) % recentProjects.length
    );
  };

  const isActive = (index) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };
  return (
    <section>
      <div className="max-w-screen-lg mx-auto py-11">
        <h1 className=" text-2xl text-center font-bold tracking-[-0.02em] text-app dark:text-white md:text-4xl md:leading-[5rem]">
          Case Studies
        </h1>
        {/* <p className="text-center text-gray-500 mx-auto text-sm mb-7 max-w-md">
          We measure our success by the success of our clients and strive to
          build long-term relationships based on trust, integrity, and mutual
          growth.
        </p> */}
        <div>
          <div className="max-w-sm md:max-w-4xl mx-auto antialiased font-sans px-4 md:px-8 lg:px-12 py-20">
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-20">
              <div>
                <div className="relative h-80 w-full">
                  <AnimatePresence>
                    {recentProjects.map((project, index) => (
                      <motion.div
                        key={project.title}
                        initial={{
                          opacity: 0,
                          scale: 0.9,
                          z: -100,
                          rotate: randomRotateY(),
                        }}
                        animate={{
                          opacity: isActive(index) ? 1 : 0.7,
                          scale: isActive(index) ? 1 : 0.95,
                          z: isActive(index) ? 0 : -100,
                          rotate: isActive(index) ? 0 : randomRotateY(),
                          zIndex: isActive(index)
                            ? 999
                            : recentProjects.length + 2 - index,
                          y: isActive(index) ? [0, -80, 0] : 0,
                        }}
                        exit={{
                          opacity: 0,
                          scale: 0.9,
                          z: 100,
                          rotate: randomRotateY(),
                        }}
                        transition={{
                          duration: 0.4,
                          ease: "easeInOut",
                        }}
                        className="absolute inset-0 origin-bottom"
                      >
                        <Image
                          src={project.image}
                          alt={project.title}
                          width={500}
                          height={500}
                          draggable={false}
                          className="h-full w-full rounded-3xl object-cover object-center"
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
              <div className="flex justify-between flex-col py-4">
                <motion.div
                  key={active}
                  initial={{
                    y: 20,
                    opacity: 0,
                  }}
                  animate={{
                    y: 0,
                    opacity: 1,
                  }}
                  exit={{
                    y: -20,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                  }}
                >
                  <h3 className="text-2xl font-bold dark:text-white text-gray-800">
                    {recentProjects[active].title}
                  </h3>
                  <motion.p className="text-lg text-gray-500 mt-8 dark:text-neutral-300 line-clamp-4">
                    {recentProjects[active].description
                      .split(" ")
                      .map((word, index) => (
                        <motion.span
                          key={index}
                          initial={{
                            filter: "blur(10px)",
                            opacity: 0,
                            y: 5,
                          }}
                          animate={{
                            filter: "blur(0px)",
                            opacity: 1,
                            y: 0,
                          }}
                          transition={{
                            duration: 0.2,
                            ease: "easeInOut",
                            delay: 0.02 * index,
                          }}
                          className="inline-block"
                        >
                          {word}&nbsp;
                        </motion.span>
                      ))}
                  </motion.p>
                </motion.div>

                <div className="flex gap-4 pt-12 md:pt-0">
                  <button
                    onClick={handlePrev}
                    className="h-7 w-7 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group/button"
                  >
                    <ArrowLeft className="h-5 w-5 text-black dark:text-neutral-400 group-hover/button:rotate-12 transition-transform duration-300" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="h-7 w-7 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group/button"
                  >
                    <ArrowRight className="h-5 w-5 text-black dark:text-neutral-400 group-hover/button:-rotate-12 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <ReadMoreBtn link="/case-studies" />
          </div>
        </div>
      </div>
    </section>
  );
}
