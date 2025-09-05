import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useState, useEffect } from "react";
import secarVideo from "@assets/secar_1757071025695.mp4";

export default function TestimonialsSection() {
  const [isUserFocused, setIsUserFocused] = useState(false);

  // Detecção inteligente de foco
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    
    const handleUserActivity = () => {
      setIsUserFocused(false);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => setIsUserFocused(true), 1500);
    };

    window.addEventListener('scroll', handleUserActivity);
    document.addEventListener('mousemove', handleUserActivity);

    return () => {
      window.removeEventListener('scroll', handleUserActivity);
      document.removeEventListener('mousemove', handleUserActivity);
      clearTimeout(scrollTimeout);
    };
  }, []);

  const testimonials = [
    {
      name: "Roberto Silva",
      initials: "RS",
      text: "Excelente atendimento e qualidade impecável. Meu carro ficou como novo após a vitrificação. Recomendo!",
    },
    {
      name: "Maria Costa",
      initials: "MC",
      text: "Profissionais muito competentes. O polimento ficou perfeito e o prazo foi cumprido à risca.",
    },
    {
      name: "João Santos",
      initials: "JS",
      text: "Melhor garagem da região! Trabalho impecável em auto elétrica. Voltarei sempre!",
    },
  ];

  return (
    <section className="relative py-10 overflow-hidden">
      {/* Video Background Inteligente */}
      <video 
        autoPlay 
        muted 
        loop 
        playsInline 
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
          isUserFocused ? 'opacity-8' : 'opacity-30'
        }`}
      >
        <source src={secarVideo} type="video/mp4" />
      </video>
      
      <div className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
        isUserFocused ? 'bg-secondary/40' : 'bg-secondary/20'
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
            NOSSOS <span className="text-primary">CLIENTES</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-card rounded-xl p-4 border border-border"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              data-testid={`testimonial-${index}`}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4">
                  <span className="text-primary-foreground font-semibold">
                    {testimonial.initials}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground">{testimonial.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
