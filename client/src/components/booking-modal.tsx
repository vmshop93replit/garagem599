import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Clock, User, Phone, MapPin, MessageSquare } from "lucide-react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import type { Service } from "@/lib/services";
import { generateTimeSlots, formatPhone, generateWhatsAppMessage } from "@/lib/booking";

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

      // Save booking to localStorage
      const bookings = JSON.parse(localStorage.getItem('garagem599_bookings') || '[]');
      const newBooking = {
        id: Date.now().toString(),
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
              className="bg-card rounded-2xl p-4 sm:p-6 md:p-8 max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto border border-border"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-foreground">Agendar Serviço</h3>
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

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Serviço Selecionado
                    </label>
                    <Input
                      value={service ? `${service.name} - ${service.price}` : ""}
                      readOnly
                      className="bg-muted"
                      data-testid="selected-service"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <FormField
                      control={form.control}
                      name="nome"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            Nome Completo *
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Seu nome completo" {...field} data-testid="input-nome" />
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
                            <Phone className="w-4 h-4" />
                            WhatsApp *
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="(12) 99999-9999"
                              {...field}
                              onChange={handlePhoneChange}
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
                          <MapPin className="w-4 h-4" />
                          Endereço *
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Seu endereço completo" {...field} data-testid="input-endereco" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <FormField
                      control={form.control}
                      name="data"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Data *
                          </FormLabel>
                          <FormControl>
                            <Input type="date" min={today} {...field} data-testid="input-data" />
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
                            <Clock className="w-4 h-4" />
                            Horário *
                          </FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-horario">
                                <SelectValue placeholder="Selecione um horário" />
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

                  <FormField
                    control={form.control}
                    name="lgpd"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-lgpd"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm text-muted-foreground">
                            Concordo com o tratamento dos meus dados pessoais conforme a Lei Geral de Proteção de Dados (LGPD) *
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={onClose}
                      className="flex-1 w-full"
                      data-testid="button-cancel"
                    >
                      Cancelar
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 w-full btn-primary font-tech text-base sm:text-lg tracking-wider py-4 sm:py-6 bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-primary transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl border-none"
                      disabled={form.formState.isSubmitting}
                      data-testid="button-submit"
                    >
                      {form.formState.isSubmitting ? "PROCESSANDO..." : "🚀 CONFIRMAR AGENDAMENTO"}
                    </Button>
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
