import React from "react";
import Layout from "./components/Layout";
import HeroSection from "./components/HeroSection";
import ConnectionSection from "./components/ConnectionSection";
import CorePillars from "./components/CorePillars";
import PrecisionTools from "./components/PrecisionTools";
import PromptSection from "./components/PromptSection";
import AIGallery from "./components/AIGallery";
import NewsGatherSection from "./components/NewsGatherSection";
import FinalCTA from "./components/FinalCTA";

export default function App() {
  return (
    <Layout>
      <HeroSection />
      <ConnectionSection />
      <PrecisionTools />
      <PromptSection />
      <AIGallery />
      <NewsGatherSection />
      <CorePillars />
      <FinalCTA />
    </Layout>
  );
}
