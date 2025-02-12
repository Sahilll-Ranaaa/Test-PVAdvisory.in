import { TextFade } from "@/components/text-animations/text-fade";
import { WordsPullUp } from "@/components/text-animations/words-pull-up";
import Image from "next/image";

export default function WhoWeAreSection() {
  return (
    <section className="py-10">
      <div className="flex justify-center items-center flex-col lg:flex-row gap-8 max-w-screen-lg mx-auto">
        <div className="flex-1">
          <div className="space-y-4 p-10 lg:p-0">
            <h1 className="flex justify-center lg:justify-start">
              <WordsPullUp
                text="Who We Are?"
                className="text-left md:text-4xl text-app"
              />
            </h1>
            <div className="space-y-3 text-sm">
              <TextFade>
                <p>
                  PV Advisory is an implementation consulting firm that stands
                  at the forefront of delivering cutting-edge solutions to
                  clients in India and around the globe. Founded by highly
                  experienced ex-EY senior professionals, the firm boasts a
                  wealth of expertise in providing a comprehensive range of
                  services, including Consulting, Outsourcing, Tech Solutions,
                  and Start-up Solutions.
                </p>
              </TextFade>
              <TextFade>
                <p>
                  PV Advisory sets itself apart with a deep understanding of the
                  business landscape, industry trends, and emerging
                  technologies, enabling it to offer strategic insights and
                  innovative solutions. Our unwavering focus on implementation
                  serves as a unique differentiator, highlighting a commitment
                  to turning ideas into tangible results.
                </p>
              </TextFade>
              <TextFade>
                <p>
                  At PV, excellence is not just a goal but a passion, and client
                  satisfaction is the driving force behind every endeavor. With
                  a dedication to staying at the forefront of industry best
                  practices, PV Advisory is poised to continue making a
                  significant impact in the world of implementation consulting.
                </p>
              </TextFade>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-hidden h-full">
          <Image
            src="/about-us-hero.webp"
            alt="logo"
            width={600}
            height={600}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
