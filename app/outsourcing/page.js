import { ArrowRight, ChevronRight, MoveRight } from "lucide-react";
import Image from "next/image";
import ServicesCard from "./services-card";

const keyServices = [
  {
    title: "Finance & Accounts",
    list: [
      "Procure to Pay",
      "Record to Report",
      "Treasury Management",
      "Reporting",
      "Transactions",
    ],
    image: "/services/outsourcing-key-service-1.webp",
  },
  {
    title: "Assurance",
    list: [
      "Data Organising",
      "Vouching",
      "Number crunching",
      "SOX Compliances",
    ],
    image: "/services/outsourcing-key-service-2.webp",
  },
  {
    title: "Data Analytics",
    list: [
      "Business Intelligence Dashboards",
      "Data Cleansing",
      "Data Migration",
      "Data analytics using Microsoft and other tools",
    ],
    image: "/services/outsourcing-key-service-3.webp",
  },
  {
    title: "Technology",
    list: [
      "Customized Application Development",
      "Application Support Services",
      "Managed IT Services",
      "Software-as-a-Service (SaaS)",
    ],
    image: "/services/outsourcing-key-service-4.webp",
  },
  {
    title: "Other Back-Office Services",
    list: ["Report writing and preparations", "Customer support"],
    image: "/services/outsourcing-key-service-5.webp",
  },
];

export default function Outsourcing() {
  return (
    <main className="min-h-screen">
      <section className="bg-app space-y-5 p-11 pt-28">
        <div className="max-w-screen-lg mx-auto space-y-9">
          <div className="text-white flex items-center gap-1 text-xs">
            <span>What We Do?</span>
            <ChevronRight className="inline-block h-4 w-4" />
            <span>Outsourcing</span>
          </div>
          <h1 className="text-6xl font-bold text-white">Outsourcing</h1>
        </div>
      </section>
      <section className="min-h-[80vh] py-10">
        <div className="h-full max-w-screen-lg p-10 md:p-0 mx-auto flex flex-col md:flex-row items-center justify-center direction-reverse gap-8">
          <div className="flex-1 overflow-hidden h-full">
            <Image
              src="/outsourcing-main-page-description.webp"
              alt="logo"
              width={600}
              height={600}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-1 text-sm">
            <div className="space-y-2">
              <p>
                Outsourcing services is a business practice where a company
                delegates specific tasks or functions to external service
                providers. This strategic approach allows businesses to focus on
                their core competencies while benefiting from the expertise and
                cost-efficiency of specialized service providers. Outsourcing
                can help companies reduce operational costs, improve
                scalability, access global talent, and enhance overall
                efficiency, making it a valuable tool in today&apos;s
                competitive business landscape.
              </p>
              <p>
                We are a renowned global firm specializing in outsourcing
                services. With a strong presence across the world, we offer
                expert solutions in various domains. Our extensive experience
                and diverse team make us a top choice for businesses seeking
                outsourcing partnerships.
              </p>
              <p>
                We are primarily based in India which is a prime destination for
                outsourcing due to its blend of cost-effectiveness and
                high-quality services. Its vast talent pool, technological
                prowess, and English proficiency make it an ideal choice for
                global businesses looking to enhance efficiency and reduce
                operational costs without compromising on excellence.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="p-10 space-y-12">
        <h1 className="text-center text-3xl font-bold text-app">
          Key Services
        </h1>

        <div className="m-auto max-w-screen-lg flex justify-center flex-wrap gap-10">
          {keyServices.map((service, index) => (
            <ServicesCard
              key={index}
              image={service.image}
              title={service.title}
              list={service.list}
            />
          ))}
        </div>
      </section>
      <section></section>
    </main>
  );
}
