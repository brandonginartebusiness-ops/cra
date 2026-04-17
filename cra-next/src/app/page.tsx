import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import SocialProof from "@/components/sections/SocialProof";
import Process from "@/components/sections/Process";
import Proof from "@/components/sections/Proof";
import About from "@/components/sections/About";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import InstagramFeed from "@/components/sections/InstagramFeed";
import FAQSchema from "@/components/seo/FAQSchema";

export default function Home() {
  return (
    <>
      <FAQSchema />
      <Hero />
      <Services />
      <SocialProof />
      <About />
      <Process />
      <Proof />
      <Pricing />
      <FAQ />
      <Contact />
      <InstagramFeed />
    </>
  );
}
