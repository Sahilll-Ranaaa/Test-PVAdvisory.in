import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import UserInfo from "../user-info";
import { FadeChild } from "@/components/animate/fade-child";
import { WordsPullUp } from "@/components/text-animations/words-pull-up";

const items = [
  {
    id: 1,
    image: "/team/kapil-bagadia.jpeg",
    designation: "Country Managing Partner",
    name: "Kapil Bagadia",
    description:
      "Kapil Bagadia, (ex-CFO of EY India) CMP at PV, is a finance veteran with over 25 years of experience in varied Finance & Accounts functions.",
    linkedIn: "Country Managing Partner",
    longDescription: [
      "Following his passion for digital transformation, he has led various initiatives including conceptualizing and creating inhouse ERP, implementation of SAP, automations, dashboards, and MIS.",
      "He has spearheaded various strategic restructuring projects, including the EY and Andersen merger, demerger of Real Estate for value creation, various acquisitions, LLP conversions, GST implementations, and regulatory projects without time/cost overruns.",
      "He has been instrumental in setting up of a ‘Shared Service Centre’ like structure where he centralized all F&A processes, resulting in improved accountability and reduced overheads.",
      "He has been awarded 14 Best CFO accolades during his seven+ years as EY’s CFO, including one by Whitepage International for Asia’s most powerful leaders in Finance 2022.",
    ],
  },
  {
    id: 2,
    image: "/team/sumit-kukreja.png",
    designation: "Founding and Managing Partner",
    name: "Sumit Kukreja",
    description:
      "Sumit Kukreja, (ex-EY India & GDS) founding and managing partner of PV, is a seasoned finance professional with over 15 years of experience in corporate restructuring, corporate finance and performance improvement.",
    linkedIn: "https://www.linkedin.com/in/sumit-kukreja-ab390a9",
    longDescription: [
      "He is currently vCFO to many MSMEs and has been associated with several corporate clients from diverse industries like investment banking, manufacturing, garments, real estate, telecom and consulting.",
      "He has led various restructuring, finance transformation and automations projects along with various sub-functions within finance for one of the big four accounting firms.",
      "Implementation of large corporate restructuring projects, finance transformation, integration of finance functions, and designing finance processes are his areas of expertise.",
      "He holds an honours degree in Economics from Delhi University and MBA in finance.",
    ],
  },
  {
    id: 3,
    image: "/team/namita-arora.jpeg",
    designation: "Associate Consultant",
    name: "Namita Arora",
    description:
      "Namita Arora (ex-EY India) is an associate consultant at PV. She has held various senior management positions and has led various teams in multinational organizations like EY and Birla Group.",
    linkedIn: "",
    longDescription: [
      "She is an accomplished Accounting and Tax professional with over 20 years of experience in the field of accounting and indirect tax.",
      "She has been instrumental in implementing GST and has played a key role in establishing P2P and O2C processes for one of the big four accounting firms in India.",
      "She has also led implementation of various restructuring projects, business process improvements and automation.",
      "She specialises in accounting, tax, process improvements and automation.",
      "She is a qualified Chartered Accountant and holds an honours degree in commerce.",
    ],
  },
  {
    id: 4,
    image: "/team/ankur-goyal.jpeg",
    designation: "Partner",
    name: "Ankur Goyal",
    description:
      "Ankur Goyal (Ex-KPMG) is a technology partner at PV. Having knowledge and experience in product design, programming, and project management, he is well-equipped to handle any project.",
    linkedIn: "https://www.linkedin.com/in/imankurgoyal",
    longDescription: [
      "Ankur Goyal (Ex-KPMG) is a technology partner at Panchavaktra Fintech LLP.",
      "Having knowledge and experience in product design, programming, and project management, he is well-equipped to handle any project.",
      "Throughout his career, he has led various projects including conceptualizing and developing in-house tools, implementing SAP, automating processes, creating dashboards.",
      "He holds a bachelor’s degree in Computer Science and Engineering.",
    ],
  },
];
export default function OurLeadership() {
  return (
    <section className="p-10 bg-gray-100">
      <div className="max-w-screen-lg mx-auto space-y-10">
        <h1 className="flex justify-center">
          <WordsPullUp
            text="Our Leadership"
            className="text-center md:text-4xl text-app"
          />
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {items.map((item) => (
            <FadeChild key={item.id} className={"h-full"}>
              <div
                key={item.id}
                className={cn(
                  "relative space-y-3 rounded-md p-4 pb-7 shadow bg-white group h-full"
                )}
              >
                <div className="hidden absolute right-3 top-3 group-hover:flex items-center flex-col gap-1">
                  <Link href={item.linkedIn} className="text-xl fill-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 256 256"
                    >
                      <path
                        fill="#0A66C2"
                        d="M218.123 218.127h-37.931v-59.403c0-14.165-.253-32.4-19.728-32.4c-19.756 0-22.779 15.434-22.779 31.369v60.43h-37.93V95.967h36.413v16.694h.51a39.91 39.91 0 0 1 35.928-19.733c38.445 0 45.533 25.288 45.533 58.186zM56.955 79.27c-12.157.002-22.014-9.852-22.016-22.009s9.851-22.014 22.008-22.016c12.157-.003 22.014 9.851 22.016 22.008A22.013 22.013 0 0 1 56.955 79.27m18.966 138.858H37.95V95.967h37.97zM237.033.018H18.89C8.58-.098.125 8.161-.001 18.471v219.053c.122 10.315 8.576 18.582 18.89 18.474h218.144c10.336.128 18.823-8.139 18.966-18.474V18.454c-.147-10.33-8.635-18.588-18.966-18.453"
                      ></path>
                    </svg>
                  </Link>
                  <UserInfo info={item} btnClassName="text-2xl fill-gray-500" />
                </div>
                <div className="w-36 h-36 rounded-full overflow-hidden mx-auto border">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={400}
                    height={400}
                    className="w-full rounded-md"
                  />
                </div>

                <div>
                  <h3 className="text-lg text-app">{item.name}</h3>
                  <h4 className="text-sm text-gray-400">{item.designation}</h4>
                </div>

                <p className="text-sm text-gray-600">{item.description}</p>
                {/* <div>
                <Link href={item.linkedIn}>
                  <LinkedIn className="w-6 h-6" />
                </Link>
              </div> */}
              </div>
            </FadeChild>
          ))}
        </div>
      </div>
    </section>
  );
}
