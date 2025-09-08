import { motion, AnimatePresence } from "framer-motion";
import { Clock, Car, Bike } from "lucide-react";
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
  
  // Controle de velocidade do vídeo para suavizar movimento
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.7; // 70% da velocidade normal
    }
  }, [currentVideo]);

  // Reset video index quando mudar tipo de veículo
  useEffect(() => {
    setCurrentVideo(0);
  }, [selectedVehicle]);
  
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
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1500 ease-in-out ${
          isUserFocused ? 'opacity-[0.15]' : 'opacity-25'
        }`}
        style={{ filter: selectedVehicle === 'moto' ? 'blur(0.5px)' : 'blur(0px)' }}
        onError={(e) => console.error('Erro no vídeo services:', e)}
        onLoadedData={() => {
          if (videoRef.current) {
            // Vídeos de moto precisam de velocidade reduzida
            videoRef.current.playbackRate = selectedVehicle === 'moto' ? 0.7 : 1.0;
          }
        }}
        data-testid="services-background-video"
      >
        <source src={servicesVideos[currentVideo]} type="video/mp4" />
      </video>
      
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
          <h2 className="text-3xl md:text-4xl font-tech font-bold text-foreground mb-4 tracking-wider">
            NOSSOS <span className="text-primary">SERVIÇOS</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Gama completa de serviços especializados para seu veículo
          </p>
          
          {/* Toggle Carro/Moto */}
          <div className="flex justify-center mb-8">
            <div className="bg-background/20 backdrop-blur-md border border-border/50 rounded-full p-1 flex gap-1">
              <button
                onClick={() => setSelectedVehicle('car')}
                className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 font-tech font-semibold ${
                  selectedVehicle === 'car'
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                    : 'text-muted-foreground hover:text-foreground hover:bg-background/30'
                }`}
                data-testid="vehicle-toggle-car"
              >
                <Car className="w-5 h-5" />
                CARROS
              </button>
              <button
                onClick={() => setSelectedVehicle('moto')}
                className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 font-tech font-semibold ${
                  selectedVehicle === 'moto'
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                    : 'text-muted-foreground hover:text-foreground hover:bg-background/30'
                }`}
                data-testid="vehicle-toggle-moto"
              >
                <Bike className="w-5 h-5" />
                MOTOS
              </button>
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
                className="service-card rounded-xl p-4 cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => onServiceSelect(service)}
                data-testid={`service-card-${service.id}`}
              >
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-24 sm:h-32 object-cover rounded-lg mb-2 sm:mb-3"
                  loading={index < 4 ? "eager" : "lazy"}
                  data-testid={`service-image-${service.id}`}
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
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
