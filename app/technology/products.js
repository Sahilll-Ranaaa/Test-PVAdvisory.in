import { cn } from "@/lib/utils";
import { ChevronRight, SeparatorVertical } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const products = [
  {
    url: "/p2p.png",
    titleUrl: "/Pay-Ally Logo.png",
    title: "Pay-Ally",
    description: "Procure Smarter, Pay easier",
    titleImageClassName: "-left-4",

    imageClassName: "-top-1.5",
  },
  {
    url: "/compally.png",
    titleUrl: "/Comp-ally Logo.png",
    title: "Comp-Ally",
    description: "A Simple, Cloud-Based Compliance Tracking Software",
    titleImageClassName: "-left-2",

    imageClassName: "-top-1",
  },

  {
    url: "/assets.png",
    titleUrl: "/Fam-Ally Logo.png",
    title: "Fam-Ally",
    description: "Fixed Asset Management, Simplified!",
    titleImageClassName: "-left-4",
    imageClassName: "-top-1",
  },
];

export default function Products({ className }) {
  return (
    <section className="relative mb-8">
      <Image
        src="/tech-project-background.webp"
        alt="slide"
        width={1000}
        height={100}
        className="absolute w-full h-full -z-10 top-0 left-0 object-cover"
      />
      <div className="bg-gradient-to-r from-black to-transparent py-10">
        {/* <h1 className="text-center text-4xl font-bold text-app">Products</h1> */}
        <div className="max-w-screen-lg mx-auto flex flex-col gap-6 lg:gap-0 lg:flex-row items-center justify-between text-white">
          <div className="space-y-6 text-center lg:text-left">
            <div className="space-y-2">
              <h3 className="text-sm">All-in-one Finance suite</h3>
              {/* <h1 className="text-4xl text-app">ThePVHub</h1> */}
              <Image
                src="/logo-pvhub.svg"
                alt="logo"
                width={100}
                height={100}
                className={cn("w-44 relative")}
              />
            </div>

            <p className="max-w-sm">
              Run your entire business effortlessly with ThePVHub’s unified
              fintech solutions, designed to break down silos and maximize
              organizational efficiency.
            </p>
            <Link
              href="https://thepvhub.com"
              target="_blank"
              className="bg-app text-white px-4 py-2 hidden lg:inline-block"
            >
              Explore
            </Link>
          </div>

          <div className="h-[200px] border-l border-gray-400 border-dashed bg-gray-100 hidden lg:block"></div>

          <div className="space-y-2 text-black">
            {products.map((product, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg shadow border max-w-xs p-3 flex items-center justify-between gap-2"
              >
                {/* <Image
                src={product.url}
                alt={product.title}
                width={100}
                height={100}
                className={cn("w-14 h-14 relative", product.imageClassName)}
              /> */}
                <div className="space-y-1 flex-1">
                  <Image
                    src={product.titleUrl}
                    alt="logo"
                    width={100}
                    height={100}
                    className={cn(
                      "h-6 object-contain relative",
                      product.titleImageClassName
                    )}
                  />
                  {/* <h3 className="text-xl text-app">{product.title}</h3> */}
                  <p className="text-sm text-gray-700">{product.description}</p>
                </div>
                <ChevronRight strokeWidth={1.5} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
