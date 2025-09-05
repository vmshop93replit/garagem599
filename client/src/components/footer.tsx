import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Facebook, Instagram, MessageCircle } from "lucide-react";
import logoImage from "@assets/336f2e02-fa2f-41f1-930c-9e8ede8b8732_1757060047184.png";
import arckaneImage from "@assets/arckanecodex_1757065000833.gif";

export default function Footer() {
  return (
    <footer id="contato" className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 flex items-center justify-center">
                <img 
                  src={logoImage} 
                  alt="Garagem 599 Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-2xl font-bold text-foreground">Garagem 599</span>
            </div>
            <p className="text-muted-foreground mb-6">
              Especialistas em estética automotiva, oferecendo serviços premium para seu veículo.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="social-facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="social-instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/5512987092879"
                className="text-muted-foreground hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="social-whatsapp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-foreground mb-6">Contato</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground" data-testid="contact-phone">
                  (12) 98709-2879
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground" data-testid="contact-email">
                  contato@garagem599.com.br
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground" data-testid="contact-address">
                  São José dos Campos, SP
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-foreground mb-6">Horário de Funcionamento</h3>
            <div className="space-y-2">
              <div className="flex justify-between" data-testid="hours-weekdays">
                <span className="text-muted-foreground">Segunda - Sexta:</span>
                <span className="text-foreground">08:00 - 19:00</span>
              </div>
              <div className="flex justify-between" data-testid="hours-saturday">
                <span className="text-muted-foreground">Sábado:</span>
                <span className="text-foreground">08:00 - 16:00</span>
              </div>
              <div className="flex justify-between" data-testid="hours-sunday">
                <span className="text-muted-foreground">Domingo:</span>
                <span className="text-foreground">Fechado</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground">
              © 2024 Garagem 599. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground font-tech tracking-wider">
                Desenvolvido por Arckane Codex ®
              </span>
              <img 
                src={arckaneImage} 
                alt="Arckane Codex" 
                className="w-16 h-16 object-contain arckane-glow hover:scale-110 transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
