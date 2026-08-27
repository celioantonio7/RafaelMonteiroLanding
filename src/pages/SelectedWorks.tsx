import { useEffect, useRef, useCallback, useState } from "react";
import { useLenis } from "lenis/react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import StarBorder from "../components/StarBorder";
import './ScrollStack.css';

const projects = [
  {
    id: "001",
    title: "Direito Empresarial",
    stack: "Monteiro Advocacia",
    description: "Assessoria jurídica contenciosa e consultiva estratégica voltada para o mercado corporativo. Focamos na mitigação de riscos, estruturação societária, recuperação de crédito, e mediação de conflitos empresariais com alta eficiência para garantir o pleno funcionamento do seu negócio.",
    links: { live: "#", code: "#" },
    image: `${import.meta.env.BASE_URL}p1.webp`,
    bgColor: "#0a0a0a", // Preto
    cta: "Saiba mais",
    details: {
      intro: "O Monteiro Advocacia atua como um parceiro estratégico do seu negócio, convertendo riscos legais em oportunidades seguras de crescimento. Nossa expertise engloba desde a modelagem societária e contratual até a mais dura representação em litígios corporativos.",
      sections: [
        { subtitle: "Soluções Estratégicas", text: "Desenhamos estruturas jurídicas sob medida para operações complexas de M&A, joint ventures e reorganizações societárias, garantindo compliance e proteção dos sócios." },
        { subtitle: "Seu Aliado Corporativo", text: "Muito mais que advogados, somos conselheiros de negócios. Trabalhamos lado a lado com CEOs e Diretorias para blindar a operação contra passivos ocultos e otimizar a carga tributária." },
        { subtitle: "Desafios Comuns", text: "Impulsionamento de recuperação de crédito, disputas entre sócios (litígios societários), adequação rigorosa à LGPD e reestruturação de dívidas." },
        { subtitle: "Compromisso de Excelência", text: "Tratamos os interesses da sua empresa como nossos, agindo preventivamente para evitar desgastes financeiros e preservar a saúde a longo prazo da companhia." }
      ]
    }
  },
  {
    id: "002",
    title: "Direito Contratual",
    stack: "Monteiro Advocacia",
    description: "Elaboração, revisão minuciosa e análise crítica de contratos complexos. Protegemos os interesses dos nossos clientes criando mecanismos de segurança jurídica inquebráveis, prevenindo litígios futuros e assegurando que todas as cláusulas estejam alinhadas à legislação vigente e aos objetivos do negócio.",
    links: { live: "#", code: "#" },
    image: `${import.meta.env.BASE_URL}p2.webp`,
    bgColor: "#d95d14", // Laranja
    cta: "Saiba mais",
    details: {
      intro: "No Monteiro Advocacia, sabemos que um contrato bem redigido é a primeira linha de defesa do seu patrimônio. Nós criamos arquiteturas contratuais inquebráveis que refletem com exatidão as intenções das partes e mitigam os riscos de interpretação dúbia.",
      sections: [
        { subtitle: "Blindagem e Segurança", text: "Revisamos minunciosamente cada cláusula de acordos operacionais, garantias, acordos de confidencialidade (NDA) e memorandos de entendimento (MoU)." },
        { subtitle: "Antecipação de Conflitos", text: "Nossa redação prevê cenários adversos, estipulando penalidades justas e cláusulas de saída (exit) bem delineadas, evitando a judicialização de desacordos comerciais." },
        { subtitle: "Flexibilidade Negocial", text: "Oferecemos assessoria em mesas de negociação. Traduzimos as demandas comerciais para uma linguagem jurídica robusta, equilibrando os interesses com segurança." }
      ]
    }
  },
  {
    id: "003",
    title: "Direito Civil",
    stack: "Monteiro Advocacia",
    description: "Atuação robusta em demandas patrimoniais, obrigações civis, planejamento sucessório e reparação por responsabilidade civil. Defendemos ativamente o patrimônio e os interesses individuais de nossos clientes através de negociações avançadas e representação judicial de alto padrão.",
    links: { live: "#", code: "#" },
    image: `${import.meta.env.BASE_URL}p3.webp`,
    bgColor: "#1a365d", // Azul
    cta: "Saiba mais",
    details: {
      intro: "O Monteiro Advocacia se destaca na mediação desses desafios, transformando complexidades legais em soluções claras. Nossa expertise abrange desde a negociação de obrigações civis até a representação em litígios, sempre com o objetivo de proteger seus interesses.",
      sections: [
        { subtitle: "Soluções Personalizadas", text: "Cada caso é único. Seja na busca por justiça em casos de responsabilidade civil, ou na orientação segura em processos de sucessão, estamos ao seu lado com total transparência." },
        { subtitle: "Seu Aliado no Direito Civil", text: "Você tem mais do que representação legal; você tem um aliado comprometido em garantir que seus direitos sejam defendidos e que você alcance resultados eficientes com mínimo estresse." },
        { subtitle: "Desafios Comuns", text: "Disputas contratuais, responsabilidade civil envolvendo danos morais/materiais, questões patrimoniais e organização de sucessões e inventários." },
        { subtitle: "Compromisso e Ética", text: "Nossa atuação é pautada pela ética e excelência, seja extrajudicialmente ou em processos complexos, buscando constantemente a excelência na prestação de serviços." }
      ]
    }
  },
  {
    id: "004",
    title: "Direito Imobiliário",
    stack: "Monteiro Advocacia",
    description: "Consultoria e assessoria completa em transações imobiliárias de alto valor. Desde a due diligence, confecção de contratos de compra e venda, usucapião, até a resolução de conflitos condominiais e locatícios, garantindo total transparência e segurança do seu patrimônio imobiliário.",
    links: { live: "#", code: "#" },
    image: `${import.meta.env.BASE_URL}p4.webp`,
    bgColor: "#b7950b", // Amarelo
    cta: "Saiba mais",
    details: {
      intro: "A segurança jurídica em transações de alto valor é inegociável. O Monteiro Advocacia promove uma análise minuciosa de todo o processo imobiliário, da aprovação da documentação até o registro definitivo, garantindo a solidez do seu investimento.",
      sections: [
        { subtitle: "Due Diligence Extensiva", text: "Realizamos o levantamento completo de certidões, análise de riscos ambientais e passivos tributários atrelados ao imóvel, mitigando ameaças ao comprador ou vendedor." },
        { subtitle: "Estruturação de Negócios", text: "Assessoria na formatação jurídica de incorporações imobiliárias, loteamentos, fundos de investimento imobiliário (FII) e contratos de built-to-suit." },
        { subtitle: "Regularização Patrimonial", text: "Atuação ágil em ações de usucapião (judicial e extrajudicial), retificação de área e desmembramento, trazendo liquidez a ativos antes paralisados." }
      ]
    }
  },
];

