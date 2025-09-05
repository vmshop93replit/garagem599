import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import polimentoVideo from "@assets/polimento_1757071025670.mp4";

export default function GallerySection() {
  const [isUserFocused, setIsUserFocused] = useState(false);

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

  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const galleryImages = [
    // Seção 1 - Detalhamento Externo
    {
      src: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Carro após detalhamento premium",
    },
    {
      src: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Antes e depois polimento",
    },
    {
      src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Cera premium aplicada",
    },
    {
      src: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Aplicação de vitrificação",
    },
    
    // Seção 2 - Interior e Detalhes
    {
      src: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Interior limpo e detalhado",
    },
    {
      src: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Detalhamento de rodas",
    },
    {
      src: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Polimento de faróis",
    },
    {
      src: "https://images.unsplash.com/photo-1570610160323-6b8004d5f40b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Limpeza de motor",
    },

    // Seção 3 - Lavagem e Acabamento
    {
      src: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Lavagem premium completa",
    },
    {
      src: "https://images.unsplash.com/photo-1599912027806-cfda9c53d705?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Espuma ativa na lavagem",
    },
    {
      src: "https://images.unsplash.com/photo-1605641590890-593f964ccd1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Secagem profissional",
    },
    {
      src: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Enceramento final",
    },

    // Seção 4 - Serviços Especializados
    {
      src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Sistema de som instalado",
    },
    {
      src: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Insulfilm aplicado",
    },
    {
      src: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Auto elétrica - instalação",
    },
    {
      src: "https://images.unsplash.com/photo-1506792006437-256b665541e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Restauração de peças",
    },

    // Seção 5 - Resultados Finais
    {
      src: "https://images.unsplash.com/photo-1502877338535-766e1452684a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Resultado final - sedan premium",
    },
    {
      src: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "SUV após tratamento completo",
    },
    {
      src: "https://images.unsplash.com/photo-1507136849739-de1add2a68ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Esportivo vitrificado",
    },
    {
      src: "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Picape detalhada",
    },
  ];

  return (
    <section id="galeria" className="relative py-10 overflow-hidden">
      {/* Video Background Responsivo */}
      <video 
        autoPlay 
        muted 
        loop 
        playsInline 
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
          isUserFocused ? 'opacity-10' : 'opacity-35'
        }`}
        onError={(e) => console.error('Erro no vídeo gallery:', e)}
      >
        <source src={polimentoVideo} type="video/mp4" />
      </video>
      
      <div className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
        isUserFocused ? 'bg-background/90' : 'bg-background/75'
      }`}></div>
      
      {/* Gradientes de transição suave */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background via-background/60 to-transparent z-5"></div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/60 to-transparent z-5"></div>
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
