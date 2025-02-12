import { cn } from "@/lib/utils";
import Image from "next/image";

const items = [
  {
    title: "Diagnosis",
    description:
      "To be able to provide an effective solution, it is imperative to diagnose the problem, understand where we are and where we want to be.",
  },
  {
    title: "Design",
    description:
      "We collaborate with your key personnel and teams to design the implementation plan aligned to your goals. Involvement of your teams is crucial to this process as it leads to greater buy-in from the people who will eventually drive this change.",
  },
  {
    title: "Implement",
    description:
      "This phase is equally critical as the design phase. Once the design and timelines are agreed, we partner in the execution of the plan.",
  },
  {
    title: "Measure",
    description:
      "We constantly monitor the effectiveness of the change initiative and report the deviations and causes to the management.",
  },
];

export default function OurMethodologySection() {
  return (
    <section className="p-10">
      <div className="max-w-screen-lg mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full mx-auto">
          <div
            className="col-span-1 md:col-span-2 lg:col-span-4 p-10 relative "
            style={{
              backgroundImage: "url(/about-our-methodology-section.webp)",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <div className="md:w-2/5 h-full bg-app p-6 text-white space-y-4">
              <h2 className="capitalize text-3xl">Our Methodology - DDIM</h2>
              <p className="text-gray-100">
                At each stage, we collaborate with your teams to ensure that the
                objectives of the intervention are clearly understood and
                successfully implemented.
              </p>
            </div>
          </div>
          {items.map((item, idx) => (
            <div
              key={item.title}
              className={cn(
                "h-[300px] p-6 space-y-3",
                idx % 2 === 0
                  ? "bg-gray-100 hover:bg-gray-50"
                  : "bg-gray-300 hover:bg-gray-200"
              )}
            >
              <h3 className="text-xl text-app font-semibold">{item.title}</h3>
              <p className="text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
