import { motion, useScroll, useVelocity, useSpring, useMotionValue, useAnimationFrame, useTransform } from "framer-motion";
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

const t = testimonials;
// We make the base long enough so 50% of the duplicated height is taller than any screen
const baseCol1 = [t[0], t[4], t[8], t[1], t[5], t[9], t[2], t[6]];
const baseCol2 = [t[1], t[5], t[9], t[2], t[6], t[10], t[3], t[7]];
const baseCol3 = [t[2], t[6], t[10], t[3], t[7], t[11], t[0], t[4]];
const baseCol4 = [t[3], t[7], t[11], t[0], t[4], t[8], t[1], t[5]];

const col1 = [...baseCol1, ...baseCol1];
const col2 = [...baseCol2, ...baseCol2];
const col3 = [...baseCol3, ...baseCol3];
const col4 = [...baseCol4, ...baseCol4];

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export default function DynamicTestimonials() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();

  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });

  const baseY = useMotionValue(0);

  useAnimationFrame((time, delta) => {
    // Base infinite scroll speed
    let moveBy = 0.05 * (delta / 16); 
    
    // Add the scroll velocity modifier for the acceleration effect (reduced drastically)
    const velocity = smoothVelocity.get();
    moveBy += velocity * 0.005 * (delta / 16);

    baseY.set(baseY.get() + moveBy);
  });

  // wrap(-50, 0, -v) => goes from 0 to -50 repeatedly (moves UP)
  // wrap(-50, 0, v) => goes from -50 to 0 repeatedly (moves DOWN)
  const y1 = useTransform(baseY, (v) => `${wrap(-50, 0, -v)}%`);
  const y2 = useTransform(baseY, (v) => `${wrap(-50, 0, v)}%`);

  return (
    <section ref={containerRef} className="relative h-screen w-full bg-black flex items-center justify-center overflow-hidden font-sans">
      <div className="absolute top-8 left-8 md:top-12 md:left-12 z-20">
         <h2 className="text-white text-xs font-bold uppercase tracking-widest">Testemunhas</h2>
      </div>
      
      {/* Container with a slight rotation to give a dynamic layout */}
      <div className="flex px-4 md:px-10 w-full max-w-[1600px] h-[150vh] items-center justify-center -rotate-2 md:-rotate-3 scale-[1.15] md:scale-110 opacity-90 hover:opacity-100 transition-opacity duration-700">
        
        {/* Column 1 - Goes Up */}
        <motion.div style={{ y: y1 }} className="flex flex-col w-1/2 md:w-1/4 h-max px-2 md:px-3">
          {col1.map((item, i) => (
            <Card key={`col1-${i}`} item={item} />
          ))}
        </motion.div>

        {/* Column 2 - Goes Down */}
        <motion.div style={{ y: y2 }} className="flex flex-col w-1/2 md:w-1/4 h-max px-2 md:px-3">
          {col2.map((item, i) => (
            <Card key={`col2-${i}`} item={item} />
          ))}
        </motion.div>

        {/* Column 3 - Goes Up */}
        <motion.div style={{ y: y1 }} className="hidden md:flex flex-col w-1/4 h-max px-2 md:px-3">
          {col3.map((item, i) => (
            <Card key={`col3-${i}`} item={item} />
          ))}
        </motion.div>

        {/* Column 4 - Goes Down */}
        <motion.div style={{ y: y2 }} className="hidden md:flex flex-col w-1/4 h-max px-2 md:px-3">
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
  // We use pb-4 instead of gap in the flex container so the math for 50% translation is perfectly exact
  <div className="pb-4 md:pb-6 w-full">
    <div className="bg-[#0a0a0a] p-6 md:p-8 rounded-2xl md:rounded-3xl border border-white/5 flex flex-col justify-between shadow-2xl hover:border-white/20 transition-all duration-300 transform hover:scale-[1.02] cursor-pointer h-full">
      <p className="text-white/80 text-sm md:text-lg lg:text-xl font-medium leading-tight mb-6 md:mb-8">"{item.text}"</p>
      <div>
        <p className="text-white font-black uppercase tracking-widest text-[10px] md:text-xs mb-1">{item.author}</p>
        <p className="text-white/40 text-[9px] md:text-[10px] uppercase tracking-wider">{item.role}</p>
      </div>
    </div>
  </div>
);
