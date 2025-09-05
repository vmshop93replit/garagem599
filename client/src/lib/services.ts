export interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: number;
  image: string;
}

export const services: Service[] = [
  {
    id: 'vitrificacao-3-anos',
    name: 'Vitrificação 3 Anos',
    description: 'Proteção premium com durabilidade de 3 anos',
    price: 'Hatch R$1.200 / Sedan R$1.500 / Pick-up R$1.800',
    duration: 6,
    image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250',
  },
  {
    id: 'lavagem-simples',
    name: 'Lavagem Simples',
    description: 'Limpeza externa básica com qualidade',
    price: 'R$ 80',
    duration: 1,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250',
  },
  {
    id: 'lavagem-tecnica',
    name: 'Lavagem Técnica',
    description: 'Limpeza detalhada com produtos específicos',
    price: 'R$ 150',
    duration: 2,
    image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250',
  },
  {
    id: 'higienizacao-completa',
    name: 'Higienização Completa',
    description: 'Limpeza e sanitização total do interior',
    price: 'R$ 350',
    duration: 3,
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250',
  },
  {
    id: 'polimento-tecnico',
    name: 'Polimento Técnico',
    description: 'Correção de pintura e acabamento perfeito',
    price: 'R$ 700',
    duration: 3,
    image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250',
  },
  {
    id: 'descontaminacao-pintura',
    name: 'Descontaminação de Pintura',
    description: 'Remoção de contaminantes da pintura',
    price: 'R$ 250',
    duration: 2,
    image: 'https://images.unsplash.com/photo-1632823469387-7cc2f4f76d42?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250',
  },
  {
    id: 'revitalizador-plasticos-externos',
    name: 'Revitalizador Plásticos Externos',
    description: 'Restauração de plásticos externos',
    price: 'R$ 120',
    duration: 1,
    image: 'https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250',
  },
  {
    id: 'revitalizador-plasticos-internos',
    name: 'Revitalizador Plásticos Internos',
    description: 'Revitalização de plásticos internos',
    price: 'R$ 100',
    duration: 1,
    image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250',
  },
  {
    id: 'impermeabilizador-vidros',
    name: 'Impermeabilizador Vidros/Parabrisa',
    description: 'Proteção e repelência de água nos vidros',
    price: 'R$ 180',
    duration: 1,
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250',
  },
  {
    id: 'selante-pneus',
    name: 'Selante nos Pneus',
    description: 'Proteção e brilho para os pneus',
    price: 'R$ 60',
    duration: 1,
    image: 'https://images.unsplash.com/photo-1606016159611-be4ed3ba99b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250',
  },
  {
    id: 'detalhamento-combo',
    name: 'Serviço de Detalhamento (combo proteção)',
    description: 'Pacote completo de detalhamento',
    price: 'R$ 950',
    duration: 4,
    image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250',
  },
  {
    id: 'auto-eletrica',
    name: 'Auto Elétrica',
    description: 'Serviços elétricos especializados (troca lâmpadas, buzina, bomba, relês, vidros, arranque, alternador, correias)',
    price: 'Sob orçamento',
    duration: 2,
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250',
  },
  {
    id: 'som-automotivo',
    name: 'Som Automotivo',
    description: 'Instalação e setup de sistema de áudio (kit som, alto-falantes, amplificador, promoções)',
    price: 'Sob orçamento',
    duration: 3,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250',
  },
  {
    id: 'insulfilm-profissional',
    name: 'Insulfilm Profissional',
    description: 'Aplicação profissional de películas',
    price: 'Sob orçamento',
    duration: 1.5,
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250',
  },
  {
    id: 'pacotes-promocoes',
    name: 'Pacotes/Promoções Especiais',
    description: 'Ofertas especiais combinadas',
    price: 'Sob orçamento',
    duration: 4,
    image: 'https://images.unsplash.com/photo-1562911791-c7a01be3a87d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250',
  },
];
