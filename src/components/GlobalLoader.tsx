import { useState, useEffect } from 'react';
import { useProgress } from '@react-three/drei';
import { Signature } from "@/components/ui/signature";

export default function GlobalLoader() {
  const { progress } = useProgress();
  const [visible, setVisible] = useState(() => {
    // Only show the splash screen if it hasn't been seen in this session
    return !sessionStorage.getItem('splash_seen');
  });
  const [isFading, setIsFading] = useState(false);
  const [mountedAt] = useState(Date.now());
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Mark as seen so returning from blog doesn't trigger it again
    if (visible) {
      sessionStorage.setItem('splash_seen', 'true');
    }
    
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [visible]);

  useEffect(() => {
    // Failsafe: Sempre some após 6s, garantindo tempo de sobra para a fonte carregar
    const failsafe = setTimeout(() => {
      setIsFading(true);
      setTimeout(() => setVisible(false), 1000);
    }, 6000);

    // Se o progresso 3D bater 100, aguardamos 4.5s no total.
    // Como a fonte pode demorar 1s para baixar, e a animação leva 2.5s, 4.5s é super seguro.
    if (progress === 100) {
      const elapsed = Date.now() - mountedAt;
      const remaining = Math.max(4500 - elapsed, 0);
      
      const timer = setTimeout(() => {
        setIsFading(true);
        setTimeout(() => setVisible(false), 1000); // 1 segundo de fade out
      }, remaining);
      
      return () => {
        clearTimeout(timer);
        clearTimeout(failsafe);
      };
    }

    return () => clearTimeout(failsafe);
  }, [progress, mountedAt]);

  if (!visible) return null;

  return (
    // z-[999999] garante que fique em cima de TUDO (incluindo logo e menu hamburguer)
    <div 
      className={`fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-[#050505] transition-opacity duration-1000 ${isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
    >
      <Signature
        text={decodeURIComponent(new URLSearchParams(window.location.search).get("name") || "Rafael Monteiro")}
        fontSize={isMobile ? 30 : 80}
        strokeWidth={isMobile ? 1.5 : 2}
        duration={2.5}
        color="#ffffff"
        fontUrl="/fonte/PinyonScript-Regular.ttf"
      />
    </div>
  );
}
