const values = [
  { title: "Customer Delight", desc: "Provide more than what the customer expects, consistently exceeding the bar." },
  { title: "Quality", desc: "Whatever we do, we do it well. There are no shortcuts at PV Advisory." },
  { title: "Passion", desc: "Commitment and genuine love for our work fuels everything we create." },
  { title: "Integrity", desc: "Do the right thing. Our credibility depends on it, and we guard it fiercely." },
  { title: "Growth Mindset", desc: "Think and act like an entrepreneur. Stay hungry, stay curious, stay bold." },
  { title: "Teaming", desc: "Collaborate and help each other. Great outcomes are always a team sport." },
];

export default function OurValuesSection() {
  return (
    <section className="py-24 bg-[#F8F6F2]">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-app/10 text-app text-xs font-semibold uppercase tracking-widest rounded-full mb-4">
          Our Values
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-[40px] font-semibold text-gray-900 leading-[1.2] mb-12 -tracking-[0.02em]">
          The principles that define<br />
          how we <span className="text-app">work and grow.</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 lg:gap-20 items-start">
          {/* Left Intro */}
          <div className="lg:col-span-1">
            <p className="text-gray-500 text-[15px] leading-[1.8]">
              These six core values aren&apos;t aspirations &mdash; they&apos;re the standards we hold ourselves to every day, in every engagement, with every client and team member.
            </p>
          </div>

          {/* Right Cards Grid */}
          <div className="lg:col-span-1 grid grid-cols-1 md:grid-cols-2 gap-5">
            {values.map((val, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-[10px] p-6 relative overflow-hidden group hover:border-app transition-all hover:-translate-y-1">
                <div className="absolute top-0 left-0 w-full h-[3px] bg-app transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                <h3 className="text-[14px] font-semibold text-gray-900 mb-2 group-hover:text-app transition-colors">{val.title}</h3>
                <p className="text-gray-500 text-[13px] leading-[1.65]">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
