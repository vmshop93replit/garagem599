import { motion } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth'
    });
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-lg border-b border-border"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">G</span>
            </div>
            <span className="text-xl font-bold text-foreground">Garagem 599</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('servicos')}
              className="text-muted-foreground hover:text-primary transition-colors"
              data-testid="nav-servicos"
            >
              Serviços
            </button>
            <button 
              onClick={() => scrollToSection('como-funciona')}
              className="text-muted-foreground hover:text-primary transition-colors"
              data-testid="nav-como-funciona"
            >
              Como Funciona
            </button>
            <button 
              onClick={() => scrollToSection('galeria')}
              className="text-muted-foreground hover:text-primary transition-colors"
              data-testid="nav-galeria"
            >
              Galeria
            </button>
            <button 
              onClick={() => scrollToSection('contato')}
              className="text-muted-foreground hover:text-primary transition-colors"
              data-testid="nav-contato"
            >
              Contato
            </button>
          </div>
          
          <button 
            className="md:hidden text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="mobile-menu-toggle"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div 
          className="md:hidden bg-background border-t border-border"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className="px-4 py-2 space-y-2">
            <button 
              onClick={() => scrollToSection('servicos')}
              className="block w-full text-left py-2 text-muted-foreground hover:text-primary transition-colors"
              data-testid="mobile-nav-servicos"
            >
              Serviços
            </button>
            <button 
              onClick={() => scrollToSection('como-funciona')}
              className="block w-full text-left py-2 text-muted-foreground hover:text-primary transition-colors"
              data-testid="mobile-nav-como-funciona"
            >
              Como Funciona
            </button>
            <button 
              onClick={() => scrollToSection('galeria')}
              className="block w-full text-left py-2 text-muted-foreground hover:text-primary transition-colors"
              data-testid="mobile-nav-galeria"
            >
              Galeria
            </button>
            <button 
              onClick={() => scrollToSection('contato')}
              className="block w-full text-left py-2 text-muted-foreground hover:text-primary transition-colors"
              data-testid="mobile-nav-contato"
            >
              Contato
            </button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
