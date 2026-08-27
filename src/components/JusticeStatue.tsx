import { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, Html, useProgress } from '@react-three/drei';
import * as THREE from 'three';
import { Signature } from "@/components/ui/signature";
import { useInView } from 'framer-motion';

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center gap-2 pointer-events-none">
        <div className="w-10 h-10 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    </Html>
  );
}

function Model(props: any) {
  // Try loading the model. Ensure the space in the filename is handled by the browser.
  const gltf = useGLTF(`${import.meta.env.BASE_URL}estatua-draco.glb`);
  const group = useRef<THREE.Group>(null);
  
  // Apply a sophisticated metallic material to all meshes in the model
  useEffect(() => {
    // Material Prata Padrão (Corpo/Vestido)
    const silverMaterial = new THREE.MeshStandardMaterial({
      color: '#ffffff',
      metalness: 0.9,
      roughness: 0.3,
    });

    // Material Dourado (Espada, Balança, Faixa, Cabelo, Corda)
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: '#C5A880',
      metalness: 1.0,
      roughness: 0.15,
    });

    gltf.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const mesh = child as THREE.Mesh;
        const name = child.name.toLowerCase();
        
        // Vamos imprimir os nomes no console para descobrirmos os nomes exatos caso a cor não pegue.
        console.log("Mesh encontrada na estátua:", child.name);

        // Verifica se o nome da parte contém alguma dessas palavras chaves em Inglês ou Português
        if (
          name.includes('sword') || name.includes('espada') || name.includes('blade') ||
          name.includes('scale') || name.includes('balanca') || name.includes('peso') ||
          name.includes('blind') || name.includes('faixa') || name.includes('mask') ||
          name.includes('hair') || name.includes('cabelo') ||
          name.includes('rope') || name.includes('corda') || name.includes('fio')
        ) {
          mesh.material = goldMaterial;
        } else {
          mesh.material = silverMaterial;
        }
        
        // Disable auto-update for children to save CPU matrix calculations
        mesh.matrixAutoUpdate = false;
        mesh.updateMatrix();
      }
    });
  }, [gltf.scene]);

  useFrame((state) => {
    if (!group.current) return;
    
    // Lemos o quanto a tela já rolou para baixo (em pixels)
    const scrollY = window.scrollY;
    
    // Converte o scroll em rotação: 
    // Começa em 0 e vai até Math.PI/6 (que é o ângulo exato para ela ficar de frente)
    // Aos 100 pixels de rolagem, o giro já se completa (MUITO mais rápido).
    const scrollRotation = Math.min(scrollY / 100, 1) * (Math.PI / 6);
    
    // Se o mouse estiver do lado direito da tela, consideramos "hover".
    // Isso evita o uso de "Raycaster", que é o que causa o travamento gigantesco.
    const isHovered = state.pointer.x > 0.2;
    
    // Caso contrário, usamos a rotação base (-Math.PI/6) somada à rotação do scroll.
    const baseRotation = isHovered ? 0 : (-Math.PI / 6 + scrollRotation);
    
    // E somamos a leve rotação baseada no mouse APENAS se estiver com o mouse em cima
    const targetX = baseRotation + (isHovered ? (state.pointer.x * Math.PI) / 8 : 0); 
    const targetY = isHovered ? (state.pointer.y * Math.PI) / 10 : 0;
    
    // Aumentamos a velocidade do 'lerp' de 0.05 para 0.08 para ela responder mais rápido
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetX, 0.08);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -targetY, 0.08);
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={gltf.scene} />
    </group>
  );
}

// Preload the model in the background
useGLTF.preload(`${import.meta.env.BASE_URL}estatua-draco.glb`);

export default function JusticeStatue() {
  const [mount3D, setMount3D] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // O hook useInView detecta quando a seção principal (Hero) sai da tela.
  // Assim podemos pausar o motor 3D e economizar 100% de processamento.
  const isInView = useInView(containerRef);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Atrasamos a renderização da placa de vídeo em 5.5 segundos.
    // Isso garante que a Assinatura vai desenhar 100% fluida, 
    // e o Canvas só vai travar o navegador quando a tela já estiver livre e limpa!
    const timer = setTimeout(() => {
      setMount3D(true);
    }, 5500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none" style={{ width: '100%', height: '100%' }}>
      
      {/* Background Shader da Paper Design com Máscara */}
      {/* Usamos um WebkitMaskImage para fazer o Shader sumir suavemente do lado esquerdo (onde fica o texto) e aparecer só do lado direito (onde fica a estátua) */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-90"
        style={{
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, transparent 40%, black 80%, black 100%)',
          maskImage: 'linear-gradient(to right, transparent 0%, transparent 40%, black 80%, black 100%)'
        }}
      >
        {/* Fundo preto base */}
        <div className="absolute inset-0 bg-[#050505]" />
        
        {/* Luz pulsante laranja usando gradiente CSS puro (sem blur para não pesar GPU) */}
        <div className="absolute inset-0 flex items-center justify-end">
          <div 
            className="w-[1200px] h-[1200px] rounded-full opacity-60"
            style={{
              background: 'radial-gradient(circle, rgba(255,123,0,0.45) 0%, rgba(255,123,0,0) 70%)',
              transform: 'translate(20%, 0)',
              animation: 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite'
            }}
          />
        </div>
        
        {/* Camada de ruído estático super leve */}
        <div 
          className="absolute inset-0 opacity-[0.25] mix-blend-overlay pointer-events-none"
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
          }}
        />
      </div>

      {mount3D && (
        <Canvas 
          frameloop={isInView ? "always" : "never"}
          camera={{ position: [0, 0, 10], fov: 45 }} 
          dpr={1} 
          eventSource={document.body} 
          eventPrefix="client"
        >
          {/* Base Ambient Light */}
          <ambientLight intensity={0.1} />
          
          {/* Cinematic Studio Lighting Setup */}
          {/* Main Key Light (White) - Removido castShadow para dobrar a performance */}
          <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={2} color="#ffffff" />
          
          {/* Rim Light (Navy Blue) to separate from background */}
          <spotLight position={[-15, 5, -10]} angle={0.3} penumbra={1} intensity={3} color="#4246ce" />
          
          {/* Fill Light (Muted Gold) for warmth */}
          <spotLight position={[10, -5, 5]} angle={0.3} penumbra={1} intensity={1.5} color="#C5A880" />
          
          <Suspense fallback={null}>
            <Model position={[isMobile ? 1.5 : 5.5, isMobile ? -1.0 : -2.5, 0]} scale={isMobile ? 5.5 : 8} />
            <Environment preset="studio" />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}
