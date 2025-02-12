import HeroSection from "./sections/hero";
import OurLeadership from "./sections/our-leadership";
import OurTeam from "./sections/our-team";

export default function Team() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <OurLeadership />
      <OurTeam />
    </main>
  );
}
