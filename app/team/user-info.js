"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CircleAlert, X } from "lucide-react";

import { cn } from "@/lib/utils";
import Image from "next/image";

export default function UserInfo({ info, modalSize = "lg", btnClassName }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setIsOpen(true)} className={btnClassName}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <path
            fill="#646262"
            d="M12.3 7.29c.2-.18.44-.29.7-.29c.27 0 .5.11.71.29c.19.21.29.45.29.71c0 .27-.1.5-.29.71c-.21.19-.44.29-.71.29c-.26 0-.5-.1-.7-.29c-.19-.21-.3-.44-.3-.71c0-.26.11-.5.3-.71m-2.5 4.68s2.17-1.72 2.96-1.79c.74-.06.59.79.52 1.23l-.01.06c-.14.53-.31 1.17-.48 1.78c-.38 1.39-.75 2.75-.66 3c.1.34.72-.09 1.17-.39c.06-.04.11-.08.16-.11c0 0 .08-.08.16.03c.02.03.04.06.06.08c.09.14.14.19.02.27l-.04.02c-.22.15-1.16.81-1.54 1.05c-.41.27-1.98 1.17-1.74-.58c.21-1.23.49-2.29.71-3.12c.41-1.5.59-2.18-.33-1.59c-.37.22-.59.36-.72.45c-.11.08-.12.08-.19-.05l-.03-.06l-.05-.08c-.07-.1-.07-.11.03-.2M22 12c0 5.5-4.5 10-10 10S2 17.5 2 12S6.5 2 12 2s10 4.5 10 10m-2 0c0-4.42-3.58-8-8-8s-8 3.58-8 8s3.58 8 8 8s8-3.58 8-8"
          ></path>
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 flex cursor-pointer items-center justify-center overflow-y-auto bg-slate-900/20 p-8 backdrop-blur"
          >
            <motion.div
              initial={{ scale: 0, rotate: "180deg" }}
              animate={{
                scale: 1,
                rotate: "0deg",
                transition: {
                  type: "spring",
                  bounce: 0.25,
                },
              }}
              exit={{ scale: 0, rotate: "180deg" }}
              onClick={(e) => e.stopPropagation()}
              className={cn(
                "relative w-full max-w-lg cursor-default overflow-hidden rounded-xl bg-gradient-to-r bg-white shadow-2xl",
                {
                  "max-w-sm": modalSize === "sm",
                }
              )}
            >
              <div className="relative flex flex-col gap-3 p-6 max-h-[80vh] overflow-auto">
                <button
                  className="absolute right-3 top-3"
                  onClick={() => setIsOpen(false)}
                >
                  <X strokeWidth={0.5} />
                </button>
                <h3
                  className={cn("text-center text-3xl font-bold", {
                    "text-2xl": modalSize === "sm",
                  })}
                >
                  {info.name}
                </h3>
                <ul className="list-disc space-y-2 px-3">
                  {info.longDescription.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
                {/* <div className="flex gap-2">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-full rounded bg-transparent py-2 font-semibold  transition-colors hover:bg-white/30"
                  >
                    Close!
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-full rounded bg-white py-2 font-semibold text-indigo-600 transition-opacity hover:opacity-80"
                  >
                    Understood!
                  </button>
                </div> */}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
