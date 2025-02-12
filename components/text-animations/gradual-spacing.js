"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useInView } from "framer-motion";
import * as React from "react";

export function GradualSpacing({
  text = "Gradual Spacing",
  duration = 0.5,
  className,
  containerClassName,
}) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: false });
  return (
    <div
      className={cn(
        "flex justify-start flex-wrap space-x-1",
        containerClassName
      )}
    >
      {text.split(" ").map((word) => (
        <div key={word} className="flex gap-1">
          <AnimatePresence key={word}>
            {word.split("").map((char, i) => (
              <motion.p
                ref={ref}
                key={i}
                initial={{ opacity: 0, x: -18 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                exit="hidden"
                transition={{ duration: duration, delay: i * 0.1 }}
                className={cn(
                  "text-xl text-center sm:text-4xl font-bold tracking-tighter md:text-6xl md:leading-[4rem]",
                  className
                )}
              >
                {char === " " ? <span>&nbsp;</span> : char}
              </motion.p>
            ))}
          </AnimatePresence>
          &nbsp;
        </div>
      ))}
    </div>
  );
}
