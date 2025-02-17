"use client";

import { motion } from "framer-motion";

const services = [
  {
    url: "/customized.png",
    title: "Customized Application Development",
    description:
      "Tailored software solutions designed to meet your unique business needs with seamless performance and scalability",
    imageClassName: "-left-4",
  },

  {
    url: "/analytics.png",
    title: "Application Support Services",
    description:
      "Ensure seamless performance and reliability with our expert application support services, providing maintenance, monitoring, and issue resolution.",
    imageClassName: "-left-2",
  },
];

export default function Services({ className }) {
  return (
    <section className="py-10 space-y-3">
      <div className="text-center py-2">
        {/* <hr /> */}
        <h1 className="inline-block text-center text-3xl font-bold bg-white text-app relative -top-5 px-3">
          Key Services
        </h1>
      </div>
      <div className="max-w-screen-lg mx-auto flex flex-wrap gap-6 flex-row items-center justify-center">
        {services.map((service, idx) => (
          <motion.div
            key={idx}
            initial="hidden"
            whileHover="visible"
            className="relative bg-white box-border border border-t-2 max-w-[250px] min-h-[320px] p-4 flex flex-col items-start gap-2"
          >
            <motion.div
              variants={{
                hidden: { width: "0px" },
                visible: { width: "250px" },
              }}
              transition={{
                type: "spring",
                duration: 0.5,
                stiffness: 120,
                damping: 20,
              }}
              className="absolute -top-[2px] -left-[0.5px] h-[2px] bg-app"
            ></motion.div>
            <div className="space-y-1 flex-1">
              <motion.h3
                variants={{
                  hidden: { fontSize: "1.5rem" },
                  visible: { fontSize: "1rem" },
                }}
                className="text-app"
              >
                {service.title}
              </motion.h3>
              <motion.p
                variants={{
                  hidden: { display: "none", opacity: 0, scale: 0 },
                  visible: { display: "block", opacity: 1, scale: 1 },
                }}
                transition={{
                  type: "spring",
                  duration: 0.5,
                  stiffness: 120,
                  damping: 20,
                }}
                className="text-sm text-gray-700"
              >
                {service.description}
              </motion.p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
