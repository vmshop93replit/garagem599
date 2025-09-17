import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
// Novos vídeos para Gallery
import bmwVideo from "@assets/bmw_1757120321561.mp4";
import carro3Video from "@assets/carro3_1757120321564.mp4";
import carroRedVideo from "@assets/carrored_1757120321564.mp4";

// Novas imagens da galeria
import img1 from "@assets/1_1758081483597.jpeg";
import img2 from "@assets/2_1758081483597.jpeg";
import img3 from "@assets/3_1758081483598.jpeg";
import img4 from "@assets/4_1758081483598.jpeg";
import img5 from "@assets/5_1758081483598.jpeg";
import img6 from "@assets/6_1758081483599.jpeg";
import img7 from "@assets/7_1758081483599.jpeg";
import img8 from "@assets/8_1758081483599.jpeg";
import img10 from "@assets/10_1758081483600.jpeg";
import img11 from "@assets/11_1758081483600.jpeg";
import img12 from "@assets/12_1758081483601.jpeg";
import img13 from "@assets/13_1758081483601.jpeg";
import img15 from "@assets/15_1758081483601.jpeg";
import img16 from "@assets/16_1758081483602.jpeg";
import img17 from "@assets/17_1758081483602.jpeg";
import img18 from "@assets/18_1758081483591.jpeg";
import img19 from "@assets/19_1758081483595.jpeg";
import img20 from "@assets/20_1758081483596.jpeg";
import img21 from "@assets/21_1758081483596.jpeg";
import img22 from "@assets/22_1758081483597.jpeg";

export default function GallerySection() {
  const [isUserFocused, setIsUserFocused] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [hasVideo, setHasVideo] = useState(true);
  const [currentSection, setCurrentSection] = useState(0);
  
  // Array de vídeos para rotação
  const galleryVideos = useMemo(() => [
    bmwVideo,
    carro3Video,
    carroRedVideo
  ], []);

  // Sistema inteligente de foco do usuário
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    
    const handleScroll = () => {
      setIsUserFocused(false);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => setIsUserFocused(true), 1500);
    };

    const handleInteraction = () => setIsUserFocused(true);

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mouseenter', handleInteraction);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseenter', handleInteraction);
      clearTimeout(scrollTimeout);
    };
  }, []);
  
  // Sistema de rotação automática de vídeos
  useEffect(() => {
    if (!isUserFocused) return;
    
    const videoInterval = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % galleryVideos.length);
    }, 10000); // Troca vídeo a cada 10 segundos quando usuário focado
    
    return () => clearInterval(videoInterval);
  }, [isUserFocused, galleryVideos.length]);

  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const galleryImages = [
    { src: img1, alt: "Veículo atendido na Garagem 599" },
    { src: img2, alt: "Serviço de detalhamento automotivo" },
    { src: img3, alt: "Carro após limpeza técnica" },
    { src: img4, alt: "Veículo com vitrificação aplicada" },
    { src: img5, alt: "Resultado do polimento técnico" },
    { src: img6, alt: "Higienização completa realizada" },
    { src: img7, alt: "Veículo após enceramento" },
    { src: img8, alt: "Serviço de estética automotiva" },
    { src: img10, alt: "Trabalho de revitalização" },
    { src: img11, alt: "Veículo com acabamento premium" },
    { src: img12, alt: "Resultado da limpeza detalhada" },
    { src: img13, alt: "Carro tratado na Garagem 599" },
    { src: img15, alt: "Serviço profissional de limpeza" },
    { src: img16, alt: "Veículo após tratamento completo" },
    { src: img17, alt: "Trabalho de polimento profissional" },
    { src: img18, alt: "Resultado da vitrificação" },
    { src: img19, alt: "Veículo com proteqção aplicada" },
    { src: img20, alt: "Serviço de estética premium" },
    { src: img21, alt: "Carro finalizado na Garagem 599" },
    { src: img22, alt: "Resultado do detalhamento" }
  ];

  return (
    <section id="galeria" className="relative py-10 overflow-hidden">
      {/* Video Background Responsivo */}
      {/* Video de fundo simplificado */}
      {hasVideo && (
        <video 
          key={currentVideo}
          autoPlay 
          muted 
          loop 
          playsInline 
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1500 ease-in-out ${
            isUserFocused ? 'opacity-10' : 'opacity-25'
          }`}
          onError={(e) => {
            console.error('Erro no vídeo gallery:', e);
            setHasVideo(false);
          }}
          onCanPlay={() => setHasVideo(true)}
          data-testid="gallery-background-video"
        >
          <source src={galleryVideos[currentVideo]} type="video/mp4" />
        </video>
      )}
      
      {/* Fallback background when video fails */}
      {!hasVideo && (
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center opacity-25"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1594070319944-7c0cbebb6f58?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080)'
          }}
        />
      )}
      
      <div className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
        isUserFocused ? 'bg-background/90' : 'bg-background/75'
      }`}></div>
      
      {/* Gradientes de transição suave */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background via-background/60 to-transparent z-[5]"></div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/60 to-transparent z-[5]"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-tech font-bold text-foreground mb-3 tracking-wider">
            NOSSA <span className="text-primary">GALERIA</span>
          </h2>
        </motion.div>

        {/* Carrossel Horizontal por Seções */}
        <div className="relative">
          {/* Indicador de scroll */}
          <div className="flex justify-center mb-4 gap-2">
            <span className="text-xs text-muted-foreground bg-secondary/50 px-3 py-1 rounded-full">
              👈 Deslize para ver mais fotos →
            </span>
          </div>
          
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-6 pb-4" style={{ width: `${Math.ceil(galleryImages.length / 4) * 320}px` }}>
              {Array.from({ length: Math.ceil(galleryImages.length / 4) }).map((_, sectionIndex) => (
                <div key={sectionIndex} className="flex-shrink-0">
                  <div className="grid grid-cols-2 gap-3 w-80">
                    {galleryImages
                      .slice(sectionIndex * 4, sectionIndex * 4 + 4)
                      .map((image, imageIndex) => {
                        const actualIndex = sectionIndex * 4 + imageIndex;
                        return (
                          <motion.div
                            key={actualIndex}
                            className="cursor-pointer group"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: imageIndex * 0.1 }}
                            viewport={{ once: true }}
                            onClick={() => setSelectedImage(actualIndex)}
                            data-testid={`gallery-image-${actualIndex}`}
                          >
                            <img
                              src={image.src}
                              alt={image.alt}
                              className="w-full h-24 object-cover rounded-lg shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105"
                              loading={actualIndex < 4 ? "eager" : "lazy"}
                            />
                            <p className="text-center text-xs text-muted-foreground mt-1 group-hover:text-primary transition-colors truncate">
                              {image.alt}
                            </p>
                          </motion.div>
                        );
                      })}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Indicador de mais conteúdo */}
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-l from-background via-background/80 to-transparent w-16 h-full flex items-center justify-end pr-2">
            <span className="text-primary text-lg animate-pulse">→</span>
          </div>
        </div>

        {/* Modal de Zoom */}
        {selectedImage !== null && (
          <motion.div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="relative max-w-4xl max-h-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={galleryImages[selectedImage].src}
                alt={galleryImages[selectedImage].alt}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg shadow-2xl"
                loading="eager"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
              >
                ✕
              </button>
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <p className="text-white bg-black/50 rounded-lg px-4 py-2 backdrop-blur-sm">
                  {galleryImages[selectedImage].alt}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
