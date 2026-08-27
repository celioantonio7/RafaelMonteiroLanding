import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Link } from "react-router-dom";

interface NavItem {
  label: string;
  href: string;
  number: string;
}

interface SocialItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Sobre", href: "#about", number: "01" },
  { label: "Atuação", href: "#work", number: "02" },
  { label: "Diferenciais", href: "#philosophy", number: "03" },
  { label: "Radar Jurídico", href: "/insights", number: "04" },
  { label: "Contato", href: "#contact", number: "05" },
];

const socialItems: SocialItem[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
  { label: "E-mail", href: "mailto:contato@monteiroadvocacia.com.br" },
  { label: "WhatsApp", href: "https://wa.me/5511999990000" },
];

const ease = [0.76, 0, 0.24, 1] as [number, number, number, number];
const easeOut = [0.16, 1, 0.3, 1] as [number, number, number, number];

const overlayVariants: Variants = {
  closed: {
    clipPath: "inset(0% 0% 100% 0%)",
    transition: { duration: 1.0, ease },
  },
  open: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 1.0, ease },
  },
};

const itemVariants: Variants = {
  closed: {
    y: 40,
    opacity: 0,
    transition: { duration: 0.8, ease },
  },
  open: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 1.0,
      delay: 0.4 + i * 0.1,
      ease: easeOut,
    },
  }),
};

const socialVariants: Variants = {
  closed: {
    opacity: 0,
    y: 10,
    transition: { duration: 0.6, ease },
  },
  open: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: 0.6 + i * 0.08,
      ease: "easeOut",
    },
  }),
};

const Navigation = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none"; // Critical for iOS Safari
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [open]);

  const handleNavClick = () => {
    setOpen(false);
  };

  return (
    <>
      {/* Hamburger Button */}
      <div
        className="fixed top-6 right-6 md:top-8 md:right-10 z-[200]"
        style={{ transform: "translateZ(0)", willChange: "transform" }}
      >
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex flex-col items-center justify-center gap-[5px] w-14 h-14 md:w-16 md:h-16 rounded-full bg-black transition-colors duration-300 relative"
          style={{
            boxShadow: "0 0 0 1px rgba(255, 255, 255, 0.6)",
            WebkitFontSmoothing: "antialiased",
          }}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {/* Top Line */}
          <motion.span
            animate={open ? { rotate: 45, y: 6.5, scaleX: 0.8 } : { rotate: 0, y: 0, scaleX: 1 }}
            transition={{ duration: 0.6, ease }}
            className="absolute block h-[1.5px] w-[22px] bg-white origin-center"
            style={{ top: "35%" }}
          />
          {/* Middle Line */}
          <motion.span
            animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.4, ease }}
            className="absolute block h-[1.5px] w-[22px] bg-white origin-center"
            style={{ top: "50%", marginTop: "-0.75px" }}
          />
          {/* Bottom Line */}
          <motion.span
            animate={open ? { rotate: -45, y: -6.5, scaleX: 0.8 } : { rotate: 0, y: 0, scaleX: 1 }}
            transition={{ duration: 0.6, ease }}
            className="absolute block h-[1.5px] w-[22px] bg-white origin-center"
            style={{ bottom: "35%" }}
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-[100] bg-black flex flex-col justify-between px-8 md:px-16 pt-16 pb-10 md:pt-20 md:pb-14"
          >
            {/* Socials row */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-4 pt-10 md:pt-0">
              <p className="text-sm text-white/70 uppercase tracking-widest font-mono mr-2">
                Contato
              </p>
              {socialItems.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  custom={i}
                  variants={socialVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className="text-base md:text-lg font-medium text-white hover:opacity-40"
                >
                  {item.label}
                </motion.a>
              ))}
            </div>

            {/* Nav Links */}
            <nav className="flex flex-col gap-0">
              {navItems.map((item, i) => {
                const MotionLink = motion.create(Link);
                const MotionA = motion.create("a");
                
                const isExternalOrAnchor = item.href.startsWith("mailto:") || item.href.startsWith("http") || item.href.startsWith("#");
                
                const linkContent = (
                  <>
                    <span className="relative inline-flex items-center text-5xl md:text-7xl lg:text-8xl font-semibold text-white uppercase tracking-tight leading-none group-hover:translate-x-4 transition-all duration-500 ease-out">
                      {/* Texto de Fundo (Transparente no hover) */}
                      <span className="transition-colors duration-400 group-hover:text-white/10">
                        {item.label}
                      </span>
                      
                      {/* Bloco de Cor que se abre (Cortina) */}
                      <span 
                        className="absolute inset-0 bg-[#4246ce] text-white flex items-center whitespace-nowrap overflow-hidden transition-all duration-[450ms] ease-[cubic-bezier(0.1,0.5,0.5,1)] [clip-path:polygon(0_50%,100%_50%,100%_50%,0_50%)] group-hover:[clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]"
                      >
                        {item.label}
                      </span>
                    </span>
                    <span className="text-xs text-white/55 font-mono tracking-widest self-start mt-2">
                      {item.number}
                    </span>
                  </>
                );

                return (
                  <div
                    key={item.label}
                    className="overflow-hidden border-b border-white/25 py-3 md:py-4"
                  >
                    {!isExternalOrAnchor ? (
                      <MotionLink
                        to={item.href}
                        onClick={handleNavClick}
                        custom={i}
                        variants={itemVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        className="flex items-baseline justify-between group cursor-pointer relative"
                      >
                        {linkContent}
                      </MotionLink>
                    ) : (
                      <MotionA
                        href={item.href}
                        onClick={handleNavClick}
                        custom={i}
                        variants={itemVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        className="flex items-baseline justify-between group cursor-pointer relative"
                      >
                        {linkContent}
                      </MotionA>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Bottom copyright */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 1.2, duration: 0.8 } }}
              exit={{ opacity: 0, transition: { duration: 0.6 } }}
              className="text-xs text-white/20 font-mono tracking-widest mt-8 md:mt-0 md:self-end"
            >
              © 2026 MONTEIRO ADVOCACIA
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;