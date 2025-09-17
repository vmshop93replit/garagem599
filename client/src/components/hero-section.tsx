import { motion } from "framer-motion";
import { Calendar, MessageCircle } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import logoImage from "/src/assets/images/logo.png";
import heroVideo from "@assets/herovideo_1757060165568.mp4";

export default function HeroSection() {
  const scrollToServices = () => {
    document.getElementById('servicos')?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasVideo, setHasVideo] = useState(false);
  const [isLooping, setIsLooping] = useState(false);

  useEffect(() => {
    // Safety timeout: if video doesn't load within 3 seconds, use fallback
    const timeout = setTimeout(() => {
      if (videoRef.current && videoRef.current.readyState < 2) {
        setHasVideo(false);
      }
    }, 3000);

    // Check for reduced motion preference
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setHasVideo(false);
    }

    return () => clearTimeout(timeout);
  }, []);

  // Gerenciar o listener do timeupdate para smooth loop
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !hasVideo) return;

    const handleTimeUpdate = () => {
      const duration = video.duration;
      const currentTime = video.currentTime;
      
      // Otimizar setState apenas quando necessário
      setIsLooping(prev => {
        const shouldLoop = currentTime >= duration - 0.5;
        const shouldNotLoop = currentTime <= 0.5;
        
        if (prev && shouldNotLoop) return false;
        if (!prev && shouldLoop) return true;
        return prev;
      });
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, [hasVideo]);

  const handleVideoCanPlay = () => {
    if (videoRef.current) {
      videoRef.current.play().then(() => {
        setHasVideo(true);
      }).catch(() => {
        setHasVideo(false);
      });
    }
  };

  const handleVideoError = () => {
    setHasVideo(false);
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Video Background Principal */}
      <video 
        ref={videoRef}
        autoPlay 
        muted 
        loop 
        playsInline 
        preload="metadata"
        poster="https://images.unsplash.com/photo-1632823469387-7cc2f4f76d42?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080"
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
          hasVideo ? (isLooping ? 'opacity-95' : 'opacity-100') : 'opacity-0'
        }`}
        onCanPlay={handleVideoCanPlay}
        onPlaying={() => setHasVideo(true)}
        onError={handleVideoError}
        onAbort={handleVideoError}
        onStalled={handleVideoError}
        onEmptied={handleVideoError}
        style={{ 
          display: hasVideo ? 'block' : 'none',
          filter: isLooping ? 'brightness(0.95)' : 'brightness(1)'
        }}
      >
        <source src={heroVideo} type="video/mp4" />
      </video>
      
      {/* Fallback background - always present, shown when video fails */}
      <div 
        className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-500 ${
          hasVideo ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1632823469387-7cc2f4f76d42?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080)'
        }}
      />
      
      {/* Overlay para mascarar watermark e melhorar contraste */}
      <div className="absolute inset-0 bg-black/20 z-[1]"></div>
      
      {/* Watermark solution - Gradiente responsivo para cobrir marca d'água da IA */}
      <div className="absolute bottom-0 left-0 right-0 w-full h-[160px] sm:h-[120px] md:h-[80px] bg-gradient-to-t from-background via-background/98 to-transparent z-[5] pointer-events-none"></div>
      
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
