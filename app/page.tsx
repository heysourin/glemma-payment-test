import BelowHero from "@/components/BelowHero";
import CTA from "@/components/CTA";
import Disclaimer from "@/components/Disclaimer";
import FAQ from "@/components/FAQ";
import FeatureSection from "@/components/FeatureSection";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";

export default function Home() {
  return (
    <>
      <Hero />
      <Disclaimer />
      <BelowHero/>
      <FeatureSection/>
      {/* <HowItWorks/> */}
      <FAQ/>
      <CTA/>
    </>
  );
}
