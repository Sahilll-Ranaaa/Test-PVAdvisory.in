"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const items = [
  {
    title: "Our Vision",
    subTitle: "Lorem Ipsum",
    description:
      "To be a preferred and trusted change implementation partner by 2030, recognized for quality and customer delight, and to be a great place to work where people matter.",
  },
  {
    title: "Our Mission",
    subTitle: "Lorem Ipsum",
    description:
      "To experience the joy of passionately contributing and making a difference to our clients’ businesses and thereby, adding value to our business.",
  },
];
export default function OurMissionOurGoal() {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  return (
    <section className="bg-gray-100 p-10">
      <div className="max-w-screen-lg mx-auto flex flex-col md:flex-row justify-between gap-6">
        {items.map((item) => (
          <motion.div
            key={item.title}
            className="space-y-2 p-4 rounded-lg bg-gray-200 flex-1"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            variants={fadeUpVariants}
          >
            <Image
              src={"/quote-left-svgrepo-com.svg"}
              alt={"quote"}
              width={400}
              height={400}
              className="w-20 h-20 object-contain text-app fill-app"
              priority
            />
            <h2 className="text-xl font-semibold">{item.title}</h2>
            <p className="text-gray-600">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
