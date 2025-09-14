import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useState, useEffect } from "react";
// Novo vídeo para Testimonials
import videoMotoVideo from "@assets/videomoto_1757120321565.mp4";

export default function TestimonialsSection() {
  const [isUserFocused, setIsUserFocused] = useState(false);
  const [hasVideo, setHasVideo] = useState(true);

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
      name: "Bruna F.",
      initials: "BF",
      text: "Fiz higienização interna e externa, meu carro voltou parecendo zero km. Fiquei muito surpresa com o cuidado nos detalhes, até o cheirinho ficou top. Recomendo demais.",
      rating: 5,
    },
    {
      name: "Rodrigo M.",
      initials: "RM", 
      text: "Instalei som automotivo e foi a melhor coisa que fiz. Som limpo, grave forte e equipe explicou tudo certinho. Valeu cada centavo.",
      rating: 4,
    },
    {
      name: "Aline C.",
      initials: "AC",
      text: "Apliquei insulfilm no carro e ficou perfeito, acabamento super discreto, nada de bolhas. Já indiquei pros meus amigos.",
      rating: 5,
    },
    {
      name: "Paulo H.",
      initials: "PH",
      text: "Fiz revisão elétrica e agora meu carro tá funcionando liso, sem falhar nada. Atendimento rápido e direto, gostei bastante.",
      rating: 4,
    },
    {
      name: "Jessica S.",
      initials: "JS",
      text: "Levaram meu carro pro polimento e eu quase não reconheci na hora de pegar, brilho absurdo, parecia que tinha acabado de sair da concessionária.",
      rating: 5,
    },
    {
      name: "Lucas P.",
      initials: "LP",
      text: "Coloquei insulfilm faz 2 meses e até hoje tá intacto, sem nenhuma falha. Gostei da qualidade do material e da instalação.",
      rating: 4,
    },
    {
      name: "Mariana O.",
      initials: "MO",
      text: "Trabalho impecável, equipe muito educada e atenciosa. Fiquei tranquila em deixar o carro com eles, deu pra sentir confiança desde o começo.",
      rating: 4,
    },
    {
      name: "Eduardo A.",
      initials: "EA",
      text: "Coloquei o som completo no carro, parece até cinema dentro. Ficou incrível, não tenho do que reclamar.",
      rating: 5,
    },
    {
      name: "Camila R.",
      initials: "CR",
      text: "Fiz estética automotiva e limpeza geral, quando peguei o carro nem parecia o mesmo. Amei o resultado, muito capricho.",
      rating: 4,
    },
    {
      name: "Felipe N.",
      initials: "FN",
      text: "Atendimento top, pessoal atencioso, serviço rápido e bem feito. Nota mil pra empresa.",
      rating: 5,
    },
    {
      name: "Tatiane S.",
      initials: "TS",
      text: "Fiz higienização do ar condicionado e limpeza, melhorou até a saúde, agora não sinto mais aquele cheiro ruim. Serviço excelente.",
      rating: 4,
    },
    {
      name: "Renato L.",
      initials: "RL",
      text: "Fui pra instalar som, gostei muito, só achei que demorou um pouco além do combinado. Mas no final ficou ótimo.",
      rating: 4,
    },
  ];

  return (
    <section className="relative py-10 overflow-hidden">
      {/* Video Background Inteligente */}
      {hasVideo && (
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            isUserFocused ? 'opacity-[0.08]' : 'opacity-30'
          }`}
          onError={(e) => {
            console.error('Erro no vídeo testimonials:', e);
            setHasVideo(false);
          }}
          onCanPlay={() => setHasVideo(true)}
          data-testid="testimonials-background-video"
        >
          <source src={videoMotoVideo} type="video/mp4" />
        </video>
      )}
      
      {/* Fallback background when video fails */}
      {!hasVideo && (
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center opacity-30"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.1.0&auto=format&fit=crop&w=1920&h=1080)'
          }}
        />
      )}
      
      <div className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
        isUserFocused ? 'bg-secondary/40' : 'bg-secondary/20'
      }`}></div>
      
      {/* Gradientes de transição suave */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-secondary via-secondary/60 to-transparent z-[5]"></div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-secondary via-secondary/60 to-transparent z-[5]"></div>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {testimonials.slice(0, 8).map((testimonial, index) => (
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
                    {[...Array(testimonial.rating)].map((_, i) => (
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
