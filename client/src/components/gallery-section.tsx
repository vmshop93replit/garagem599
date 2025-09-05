import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import polimentoVideo from "@assets/polimento_1757071025670.mp4";
import { realAssets, getRealAsset } from "@/lib/real-assets";
import { OptimizedImage } from "@/components/optimized-image";

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

  // Sistema otimizado de assets reais organizados por categorias
  const galleryImages = [
    // Seção 1 - Detalhamento Externo (4 fotos)
    ...realAssets.detailing,
    
    // Seção 2 - Interior e Detalhes (4 fotos) 
    ...realAssets.interior,

    // Seção 3 - Lavagem e Acabamento (4 fotos)
    ...realAssets.washing,

    // Seção 4 - Serviços Especializados (4 fotos)
    ...realAssets.specialized,

    // Seção 5 - Resultados Finais (4 fotos)
    ...realAssets.results,
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
                            <OptimizedImage
                              src={image.src}
                              alt={image.alt}
                              className="w-full h-24 object-cover rounded-lg shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105"
                              priority={actualIndex < 4} // Prioriza primeiras 4 imagens
                              fallbackSrc={
                                actualIndex < 4 ? 
                                `https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600` :
                                undefined
                              }
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
              <OptimizedImage
                src={galleryImages[selectedImage].src}
                alt={galleryImages[selectedImage].alt}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg shadow-2xl"
                priority={true}
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
