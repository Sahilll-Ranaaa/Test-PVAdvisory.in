import { cn } from "@/lib/utils";
import Image from "next/image";

const items = [
  {
    title: "Standardization of Processes",
    image: "/projects/project-square-1.webp",

    subTitle: "Unified Finance Operations Across 5 Nations",
    description:
      "Standardized finance processes across 8 cities in 5 countries, bringing consistency and efficiency to global operations for a seamless cross-border financial framework.",
  },
  {
    title: "Internal Audits",
    image: "/projects/project-square-2.webp",
    subTitle: "Recovered $1 Million Through Asset Management Overhaul",
    description:
      "Revamped fixed asset management processes, delivering $1 million in savings by optimizing asset disposal strategies and ensuring accurate tracking.",
  },
  {
    title: "Standardization of Processes",
    image: "/projects/project-square-3.webp",

    subTitle: "HR Excellence: From Policies to Performance Management",
    description:
      "Formulated HR policies, developed a comprehensive HR manual, and implemented a performance management system for organizational growth.",
  },
  {
    title: "Virtual CFO",
    image: "/projects/project-square-4.webp",

    subTitle: "Fixed Assets Tagged & Reconciled: QR Codes Bringing Precision",
    description:
      "Verified and reconciled fixed assets, introducing QR code tagging for streamlined tracking and inventory accuracy.",
  },
];

export default function SmallProjects() {
  return (
    <section>
      <div className="grid grid-cols-4">
        {items.map((project, idx) => (
          <div
            key={idx}
            className={cn(
              "grid grid-rows-2"
              // idx % 2 === 0 ? "flex-col" : "flex-col-reverse"
            )}
          >
            <div
              className={cn(
                // "flex-1 h-1/2",
                idx % 2 === 0
                  ? "bg-gray-100 text-black"
                  : "bg-app text-white order-last"
              )}
            >
              <div className="p-6 space-y-6 ">
                <div className="space-y-2">
                  <h3 className="text-2xl">{project.subTitle}</h3>
                </div>

                <p
                  className={cn(
                    idx % 2 === 0 ? "text-gray-700" : "text-gray-300",
                    "text-sm"
                  )}
                >
                  {project.description}
                </p>
              </div>
            </div>
            <div
            // className="flex-1 h-1/2"
            >
              <Image
                src={project.image}
                alt={project.title}
                width={400}
                height={400}
                className="left-0 w-full h-full object-cover"
                priority
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
