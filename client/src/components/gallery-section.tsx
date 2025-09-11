import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
// Novos vídeos para Gallery
import bmwVideo from "/src/assets/videos/bmw-video.mp4";
import carro3Video from "/src/assets/videos/carro3-video.mp4";
import carroRedVideo from "/src/assets/videos/carrored-video.mp4";

// Imagens reais da Garagem 599 - Carros
import galleryImg1 from "@assets/WhatsApp Image 2025-09-11 at 16.38.26 (1)_1757625591247.jpeg";
import galleryImg2 from "@assets/WhatsApp Image 2025-09-11 at 16.38.26 (2)_1757625591248.jpeg";
import galleryImg3 from "@assets/WhatsApp Image 2025-09-11 at 16.38.26 (3)_1757625591248.jpeg";
import galleryImg4 from "@assets/WhatsApp Image 2025-09-11 at 16.38.26 (4)_1757625591248.jpeg";
import galleryImg5 from "@assets/WhatsApp Image 2025-09-11 at 16.38.26 (5)_1757625591249.jpeg";
import galleryImg6 from "@assets/WhatsApp Image 2025-09-11 at 16.38.26 (6)_1757625591249.jpeg";
import galleryImg7 from "@assets/WhatsApp Image 2025-09-11 at 16.38.26 (7)_1757625591249.jpeg";
import galleryImg8 from "@assets/WhatsApp Image 2025-09-11 at 16.38.26_1757625591250.jpeg";

// Imagens reais da Garagem 599 - Motos
import motoImg1 from "@assets/WhatsApp Image 2025-09-11 at 16.38.39_1757627516523.jpeg";
import motoImg2 from "@assets/WhatsApp Image 2025-09-11 at 16.38.40 (2)_1757627516524.jpeg";
import motoImg3 from "@assets/WhatsApp Image 2025-09-11 at 16.38.40 (4)_1757627516525.jpeg";
import motoImg4 from "@assets/WhatsApp Image 2025-09-11 at 16.38.40 (8)_1757627516525.jpeg";
import motoImg5 from "@assets/WhatsApp Image 2025-09-11 at 16.38.58_1757627516526.jpeg";
import motoImg6 from "@assets/WhatsApp Image 2025-09-11 at 16.38.39 (3)_1757627516527.jpeg";

export default function GallerySection() {
  const [isUserFocused, setIsUserFocused] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(0);
  
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
    // Serviços de carros
    {
      src: galleryImg1,
      alt: "Serviço de lavagem e detalhamento - Garagem 599"
    },
    {
      src: galleryImg2,
      alt: "Trabalho de polimento e enceramento profissional"
    },
    {
      src: galleryImg3,
      alt: "Resultado de vitrificação e proteção automotiva"
    },
    {
      src: galleryImg4,
      alt: "Higienização completa e limpeza técnica"
    },
    {
      src: galleryImg5,
      alt: "Instalação de sistema de som automotivo"
    },
    {
      src: galleryImg6,
      alt: "Serviço de auto elétrica e manutenção"
    },
    {
      src: galleryImg7,
      alt: "Aplicação de insulfilm profissional"
    },
    {
      src: galleryImg8,
      alt: "Trabalho completo de estética automotiva"
    },
    // Serviços de motos
    {
      src: motoImg1,
      alt: "Lavagem detalhada e cuidados especiais para motos"
    },
    {
      src: motoImg2,
      alt: "Polimento de carenagem e tanque de moto"
    },
    {
      src: motoImg3,
      alt: "Limpeza de motor e componentes de moto"
    },
    {
      src: motoImg4,
      alt: "Enceramento e proteção completa para motos"
    },
    {
      src: motoImg5,
      alt: "Serviços especializados em motos - Garagem 599"
    },
    {
      src: motoImg6,
      alt: "Manutenção e estética para motocicletas"
    }
  ];

  return (
    <section id="galeria" className="relative py-10 overflow-hidden">
      {/* Video Background Responsivo */}
      {/* Video de fundo simplificado */}
      <video 
        key={currentVideo}
        autoPlay 
        muted 
        loop 
        playsInline 
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1500 ease-in-out ${
          isUserFocused ? 'opacity-10' : 'opacity-25'
        }`}
        onError={(e) => console.error('Erro no vídeo gallery:', e)}
        data-testid="gallery-background-video"
      >
        <source src={galleryVideos[currentVideo]} type="video/mp4" />
      </video>
      
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
