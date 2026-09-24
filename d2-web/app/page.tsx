import { DashboardShowcase } from "@/components/DashboardShowcase";
import { DeveloperHub } from "@/components/DeveloperHub";
import { Ecosystem } from "@/components/Ecosystem";
import { FeatureGrid } from "@/components/FeatureGrid";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Pricing } from "@/components/Pricing";
import { Workflow } from "@/components/Workflow";

export default function Home() {
  return (
    <div id="top" className="flex min-h-full flex-col bg-obsidian">
      <Header />
      <main className="flex-1">
        <Hero />
        <FeatureGrid />
        <DashboardShowcase />
        <Ecosystem />
        <Workflow />
        <DeveloperHub />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
