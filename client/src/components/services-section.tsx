import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { services } from "@/lib/services";
import type { Service } from "@/lib/services";

interface ServicesSectionProps {
  onServiceSelect: (service: Service) => void;
}

export default function ServicesSection({ onServiceSelect }: ServicesSectionProps) {
  return (
    <section id="servicos" className="py-20 bg-gradient-to-b from-background to-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Nossos <span className="text-primary">Serviços</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Oferecemos uma gama completa de serviços especializados para manter seu veículo sempre impecável
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="service-card rounded-xl p-6 cursor-pointer"
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
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-foreground mb-2">{service.name}</h3>
              <p className="text-muted-foreground mb-4 text-sm">{service.description}</p>
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
