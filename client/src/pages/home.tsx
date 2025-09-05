import { motion } from "framer-motion";
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import ServicesSection from "@/components/services-section";
import HowItWorks from "@/components/how-it-works";
import GallerySection from "@/components/gallery-section";
import TestimonialsSection from "@/components/testimonials-section";
import Footer from "@/components/footer";
import BookingModal from "@/components/booking-modal";
import { useState } from "react";
import type { Service } from "@/lib/services";

export default function Home() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const openBookingModal = (service: Service) => {
    setSelectedService(service);
    setIsBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
    setSelectedService(null);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <HeroSection />
        <ServicesSection onServiceSelect={openBookingModal} />
        <HowItWorks />
        <GallerySection />
        <TestimonialsSection />
      </motion.main>
      
      <Footer />
      
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={closeBookingModal}
        service={selectedService}
      />
    </div>
  );
}
