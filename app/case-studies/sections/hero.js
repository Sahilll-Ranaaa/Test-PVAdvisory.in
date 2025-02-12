import BlurIn from "@/components/text-animations/blur-in";
import { FadeText } from "@/components/text-animations/fade-text";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative">
      <Image
        src={"/case-studies-hero.png"}
        alt={"slide"}
        width={2000}
        height={1500}
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        priority
      />
      <div className="max-w-screen-lg mx-auto ">
        <div className="max-w-sm mr-auto bg-app pl-10 pr-5 pt-20 pb-10 h-[90vh] my-auto space-y-3 flex flex-col justify-center">
          <BlurIn
            className="md:text-5xl font-bold text-white text-left"
            word="Case&nbsp;&nbsp; Studies"
            duration={0.5}
          ></BlurIn>

          <FadeText
            direction="up"
            duration={0.5}
            className="text-white text-sm"
            text="Turning Challenges into Opportunities"
          ></FadeText>
        </div>
      </div>
    </section>
  );
}
