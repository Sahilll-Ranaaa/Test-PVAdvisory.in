import { RainbowButton } from "@/components/buttons/rainbow-btn";
import Image from "next/image";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="relative">
      <Image
        src="/home-engage-us-section.jpg"
        alt="slide"
        width={1000}
        height={100}
        className="absolute w-full h-full -z-10 top-0 left-0 object-cover"
      />
      <div className="bg-black bg-opacity-70">
        <div className="max-w-screen-lg mx-auto p-10 space-y-10 text-center">
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-10">
              <h1 className="text-6xl font-extrabold flex-1 text-right text-white">
                Let&apos;s Work
              </h1>
              <h3 className="text-lg text-gray-300 text-left flex-1 flex justify-start">
                <p className="max-w-sm">
                  Is there a business challenge that is bothering you?
                </p>
              </h3>
            </div>
            <div className="flex justify-center items-center gap-10">
              <h3 className="text-lg text-gray-300 text-right flex-1 flex justify-end">
                <p className="max-w-sm">
                  Write to us and we will get back to you with a response soon.
                </p>
              </h3>
              <h2 className="text-6xl font-extrabold flex-1 text-left text-white">
                Together
              </h2>
            </div>
          </div>

          <Link
            className="bg-app hover:bg-app/90 inline-block px-6 py-2 text-lg text-white tracking-wide rounded"
            href="/engage-us"
          >
            Engage Us
          </Link>

          {/* <RainbowButton>Engage Us</RainbowButton> */}
        </div>
      </div>
    </section>
  );
}
