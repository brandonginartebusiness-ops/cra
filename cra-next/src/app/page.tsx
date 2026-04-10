import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Results from "@/components/sections/Results";
import Process from "@/components/sections/Process";
import Proof from "@/components/sections/Proof";
import About from "@/components/sections/About";
import Pricing from "@/components/sections/Pricing";
import Reviews from "@/components/sections/Reviews";
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
      <Results />
      <Process />
      <Proof />
      <About />
      <Pricing />
      <Reviews />
      <FAQ />
      <Contact />
      <InstagramFeed />
    </>
  );
}
