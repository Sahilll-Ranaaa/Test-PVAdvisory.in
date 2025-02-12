import HeroSection from "./sections/hero";
import Projects from "./sections/projects";
import SmallProjects from "./sections/small-projects";

export default function RecentProject() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <Projects />
      <SmallProjects />
    </main>
  );
}
