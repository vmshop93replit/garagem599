import { motion } from "framer-motion";

export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: "Escolha o Serviço",
      description: "Selecione o serviço desejado em nosso catálogo especializado",
    },
    {
      number: 2,
      title: "Agende Data e Horário",
      description: "Escolha o melhor horário disponível em nossa agenda",
    },
    {
      number: 3,
      title: "Confirmação via WhatsApp",
      description: "Receba confirmação imediata pelo WhatsApp",
    },
  ];

  return (
    <section id="como-funciona" className="py-10 bg-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-tech font-bold text-foreground mb-3 tracking-wider">
            COMO <span className="text-primary">FUNCIONA</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              className="text-center group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/30 transition-colors">
                <span className="text-xl font-tech font-bold text-primary">{step.number}</span>
              </div>
              <h3 className="text-lg font-tech font-semibold text-foreground mb-2 tracking-wide">{step.title}</h3>
              <p className="text-muted-foreground text-sm">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
