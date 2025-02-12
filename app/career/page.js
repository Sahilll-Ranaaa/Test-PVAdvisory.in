import BlurIn from "@/components/text-animations/blur-in";
import { FadeText } from "@/components/text-animations/fade-text";
import Image from "next/image";

export default function Career() {
  return (
    <main className="min-h-screen">
      <section className="relative">
        <Image
          src={"/career-section-hero.webp"}
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
              word="Career"
              duration={0.5}
            ></BlurIn>

            <FadeText
              direction="up"
              duration={0.5}
              className="text-white text-sm"
              text="Join us in shaping the future"
            ></FadeText>
          </div>
        </div>
      </section>
      <section className="text-gray-600">
        <div className="container mx-auto flex px-4 md:px-24 py-8 md:flex-row flex-col items-center">
          <div className="lg:max-w-md lg:w-full md:w-1/2 w-full mb-10 md:mb-0 -mt-16 md:-mt-32">
            <Image
              className="object-cover w-full h-full"
              alt="hero"
              src="/career-description.png"
              width={500}
              height={500}
            />
          </div>
          <div className="lg:flex-grow md:w-1/2 lg:pl-20 md:pl-16 -mt-16 md:-mt-0 flex flex-col md:text-left">
            <h2 className="text-2xl text-app font-medium pt-10 mb-4">
              What we look for?
            </h2>
            <p className="mb-3 leading-relaxed">
              We seek professionals who are passionate and are prepared to live
              our values – people who can help us grow into one of the finest
              professional service organizations in the business world. We hire
              exceptional people with a go-getter attitude and a willingness to
              accept challenges.
            </p>
            <p className="mb-3 leading-relaxed">
              We lay strong emphasis on the right attitude, ability to learn and
              deliver, practical work experience, an agile mind, professional
              commitment and good interpersonal written and oral communication
              skills.
            </p>
            <p className="mb-3 leading-relaxed font-semibold">
              To post your resume, please send an email to{" "}
              <span className="text-maroonDark">careers@pvadvisory.in</span>
            </p>
            <p className="mb-8 leading-relaxed italic">
              Panchavaktra Advisory LLP is an equal opportunity employer and
              hires candidates based on key attributes they possess in line with
              the position applied for. Selection is based solely on merit
              without regard to race, color, religion, age, gender, national
              origin, political affiliation, disability, marital or family
              status or other differences. Candidates are encouraged to put
              forward their candidature without references. Any undue reference
              or pressure on the recruitment team may negatively impact the
              candidature.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
