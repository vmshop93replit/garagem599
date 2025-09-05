import { motion } from "framer-motion";
import { Calendar, MessageCircle } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import logoImage from "@assets/336f2e02-fa2f-41f1-930c-9e8ede8b8732_1757060047184.png";
import heroVideo from "@assets/Hailuo_Video_[Push out,Pedestal up,Tilt dow_420146180540747777 (1)_1757059198337.mp4";
import lavagemVideo1 from "@assets/lavagemmotos_1757068070374.mp4";
import lavagemVideo2 from "@assets/lavagemmotos2_1757068070373.mp4";
import lavagemVideo3 from "@assets/lavagemmotos3_1757068070371.mp4";

export default function HeroSection() {
  const scrollToServices = () => {
    document.getElementById('servicos')?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  // Array de vídeos para rotação
  const videos = [
    heroVideo,
    lavagemVideo1,
    lavagemVideo2,
    lavagemVideo3,
  ];

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [nextVideoIndex, setNextVideoIndex] = useState(1);
  const [fadeState, setFadeState] = useState('in'); // 'in', 'out'
  const currentVideoRef = useRef<HTMLVideoElement>(null);
  const nextVideoRef = useRef<HTMLVideoElement>(null);

  // Função para gerar índice aleatório diferente do atual
  const getRandomVideoIndex = (currentIndex: number) => {
    const availableIndexes = videos.map((_, i) => i).filter(i => i !== currentIndex);
    return availableIndexes[Math.floor(Math.random() * availableIndexes.length)];
  };

  // Gerenciar transições de vídeo
  useEffect(() => {
    const interval = setInterval(() => {
      // Iniciar fade out
      setFadeState('out');
      
      setTimeout(() => {
        // Trocar vídeos e fazer fade in
        setCurrentVideoIndex(nextVideoIndex);
        setNextVideoIndex(getRandomVideoIndex(nextVideoIndex));
        setFadeState('in');
      }, 1500); // 1.5s para o fade out
      
    }, 12000); // Trocar vídeo a cada 12 segundos

    return () => clearInterval(interval);
  }, [nextVideoIndex]);

  // Preload do próximo vídeo
  useEffect(() => {
    if (nextVideoRef.current) {
      nextVideoRef.current.load();
    }
  }, [nextVideoIndex]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Video Background com Fade */}
      <div className="absolute inset-0">
        {/* Vídeo atual */}
        <video 
          ref={currentVideoRef}
          autoPlay 
          muted 
          loop 
          playsInline 
          poster="https://images.unsplash.com/photo-1632823469387-7cc2f4f76d42?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1500 ease-in-out ${
            fadeState === 'in' ? 'opacity-100' : 'opacity-0'
          }`}
          key={currentVideoIndex}
        >
          <source src={videos[currentVideoIndex]} type="video/mp4" />
        </video>

        {/* Próximo vídeo (preload) */}
        <video 
          ref={nextVideoRef}
          muted 
          loop 
          playsInline 
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover opacity-0 pointer-events-none"
          key={`next-${nextVideoIndex}`}
        >
          <source src={videos[nextVideoIndex]} type="video/mp4" />
        </video>
      </div>
      
      <div className="absolute inset-0 video-overlay"></div>
      
      <motion.div 
        className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <motion.div 
          className="mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 mx-auto mb-6 md:mb-8 flex items-center justify-center">
            <img 
              src={logoImage} 
              alt="Garagem 599 Logo" 
              className="w-full h-full object-contain drop-shadow-2xl"
            />
          </div>
        </motion.div>
        
        <motion.h1 
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-tech font-black text-foreground mb-4 md:mb-6 leading-tight tracking-wider"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          ESTÉTICA AUTOMOTIVA
          <span className="text-primary block">PREMIUM</span>
        </motion.h1>
        
        <motion.p 
          className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          Transformamos seu veículo com serviços especializados em estética, auto elétrica e som automotivo
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          <button 
            onClick={scrollToServices}
            className="btn-primary px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-xl text-lg sm:text-xl font-tech font-bold text-primary-foreground inline-flex items-center space-x-2 md:space-x-3 shadow-2xl tracking-wider transform hover:scale-105 transition-all duration-300 w-full sm:w-auto max-w-xs sm:max-w-none"
            data-testid="button-agende-agora"
          >
            <span>🚀 AGENDE AGORA</span>
            <Calendar className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          
          <a 
            href="https://wa.me/5512987092879" 
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold text-foreground border border-border hover:border-primary transition-all duration-300 inline-flex items-center space-x-2 w-full sm:w-auto max-w-xs sm:max-w-none justify-center"
            data-testid="link-whatsapp"
          >
            <span>WhatsApp</span>
            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
          </a>
        </motion.div>
        
        <motion.div 
          className="mt-12 animate-bounce"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.5 }}
        >
          <i className="fas fa-chevron-down text-primary text-2xl"></i>
        </motion.div>
      </motion.div>
    </section>
  );
}
