import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import AutoScroll from "embla-carousel-auto-scroll";
import Image from "next/image";

const ourClients = [
  {
    id: 1,
    imageUrl: "/clients/max.png",
  },
  {
    id: 2,
    imageUrl: "/clients/Alpha-Square-Partners-Singapore.png",
  },
  {
    id: 3,
    imageUrl: "/clients/Aten-Capital-Private-Limited.png",
  },
  {
    id: 4,
    imageUrl: "/clients/Ernst-Young.png",
  },
  {
    id: 5,
    imageUrl: "/clients/HealthMap-Diagnostics.png",
  },
  {
    id: 6,
    imageUrl: "/clients/isb.png",
  },
  {
    id: 7,
    imageUrl: "/clients/Kajrari-1.png",
  },
  {
    id: 8,
    imageUrl: "/clients/Karma_Group.png",
  },
  {
    id: 9,
    imageUrl: "/clients/Manipal-Hospitals.png",
  },
  {
    id: 10,
    imageUrl: "/clients/HWH.svg",
  },
  {
    id: 11,
    imageUrl: "/clients/moon-beverages.png",
    className: "scale-[1.6] hover:scale-[1.7]",
  },
  {
    id: 12,
    imageUrl: "/clients/Ramit-Pal-Singh-and-Associates.png",
  },
  {
    id: 13,
    imageUrl: "/clients/scg.png",
  },
  {
    id: 14,
    imageUrl: "/clients/Veolia.png",
    className: "scale-110 hover:scale-125",
  },
  {
    id: 15,
    imageUrl: "/clients/Bitopi_group.png",
  },
  {
    id: 16,
    imageUrl: "/clients/CIC.png",
  },
  {
    id: 25,
    imageUrl: "/clients/vps-lakeshore-hospital-logo.png",
    className: "scale-[1.2] hover:scale-[1.3]",
  },
  {
    id: 17,
    imageUrl: "/clients/AIRIA.png",
  },
  {
    id: 18,
    imageUrl: "/clients/aster.png",
    className: "scale-75 hover:scale-100",
  },
  {
    id: 19,
    imageUrl: "/clients/Aten-Capital-Private-Limited.png",
  },
  {
    id: 20,
    imageUrl: "/clients/hfs.png",
  },
  {
    id: 21,
    imageUrl: "/clients/autometers.png",
    className: "scale-[0.7] hover:scale-[0.8]",
  },
  {
    id: 22,
    imageUrl: "/clients/comviva.png",
  },
  {
    id: 23,
    imageUrl: "/clients/chakiat.png",
    className: "scale-[1.7] hover:scale-[1.8]",
  },
  {
    id: 24,
    imageUrl: "/clients/ghm.png",
  },
  {
    id: 25,
    imageUrl: "/clients/The capital.png",
    className: "scale-[1.4] hover:scale-[1.5]",
  },
];

export default function ClientsSection() {
  return (
    <section className="bg-gray-100">
      <div className="mx-auto py-3 max-w-screen-lg">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-gray-100 to-transparent pointer-events-none z-10"></div>
          <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-gray-100 to-transparent pointer-events-none z-10"></div>

          <Carousel
            opts={{
              loop: true,
              slidesToScroll: "auto",
              align: "center",
            }}
            plugins={[
              AutoScroll({
                playOnInit: true,
                stopOnMouseEnter: true,
                stopOnInteraction: false,
                speed: 0.8,
              }),
            ]}
            className="mx-auto"
          >
            <CarouselContent>
              {ourClients.map((client) => (
                <CarouselItem
                  key={client.id}
                  className="basis-[35%] sm:basis-[30%] md:basis-[20%] lg:basis-[15%]"
                >
                  <div
                    className={cn(
                      "relative w-24 h-24 hover:scale-125 transition-all",
                      client?.className
                    )}
                  >
                    <Image
                      src={client.imageUrl}
                      alt="logo"
                      className="object-contain"
                      fill
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
