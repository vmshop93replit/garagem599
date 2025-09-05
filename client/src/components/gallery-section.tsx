import { motion } from "framer-motion";

export default function GallerySection() {
  const galleryImages = [
    {
      src: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      alt: "Carro após detalhamento",
    },
    {
      src: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      alt: "Antes e depois polimento",
    },
    {
      src: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      alt: "Interior limpo",
    },
    {
      src: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      alt: "Aplicação de vitrificação",
    },
    {
      src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      alt: "Sistema de som",
    },
    {
      src: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      alt: "Insulfilm aplicado",
    },
  ];

  return (
    <section id="galeria" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Nossa <span className="text-primary">Galeria</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Veja alguns dos nossos trabalhos realizados
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <motion.img
              key={index}
              src={image.src}
              alt={image.alt}
              className="rounded-xl shadow-lg hover:shadow-xl transition-shadow w-full h-64 object-cover"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              data-testid={`gallery-image-${index}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
