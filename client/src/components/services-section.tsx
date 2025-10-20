import { motion, AnimatePresence } from "framer-motion";
import { Clock, Car, Bike, Sparkles, ChevronRight } from "lucide-react";
import { services } from "@/lib/services";
import type { Service, VehicleType } from "@/lib/services";
import { useState, useEffect, useMemo, useRef } from "react";
// Novos vídeos para Services
import lavagemMotos2Video from "@assets/lavagemmotos2_1757120321564.mp4";
import lavagemMotos3Video from "@assets/lavagemmotos3_1757120321565.mp4";
import carro2Video from "@assets/carro2_1757120321563.mp4";

interface ServicesSectionProps {
  onServiceSelect: (service: Service) => void;
}

export default function ServicesSection({ onServiceSelect }: ServicesSectionProps) {
  const [isUserFocused, setIsUserFocused] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleType>('car');
  const [hasVideo, setHasVideo] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Arrays de vídeos por tipo de veículo
  const carVideos = useMemo(() => [
    carro2Video
  ], []);
  
  const motoVideos = useMemo(() => [
    lavagemMotos2Video,
    lavagemMotos3Video
  ], []);
  
  // Selecionar vídeos baseado no veículo ativo
  const servicesVideos = useMemo(() => {
    return selectedVehicle === 'moto' ? motoVideos : carVideos;
  }, [selectedVehicle, carVideos, motoVideos]);

  // Filtrar serviços baseado no veículo selecionado
  const filteredServices = useMemo(() => {
    return services.filter(service => 
      service.vehicleType === selectedVehicle || service.vehicleType === 'both'
    );
  }, [selectedVehicle]);

  // Detectar quando usuário para de rolar para focar no conteúdo
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    
    const handleScroll = () => {
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
  
  // Reset video index quando mudar tipo de veículo
  useEffect(() => {
    setCurrentVideo(0);
  }, [selectedVehicle]);

  // Safety timeout and reduced motion check
  useEffect(() => {
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
  }, [selectedVehicle, currentVideo]);

  const handleVideoCanPlay = () => {
    if (videoRef.current) {
      const playbackRate = selectedVehicle === 'moto' ? 0.7 : 1.0;
      videoRef.current.playbackRate = playbackRate;
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
  
  // Sistema de rotação automática de vídeos - simplificado
  useEffect(() => {
    if (!isUserFocused || servicesVideos.length <= 1) return;
    
    const videoInterval = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % servicesVideos.length);
    }, 12000); // Troca vídeo a cada 12 segundos (mais tempo para observar)
    
    return () => clearInterval(videoInterval);
  }, [isUserFocused, servicesVideos.length]);

  return (
    <section id="servicos" className="relative py-12 overflow-hidden">
      {/* Video Background Dinâmico - responde ao tipo de veículo */}
      <video 
        ref={videoRef}
        key={`${selectedVehicle}-${currentVideo}`}
        autoPlay 
        muted 
        loop 
        playsInline 
        preload="metadata"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1500 ease-in-out ${
          hasVideo ? (isUserFocused ? 'opacity-[0.15]' : 'opacity-25') : 'opacity-0'
        }`}
        style={{ 
          filter: selectedVehicle === 'moto' ? 'blur(0.5px)' : 'blur(0px)',
          display: hasVideo ? 'block' : 'none'
        }}
        onCanPlay={handleVideoCanPlay}
        onPlaying={() => setHasVideo(true)}
        onError={handleVideoError}
        onAbort={handleVideoError}
        onStalled={handleVideoError}
        onEmptied={handleVideoError}
        data-testid="services-background-video"
      >
        <source src={servicesVideos[currentVideo]} type="video/mp4" />
      </video>
      
      {/* Fallback background - always present, shown when video fails */}
      <div 
        className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-500 ${
          hasVideo ? 'opacity-0' : 'opacity-30'
        }`}
        style={{
          backgroundImage: selectedVehicle === 'moto' 
            ? 'url(https://images.unsplash.com/photo-1609630875171-b1321377ee65?ixlib=rb-4.1.0&auto=format&fit=crop&w=1920&h=1080)'
            : 'url(https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.1.0&auto=format&fit=crop&w=1920&h=1080)'
        }}
      />
      
      <div className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
        isUserFocused 
          ? 'bg-gradient-to-b from-background/95 to-secondary/50' 
          : 'bg-gradient-to-b from-background/80 to-secondary/30'
      }`}></div>
      
      {/* Gradientes de transição suave */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background via-background/50 to-transparent z-[5]"></div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/50 to-transparent z-[5]"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-tech font-bold text-foreground mb-4 tracking-wider"
            animate={{
              textShadow: [
                "0 0 20px rgba(59, 130, 246, 0)",
                "0 0 20px rgba(59, 130, 246, 0.3)",
                "0 0 20px rgba(59, 130, 246, 0)",
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            NOSSOS <span className="text-primary">SERVIÇOS</span>
          </motion.h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Gama completa de serviços especializados para seu veículo
          </p>
          
          {/* Toggle Carro/Moto */}
          <div className="flex justify-center mb-8">
            <div className="bg-background/20 backdrop-blur-md border border-border/50 rounded-full p-1 flex gap-1 shadow-lg">
              <motion.button
                onClick={() => setSelectedVehicle('car')}
                className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 font-tech font-semibold ${
                  selectedVehicle === 'car'
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                    : 'text-muted-foreground hover:text-foreground hover:bg-background/30'
                }`}
                data-testid="vehicle-toggle-car"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Car className="w-5 h-5" />
                CARROS
              </motion.button>
              <motion.button
                onClick={() => setSelectedVehicle('moto')}
                className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 font-tech font-semibold ${
                  selectedVehicle === 'moto'
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                    : 'text-muted-foreground hover:text-foreground hover:bg-background/30'
                }`}
                data-testid="vehicle-toggle-moto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Bike className="w-5 h-5" />
                MOTOS
              </motion.button>
            </div>
          </div>
        </motion.div>
        
        <AnimatePresence mode="wait">
          <motion.div 
            key={selectedVehicle}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                className="service-card rounded-xl p-4 cursor-pointer group relative overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)",
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onServiceSelect(service)}
                onMouseEnter={() => setHoveredCard(service.id)}
                onMouseLeave={() => setHoveredCard(null)}
                data-testid={`service-card-${service.id}`}
              >
                {/* Animated glow effect on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 pointer-events-none"
                  initial={{ x: "-100%" }}
                  animate={{ x: hoveredCard === service.id ? "100%" : "-100%" }}
                  transition={{ duration: 0.6 }}
                />
                
                {/* Sparkle icon on hover */}
                <motion.div
                  className="absolute top-2 right-2 z-10"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: hoveredCard === service.id ? 1 : 0,
                    scale: hoveredCard === service.id ? 1 : 0,
                    rotate: hoveredCard === service.id ? 360 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Sparkles className="w-5 h-5 text-primary" />
                </motion.div>

                <div className="relative z-10">
                  <div className="relative overflow-hidden rounded-lg mb-2 sm:mb-3">
                    <motion.img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-24 sm:h-32 object-cover"
                      loading={index < 4 ? "eager" : "lazy"}
                      data-testid={`service-image-${service.id}`}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    />
                    {/* Overlay on hover */}
                    <motion.div
                      className="absolute inset-0 bg-primary/20 flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredCard === service.id ? 1 : 0 }}
                    >
                      <ChevronRight className="w-8 h-8 text-white" />
                    </motion.div>
                  </div>
                  
                  <h3 className="text-sm sm:text-base font-tech font-semibold text-foreground mb-1 sm:mb-2 leading-tight group-hover:text-primary transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-muted-foreground mb-2 sm:mb-3 text-xs leading-tight line-clamp-2">
                    {service.description}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <motion.span
                      className="text-primary font-bold text-sm sm:text-base"
                      data-testid={`service-price-${service.id}`}
                      animate={hoveredCard === service.id ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      {service.price}
                    </motion.span>
                    <span className="text-accent text-xs sm:text-sm flex items-center gap-1 bg-accent/10 px-2 py-1 rounded-full">
                      <Clock className="w-3 h-3" />
                      {service.duration}h
                    </span>
                  </div>

                  {/* Call to action hint */}
                  <motion.div
                    className="mt-2 text-xs text-primary font-semibold flex items-center gap-1"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ 
                      opacity: hoveredCard === service.id ? 1 : 0,
                      y: hoveredCard === service.id ? 0 : -5,
                    }}
                  >
                    Clique para agendar
                    <ChevronRight className="w-3 h-3" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Call to Action after services */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <motion.p
            className="text-lg text-muted-foreground mb-4"
            animate={{
              opacity: [0.7, 1, 0.7],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ✨ Clique em qualquer serviço para agendar agora mesmo! ✨
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
