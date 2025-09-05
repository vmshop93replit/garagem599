// Componente Otimizado para Imagens Reais da Garagem 599
import { useState } from "react";
import { motion } from "framer-motion";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  fallbackSrc?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export function OptimizedImage({
  src,
  alt,
  className = "",
  priority = false,
  fallbackSrc,
  onLoad,
  onError,
}: OptimizedImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  const handleLoad = () => {
    setImageLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setImageError(false);
    } else {
      setImageError(true);
    }
    onError?.();
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Loading placeholder */}
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 bg-gradient-to-r from-muted via-muted/50 to-muted animate-pulse" />
      )}
      
      {/* Error placeholder */}
      {imageError && (
        <div className="absolute inset-0 bg-muted/20 flex items-center justify-center">
          <div className="text-muted-foreground text-sm">
            🚗 Garagem 599
          </div>
        </div>
      )}

      {/* Main image */}
      <motion.img
        src={currentSrc}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        loading={priority ? "eager" : "lazy"}
        onLoad={handleLoad}
        onError={handleError}
        initial={{ scale: 1.1 }}
        animate={{ scale: imageLoaded ? 1 : 1.1 }}
        transition={{ duration: 0.6 }}
      />
    </div>
  );
}

// Hook para gerenciar carregamento progressive de imagens
export function useProgressiveLoading(images: string[]) {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  const preloadImage = (src: string) => {
    return new Promise<void>((resolve) => {
      const img = new Image();
      img.onload = () => {
        setLoadedImages(prev => new Set([...Array.from(prev), src]));
        resolve();
      };
      img.onerror = () => {
        setFailedImages(prev => new Set([...Array.from(prev), src]));
        resolve();
      };
      img.src = src;
    });
  };

  const preloadImages = async (srcs: string[]) => {
    await Promise.all(srcs.map(preloadImage));
  };

  return {
    loadedImages,
    failedImages,
    preloadImages,
    isLoaded: (src: string) => loadedImages.has(src),
    hasFailed: (src: string) => failedImages.has(src),
  };
}