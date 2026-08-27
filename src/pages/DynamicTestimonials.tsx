import { motion, useScroll, useTransform, useVelocity, useSpring, useMotionValueEvent } from "framer-motion";
import { useRef } from "react";

const testimonials = [
  { text: "Dr. Rafael mudou o rumo da nossa empresa com sua estratégia precisa.", author: "João Silva", role: "CEO, TechLog" },
  { text: "A abordagem preventiva evitou perdas milionárias para nossos sócios.", author: "Mariana Costa", role: "Diretora Financeira" },
  { text: "Profissionalismo impecável e uma visão jurídica sem igual.", author: "Carlos Mendes", role: "Empresário" },
  { text: "Segurança e clareza em todas as etapas do processo.", author: "Ana Paula", role: "Investidora" },
  { text: "Excelente atendimento, sempre pronto para resolver as questões mais complexas.", author: "Roberto Nunes", role: "Fundador, StartupX" },
  { text: "Uma postura firme que transmite total confiança.", author: "Fernanda Lima", role: "Diretora de RH" },
  { text: "Resultados que superaram nossas melhores expectativas.", author: "Ricardo Gomes", role: "Sócio, Construtora Y" },
  { text: "A melhor decisão que tomamos foi trazer o Dr. Rafael para o conselho.", author: "Patrícia Alves", role: "Presidente do Conselho" },
  { text: "Incrível capacidade de antecipar problemas e propor soluções viáveis.", author: "Lucas Ferreira", role: "Diretor de Operações" },
  { text: "O parceiro estratégico ideal para negócios de alto risco.", author: "Camila Rocha", role: "VP Comercial" },
  { text: "Sempre um passo à frente. Uma mente jurídica brilhante.", author: "Marcos Viana", role: "CEO, Viana Group" },
  { text: "A tranquilidade de saber que estamos amparados pelo melhor.", author: "Juliana Castro", role: "Diretora Executiva" },
];

const col1 = [testimonials[0], testimonials[4], testimonials[8], testimonials[0]];
const col2 = [testimonials[1], testimonials[5], testimonials[9], testimonials[1]];
const col3 = [testimonials[2], testimonials[6], testimonials[10], testimonials[2]];
const col4 = [testimonials[3], testimonials[7], testimonials[11], testimonials[3]];

export default function DynamicTestimonials() {
  const containerRef = useRef(null);
  const { scrollYProgress, scrollY } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  
  // Transform velocity into an extra offset for that "speeding up" feel
  const velocityOffset = useTransform(smoothVelocity, [-1000, 1000], [-80, 80]);

  // Base parallax movement based on scroll progress
  const y1 = useTransform(scrollYProgress, [0, 1], [-300, 300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [300, -300]);
  
  // Combine base Y with velocity offset
  const transformY1 = useTransform(() => y1.get() + velocityOffset.get());
  const transformY2 = useTransform(() => y2.get() - velocityOffset.get());

  return (
    <section ref={containerRef} className="relative h-screen w-full bg-black flex items-center justify-center overflow-hidden font-sans">
      <div className="absolute top-8 left-8 md:top-12 md:left-12 z-20">
         <h2 className="text-white text-xs font-bold uppercase tracking-widest">Testemunhas</h2>
      </div>
      
      {/* Container with a slight rotation to give a dynamic layout */}
      <div className="flex gap-4 md:gap-6 px-4 md:px-10 w-full max-w-[1600px] h-[150vh] items-center justify-center -rotate-2 md:-rotate-3 scale-[1.15] md:scale-110 opacity-90 hover:opacity-100 transition-opacity duration-700">
        
        {/* Column 1 - Goes Down */}
        <motion.div style={{ y: transformY1 }} className="flex flex-col gap-4 md:gap-6 w-1/2 md:w-1/4 mt-12 md:mt-24">
          {col1.map((item, i) => (
            <Card key={`col1-${i}`} item={item} />
          ))}
        </motion.div>

        {/* Column 2 - Goes Up */}
        <motion.div style={{ y: transformY2 }} className="flex flex-col gap-4 md:gap-6 w-1/2 md:w-1/4 mt-32 md:mt-48">
          {col2.map((item, i) => (
            <Card key={`col2-${i}`} item={item} />
          ))}
        </motion.div>

        {/* Column 3 - Goes Down */}
        <motion.div style={{ y: transformY1 }} className="hidden md:flex flex-col gap-6 w-1/4 mt-16">
          {col3.map((item, i) => (
            <Card key={`col3-${i}`} item={item} />
          ))}
        </motion.div>

        {/* Column 4 - Goes Up */}
        <motion.div style={{ y: transformY2 }} className="hidden md:flex flex-col gap-6 w-1/4 mt-64">
          {col4.map((item, i) => (
            <Card key={`col4-${i}`} item={item} />
          ))}
        </motion.div>

      </div>
      
      {/* Overlay gradient to soften the edges */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black via-transparent to-black" />
    </section>
  );
}

const Card = ({ item }: { item: any }) => (
  <div className="bg-[#0a0a0a] p-6 md:p-8 rounded-2xl md:rounded-3xl border border-white/5 flex flex-col justify-between shadow-2xl hover:border-white/20 transition-all duration-300 transform hover:scale-[1.02] cursor-pointer">
    <p className="text-white/80 text-sm md:text-lg lg:text-xl font-medium leading-tight mb-6 md:mb-8">"{item.text}"</p>
    <div>
      <p className="text-white font-black uppercase tracking-widest text-[10px] md:text-xs mb-1">{item.author}</p>
      <p className="text-white/40 text-[9px] md:text-[10px] uppercase tracking-wider">{item.role}</p>
    </div>
  </div>
);
