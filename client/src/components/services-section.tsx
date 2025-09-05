import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { services } from "@/lib/services";
import type { Service } from "@/lib/services";
import { useState, useEffect } from "react";
import lavagemVideo from "@assets/lavagem_1757071025648.mp4";

interface ServicesSectionProps {
  onServiceSelect: (service: Service) => void;
}

export default function ServicesSection({ onServiceSelect }: ServicesSectionProps) {
  const [isUserFocused, setIsUserFocused] = useState(false);
  const [lastScrollTime, setLastScrollTime] = useState(Date.now());

  // Detectar quando usuário para de rolar para focar no conteúdo
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    
    const handleScroll = () => {
      setLastScrollTime(Date.now());
      setIsUserFocused(false);
      
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsUserFocused(true);
      }, 1500); // Usuário parado por 1.5s = focado
    };

    const handleMouseEnter = () => setIsUserFocused(true);
    const handleMouseLeave = () => setIsUserFocused(false);

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <section id="servicos" className="relative py-12 overflow-hidden">
      {/* Video Background Dinâmico */}
      <video 
        autoPlay 
        muted 
        loop 
        playsInline 
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
          isUserFocused ? 'opacity-15' : 'opacity-40'
        }`}
        onError={(e) => console.error('Erro no vídeo services:', e)}
      >
        <source src={lavagemVideo} type="video/mp4" />
      </video>
      
      <div className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
        isUserFocused 
          ? 'bg-gradient-to-b from-background/95 to-secondary/50' 
          : 'bg-gradient-to-b from-background/80 to-secondary/30'
      }`}></div>
      
      {/* Gradientes de transição suave */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background via-background/50 to-transparent z-5"></div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/50 to-transparent z-5"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-tech font-bold text-foreground mb-4 tracking-wider">
            NOSSOS <span className="text-primary">SERVIÇOS</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Gama completa de serviços especializados para seu veículo
          </p>
        </motion.div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="service-card rounded-xl p-4 cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              onClick={() => onServiceSelect(service)}
              data-testid={`service-card-${service.id}`}
            >
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-24 sm:h-32 object-cover rounded-lg mb-2 sm:mb-3"
                loading={index < 4 ? "eager" : "lazy"}
              />
              <h3 className="text-sm sm:text-base font-tech font-semibold text-foreground mb-1 sm:mb-2 leading-tight">{service.name}</h3>
              <p className="text-muted-foreground mb-2 sm:mb-3 text-xs leading-tight">{service.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-primary font-semibold" data-testid={`service-price-${service.id}`}>
                  {service.price}
                </span>
                <span className="text-accent text-sm flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {service.duration}h
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
