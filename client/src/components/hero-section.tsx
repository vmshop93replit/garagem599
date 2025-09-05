import { motion } from "framer-motion";
import { Calendar, MessageCircle } from "lucide-react";
import logoImage from "@assets/336f2e02-fa2f-41f1-930c-9e8ede8b8732_1757060047184.png";
import heroVideo from "@assets/Hailuo_Video_[Push out,Pedestal up,Tilt dow_420146180540747777 (1)_1757059198337.mp4";

export default function HeroSection() {
  const scrollToServices = () => {
    document.getElementById('servicos')?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video 
        autoPlay 
        muted 
        loop 
        playsInline 
        poster="https://images.unsplash.com/photo-1632823469387-7cc2f4f76d42?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>
      
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
          <div className="w-64 h-64 mx-auto mb-8 flex items-center justify-center">
            <img 
              src={logoImage} 
              alt="Garagem 599 Logo" 
              className="w-full h-full object-contain drop-shadow-2xl"
            />
          </div>
        </motion.div>
        
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-tech font-black text-foreground mb-6 leading-tight tracking-wider"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          ESTÉTICA AUTOMOTIVA
          <span className="text-primary block">PREMIUM</span>
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          Transformamos seu veículo com serviços especializados em estética, auto elétrica e som automotivo
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          <button 
            onClick={scrollToServices}
            className="btn-primary px-10 py-5 rounded-xl text-xl font-tech font-bold text-primary-foreground inline-flex items-center space-x-3 shadow-2xl tracking-wider transform hover:scale-110 transition-all duration-300"
            data-testid="button-agende-agora"
          >
            <span>🚀 AGENDE AGORA</span>
            <Calendar className="w-6 h-6" />
          </button>
          
          <a 
            href="https://wa.me/5512987092879" 
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-xl text-lg font-semibold text-foreground border border-border hover:border-primary transition-all duration-300 inline-flex items-center space-x-2"
            data-testid="link-whatsapp"
          >
            <span>WhatsApp</span>
            <MessageCircle className="w-5 h-5 text-green-500" />
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
