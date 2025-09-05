interface BookingData {
  nome: string;
  whatsapp: string;
  endereco: string;
  servico: string;
  preco: string;
  data: string;
  horario: string;
  observacoes?: string;
  duracao: number;
}

interface StoredBooking {
  id: string;
  date: string;
  time: string;
  duration: number;
  service: string;
  customer: string;
  timestamp: string;
}

export function generateTimeSlots(date: string, serviceDuration: number): string[] {
  const startHour = 8;
  const endHour = 19;
  const slots: string[] = [];
  
  // Get existing bookings for the selected date
  const existingBookings = getBookingsForDate(date);
  
  for (let hour = startHour; hour < endHour; hour++) {
    const currentSlot = `${hour.toString().padStart(2, '0')}:00`;
    const endTime = hour + Math.ceil(serviceDuration);
    
    // Check if this slot conflicts with existing bookings
    const hasConflict = existingBookings.some(booking => {
      const bookingStart = parseInt(booking.time.split(':')[0]);
      const bookingEnd = bookingStart + Math.ceil(booking.duration);
      
      return (hour < bookingEnd && endTime > bookingStart);
    });
    
    // Only add slot if it fits within working hours and doesn't conflict
    if (endTime <= endHour && !hasConflict) {
      const endTimeFormatted = `${endTime.toString().padStart(2, '0')}:00`;
      slots.push(`${currentSlot} - ${endTimeFormatted}`);
    }
  }
  
  return slots;
}

export function getBookingsForDate(date: string): StoredBooking[] {
  const bookings = JSON.parse(localStorage.getItem('garagem599_bookings') || '[]');
  return bookings.filter((booking: StoredBooking) => booking.date === date);
}

export function formatPhone(value: string): string {
  // Remove all non-digit characters
  const digits = value.replace(/\D/g, '');
  
  // Format based on length
  if (digits.length >= 11) {
    return digits.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  } else if (digits.length >= 7) {
    return digits.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
  } else if (digits.length >= 3) {
    return digits.replace(/(\d{2})(\d{0,5})/, '($1) $2');
  }
  
  return digits;
}

export function generateWhatsAppMessage(data: BookingData): string {
  // Calculate end time - handle time slot format "HH:MM - HH:MM"
  let startTime = data.horario;
  if (data.horario.includes(' - ')) {
    startTime = data.horario.split(' - ')[0];
  }
  
  const [hour, minute] = startTime.split(':');
  const endHour = parseInt(hour) + Math.ceil(data.duracao);
  const endTime = `${endHour.toString().padStart(2, '0')}:${minute}`;
  
  // Format date to Brazilian format - handle date input properly
  const date = new Date(data.data + 'T00:00:00');
  const formattedDate = date.toLocaleDateString('pt-BR');
  
  // Generate timestamp for reference
  const timestamp = new Date().toISOString();
  
  const message = `Olá, Garagem 599! 👋

Sou ${data.nome}.
WhatsApp: ${data.whatsapp}
Endereço: ${data.endereco}

Serviço: ${data.servico}
Data: ${formattedDate}
Horário: ${startTime} → término estimado: ${endTime}

Observações: ${data.observacoes || 'Sem observações'}

Referência: ${timestamp}`;

  return message;
}
