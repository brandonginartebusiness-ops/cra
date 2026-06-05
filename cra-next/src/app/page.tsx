import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import RecentWins from "@/components/sections/RecentWins";
import Process from "@/components/sections/Process";
import About from "@/components/sections/About";
import Accreditations from "@/components/sections/Accreditations";
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
      <RecentWins />
      <About />
      <Accreditations />
      <Process />
      <Pricing />
      <FAQ />
      <Contact />
      <InstagramFeed />
    </>
  );
}
