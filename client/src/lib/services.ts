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
    image: 'https://images.unsplash.com/photo-1619431856706-ca2cc58258f6?ixlib=rb-4.1.0&auto=format&fit=crop&w=400&h=250',
  },
  {
    id: 'lavagem-simples',
    name: 'Lavagem Simples',
    description: 'Limpeza externa básica com qualidade',
    price: 'R$ 80',
    duration: 1,
    image: 'https://images.unsplash.com/photo-1632823469850-2f77dd9c7f93?ixlib=rb-4.1.0&auto=format&fit=crop&w=400&h=250',
  },
  {
    id: 'lavagem-tecnica',
    name: 'Lavagem Técnica',
    description: 'Limpeza detalhada com produtos específicos',
    price: 'R$ 150',
    duration: 2,
    image: 'https://images.unsplash.com/photo-1708805282706-f44730b7e527?ixlib=rb-4.1.0&auto=format&fit=crop&w=400&h=250',
  },
  {
    id: 'higienizacao-completa',
    name: 'Higienização Completa',
    description: 'Limpeza e sanitização total do interior',
    price: 'R$ 350',
    duration: 3,
    image: 'https://images.unsplash.com/photo-1605437241278-c1806d14a4d9?ixlib=rb-4.1.0&auto=format&fit=crop&w=400&h=250',
  },
  {
    id: 'polimento-tecnico',
    name: 'Polimento Técnico',
    description: 'Correção de pintura e acabamento perfeito',
    price: 'R$ 700',
    duration: 3,
    image: 'https://images.unsplash.com/photo-1632823470270-a7d3d03c3e20?ixlib=rb-4.1.0&auto=format&fit=crop&w=400&h=250',
  },
  {
    id: 'descontaminacao-pintura',
    name: 'Descontaminação de Pintura',
    description: 'Remoção de contaminantes da pintura',
    price: 'R$ 250',
    duration: 2,
    image: 'https://images.unsplash.com/photo-1708805282676-0c15476eb8a2?ixlib=rb-4.1.0&auto=format&fit=crop&w=400&h=250',
  },
  {
    id: 'revitalizador-plasticos-externos',
    name: 'Revitalizador Plásticos Externos',
    description: 'Restauração de plásticos externos',
    price: 'R$ 120',
    duration: 1,
    image: 'https://images.unsplash.com/photo-1622329821376-a19fd6002562?ixlib=rb-4.1.0&auto=format&fit=crop&w=400&h=250',
  },
  {
    id: 'revitalizador-plasticos-internos',
    name: 'Revitalizador Plásticos Internos',
    description: 'Revitalização de plásticos internos',
    price: 'R$ 100',
    duration: 1,
    image: 'https://images.unsplash.com/photo-1620584899131-a5ff5f8fbb03?ixlib=rb-4.1.0&auto=format&fit=crop&w=400&h=250',
  },
  {
    id: 'impermeabilizador-vidros',
    name: 'Impermeabilizador Vidros/Parabrisa',
    description: 'Proteção e repelência de água nos vidros',
    price: 'R$ 180',
    duration: 1,
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.1.0&auto=format&fit=crop&w=400&h=250',
  },
  {
    id: 'selante-pneus',
    name: 'Selante nos Pneus',
    description: 'Proteção e brilho para os pneus',
    price: 'R$ 60',
    duration: 1,
    image: 'https://images.unsplash.com/photo-1708805282683-50a060eba80f?ixlib=rb-4.1.0&auto=format&fit=crop&w=400&h=250',
  },
  {
    id: 'detalhamento-combo',
    name: 'Serviço de Detalhamento (combo proteção)',
    description: 'Pacote completo de detalhamento',
    price: 'R$ 950',
    duration: 4,
    image: 'https://images.unsplash.com/photo-1620584898989-d39f7f9ed1b7?ixlib=rb-4.1.0&auto=format&fit=crop&w=400&h=250',
  },
  {
    id: 'auto-eletrica',
    name: 'Auto Elétrica',
    description: 'Serviços elétricos especializados (troca lâmpadas, buzina, bomba, relês, vidros, arranque, alternador, correias)',
    price: 'Sob orçamento',
    duration: 2,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.1.0&auto=format&fit=crop&w=400&h=250',
  },
  {
    id: 'som-automotivo',
    name: 'Som Automotivo',
    description: 'Instalação e setup de sistema de áudio (kit som, alto-falantes, amplificador, promoções)',
    price: 'Sob orçamento',
    duration: 3,
    image: 'https://images.unsplash.com/photo-1592570714618-15e2d4719c6c?ixlib=rb-4.1.0&auto=format&fit=crop&w=400&h=250',
  },
  {
    id: 'insulfilm-profissional',
    name: 'Insulfilm Profissional',
    description: 'Aplicação profissional de películas',
    price: 'Sob orçamento',
    duration: 1.5,
    image: 'https://images.unsplash.com/photo-1756387461748-3eab2d58dbc5?ixlib=rb-4.1.0&auto=format&fit=crop&w=400&h=250',
  },
  {
    id: 'pacotes-promocoes',
    name: 'Pacotes/Promoções Especiais',
    description: 'Ofertas especiais combinadas',
    price: 'Sob orçamento',
    duration: 4,
    image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?ixlib=rb-4.1.0&auto=format&fit=crop&w=400&h=250',
  },
];
