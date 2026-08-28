import { useEffect, useRef } from "react";
import { motion, useSpring, useMotionValue, useScroll, useTransform } from "framer-motion";
import { Github, Linkedin, Instagram, Mail, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

// Components
import About from "./About";
import SplashCursor from "@/components/SplashCursor";
import SelectedWorks from "./SelectedWorks";
import VectorBridge from "./VectorBridge";
import Footer from "./Footer";
import Contact from "./Contact";
import TestimonialBridge from "./TestimonialBridge";
import Navigation from "@/components/Navigation";
import TeamHorizontalScroll from "./TeamHorizontalScroll";
import JusticeStatue from "@/components/JusticeStatue";
import AnimatedLogo from "@/components/AnimatedLogo";
import GlobalLoader from "@/components/GlobalLoader";


// (BrandLogo removido, agora usamos o AnimatedLogo que vem de "@/components/AnimatedLogo")

const AvailabilityBadge = () => {
  const { t } = useTranslation();
  return (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    className="absolute z-10 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-2 pointer-events-none"
    style={{ top: "2.25rem" }}
  >
    <span className="relative flex h-1.5 w-1.5">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
    </span>
    <span className="font-sans font-black text-[9px] tracking-[0.25em] uppercase text-white">
      {t("hero.availability")}
    </span>
  </motion.div>
)};

const SocialStrip = () => {
  const socials = [
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "Email", href: "mailto:contato@monteiroadvocacia.com.br" },
    { label: "WhatsApp", href: "https://wa.me/5511999990000" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="absolute z-20 hidden md:flex flex-col items-center"
      style={{ right: "64px", top: "112px", bottom: "194px", justifyContent: "center", gap: "1rem" }}
    >
      <span className="w-[1px] h-8 bg-white/30 flex-shrink-0" />
      {socials.map(({ label, href }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith("mailto") ? "_self" : "_blank"}
          rel="noopener noreferrer"
          title={label}
          className="group flex-shrink-0"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
        >
          <span className="font-sans font-black text-[10px] tracking-[0.22em] uppercase text-white group-hover:opacity-100 transition-opacity duration-300">
            {label}
          </span>
        </a>
      ))}
      <span className="w-[1px] h-8 bg-white/30 flex-shrink-0" />
    </motion.div>
  );
};

const MobileSocialStrip = () => {
  const socials = [
    { label: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/" },
    { label: "Email", icon: Mail, href: "mailto:contato@monteiroadvocacia.com.br" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
      className="flex flex-col items-center gap-6"
    >
      {socials.map(({ label, icon: Icon, href }) => (
        <a key={label} href={href} target={href.startsWith("mailto") ? "_self" : "_blank"} rel="noopener noreferrer"
          className="text-white hover:opacity-75 transition-opacity duration-300 block">
          <Icon size={18} strokeWidth={2.5} />
        </a>
      ))}
    </motion.div>
  );
};



const Index = () => {
  const { t } = useTranslation();
  const footerContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: footerContainerRef,
    offset: ["start end", "end end"]
  });

  const { scrollYProgress: globalScroll } = useScroll();

  // Create parallax effect: Footer starts higher up and moves to normal position as we scroll into it
  const footerY = useTransform(scrollYProgress, [0, 1], ["-50%", "0%"]);

  // Dynamic name logic
  const searchParams = new URLSearchParams(window.location.search);
  const rawName = searchParams.get("name") || "Rafael Monteiro";
  const decodedName = decodeURIComponent(rawName).toUpperCase();
  const lastName = decodedName.split(" ").pop() || "MONTEIRO";

  return (
    <div className="relative bg-[#050505] min-h-screen text-white overflow-clip selection:bg-[#4246ce] selection:text-white">
      <GlobalLoader />
      {/* Global Scroll Progress Bar removida para um visual mais premium e limpo */}
      <button
        className="fixed top-6 left-6 md:top-8 md:left-10 z-50 mix-blend-difference cursor-pointer focus:outline-none group"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Voltar ao topo"
      >
        <AnimatedLogo baseText={lastName} hoverText={decodedName} className="text-2xl md:text-4xl" />
      </button>
      <Navigation />

      {/* Fixed background About section */}
      <div className="fixed inset-0 z-0 bg-white text-black">
        <About />
      </div>

      {/* Hero */}
      <section className="relative h-screen bg-black flex flex-col px-6 py-12 md:px-16 md:py-16 z-20 overflow-hidden">
        {/* 3D Statue Canvas Background */}
        <JusticeStatue />
        <AvailabilityBadge />
        <SocialStrip />
        {/* <div className="hidden lg:block"><SplashCursor /></div> */}

        {/* Mobile Midpoint Buffer: 80px total height from top to clear hamburger (Hamburger at 24px + 56px height) */}
        <div className="h-[32px] w-full md:hidden" /> {/* py-12 (48px) + 32px = 80px */}

        {/* Dynamic Centering Container for Mobile Socials */}
        <div className="flex-1 flex flex-col items-end justify-center md:hidden pr-0 z-10 pointer-events-none">
          <div className="pointer-events-auto">
            <MobileSocialStrip />
          </div>
        </div>

        <div className="z-10 mt-24 md:mt-32">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-fit flex flex-col items-start gap-8"
          >
            <h1 className="font-sans font-bold text-4xl md:text-6xl lg:text-[6rem] xl:text-[7rem] leading-[0.9] tracking-tighter text-white uppercase text-left">
              {t("hero.title_line1")}<br />{t("hero.title_line2")}
            </h1>

            <div className="flex flex-col gap-6 max-w-lg">
              <p className="font-sans text-sm md:text-base font-medium text-white leading-relaxed tracking-wide uppercase text-left">
                {t("hero.description")}
              </p>
              
              <a href="#contact" className="button button--bestia w-fit">
                <div className="button__bg"></div>
                <span className="font-sans font-black text-xs tracking-[0.2em] uppercase">{t("hero.schedule_btn")}</span>
              </a>
            </div>
          </motion.div>
        </div>


      </section>

      {/* Content stack */}
      <div className="relative z-20 w-full bg-transparent">
        <div id="about" className="h-screen w-full pointer-events-none" />

        <div id="work" className="bg-black text-white relative z-20">
          <SelectedWorks />
        </div>

        <div id="team" className="bg-black text-white relative z-20">
          <TeamHorizontalScroll />
        </div>

        <div className="bg-white text-black relative z-20">
          <VectorBridge />
        </div>

        <div className="bg-black text-white relative z-20">
          <TestimonialBridge />
        </div>

        {/* Change contact layer to z-20 and relative so it scrolls normally OVER the footer */}
        <div id="contact" className="relative z-20 bg-white text-black">
          <Contact />
        </div>
      </div>

      {/* Parallax Footer Reveal Stack */}
      <div ref={footerContainerRef} className="relative z-0 h-screen w-full overflow-hidden bg-black text-white">
        <motion.div style={{ y: footerY }} className="h-full w-full">
          <Footer />
        </motion.div>
      </div>
    </div>
  );
};

export default Index;