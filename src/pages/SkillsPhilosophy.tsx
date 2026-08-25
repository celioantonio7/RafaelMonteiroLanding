import { motion } from "framer-motion";
import FlowingMenu from "./FlowingMenu";

const skillCategories = [
  {
    link: "#",
    text: "Personalizado",
    items: [
      { name: "Estratégia Própria", url: "https://upload.wikimedia.org/wikipedia/commons/5/52/Free_logo.svg" },
      { name: "Análise Técnica", url: "https://upload.wikimedia.org/wikipedia/commons/5/52/Free_logo.svg" }
    ]
  },
  {
    link: "#",
    text: "Comunicação",
    items: [
      { name: "Cenário Claro", url: "https://upload.wikimedia.org/wikipedia/commons/5/52/Free_logo.svg" },
      { name: "Alternativas", url: "https://upload.wikimedia.org/wikipedia/commons/5/52/Free_logo.svg" }
    ]
  },
  {
    link: "#",
    text: "Prevenção",
    items: [
      { name: "Gestão de Riscos", url: "https://upload.wikimedia.org/wikipedia/commons/5/52/Free_logo.svg" },
      { name: "Segurança", url: "https://upload.wikimedia.org/wikipedia/commons/5/52/Free_logo.svg" }
    ]
  }
];

const SkillsPhilosophy = () => {
  return (
    // Unified layout using justify-center on all breakpoints to keep elements seamlessly grouped
    <section className="min-h-screen bg-white text-black font-sans flex flex-col justify-center">
      <div className="w-full px-6 md:px-12 lg:px-16 pt-24 pb-12 md:pt-12 md:pb-12 bg-white z-10 md:flex-shrink-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-5 gap-y-8"
        >
          <div className="md:col-span-1">
            <h2 className="text-xs font-bold uppercase tracking-widest">Diferenciais</h2>
          </div>
          <div className="md:col-span-4">
            <blockquote className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-black uppercase leading-tight">
              “Seu próximo passo merece uma decisão segura.”
            </blockquote>
            <p className="mt-6">— Dr. Rafael Monteiro</p>
          </div>
        </motion.div>
      </div>

      <div className="w-full border-t border-black relative overflow-hidden">
        <FlowingMenu
          items={skillCategories}
          speed={3}
          marqueeBgColor="#000000"
        />
      </div>
    </section>
  );
};

export default SkillsPhilosophy;