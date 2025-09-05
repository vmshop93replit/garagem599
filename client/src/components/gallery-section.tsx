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
    {
      src: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Carro após detalhamento premium",
    },
    {
      src: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Antes e depois polimento",
    },
    {
      src: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Interior limpo e detalhado",
    },
    {
      src: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Aplicação de vitrificação",
    },
    {
      src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Sistema de som instalado",
    },
    {
      src: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Insulfilm aplicado",
    },
    {
      src: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Lavagem premium completa",
    },
    {
      src: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Polimento de faróis",
    },
    {
      src: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Auto elétrica - instalação",
    },
    {
      src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Cera premium aplicada",
    },
    {
      src: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Detalhamento de rodas",
    },
    {
      src: "https://images.unsplash.com/photo-1570610160323-6b8004d5f40b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Limpeza de motor",
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
      >
        <source src={polimentoVideo} type="video/mp4" />
      </video>
      
      <div className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
        isUserFocused ? 'bg-background/90' : 'bg-background/75'
      }`}></div>
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

        {/* Carrossel Horizontal */}
        <div className="relative">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-4 pb-4" style={{ width: `${galleryImages.length * 280}px` }}>
              {galleryImages.map((image, index) => (
                <motion.div
                  key={index}
                  className="flex-shrink-0 cursor-pointer group"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onClick={() => setSelectedImage(index)}
                  data-testid={`gallery-image-${index}`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-64 h-40 object-cover rounded-lg shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105"
                  />
                  <p className="text-center text-sm text-muted-foreground mt-2 group-hover:text-primary transition-colors">
                    {image.alt}
                  </p>
                </motion.div>
              ))}
            </div>
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
