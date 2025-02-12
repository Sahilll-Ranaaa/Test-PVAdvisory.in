"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function ServicesCard({ title, list, image, className }) {
  return (
    <motion.div
      className="relative w-[250px] min-h-60 overflow-hidden flex items-center justify-center group"
      initial={{ padding: "1rem" }}
      whileHover={{ padding: "0rem" }}
    >
      <Image
        src={image}
        alt="Card Background"
        width={600}
        height={600}
        className="absolute object-cover h-full w-full -z-10"
      />
      <motion.div
        className="bg-white w-full h-full p-5 space-y-4"
        initial={{ background: "#fff" }}
        whileHover={{ background: "#f3f3f2e6" }}
      >
        <h1 className="text-app text-[16px]">{title}</h1>
        <ul className="text-xs list-disc px-4">
          {list.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}
