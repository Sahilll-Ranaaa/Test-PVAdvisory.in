import { cn } from "@/lib/utils";
import Image from "next/image";

const projects = [
  {
    title: "Managed Services",
    image: "/projects/project-section-tile-1.webp",
    subTitle:
      "Revolutionizing Accounting: Managing $500M+ Finances for Manufacturing Giant",
    description:
      "Handled the entire accounting process for a major manufacturing organization, streamlining financial reporting and ensuring secretarial compliance, enhancing operational accuracy and governance.",
  },
  {
    title: "Finance Function Effectiveness",
    image: "/projects/project-section-tile-2.webp",
    subTitle: "Boosted Finance Efficiency: Reduced Costs Across Core Processes",
    description:
      "Engaged to redesign and document finance workflows, identified process inefficiencies, and delivered an actionable implementation plan that significantly cut finance operational costs.",
  },

  {
    title: "Virtual CFO",
    image: "/projects/project-section-tile-3.webp",

    subTitle:
      "Dual-Nation CFO Excellence: Enabled Tax-Smart Operations in Singapore & India",
    description:
      "Implemented robust forecasting, planning, and treasury management for a mid-sized firm, optimizing tax structures under the Double Taxation Avoidance Agreement and leveraging Special Economic Zone benefits.",
  },

  {
    title: "Development of Compliance Tracking Tool",
    image: "/projects/project-section-tile-4.webp",
    subTitle: "Comp-ally: 100% Compliance Tracked with Automated Alerts",
    description: [
      "Developed and implemented Comp-ally, an automated compliance-tracking tool. It eliminated manual monitoring by generating real-time compliance reports, sending automated alerts, and consolidating data for leadership.",
      "Result: 30% reduction in compliance breaches and improved regulatory adherence.",
    ],
  },
  {
    title: "Designing and Implementation of P2P tool",
    image: "/projects/project-section-tile-5.webp",
    subTitle: "Pay-ally P2P Tool: 40% Cost Savings in Procurement Processes",
    description:
      "Deployed Pay-ally, a SaaS-based P2P tool that automated requisitions, vendor selection, orders, and payments. Integrated with existing systems, it enhanced visibility and reduced procurement cycle times by 50%, driving measurable cost savings.",
  },
  {
    title: "Customized CRM",
    image: "/projects/project-section-tile-6.webp",
    subTitle:
      "Custom CRM Boosts Funnel Management & Customer Acquisition by 25%",
    description:
      "Designed a tailor-made CRM to streamline customer onboarding, contract creation, and funnel management. Integrated with existing systems, it improved customer profiling and visibility, resulting in a 25% increase in customer acquisition efficiency.",
  },
  {
    title: "Automation of Cash Application Process",
    image: "/projects/project-section-tile-7.webp",
    subTitle: "Automated Cash Application: Reduced AR Cycle by 60%",
    description:
      "Automated the cash application process by eliminating manual effort through interface creation. Optimized receipt matching and receivables accounting, improving accuracy and accelerating cash flow turnaround by 60%.",
  },
  {
    title: "Data Analytics",
    image: "/projects/project-section-tile-8.webp",
    subTitle: "Real-Time Decisions with Data Dashboards: 25% Faster Insights",
    description:
      "Built a customized analytics dashboard for centralized KPI monitoring and trend analysis. Provided real-time insights to drive business growth, improving decision-making timelines by 25% and aligning operations with strategic goals.",
  },
  {
    title: "Setup of Global Capability Centre",
    image: "/projects/project-section-tile-9.webp",
    subTitle: "Global Capability Centre for 150+ Countries: 300+ FTEs Deployed",
    description:
      "Setting up a Global Capability Centre (GCC) for a leading global accounting firm in India. Expected to employ 300+ FTEs, the GCC supports operations across 150+ countries, enhancing scalability and service efficiency globally.",
  },
  {
    title: "F&A Shared Services Centre",
    image: "/projects/project-section-tile-10.webp",
    subTitle: "Finance SSC Delivers 30% Efficiency Gains for MNC",
    description:
      "Established a Finance & Accounts Shared Services Centre in India for a multinational corporation, employing 150+ FTEs. Standardized processes reduced overhead costs and improved financial service delivery efficiency by 30%.",
  },
  {
    title: "SaaS - Procure to Pay",
    image: "/projects/project-section-tile-11.webp",
    subTitle: "SaaS-Based P2P Revolution: Supporting Indonesia & Vietnam",
    description:
      "Conceptualized and implemented a SaaS-based P2P solution, providing end-to-end procurement and payment support for businesses in Indonesia and Vietnam, seamlessly managed from India. Enhanced accuracy, reduced turnaround time, and drove regional process efficiency.",
  },
  {
    title: "Project: Start-up Solution",
    image: "/projects/project-section-tile-12.webp",
    subTitle:
      "From Incorporation to CFO Services: Start-Up Success Built from Day 1",
    description:
      "Guided a start-up through legal entity selection, seamless company incorporation, and ongoing Virtual CFO services. Delivered structured financial planning and strategic support to accelerate growth and investor readiness.",
  },
];

export default function Projects() {
  return (
    <section className="pt-10">
      <div className=" mx-auto flex flex-col">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className={cn(
              "flex",
              idx % 2 === 0 ? "flex-row" : "flex-row-reverse",
              "max-h-72"
            )}
          >
            <div
              className={cn(
                "w-1/2 p-12 space-y-6 bg-gray-100 text-black"
                // idx % 2 === 0 ? "bg-gray-100 text-black" : "bg-app text-white"
              )}
            >
              <div className="space-y-2">
                {/* <h2 className="text-3xl">{project.title}</h2> */}
                <h3 className="text-2xl">{project.subTitle}</h3>
              </div>

              {typeof project.description === "object" &&
              project.description.length ? (
                <div className="space-y-2">
                  {project.description.map((p, index) => (
                    <p key={index} className={cn("text-gray-700", "text-sm")}>
                      {p}
                    </p>
                  ))}
                </div>
              ) : (
                <p className={cn("text-gray-700", "text-sm")}>
                  {project.description}
                </p>
              )}
            </div>
            <div className="w-1/2">
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
