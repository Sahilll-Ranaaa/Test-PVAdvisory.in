import HeroSection from "./sections/hero";
import OurMethodologySection from "./sections/our-methodology";
import OurMissionOurGoal from "./sections/our-mission-our-goal";
import OurValuesSection from "./sections/our-values";
import WhoWeAreSection from "./sections/who-we-are";

export default function AboutUs() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <WhoWeAreSection />
      <OurMissionOurGoal />
      <OurValuesSection />
      <OurMethodologySection />
    </main>
  );
}
