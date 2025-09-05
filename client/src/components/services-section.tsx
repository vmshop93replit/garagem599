import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { services } from "@/lib/services";
import type { Service } from "@/lib/services";

interface ServicesSectionProps {
  onServiceSelect: (service: Service) => void;
}

export default function ServicesSection({ onServiceSelect }: ServicesSectionProps) {
  return (
    <section id="servicos" className="py-12 bg-gradient-to-b from-background to-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-tech font-bold text-foreground mb-4 tracking-wider">
            NOSSOS <span className="text-primary">SERVIÇOS</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Gama completa de serviços especializados para seu veículo
          </p>
        </motion.div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="service-card rounded-xl p-4 cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              onClick={() => onServiceSelect(service)}
              data-testid={`service-card-${service.id}`}
            >
              <img 
                src={service.image} 
                alt={service.name} 
                className="w-full h-24 sm:h-32 object-cover rounded-lg mb-2 sm:mb-3"
              />
              <h3 className="text-sm sm:text-base font-tech font-semibold text-foreground mb-1 sm:mb-2 leading-tight">{service.name}</h3>
              <p className="text-muted-foreground mb-2 sm:mb-3 text-xs leading-tight">{service.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-primary font-semibold" data-testid={`service-price-${service.id}`}>
                  {service.price}
                </span>
                <span className="text-accent text-sm flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {service.duration}h
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
