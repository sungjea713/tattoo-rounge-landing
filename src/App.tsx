import React from "react";
import Layout from "./components/Layout";
import HeroSection from "./components/HeroSection";
import CorePillars from "./components/CorePillars";
import PrecisionTools from "./components/PrecisionTools";
import FinalCTA from "./components/FinalCTA";

export default function App() {
  return (
    <Layout>
      <HeroSection />
      <CorePillars />
      <PrecisionTools />
      <FinalCTA />
    </Layout>
  );
}
