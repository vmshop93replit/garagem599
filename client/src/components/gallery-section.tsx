import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
// Novos vídeos para Gallery
import bmwVideo from "@assets/bmw_1757120321561.mp4";
import carro3Video from "@assets/carro3_1757120321564.mp4";
import carroRedVideo from "@assets/carrored_1757120321564.mp4";

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
    {
      src: "https://images.unsplash.com/photo-1594070319944-7c0cbebb6f58?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Honda Civic preto bem conservado"
    },
    {
      src: "https://images.unsplash.com/photo-1636915873177-a0c1a48d84eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Honda Civic vermelho esportivo"
    },
    {
      src: "https://images.unsplash.com/photo-1570303278489-041bd897a873?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Honda vermelho bem cuidado"
    },
    {
      src: "https://images.unsplash.com/photo-1654870645915-de8afa6b3b30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Carro azul estacionado na rua"
    },
    {
      src: "https://images.unsplash.com/photo-1631547891859-184677884115?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Carro branco lateral na estrada"
    },
    {
      src: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Ford Explorer branco estacionado"
    },
    {
      src: "https://images.unsplash.com/photo-1567788701545-850832a506b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Ford preto em paisagem urbana"
    },
    {
      src: "https://images.unsplash.com/photo-1719488677248-552c4ad0a93e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Carro azul estacionamento"
    },
    {
      src: "https://images.unsplash.com/photo-1652509328308-7f0d7804e678?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Toyota prata bem conservado"
    },
    {
      src: "https://images.unsplash.com/photo-1657872737697-737a2d123ef2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Carro prata na lateral da estrada"
    },
    {
      src: "https://images.unsplash.com/photo-1652509328300-9578821756c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Toyota branco sobre tijolos"
    },
    {
      src: "https://images.unsplash.com/photo-1638618164682-12b986ec2a75?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Carro branco lateral estrada"
    },
    {
      src: "https://images.unsplash.com/photo-1547245324-d777c6f05e80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Toyota branco estacionado"
    },
    {
      src: "https://images.unsplash.com/photo-1623591457247-9dff667eae42?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Carro preto com luzes urbanas"
    },
    {
      src: "https://images.unsplash.com/photo-1606577924006-27d39b132ae2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Honda engine bay bem cuidado"
    },
    {
      src: "https://images.unsplash.com/photo-1696219733117-343bb58ffd32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Carro porta-malas aberto"
    },
    {
      src: "https://images.unsplash.com/photo-1575844611398-2a68400b437c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Ford Mustang branco clássico"
    },
    {
      src: "https://images.unsplash.com/photo-1611566026373-c6c8da0ea861?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "BMW azul em estrada"
    },
    {
      src: "https://images.unsplash.com/photo-1620882801951-a7b1521d1dc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "BMW M3 branco na calçada"
    },
    {
      src: "https://images.unsplash.com/photo-1621993202323-f438eec934ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Mercedes G63 preto"
    }
  ];

  return (
    <section id="galeria" className="relative py-10 overflow-hidden">
      {/* Video Background Responsivo */}
      <video 
        key={currentVideo}
        autoPlay 
        muted 
        loop 
        playsInline 
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
          isUserFocused ? 'opacity-10' : 'opacity-[0.35]'
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
