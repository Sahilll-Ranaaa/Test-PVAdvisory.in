import { FadeChild } from "@/components/animate/fade-child";
import { WordsPullUp } from "@/components/text-animations/words-pull-up";
import { cn } from "@/lib/utils";
import Image from "next/image";

const items = [
  {
    id: 1,
    title: "Customer delight",
    description: "Provide more than what customer expects",
    bg: "#cd6a65",
    image:
      "https://pvadvisory.in/wp-content/uploads/2023/02/Customer-feedback-amico-e1676913686472.png",
  },
  {
    id: 2,
    title: "Quality",
    description: "Whatever we do, we do it well",
    bg: "#378c77",
    image:
      "https://pvadvisory.in/wp-content/uploads/2023/02/Product-quality-pana-e1676907784256.png",
  },
  {
    id: 3,
    title: "Passion",
    description: "Commitment and love for our work",
    bg: "#d38135",
    image:
      "https://pvadvisory.in/wp-content/uploads/2023/02/Passionate-rafiki-e1676913559640.png",
  },
  {
    id: 4,
    title: "Integrity",
    description: "Do the right thing",
    bg: "#5a79d6",
    image:
      "https://pvadvisory.in/wp-content/uploads/2023/02/Software-integration-rafiki-e1676907629791.png",
  },
  {
    id: 5,
    title: "Growth mindset",
    description: "Think and act like an entrepreneur",
    bg: "#8c68c8",
    image:
      "https://pvadvisory.in/wp-content/uploads/2023/02/Holding-the-arrow-rafiki-e1676907319618.png",
  },
  {
    id: 6,
    title: "Teaming",
    description: "Collaborate and help each other",
    bg: "#d46fa9",
    image:
      "https://pvadvisory.in/wp-content/uploads/2023/02/Strategic-consulting-bro-e1676906974399.png",
  },
];

export default function OurValuesSection() {
  return (
    <section className="">
      <div className="space-y-4 flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2">
          <Image
            src="/s2 (2).webp"
            alt="logo"
            width={600}
            height={600}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="space-y-3 mx-auto max-w-lg">
            <h1 className="flex justify-center md:justify-start">
              <WordsPullUp
                text="Our Values"
                className="text-left md:text-4xl text-app"
              />
            </h1>

            <div className="grid grid-cols-2 gap-4">
              {items.map((item, idx) => (
                <FadeChild key={idx} direction="right" delay={0.1 * idx}>
                  <div
                    key={item.id}
                    className={cn("flex-1 p-3 flex gap-3 ")}
                    // style={{ backgroundColor: item.bg }}
                  >
                    <div className="w-2 py-1 text-center bg-app"></div>
                    <div className="space-y-2 flex-1">
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-sm">{item.description}</p>
                    </div>
                  </div>
                </FadeChild>
              ))}
            </div>
          </div>
        </div>
        {/* <h1 className="text-center text-4xl font-bold text-app">Our Values</h1> */}
      </div>
    </section>
  );
}
