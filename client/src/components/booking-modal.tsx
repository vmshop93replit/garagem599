import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Clock, User, Phone, MapPin, CheckCircle, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import type { Service } from "@/lib/services";
import { generateTimeSlots, formatPhone, generateWhatsAppMessage, generateBookingCode } from "@/lib/booking";

const bookingSchema = z.object({
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  whatsapp: z.string().min(10, "WhatsApp deve ter pelo menos 10 dígitos"),
  endereco: z.string().min(5, "Endereço deve ter pelo menos 5 caracteres"),
  data: z.string().min(1, "Data é obrigatória"),
  horario: z.string().min(1, "Horário é obrigatório"),
  lgpd: z.boolean().refine(val => val === true, "Você deve aceitar os termos LGPD"),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service | null;
}

export default function BookingModal({ isOpen, onClose, service }: BookingModalProps) {
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const { toast } = useToast();

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      nome: "",
      whatsapp: "",
      endereco: "",
      data: "",
      horario: "",
      lgpd: false,
    },
  });

  const selectedDate = form.watch("data");
  const nome = form.watch("nome");
  const whatsapp = form.watch("whatsapp");
  const endereco = form.watch("endereco");
  const horario = form.watch("horario");

  // Auto-advance steps based on filled fields
  useEffect(() => {
    if (nome && whatsapp && endereco) {
      setCurrentStep(2);
    }
    if (selectedDate && horario) {
      setCurrentStep(3);
    }
  }, [nome, whatsapp, endereco, selectedDate, horario]);

  useEffect(() => {
    if (selectedDate && service) {
      const slots = generateTimeSlots(selectedDate, service.duration);
      setTimeSlots(slots);
      form.setValue("horario", "");
    }
  }, [selectedDate, service, form]);

  useEffect(() => {
    if (!isOpen) {
      form.reset();
      setTimeSlots([]);
      setCurrentStep(1);
    }
  }, [isOpen, form]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const onSubmit = async (data: BookingFormData) => {
    if (!service) return;

    try {
      const message = generateWhatsAppMessage({
        ...data,
        servico: service.name,
        preco: service.price,
        duracao: service.duration,
      });

      // Generate booking code and save to localStorage
      const startTime = data.horario.includes(' - ') ? data.horario.split(' - ')[0] : data.horario;
      const bookingCode = generateBookingCode(data.data, startTime);
      
      const bookings = JSON.parse(localStorage.getItem('garagem599_bookings') || '[]');
      const newBooking = {
        id: bookingCode,
        date: data.data,
        time: data.horario,
        duration: service.duration,
        service: service.name,
        customer: data.nome,
        timestamp: new Date().toISOString(),
      };
      bookings.push(newBooking);
      localStorage.setItem('garagem599_bookings', JSON.stringify(bookings));

      // Copy to clipboard and open WhatsApp
      await navigator.clipboard.writeText(message);
      const whatsappUrl = `https://wa.me/5512987092879?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');

      toast({
        title: "Agendamento Enviado!",
        description: "Mensagem copiada! Abrindo WhatsApp...",
      });

      onClose();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao processar agendamento. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    form.setValue("whatsapp", formatted);
  };

  // Set minimum date to today
  const today = new Date().toISOString().split('T')[0];

  const steps = [
    { number: 1, title: "Seus Dados", icon: User },
    { number: 2, title: "Data e Hora", icon: Calendar },
    { number: 3, title: "Confirmação", icon: CheckCircle },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50" data-testid="booking-modal">
          <motion.div
            className="modal-backdrop fixed inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <div className="fixed inset-0 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              className="bg-card rounded-2xl p-4 sm:p-6 md:p-8 max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto border border-border shadow-2xl"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, type: "spring" }}
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-primary" />
                    Agendar Serviço
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Reserve seu horário em 3 passos simples
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-muted-foreground hover:text-foreground"
                  data-testid="close-modal"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Progress Steps */}
              <div className="mb-8">
                <div className="flex justify-between items-center relative">
                  {/* Progress line */}
                  <div className="absolute top-5 left-0 right-0 h-1 bg-muted -z-10">
                    <motion.div
                      className="h-full bg-primary"
                      initial={{ width: "0%" }}
                      animate={{ width: currentStep === 1 ? "0%" : currentStep === 2 ? "50%" : "100%" }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  
                  {steps.map((step) => {
                    const Icon = step.icon;
                    const isActive = currentStep >= step.number;
                    const isCurrent = currentStep === step.number;
                    
                    return (
                      <div key={step.number} className="flex flex-col items-center flex-1">
                        <motion.div
                          className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                            isActive
                              ? "bg-primary border-primary text-primary-foreground"
                              : "bg-muted border-muted-foreground/30 text-muted-foreground"
                          }`}
                          animate={isCurrent ? { scale: [1, 1.1, 1] } : {}}
                          transition={{ duration: 0.5, repeat: isCurrent ? Infinity : 0, repeatDelay: 2 }}
                        >
                          <Icon className="w-5 h-5" />
                        </motion.div>
                        <span className={`text-xs mt-2 font-medium ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                          {step.title}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Service Display */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-primary/10 border border-primary/20 rounded-lg p-4"
                  >
                    <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-primary" />
                      Serviço Selecionado
                    </label>
                    <div className="font-bold text-lg text-primary">
                      {service?.name}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1 flex items-center gap-3">
                      <span>{service?.price}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {service?.duration}h
                      </span>
                    </div>
                  </motion.div>

                  {/* Step 1: Personal Info */}
                  <AnimatePresence mode="wait">
                    {currentStep >= 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-4"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="nome"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="flex items-center gap-2">
                                  <User className="w-4 h-4 text-primary" />
                                  Nome Completo *
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Seu nome completo"
                                    {...field}
                                    className="transition-all focus:ring-2 focus:ring-primary"
                                    data-testid="input-nome"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="whatsapp"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="flex items-center gap-2">
                                  <Phone className="w-4 h-4 text-primary" />
                                  WhatsApp *
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="(12) 99999-9999"
                                    {...field}
                                    onChange={handlePhoneChange}
                                    className="transition-all focus:ring-2 focus:ring-primary"
                                    data-testid="input-whatsapp"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="endereco"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-primary" />
                                Endereço Completo *
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Rua, Número, Bairro - Cidade"
                                  {...field}
                                  className="transition-all focus:ring-2 focus:ring-primary"
                                  data-testid="input-endereco"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Step 2: Date and Time */}
                  <AnimatePresence mode="wait">
                    {currentStep >= 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-4"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="data"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="flex items-center gap-2">
                                  <Calendar className="w-4 h-4 text-primary" />
                                  Data do Serviço *
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    type="date"
                                    min={today}
                                    {...field}
                                    className="transition-all focus:ring-2 focus:ring-primary"
                                    data-testid="input-data"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="horario"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="flex items-center gap-2">
                                  <Clock className="w-4 h-4 text-primary" />
                                  Horário Preferido *
                                </FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                  <FormControl>
                                    <SelectTrigger
                                      className="transition-all focus:ring-2 focus:ring-primary"
                                      data-testid="select-horario"
                                    >
                                      <SelectValue placeholder="Escolha o horário" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {timeSlots.length === 0 ? (
                                      <SelectItem value="no-slots" disabled>
                                        {selectedDate ? "Sem horários disponíveis" : "Selecione uma data primeiro"}
                                      </SelectItem>
                                    ) : (
                                      timeSlots.map((slot) => (
                                        <SelectItem key={slot} value={slot}>
                                          {slot}
                                        </SelectItem>
                                      ))
                                    )}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Step 3: Confirmation */}
                  <AnimatePresence mode="wait">
                    {currentStep >= 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                      >
                        <FormField
                          control={form.control}
                          name="lgpd"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border border-border rounded-lg bg-muted/30">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  className="mt-1"
                                  data-testid="checkbox-lgpd"
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel className="text-sm text-foreground font-normal">
                                  Concordo com o tratamento dos meus dados pessoais conforme a Lei Geral de Proteção de Dados (LGPD) *
                                </FormLabel>
                                <FormMessage />
                              </div>
                            </FormItem>
                          )}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={onClose}
                      className="flex-1"
                      data-testid="button-cancel"
                    >
                      Cancelar
                    </Button>
                    <motion.div
                      className="flex-1"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="submit"
                        className="w-full btn-primary font-tech text-base sm:text-lg tracking-wider py-6 bg-gradient-to-r from-primary via-blue-600 to-primary hover:from-blue-700 hover:via-primary hover:to-blue-700 transition-all duration-300 shadow-xl hover:shadow-2xl border-none relative overflow-hidden group"
                        disabled={form.formState.isSubmitting}
                        data-testid="button-submit"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          {form.formState.isSubmitting ? "PROCESSANDO..." : (
                            <>
                              <Sparkles className="w-5 h-5" />
                              CONFIRMAR VIA WHATSAPP
                              <Sparkles className="w-5 h-5" />
                            </>
                          )}
                        </span>
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                          animate={{
                            x: ["-100%", "100%"],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 1,
                          }}
                        />
                      </Button>
                    </motion.div>
                  </div>
                </form>
              </Form>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