interface ScrollStackCardProps {
  project: typeof projects[0];
  index: number;
  onOpenModal: (project: typeof projects[0]) => void;
}

const ScrollStackCard = ({ project, index, onOpenModal }: ScrollStackCardProps) => {
  return (
    <StarBorder
      as="div"
      className="scroll-stack-card"
      color={project.id === "001" ? "#333333, #555555" : `${project.bgColor}, ${project.bgColor}`}
    >
      <div className="card-top-row">
        <div className="id-brand-group">
          <span className="huge-number">{project.id}</span>
          <div className="client-info">
            <span className="label">{project.title}</span>
            <span className="client-name">{project.stack}</span>
          </div>
        </div>

        <StarBorder
          as="button"
          onClick={() => onOpenModal(project)}
          className="live-btn-star hover:opacity-80 transition-opacity cursor-pointer"
          color={project.id === "001" ? "#ffffff, #cccccc" : `${project.bgColor}, ${project.bgColor}`}
        >
          {project.cta}
        </StarBorder>
      </div>

      <div className="content-grid">
        <div 
          className="image-container" 
          style={{ backgroundColor: project.bgColor || 'transparent' }}
        >
          <img
            src={project.image}
            className="main-image w-full h-full object-contain mix-blend-normal"
            alt={project.title}
            onLoad={() => window.dispatchEvent(new Event('resize'))}
          />
        </div>
        <div className="project-description">
          <p>{project.description}</p>
        </div>
      </div>
    </StarBorder>
  );
};

const BASE_CONFIG = {
  itemDistance: 100,
  itemScale: 0.015,
  itemStackDistance: 18,
  stackPosition: 0.08,
  scaleEndPosition: 0.05,
  baseScale: 0.92,
};

