import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { BannersSection } from "@/components/BannersSection";
import { FAQ } from "@/components/FAQ";
import { Contacts } from "@/components/Contacts";

export default function Index() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <BannersSection />
      <FAQ />
      <Contacts />
    </>
  );
}