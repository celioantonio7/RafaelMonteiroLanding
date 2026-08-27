import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const team = [
  {
    id: 1,
    name: "Dr. Rafael Monteiro",
    role: "Sócio-Fundador",
    description: "Visão estratégica e mais de 15 anos de atuação em contencioso de alta complexidade corporativa.",
    image: `${import.meta.env.BASE_URL}t1.webp`
  },
  {
    id: 2,
    name: "Dra. Helena Valença",
    role: "Sócia — Direito Empresarial",
    description: "Especialista em fusões, aquisições e estruturação societária com amplo histórico de sucesso.",
    image: `${import.meta.env.BASE_URL}t2.webp`
  },
  {
    id: 3,
    name: "Dr. Arthur Lemos",
    role: "Head de Contratos",
    description: "Foco rigoroso na mitigação de riscos estruturais e segurança jurídica para grandes contas.",
    image: `${import.meta.env.BASE_URL}t3.webp`
  },
  {
    id: 4,
    name: "Dra. Beatriz Alcântara",
    role: "Associada Sênior — Direito Civil",
    description: "Atuação destacada na resolução de conflitos patrimoniais e negociações de alta complexidade.",
    image: `${import.meta.env.BASE_URL}t4.webp`
  }
];

const TeamHorizontalScroll = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Maps the scroll progress to horizontal movement. 
  // On mobile, the cards are wider relative to the screen, so we need to translate further (-78%).
  const x = useTransform(scrollYProgress, [0, 1], ["0%", isMobile ? "-78%" : "-60%"]); 

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-black text-white w-full">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        
        {/* Header Section */}
        <div className="px-6 md:px-16 mb-8 md:mb-12 shrink-0">
          <h2 className="font-sans text-xs md:text-sm font-bold uppercase tracking-widest text-white/70">
            Corpo Jurídico
          </h2>
          <h3 className="font-sans text-4xl md:text-6xl font-black uppercase tracking-tighter mt-2">
            A Equipe
          </h3>
        </div>
        
        {/* Horizontal Scrolling Cards */}
        <motion.div style={{ x }} className="flex gap-8 md:gap-16 px-6 md:px-16 pb-12 w-max">
          {team.map((member) => (
            <div 
              key={member.id} 
              className="relative w-[85vw] md:w-[35vw] h-[55vh] md:h-[65vh] shrink-0 group overflow-hidden border border-white/10"
            >
              {/* Overlay that disappears on hover */}
              <div className="absolute inset-0 bg-black/50 z-10 group-hover:bg-black/10 transition-colors duration-700 ease-out" />
              
              <img 
                src={member.image} 
                alt={member.name}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1.5s] ease-out"
              />
              
              {/* Text Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20 bg-gradient-to-t from-black via-black/80 to-transparent">
                <p className="font-sans text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-white/60 mb-3 transition-colors duration-500 group-hover:text-white/90">
                  {member.role}
                </p>
                <h4 className="font-sans text-2xl md:text-4xl font-bold tracking-tight text-white mb-2 group-hover:-translate-y-1 transition-transform duration-500">
                  {member.name}
                </h4>
                
                {/* Description - reveals on hover for desktop, always slightly visible on mobile but fully visible on hover */}
                <div className="overflow-hidden">
                  <p className="font-sans text-sm text-white/70 leading-relaxed max-w-[90%] md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-500 delay-100">
                    {member.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {/* Spacer at the end to allow the last card to reach the center/left */}
          <div className="w-[10vw] shrink-0" />
        </motion.div>
      </div>
    </section>
  );
};

export default TeamHorizontalScroll;