const SelectedWorks = () => {
  const cardsRef = useRef<HTMLElement[]>([]);
  const cardOffsetsRef = useRef<number[]>([]);
  const endOffsetRef = useRef<number>(0);
  const stackInnerRef = useRef<HTMLDivElement>(null);
  const stackInnerTopRef = useRef<number>(0);
  const voidContainerRef = useRef<HTMLDivElement>(null);
  const kineticWheelRef = useRef<HTMLDivElement>(null);
  const threadPathRef = useRef<SVGPathElement>(null);
  const figureGroupRef = useRef<SVGGElement>(null);
  const threadLenRef = useRef(0);

  // Refs for Typography animation
  const textAnalyzeRef = useRef<SVGTextElement>(null);
  const textDesignRef = useRef<SVGTextElement>(null);
  const textBuildRef = useRef<SVGTextElement>(null);
  const textDeliverRef = useRef<SVGTextElement>(null);

  const [ready, setReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const lenis = useLenis(({ scroll }) => {
    if (!ready) return;

    const cards = cardsRef.current;
    const cardOffsets = cardOffsetsRef.current;
    const endElementTop = endOffsetRef.current;
    const stackInnerTop = stackInnerTopRef.current;

    if (!cards.length || !cardOffsets.length) return;

    const containerHeight = window.innerHeight;
    const firstCardHeight = cards[0].offsetHeight;

    const stackPositionPx = (containerHeight - firstCardHeight) / 2;
    const scaleEndPositionPx = stackPositionPx - (BASE_CONFIG.stackPosition - BASE_CONFIG.scaleEndPosition) * containerHeight;

    const lastCardTop = cardOffsets[cards.length - 1];
    const triggerEndLast = lastCardTop - scaleEndPositionPx;

    const voidStart = triggerEndLast;
    const voidDistance = containerHeight * 1.2;
    let voidProgress = 0;

    if (scroll > voidStart) {
      voidProgress = (scroll - voidStart) / voidDistance;
      voidProgress = Math.min(Math.max(voidProgress, 0), 1);
    }

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      const cardTop = cardOffsets[i];
      const triggerStart = cardTop - stackPositionPx - BASE_CONFIG.itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = triggerStart;
      const pinEnd = Math.max(endElementTop - containerHeight * 0.5, voidStart + voidDistance);

      let scaleProgress = 0;
      if (scroll >= triggerEnd) {
        scaleProgress = 1;
      } else if (scroll > triggerStart) {
        scaleProgress = (scroll - triggerStart) / (triggerEnd - triggerStart);
      }

      scaleProgress = Math.min(Math.max(scaleProgress, 0), 1);

      const targetScale = BASE_CONFIG.baseScale + i * BASE_CONFIG.itemScale;
      const scale = Number((1 - scaleProgress * (1 - targetScale)).toFixed(4));

      let translateY = 0;
      if (scroll >= pinStart && scroll <= pinEnd) {
        translateY = scroll - cardTop + stackPositionPx + BASE_CONFIG.itemStackDistance * i;
      } else if (scroll > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + BASE_CONFIG.itemStackDistance * i;
      }

      card.style.transform = `translate3d(0, ${Math.round(translateY * 10) / 10}px, 0) scale(${scale})`;
    }

    const voidContainer = voidContainerRef.current;
    const stackInner = stackInnerRef.current;

    if (voidContainer && stackInner) {
      const originY = scroll + containerHeight / 2 - stackInnerTop;
      stackInner.style.perspectiveOrigin = `50% ${originY}px`;
      stackInner.style.perspective = '1500px';

      if (voidProgress > 0) {
        if (isMobile) {
          const fadeOutProgress = Math.min(voidProgress / 0.25, 1);
          const currentOpacity = 1 - fadeOutProgress;

          voidContainer.style.transformOrigin = `50% ${originY}px`;
          voidContainer.style.transform = `translate3d(0, 0, 0) scale(1)`;
          voidContainer.style.opacity = Math.max(0, currentOpacity).toFixed(3);

          if (fadeOutProgress >= 1) {
            voidContainer.style.visibility = 'hidden';
          } else {
            voidContainer.style.visibility = 'visible';
          }
        } else {
          const easeScale = Math.pow(voidProgress, 1.5);
          const currentZ = -easeScale * 3000;
          const currentScale = 1 - easeScale;
          const currentOpacity = 1 - Math.pow(voidProgress, 2.5);

          voidContainer.style.transformOrigin = `50% ${originY}px`;
          voidContainer.style.transform = `translate3d(0, 0, ${currentZ}px) scale(${Math.max(0, currentScale).toFixed(4)})`;
          voidContainer.style.opacity = Math.max(0, currentOpacity).toFixed(3);

          if (voidProgress >= 1) {
            voidContainer.style.visibility = 'hidden';
          } else {
            voidContainer.style.visibility = 'visible';
          }
        }
      } else {
        voidContainer.style.transformOrigin = '';
        voidContainer.style.transform = '';
        voidContainer.style.opacity = '1';
        voidContainer.style.visibility = 'visible';
      }
    }

    const thread = threadPathRef.current;
    const threadLen = threadLenRef.current;

    if (thread && threadLen > 0 && isMobile) {
      let drawP = 0;
      if (voidProgress > 0.2) {
        drawP = (voidProgress - 0.2) / 0.8;
      }
      drawP = Math.min(Math.max(drawP, 0), 1);
      thread.style.strokeDasharray = `${threadLen}`;
      thread.style.strokeDashoffset = `${(threadLen * (1 - drawP)).toFixed(2)}`;

      // Flashlight Typography Animation
      const animateText = (ref: React.RefObject<SVGTextElement>, targetP: number) => {
        if (!ref.current) return;
        const threshold = 0.15; // Width of the "flashlight" beam
        const dist = Math.abs(drawP - targetP);
        let intensity = 0;

        if (dist < threshold) {
          intensity = 1 - (dist / threshold); // Scales from 0 to 1 based on proximity
        }

        const opacity = 0.3 + (0.7 * intensity); // Base 30% opacity, flares to 100%
        const scale = 1 + (0.05 * intensity); // Slight pop in size

        ref.current.style.opacity = opacity.toFixed(2);
        ref.current.style.transform = `scale(${scale})`;
        ref.current.style.transformOrigin = 'center';
        ref.current.style.transformBox = 'fill-box';
      };

      // Recalibrated thresholds for the new S-Curve ribbon
      animateText(textAnalyzeRef, 0.04);
      animateText(textDesignRef, 0.20);
      animateText(textBuildRef, 0.40);
      animateText(textDeliverRef, 0.60);
    }

    const kineticWheel = kineticWheelRef.current;
    if (kineticWheel) {
      if (scroll > endElementTop + containerHeight * 1.2 + containerHeight * 0.2) {
        kineticWheel.style.display = 'none';
        kineticWheel.style.visibility = 'hidden';
      } else if (voidProgress > 0) {
        kineticWheel.style.display = 'block';
        kineticWheel.style.visibility = 'visible';

        if (isMobile) {
          let figOpacity = 0;
          if (voidProgress <= 0.25) {
            figOpacity = 0.5 * (voidProgress / 0.25);
          } else if (voidProgress <= 0.5) {
            figOpacity = 0.5 + 0.5 * ((voidProgress - 0.25) / 0.25);
          } else {
            figOpacity = 1;
          }

          kineticWheel.style.opacity = figOpacity.toFixed(3);
          kineticWheel.style.transform = `translate3d(0, 0, 0)`;

          if (figureGroupRef.current) {
            if (voidProgress >= 0.8) {
              const textFade = 1 - ((voidProgress - 0.8) / 0.2);
              figureGroupRef.current.style.opacity = Math.max(0, textFade).toFixed(3);
            } else {
              figureGroupRef.current.style.opacity = '1';
            }
          }
        } else {
          kineticWheel.style.opacity = Math.min(voidProgress * 4, 1).toFixed(3);
          const targetRotation = 180 * (1 - voidProgress);
          kineticWheel.style.transformOrigin = '50% 100%';
          kineticWheel.style.transform = `rotate(${targetRotation}deg)`;
        }
      } else {
        kineticWheel.style.display = 'block';
        kineticWheel.style.opacity = '0';
        kineticWheel.style.visibility = 'hidden';
        if (isMobile) {
          kineticWheel.style.transform = `translate3d(0, 0, 0)`;
          if (figureGroupRef.current) figureGroupRef.current.style.opacity = '1';
        } else {
          kineticWheel.style.transform = `rotate(180deg)`;
        }
      }
    }
  });

  const cachePositions = useCallback(() => {
    setReady(false);
    const cards = Array.from(document.querySelectorAll('.scroll-stack-card')) as HTMLElement[];
    cardsRef.current = cards;
    cards.forEach(card => card.style.transform = '');
    if (voidContainerRef.current) {
      voidContainerRef.current.style.transform = '';
      voidContainerRef.current.style.transformOrigin = '';
    }
    if (kineticWheelRef.current) kineticWheelRef.current.style.transform = '';

    if (threadPathRef.current && isMobile) {
      try {
        const len = threadPathRef.current.getTotalLength();
        if (len > 0) {
          threadLenRef.current = len;
          threadPathRef.current.style.strokeDasharray = `${len}`;
          threadPathRef.current.style.strokeDashoffset = `${len}`;
        }
      } catch (e) { }
    }

    const scrollY = window.scrollY;
    cardOffsetsRef.current = cards.map(card => card.getBoundingClientRect().top + scrollY);
    const endElement = document.querySelector('.scroll-stack-end') as HTMLElement;
    if (endElement) endOffsetRef.current = endElement.getBoundingClientRect().top + scrollY;
    if (stackInnerRef.current) stackInnerTopRef.current = stackInnerRef.current.getBoundingClientRect().top + scrollY;
    setReady(true);
  }, [isMobile]);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [selectedProject]);

  const calculateAndRender = useCallback(() => {
    cachePositions();
  }, [cachePositions]);

  useEffect(() => {
    const cards = Array.from(document.querySelectorAll('.scroll-stack-card')) as HTMLElement[];
    cards.forEach((card, i) => {
      if (i < cards.length - 1) card.style.marginBottom = `${BASE_CONFIG.itemDistance}px`;
      card.style.willChange = 'transform';
      card.style.transformOrigin = 'top center';
    });
    const resizeObserver = new ResizeObserver(() => calculateAndRender());
    cards.forEach((card) => resizeObserver.observe(card));
    calculateAndRender();
    const initTimer = setTimeout(calculateAndRender, 100);
    window.addEventListener('resize', calculateAndRender, { passive: true });
    return () => {
      clearTimeout(initTimer);
      resizeObserver.disconnect();
      window.removeEventListener('resize', calculateAndRender);
    };
  }, [calculateAndRender]);

  return (
    <section className="min-h-screen bg-black text-white font-sans relative">
      <div className="w-full h-[25vh] md:h-[25vh] lg:h-[70vh] border-b border-white/20 overflow-hidden flex items-center relative z-10 bg-black">
        <div className="marquee-selected-works">
          <div className="marquee-selected-works__track">
            {[0, 1, 2, 3].map((blockIndex) => (
              <div key={blockIndex} className="marquee-selected-works__segment" aria-hidden={blockIndex > 0 ? "true" : undefined}>
                <span className="marquee-selected-works__text">Áreas de Atuação</span>
                <span className="marquee-selected-works__dash">—</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div ref={stackInnerRef} className="scroll-stack-inner px-6 md:px-12 lg:px-16" style={{ transformStyle: 'preserve-3d' }}>
        <div ref={voidContainerRef} className="void-container relative w-full flex flex-col items-center justify-center" style={{ willChange: 'transform, opacity', transformStyle: 'preserve-3d' }}>
          {projects.map((project, index) => (
            <ScrollStackCard key={project.id} project={project} index={index} onOpenModal={setSelectedProject} />
          ))}
        </div>
        <div className={`scroll-stack-end pointer-events-none h-[120vh]`} />
      </div>

      <div ref={kineticWheelRef} className="kinetic-wheel pointer-events-none" style={{
        position: 'fixed',
        top: isMobile ? '50%' : 'auto',
        bottom: isMobile ? 'auto' : '-18vh',
        left: '0',
        width: '100vw',
        height: isMobile ? '100vw' : 'auto',
        marginTop: isMobile ? 'calc(-50vw)' : '0',
        zIndex: 0,
        visibility: 'hidden',
        opacity: 0,
        willChange: 'transform, opacity',
      }}>
        {isMobile ? (
          <svg viewBox="0 0 1500 2000" className="w-full h-full" style={{ overflow: 'visible' }}>
            <defs>
              <linearGradient id="line-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                <stop offset="15%" stopColor="rgba(255,255,255,0.7)" />
                <stop offset="85%" stopColor="rgba(255,255,255,0.7)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </linearGradient>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="8" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Sweeping S-Curve (Winding Ribbon) */}
            <path
              ref={threadPathRef}
              d="M 750,0 L 750,250 C 750,550 250,500 250,800 C 250,1100 1250,1050 1250,1350 C 1250,1650 750,1600 750,1900 L 750,3000"
              fill="none"
              stroke="url(#line-gradient)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <g ref={figureGroupRef}>
              <text ref={textAnalyzeRef} x="750" y="150" fill="#ffffff" style={{ fontFamily: 'sans-serif', fontWeight: 800, fontSize: '100px', opacity: 0.3 }} textAnchor="middle" dy=".3em">CONSULTA</text>
              <circle cx="750" cy="250" r="15" fill="#ffffff" filter="url(#glow)" />

              <text ref={textDesignRef} x="250" y="700" fill="#ffffff" style={{ fontFamily: 'sans-serif', fontWeight: 800, fontSize: '100px', opacity: 0.3 }} textAnchor="middle" dy=".3em">ANÁLISE</text>
              <circle cx="250" cy="800" r="15" fill="#ffffff" filter="url(#glow)" />

              <text ref={textBuildRef} x="1250" y="1250" fill="#ffffff" style={{ fontFamily: 'sans-serif', fontWeight: 800, fontSize: '100px', opacity: 0.3 }} textAnchor="middle" dy=".3em">ESTRATÉGIA</text>
              <circle cx="1250" cy="1350" r="15" fill="#ffffff" filter="url(#glow)" />

              <text ref={textDeliverRef} x="750" y="1800" fill="#ffffff" style={{ fontFamily: 'sans-serif', fontWeight: 800, fontSize: '100px', opacity: 0.3 }} textAnchor="middle" dy=".3em">ATUAÇÃO</text>
              <circle cx="750" cy="1900" r="20" fill="#ffffff" filter="url(#glow)" />
            </g>
          </svg>
        ) : (
          <svg viewBox="0 0 3000 1500" className="w-full h-auto" style={{ overflow: 'visible' }}>
            <path id="arc-path" d="M 400,1500 A 1100,1100 0 0,1 2600,1500" fill="none" stroke="none" />
            {[
              { text: 'CONSULTA', offset: '15%' }, { text: '●', offset: '27%' },
              { text: 'ANÁLISE', offset: '38%' }, { text: '●', offset: '50%' },
              { text: 'ESTRATÉGIA', offset: '62%' }, { text: '●', offset: '73%' },
              { text: 'ATUAÇÃO', offset: '85%' },
            ].map((item, i) => (
              <text key={i} fill="#ffffff" style={{ fontFamily: 'sans-serif', fontWeight: 800, fontSize: item.text === '●' ? '50px' : '100px', textTransform: 'uppercase' }} dy={item.text === '●' ? '-18' : '0'}>
                <textPath href="#arc-path" startOffset={item.offset} textAnchor="middle">{item.text}</textPath>
              </text>
            ))}
          </svg>
        )}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 md:p-8"
          >
            <motion.div
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              data-lenis-prevent="true"
              className="bg-[#050505] border border-white/10 shadow-2xl p-8 md:p-12 max-w-3xl w-full max-h-[85vh] overflow-y-auto relative rounded-xl text-white flex flex-col no-scrollbar"
            >
              <button 
                onClick={() => setSelectedProject(null)} 
                className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors group p-2 bg-white/5 hover:bg-white/10 rounded-full"
              >
                <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
              </button>
              
              <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase tracking-tighter cursor-default">
                {selectedProject.title.split('').map((char, index) => (
                  <motion.span 
                    key={index}
                    whileHover={{ scale: 1.2, color: selectedProject.bgColor }}
                    className="inline-block transition-colors duration-200"
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </h2>
              
              <div className="space-y-8 text-sm md:text-base text-white/70 leading-relaxed font-light mt-2">
                <p className="text-white text-lg md:text-xl font-medium leading-snug">
                  {selectedProject.details.intro}
                </p>
                <div className="h-[1px] w-full bg-white/10" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {selectedProject.details.sections.map((sec, idx) => (
                    <div key={idx} className="group">
                      <h3 className="text-white font-bold mb-3 uppercase tracking-widest text-xs group-hover:text-primary transition-colors flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: selectedProject.bgColor }}></span>
                        {sec.subtitle}
                      </h3>
                      <p className="opacity-80 group-hover:opacity-100 transition-opacity">{sec.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default SelectedWorks;