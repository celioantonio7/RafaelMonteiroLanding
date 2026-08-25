import { useState } from 'react';

export default function AnimatedLogo({ 
  baseText = "MONTEIRO", 
  hoverText = "MONTEIRO",
  className = "" 
}: { 
  baseText?: string, 
  hoverText?: string,
  className?: string
}) {
  const [isHovered, setIsHovered] = useState(false);
  const baseLetters = baseText.split("");
  const hoverLetters = hoverText.split("");
  const duration = 0.45;
  const stagger = 0.03;

  return (
    <div 
      className={`relative inline-block leading-[0.8] cursor-pointer group font-sans font-black tracking-tighter ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Grid overlaps the two spans perfectly and adjusts its width to the widest one */}
      <div className="grid">
        {/* Base Text (Solid Sans-serif) */}
        <span className="col-start-1 row-start-1 flex z-10 text-white justify-center">
          {baseLetters.map((char, i) => (
            <span 
              key={i} 
              className="inline-block transition-all ease-[cubic-bezier(0.2,0.8,0.2,1)]"
              style={{
                transitionDuration: `${duration}s`,
                transitionDelay: `${i * stagger}s`,
                opacity: isHovered ? 0 : 1,
                transform: isHovered ? 'translateY(-0.05em)' : 'translateY(0)',
                width: char === ' ' ? '0.25em' : 'auto'
              }}
            >
              {char}
            </span>
          ))}
        </span>

        {/* Alt Text (Outline Serif) */}
        <span 
          className="col-start-1 row-start-1 flex z-20 pointer-events-none justify-center"
          style={{
            fontFamily: '"Bodoni Moda", "Times New Roman", serif',
            WebkitTextStroke: 'min(1px, 0.02em) white', // Uses em for scaling on huge text
            WebkitTextFillColor: 'transparent',
            color: 'transparent'
          }}
        >
          {hoverLetters.map((char, i) => (
            <span 
              key={i} 
              className="inline-block transition-all ease-[cubic-bezier(0.2,0.8,0.2,1)]"
              style={{
                transitionDuration: `${duration}s`,
                transitionDelay: `${i * stagger}s`,
                opacity: isHovered ? 1 : 0,
                transform: isHovered ? 'translateY(-0.05em)' : 'translateY(0.15em)',
                width: char === ' ' ? '0.25em' : 'auto'
              }}
            >
              {char}
            </span>
          ))}
        </span>
      </div>

      {/* The ® symbol */}
      <span 
        className="absolute top-0 -right-4 md:-right-6 text-[0.4em] font-medium text-white transition-opacity duration-300" 
        style={{ opacity: isHovered ? 0 : 1, marginTop: '-0.25rem' }}
      >
        ®
      </span>
    </div>
  );
}
