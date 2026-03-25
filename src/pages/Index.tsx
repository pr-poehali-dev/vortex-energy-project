import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { BannersSection } from "@/components/BannersSection";
import { FAQ } from "@/components/FAQ";

export default function Index() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <BannersSection />
      <FAQ />
    </>
  );
}