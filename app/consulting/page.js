import { ChevronRight } from "lucide-react";
import Image from "next/image";
import ServicesCard from "./services-card";

const keyServices = [
  {
    title: "Finance Transformation",
    description:
      "Finance Function Effectiveness, Designing of Finance processes, Performance Improvements, Power Apps Automations.",
    image: "/services/consulting-key-service-1.webp",
  },
  {
    title: "Strategic CFO",
    description:
      "Oversight of finance function, Business partnering with CEOs, Culture building, Finance Function Effectiveness, Assistance in Fund Raising, Preparation of Pitch deck & Information Memorandum, Business plan creation",
    image: "/services/consulting-key-service-2.webp",
  },
  {
    title: "Managed Services",
    description:
      "Corporate Secretarial Compliances, Bookkeeping and Accounting Services, Financial Planning & Analysis, Indirect Tax Advisory and Compliances, Business Intelligence and Data Visualization and Analysis",
    image: "/services/consulting-key-service-3.webp",
  },
  {
    title: "Financial Risk Advisory",
    description:
      "Due Diligence Review, Internal Audit, Internal Controls and SOP Implementation",
    image: "/services/consulting-key-service-4.webp",
  },
];

export default function Consulting() {
  return (
    <main className="min-h-screen">
      <section className="bg-app space-y-5 p-11 pt-28">
        <div className="max-w-screen-lg mx-auto space-y-9">
          <div className="text-white flex items-center gap-1 text-xs">
            <span>What We Do?</span>
            <ChevronRight className="inline-block h-4 w-4" />
            <span>Consulting</span>
          </div>
          <h1 className="text-6xl font-bold text-white">Consulting</h1>
        </div>
      </section>
      <section className="">
        <div className="max-w-screen-xl mx-auto p-10 flex flex-col md:flex-row items-center justify-center direction-reverse gap-10">
          <div className="space-y-2 text-sm flex-1">
            <p>
              In today&apos;s dynamic business landscape, it has become
              increasingly crucial for companies to equip themselves with the
              necessary tools and resources to adapt to the ever-changing market
              demands.
            </p>
            <p>
              Consulting services are essential for businesses seeking to
              navigate the complex world of finance while pursuing
              organizational growth and change. These services encompass a range
              of strategic and advisory solutions aimed at optimizing financial
              processes, enhancing operational efficiency, and driving
              sustainable transformation. We bring expertise to help clients
              make informed decisions, manage risk, improve financial
              performance, and adapt to evolving market dynamics. Through a
              combination of financial analysis, technology integration, and
              strategic planning, our services enable companies to stay
              competitive, resilient, and agile in an ever-changing business
              landscape.
            </p>
            <p>
              There is a huge gap in the market between demand and supply of
              implementation services and we have the right mix of passion,
              expertise and self-belief that we can tremendously contribute to
              our customer’s businesses. We have been at the forefront of
              providing services to clients in various industries. Our goal is
              to help organizations streamline their finance functions and
              enhance their overall efficiency and effectiveness.
            </p>
          </div>

          <div className="flex-1 overflow-hidden">
            <Image
              src="/consulting-main-page-description.webp"
              alt="logo"
              width={600}
              height={600}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>
      <section className="p-11 space-y-12">
        <h1 className="text-center text-3xl font-bold text-app">
          Key Services
        </h1>
        <div className="max-w-screen-xl m-auto flex justify-center flex-wrap gap-3 ">
          {keyServices.map((service) => (
            <ServicesCard
              key={service.title}
              title={service.title}
              image={service.image}
              description={service.description}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
