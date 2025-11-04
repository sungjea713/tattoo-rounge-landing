import React from "react";
import Layout from "./components/Layout";
import HeroSection from "./components/HeroSection";
import CorePillars from "./components/CorePillars";
import PrecisionTools from "./components/PrecisionTools";
import PromptSection from "./components/PromptSection";
import AIGallery from "./components/AIGallery";
import FinalCTA from "./components/FinalCTA";

export default function App() {
  return (
    <Layout>
      <HeroSection />
      <PrecisionTools />
      <PromptSection />
      <AIGallery />
      <CorePillars />
      <FinalCTA />
    </Layout>
  );
}
