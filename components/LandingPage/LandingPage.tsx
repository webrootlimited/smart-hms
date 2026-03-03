import React from "react";
import NavBar from "../Global/NavBar";
import HeroSection from "./HeroSection";
import Brading from "./Brading";
import CompletePracticeBranding from "./CompletePracticeBranding";
import LeadingHealthCare from "./LeadingHealthCare";
import Seamless from "./Seamless";
import StepsSection from "./StepsSection";
import TrustUs from "./TrustUs";
import FAQ from "./FAQ";
import Footer from "../Global/Footer";

const LandingPage = () => {
  return (
    <div className="overflow-x-hidden">
      <div className="relative min-h-screen overflow-hidden">
        {/* Background gradient blob */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-40 -left-40 h-175 w-175 rounded-full bg-[#6DDCFF] opacity-20 blur-[120px]" />
          <div className="absolute top-20 right-0 h-125 w-125 rounded-full bg-[#7F60F9] opacity-15 blur-[120px]" />
          <div className="absolute top-60 left-1/3 h-100 w-100 rounded-full bg-[#4D8BE9] opacity-10 blur-[100px]" />
        </div>

        <NavBar />
        <HeroSection />
      </div>
      <Brading />
      <CompletePracticeBranding />
      <LeadingHealthCare />
      <Seamless />
      <StepsSection />
      <TrustUs />
      <FAQ />
      <Footer />
    </div>
  );
};

export default LandingPage;
