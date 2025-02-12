import Image from "next/image";
import { Meteors } from "./backgound/meteors";
import MaxWidthWrapper from "./max-width-wrapper";
import Link from "next/link";

import LinkedIn from "./icons/linkedin";

const whatWeDoLinks = [
  {
    label: "Consulting",
    url: "/consulting",
  },
  {
    label: "Outsourcing",
    url: "/outsourcing",
  },
  {
    label: "Technology",
    url: "/technology",
  },
  {
    label: "Start-up Solutions",
    url: "/start-up-solutions",
  },
];

const quickLinks = [
  // {
  //   label: "Home",
  //   url: "/",
  // },
  // {
  //   label: "What we do?",
  //   url: "#",
  // },
  {
    label: "About Us",
    url: "/about",
  },
  // {
  //   label: "Case Studies",
  //   url: "/case-studies",
  // },
  {
    label: "Our Team",
    url: "/team",
  },
  {
    label: "Careers",
    url: "/career",
  },
  // {
  //   label: "Engage Us",
  //   url: "/engage-us",
  // },
];

const resourcesLinks = [
  {
    label: "Case Studies",
    url: "/case-studies",
  },
  {
    label: "Contact Us",
    url: "/engage-us",
  },
];

export default function Footer() {
  return (
    <div>
      <div className="relative overflow-hidden border-t bg-[#272727] p-6">
        <MaxWidthWrapper>
          <div className="space-y-4">
            <div className="flex flex-col  gap-10 justify-between">
              <div className="space-y-6">
                <div className="relative h-16 w-16 right-3">
                  <Image
                    src="/pv-logo.png"
                    alt="PV Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                {/* <p className="md:max-w-[250px] text-white text-sm font-normal">
                  We are an implementation consulting firm providing
                  comprehensive services in Consulting, Outsourcing, Tech
                  Solutions and Start-up Solutions.
                </p> */}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 md:grid-cols-13 mb-7">
                <div className="space-y-4 md:col-span-3">
                  <h1 className="text-white">Company</h1>
                  <ul className="space-y-3  text-xs">
                    {quickLinks.map(({ label, url }) => (
                      <li key={label}>
                        <Link href={url} className="text-white hover:underline">
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-4 md:col-span-3">
                  <h1 className="text-white">What we do</h1>
                  <ul className="space-y-3   text-xs">
                    {whatWeDoLinks.map(({ label, url }) => (
                      <li key={label}>
                        <Link href={url} className="text-white hover:underline">
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-4 md:col-span-3">
                  <h1 className="text-white">Resources</h1>
                  <ul className="space-y-3   text-xs">
                    {resourcesLinks.map(({ label, url }) => (
                      <li key={label}>
                        <Link href={url} className="text-white hover:underline">
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-4 md:col-span-4">
                  <h1 className="text-white">Engage Us</h1>
                  <ul className="space-y-3 text-xs sm:max-w-[270px]">
                    <li className="flex items-center gap-3 text-sm text-white">
                      <span className="fill-white">
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
                        className="hover:underline"
                      >
                        K9/40, DLF Phase 2, Sector 25, Gurugram, Haryana-122 002
                      </Link>
                    </li>

                    <li className="flex items-center gap-3 text-sm text-white">
                      <span className="fill-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 24 24"
                        >
                          <path d="m16.556 12.906l-.455.453s-1.083 1.076-4.038-1.862s-1.872-4.014-1.872-4.014l.286-.286c.707-.702.774-1.83.157-2.654L9.374 2.86C8.61 1.84 7.135 1.705 6.26 2.575l-1.57 1.56c-.433.432-.723.99-.688 1.61c.09 1.587.808 5 4.812 8.982c4.247 4.222 8.232 4.39 9.861 4.238c.516-.048.964-.31 1.325-.67l1.42-1.412c.96-.953.69-2.588-.538-3.255l-1.91-1.039c-.806-.437-1.787-.309-2.417.317"></path>
                        </svg>
                      </span>
                      <span>
                        <Link
                          href="tel:+919741916444"
                          className="hover:underline"
                        >
                          +91-97419 16444
                        </Link>
                        ,&nbsp;
                        <Link
                          href="tel:+9199899216444"
                          className="hover:underline"
                        >
                          +91-98992 31644
                        </Link>
                      </span>
                    </li>
                    <li className="flex items-center gap-3 text-sm text-white">
                      <span className="fill-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 24 24"
                        >
                          <path
                            // fill="#646262"
                            d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zm8-7.175q.125 0 .263-.038t.262-.112L19.6 8.25q.2-.125.3-.312t.1-.413q0-.5-.425-.75T18.7 6.8L12 11L5.3 6.8q-.45-.275-.875-.012T4 7.525q0 .25.1.438t.3.287l7.075 4.425q.125.075.263.113t.262.037"
                          ></path>
                        </svg>
                      </span>
                      <Link
                        href="mailto:info@pvadvisory.in"
                        className="hover:underline"
                      >
                        info@pvadvisory.in
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="space-y-1">
              {/* <h1 className="text-white">Stay Connected</h1> */}
              <div className="flex gap-3 items-center justify-center">
                <Link
                  href="https://www.linkedin.com/company/panchavaktra-advisory-llp/"
                  target="_blank"
                  className="text-2xl"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#fff"
                      d="M20.47 2H3.53a1.45 1.45 0 0 0-1.47 1.43v17.14A1.45 1.45 0 0 0 3.53 22h16.94a1.45 1.45 0 0 0 1.47-1.43V3.43A1.45 1.45 0 0 0 20.47 2M8.09 18.74h-3v-9h3ZM6.59 8.48a1.56 1.56 0 1 1 0-3.12a1.57 1.57 0 1 1 0 3.12m12.32 10.26h-3v-4.83c0-1.21-.43-2-1.52-2A1.65 1.65 0 0 0 12.85 13a2 2 0 0 0-.1.73v5h-3v-9h3V11a3 3 0 0 1 2.71-1.5c2 0 3.45 1.29 3.45 4.06Z"
                    ></path>
                  </svg>
                </Link>
                <Link
                  href="https://www.facebook.com/panchavaktra/"
                  target="_blank"
                  className="text-xl"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill="#fff"
                      fillRule="evenodd"
                      d="M18.896 0H1.104C.494 0 0 .494 0 1.104v17.792C0 19.506.494 20 1.104 20h9.578v-7.745H8.076V9.237h2.606V7.01c0-2.584 1.578-3.99 3.883-3.99c1.104 0 2.052.082 2.329.119v2.7h-1.598c-1.254 0-1.496.596-1.496 1.47v1.927h2.989l-.39 3.018h-2.6V20h5.097c.61 0 1.104-.494 1.104-1.104V1.104C20 .494 19.506 0 18.896 0"
                    ></path>
                  </svg>
                </Link>
                <Link href="#" className="fill-white text-2xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                  >
                    <path
                      // fill="#646262"
                      d="M17.34 5.46a1.2 1.2 0 1 0 1.2 1.2a1.2 1.2 0 0 0-1.2-1.2m4.6 2.42a7.6 7.6 0 0 0-.46-2.43a4.9 4.9 0 0 0-1.16-1.77a4.7 4.7 0 0 0-1.77-1.15a7.3 7.3 0 0 0-2.43-.47C15.06 2 14.72 2 12 2s-3.06 0-4.12.06a7.3 7.3 0 0 0-2.43.47a4.8 4.8 0 0 0-1.77 1.15a4.7 4.7 0 0 0-1.15 1.77a7.3 7.3 0 0 0-.47 2.43C2 8.94 2 9.28 2 12s0 3.06.06 4.12a7.3 7.3 0 0 0 .47 2.43a4.7 4.7 0 0 0 1.15 1.77a4.8 4.8 0 0 0 1.77 1.15a7.3 7.3 0 0 0 2.43.47C8.94 22 9.28 22 12 22s3.06 0 4.12-.06a7.3 7.3 0 0 0 2.43-.47a4.7 4.7 0 0 0 1.77-1.15a4.85 4.85 0 0 0 1.16-1.77a7.6 7.6 0 0 0 .46-2.43c0-1.06.06-1.4.06-4.12s0-3.06-.06-4.12M20.14 16a5.6 5.6 0 0 1-.34 1.86a3.06 3.06 0 0 1-.75 1.15a3.2 3.2 0 0 1-1.15.75a5.6 5.6 0 0 1-1.86.34c-1 .05-1.37.06-4 .06s-3 0-4-.06a5.7 5.7 0 0 1-1.94-.3a3.3 3.3 0 0 1-1.1-.75a3 3 0 0 1-.74-1.15a5.5 5.5 0 0 1-.4-1.9c0-1-.06-1.37-.06-4s0-3 .06-4a5.5 5.5 0 0 1 .35-1.9A3 3 0 0 1 5 5a3.1 3.1 0 0 1 1.1-.8A5.7 5.7 0 0 1 8 3.86c1 0 1.37-.06 4-.06s3 0 4 .06a5.6 5.6 0 0 1 1.86.34a3.06 3.06 0 0 1 1.19.8a3.1 3.1 0 0 1 .75 1.1a5.6 5.6 0 0 1 .34 1.9c.05 1 .06 1.37.06 4s-.01 3-.06 4M12 6.87A5.13 5.13 0 1 0 17.14 12A5.12 5.12 0 0 0 12 6.87m0 8.46A3.33 3.33 0 1 1 15.33 12A3.33 3.33 0 0 1 12 15.33"
                    ></path>
                  </svg>
                </Link>
              </div>
            </div>
            <div>
              <p className="text-xs font-extralight text-center text-white">
                © 2023 PV Advisory LLP. All Rights Reserved
              </p>
            </div>
          </div>
        </MaxWidthWrapper>

        <Meteors number={20} />
      </div>
      {/* <div className="bg-[#1e1c1c] p-5">
        <MaxWidthWrapper>
          <div>
            <p className="text-xs font-extralight text-center text-white">
              © 2023 PV Advisory LLP. All Rights Reserved
            </p>
          </div>
        </MaxWidthWrapper>
      </div> */}
    </div>
  );
}
