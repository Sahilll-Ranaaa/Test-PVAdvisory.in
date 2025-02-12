import LinkedIn from "@/components/icons/linkedin";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import UserInfo from "../user-info";
import { FadeChild } from "@/components/animate/fade-child";

const items = [
  {
    name: "Abhishek Jain",
    designation: "Associate Director",
    image: "/team/abhishek-jain.png",
    linkedIn: "https://www.linkedin.com/in/abhishek-jain-351094b4/",
    longDescription: [
      "Abhishek Jain, (ex-Genpact and ex-EY India) is an Associate Director with PV with experience of 10 years in Finance & Accounts.",
      "He has been an integral part of various finance functions including the General Ledger, invoicing, AR and strategic initiatives leading a team responsible for various financial reporting and tax compliance obligations.",
      "Over the course of his career, he has led many projects from conceptualization to implementation, including their legal and statutory compliance obligations.",
      "With a keen eye for process improvement and remodels, he has significantly contributed to the complete redesign of various key finance processes resulting in efficiencies, transparency and compliance.",
      "Over the years, he has received various awards and recognitions for his exceptional and consistent performance.",
      "He is a qualified Chartered Accountant and holds an honours degree in commerce.",
    ],
  },
  {
    name: "Uditi Shah",
    designation: "Strategic Growth Partner",
    image: "/team/uditi-shah.jpg",
    linkedIn: "http://www.linkedin.com/in/uditi-shah",
    longDescription: [
      "Uditi Shah is Strategic Growth Partner at PV with Over 12 years of experience in training, learning and development and proactive in driving positive change by partnering with business leaders and stakeholders for learning initiatives.",
      "Developed and executed training initiatives in alignment with organizational objectives staying attuned to industry trends.",
      "Curated high end learning solutions factoring the learning needs and learning cycle of all stakeholders.",
      "Led designing and delivering of customized training for various sectors including but not limited to Oil and Gas, Healthcare, Telecommunication, Aviation, and Real Estate.",
      "Collaborated with business partners and subject matter experts to advance valuable learning solutions.",
      "Adjunct faculty at Heriot-Watt University, Manipal Academy of Higher Education Dubai, Higher Colleges of Technology, and DSR Professional Training.",
      "Qualified Chartered Accountant with bachelor’s degree in commerce and master’s in Business Psychology and Coaching.",
    ],
  },
  {
    name: "Jyoti Batra Dhall",
    designation: "Assistant Manager",
    image: "/team/jyoti-batra-dhall.jpg",
    linkedIn: "https://www.linkedin.com/in/jyoti-batra-dhall-a265b59a",
    longDescription: [
      "Jyoti Batra Dhall is an assistant manager at PV with strong project management capabilities.",
      "She has led various project for clients in diverse industries like healthcare, hospitals, advertising, retail and professional services.",
      "Having worked in start-ups, she got the opportunity to build systems and processes and on the other hand, experience of working with large corporates made her aware of the macro picture of businesses and only increased her knowledge and skills and the pedigree of her corporate career.",
      "Her area of expertise are process mapping and creation of process documents.",
      "She holds an honours and master’s degree in commerce from University of Delhi.",
    ],
  },
  {
    name: "Umesh Chandra Dani",
    designation: "Senior Consultant",
    image: "/team/umesh-chandra-dani.jpg",
    linkedIn: "https://www.linkedin.com/in/umesh-chandra-dani-35b044253/",
    longDescription: [
      "Umesh Chandra Dani is a Senior consultant at PV Advisory.",
      "He is Capable of effectively collaborating with cross-functional teams to achieve project goals.",
      "He is proficient in JavaScript, HTML, CSS, Bootstrap, NodeJS, Express, and MongoDB",
      "Actively participates in professional development opportunities such as workshops, seminars, and online courses.",
      "He holds a bachelor's degree in Computer Science and Engineering.",
    ],
  },
  {
    name: "Anant Jain",
    designation: "Senior Consultant",
    image: "/team/anant-jain.jpg",
    linkedIn: "https://www.linkedin.com/in/anant-jain-",
    longDescription: [
      "Anant Jain works at PV Advisory as a senior consultant.",
      "He is a full stack web developer with proficiency in ReactJS, HTML, CSS, JavaScript, and Bootstrap.",
      "He is detail-oriented and is always interested in learning new skills.",
      "His experience also extends to the development of various web applications.",
      "He designs and integrates digital solutions for positive user experiences and measurable business growth.",
      "He holds a bachelor's degree in commerce from the University of Delhi.",
    ],
  },
  {
    name: "Saurav Bhandari",
    designation: "Senior Consultant",
    image: "/team/saurav-bhandari.JPG",
    linkedIn: "http://www.linkedin.com/in/sauravbhandari93",
    longDescription: [
      "Saurav Bhandari (Ex-LNT) is a senior consultant at PV Advisory with strong problem-solving capabilities.",
      "He has worked on various projects by proactively collaborating with peers through his design and organizational skills.",
      "He is an active team player and has proficiency to implement and maintain technology infrastructure through code reviews, testing and debugging solution application to ensure a quality deployment throughout.",
      "He holds a Bachelor of Technology degree in civil engineering from MSIT.",
    ],
  },
  {
    name: "Duwesh Kumar",
    designation: "Consultant",
    image: "/team/duwesh-kumar.png",
    linkedIn: "https://www.linkedin.com/in/duwesh-kumar",
    longDescription: [
      "Duwesh Kumar is a Consultant at PV Advisory.",
      "He is Capable of effectively collaborating with cross-functional teams to achieve project goals.",
      "He is proficient in JavaScript, HTML, CSS, Bootstrap, NodeJS, Express, and MongoDB",
      "Actively participates in professional development opportunities such as workshops, seminars, and online courses.",
      "He holds a bachelor's degree in Computer Science and Engineering.",
    ],
  },
  {
    name: "Ashutosh Kumbhkar",
    designation: "Consultant",
    image: "/team/ashutosh-kumbhkar.jpeg",
    linkedIn: "https://www.linkedin.com/in/duwesh-kumar",
    longDescription: [
      "Ashutosh is a Consultant at PV Advisory with strong expertise in business process design, analysis, and optimization.",
      "He has experience working with clients in the healthcare, education, and wellness sectors.",
      "His key strengths include: ",
      "He holds a Master’s degree in Management Science, with a Marketing major, from Devi Ahilya Vishwa Vidyalaya, Indore.",
    ],
  },
  {
    name: "Vidushi Sharma",
    designation: "Consultant",
    image: "/team/vidushi-sharma.jpg",
    linkedIn: "https://www.linkedin.com/in/vidushi-sharma-387154171",
    longDescription: [
      "Vidushi is a consultant with PV Advisory and has strong analytical skills.",
      "She has worked for clients within the telecommunication, retail, healthcare, and wellness sector.",
      "Her interest and skill lie in understanding business and finance processes, financial reporting, automation, research, and design.",
      "She has experience to assist clients with implementation of GST, optimization of accounts receivables, and preparation and analysis of financial statements.",
      "With her interpersonal skills, she collaborates to improve the performance of given task.",
      "She holds a bachelor’s degree in management studies, with a finance major, from University of Delhi.",
    ],
  },
  {
    name: "Swati Gupta",
    designation: "Associate Consultant",
    image: "/team/swati-gupta.png",
    linkedIn: "http://www.linkedin.com/in/swati-gupta-5b30262b",
    longDescription: [
      "Swati Gupta is a qualified Chartered Accountant and holds an honors degree in commerce. She has worked with leading consulting firm Ernst & Young (2015 -2021) and has gained extensive experience in the field of Indirect Taxes. She played a vital role in smooth transitioning from old indirect tax regime to the GST regime.",
      "She is an imminent Finance and Tax professional with over 6 years of experience. Her core specialization is GST advisory, litigation and compliance.",
      "Besides the above, she also assists clients with cost optimization, financial planning and analysis, implementation of various business process improvements and automations.",
      "She is providing financial and tax advisory to various MSMEs in diversified Industries like: Healthcare & Life sciences, Iron & Steel, Hospitality, Construction equipment's, Engineering, procurement & construction, Consumer, etc.",
    ],
  },

  {
    name: "Jayanth Vellal",
    designation: "Associate Consultant",
    image: "/team/jayanth-vellal.webp",
    linkedIn: "http://www.linkedin.com/in/jayanthvellal",
    longDescription: [
      "Jayanth Vellal, is Finance transformation specialist at PV.",
      "He has over 18 years’ experience in Shared Services and Financial Services industry with a robust service delivery capability driven by mix of operational and consulting experience.",
      "He has a strong people & client management skills and an ardent follower of ethical work practices.",
      "Implementation of finance transformation, finance function effectiveness, designing finance processes, process improvements and automations are his areas of expertise.",
      "He is a member of Institute of Management Consultants of India.",
      "He also holds an honours degree in commerce.",
    ],
  },
];
export default function OurTeam() {
  return (
    <section className="p-10">
      <div className="max-w-screen-md mx-auto space-y-10">
        <h1 className="text-center text-4xl font-bold text-app">Our Team</h1>
        <div className="flex flex-wrap justify-center gap-y-14">
          {items.map((item) => (
            <FadeChild key={item.name} delay={0.2}>
              <div key={item.name} className="space-y-2 group px-7">
                <div className="relative w-48 h-52 border">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={600}
                    height={600}
                    className="object-cover w-full h-full"
                  />
                  <div className="hidden absolute -right-8 top-0 group-hover:flex items-center flex-col gap-0.5">
                    <Link
                      href={item.linkedIn}
                      className="flex items-center justify-center bg-white p-1.5 border shadow-lg rounded fill-gray-500"
                    >
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
                    <UserInfo
                      info={item}
                      btnClassName="text-xl bg-white p-1 border rounded shadow fill-gray-500"
                    />
                  </div>
                  {/* <button className="hidden group-hover:block absolute bottom-2 right-2 p-2 bg-white rounded-full shadow">
                  <LinkedIn className="text-xl" />
                </button> */}
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-sm text-app">{item.name}</h2>
                    <h3 className="capitalize text-gray-600 text-xs">
                      {item.designation}
                    </h3>
                  </div>
                  {/* <button>
                  <ArrowUpRight size={25} strokeWidth={1.2} />
                </button> */}
                </div>
              </div>
            </FadeChild>
          ))}
        </div>
      </div>
    </section>
  );
}
