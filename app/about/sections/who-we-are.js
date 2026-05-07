"use client";

import MaxWidthWrapper from "@/components/max-width-wrapper";

export default function WhoWeAreSection() {
  return (
    <section className="py-24 bg-white">
      <MaxWidthWrapper className="max-w-screen-xl mx-auto px-6 md:px-12">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-app/10 text-app text-xs font-semibold uppercase tracking-widest rounded-full mb-4">
            Who we are
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-[40px] font-semibold text-gray-900 leading-[1.2] -tracking-[0.02em]">
            More than advisors &mdash;<br />
            we&apos;re <span className="text-app">implementation partners.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-24 items-start">
          <div className="space-y-8">
            <p className="text-gray-500 text-lg leading-relaxed">
              Founded by ex-EY leaders, PV Advisory was born from a simple realization: high-growth businesses don&apos;t just need advice&mdash;they need execution that scales.
            </p>
            <p className="text-gray-500 text-base leading-relaxed">
              We bridges the gap between high-level strategy and daily operations. Our approach is hands-on, data-driven, and focused on delivering measurable financial outcomes for our clients.
            </p>
          </div>

          <div className="bg-[#F8F6F2] rounded-[24px] p-8 md:p-12">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Built by Operators</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Our team brings decades of combined experience from the world&apos;s leading consulting firms and high-growth technology startups. We&apos;ve sat in the CFO chair, managed global procurement, and built finance functions from zero to one.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="text-3xl font-bold text-app mb-1">10+</div>
                <div className="text-xs font-semibold uppercase tracking-widest text-gray-400">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-app mb-1">50+</div>
                <div className="text-xs font-semibold uppercase tracking-widest text-gray-400">Clients Served</div>
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
