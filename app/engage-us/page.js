import { Send } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";

const EngageUsForm = dynamic(() => import("./engage-us-form"), {
  ssr: false,
});

export default function EngageUs() {
  return (
    <main className="min-h-screen">
      <section className="space-y-5 p-20 pt-28 max-w-screen-lg mx-auto ">
        <h1 className="text-4xl font-extrabold text-center text-app">
          Contact Our Team
        </h1>
        <p className="text-lg text-gray-500 text-center">
          Got any questions about our products or services? We are here to help.
        </p>
        <div className="flex justify-center flex-wrap gap-20 items-center">
          <div className="flex-1 p-4 bg-slate-100 border bg-opacity-50 rounded-lg shadow-md min-w-80 max-w-sm">
            <EngageUsForm />
          </div>
          <div className="flex-1 space-y-7 min-w-72 max-w-sm">
            <div className="space-y-3">
              <div>
                <h2 className="text-lg font-semibold">Chat with us</h2>
                {/* <p className="text-gray-700 text-sm">
                  Speak to our friendly team via live chat
                </p> */}
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-3 text-sm">
                  <Send size={17} />
                  <Link href="mailto:info@pvadvisory.in" className="underline">
                    Shoot us an email
                  </Link>
                </div>
                <div className="flex items-center gap-3 text-sm fill-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    className="text-lg"
                  >
                    <path d="M20.47 2H3.53a1.45 1.45 0 0 0-1.47 1.43v17.14A1.45 1.45 0 0 0 3.53 22h16.94a1.45 1.45 0 0 0 1.47-1.43V3.43A1.45 1.45 0 0 0 20.47 2M8.09 18.74h-3v-9h3ZM6.59 8.48a1.56 1.56 0 1 1 0-3.12a1.57 1.57 0 1 1 0 3.12m12.32 10.26h-3v-4.83c0-1.21-.43-2-1.52-2A1.65 1.65 0 0 0 12.85 13a2 2 0 0 0-.1.73v5h-3v-9h3V11a3 3 0 0 1 2.71-1.5c2 0 3.45 1.29 3.45 4.06Z"></path>
                  </svg>
                  <Link
                    href="https://www.linkedin.com/company/panchavaktra-advisory-llp/"
                    className="underline"
                  >
                    Message us on LinkedIn
                  </Link>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <h2 className="text-lg font-semibold">Contact Us</h2>
                {/* <p className="text-gray-700 text-sm">
                  Call our team Mon-Fri from 8am to 5pm
                </p> */}
              </div>

              <div className="flex items-center gap-3 text-sm">
                <span className="fill-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                  >
                    <path d="m16.556 12.906l-.455.453s-1.083 1.076-4.038-1.862s-1.872-4.014-1.872-4.014l.286-.286c.707-.702.774-1.83.157-2.654L9.374 2.86C8.61 1.84 7.135 1.705 6.26 2.575l-1.57 1.56c-.433.432-.723.99-.688 1.61c.09 1.587.808 5 4.812 8.982c4.247 4.222 8.232 4.39 9.861 4.238c.516-.048.964-.31 1.325-.67l1.42-1.412c.96-.953.69-2.588-.538-3.255l-1.91-1.039c-.806-.437-1.787-.309-2.417.317"></path>
                  </svg>
                </span>
                <Link href="tel:+919741916444" className="underline">
                  +91-97419 16444,
                </Link>
                <Link href="tel:+919899231644" className="underline">
                  +91-98992 31644
                </Link>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <h2 className="text-lg font-semibold">Visit Us</h2>
                {/* <p className="text-gray-700 text-sm">
                  Chat to us in person in our office
                </p> */}
              </div>

              <div className="flex items-center gap-3 text-sm">
                <span className="fill-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2c-4.418 0-8 4.003-8 8.5c0 4.462 2.553 9.312 6.537 11.174a3.45 3.45 0 0 0 2.926 0C17.447 19.812 20 14.962 20 10.5C20 6.003 16.418 2 12 2m0 10a2 2 0 1 0 0-4a2 2 0 0 0 0 4"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </span>
                <Link
                  href="http://maps.google.com/?q=K9/40, DLF Phase 2, Sector 25, Gurugram, Haryana-122 002"
                  className="underline"
                >
                  K9/40, DLF Phase 2, Sector 25, Gurugram, Haryana-122 002
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
