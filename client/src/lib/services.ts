// Imagem real para cristalização de moto
import motoImg2 from "@assets/WhatsApp Image 2025-09-11 at 16.38.40 (2)_1757627516524.jpeg";

export interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: number;
  image: string;
  vehicleType: 'car' | 'moto';
}

export type VehicleType = 'car' | 'moto';

export const services: Service[] = [
  // Serviços para carros
  {
    id: 'lavagem-simples-carro',
    name: 'Lavagem Simples Carro',
    description: 'Limpeza externa básica com qualidade para carros',
    price: 'R$ 80',
    duration: 1,
    image: 'https://images.unsplash.com/photo-1632823469850-2f77dd9c7f93?ixlib=rb-4.1.0&auto=format&fit=crop&w=400&h=250',
    vehicleType: 'car',
  },
  {
    id: 'revitalizador-plasticos-externos-carro',
    name: 'Revitalizador Plásticos Externos Carro',
    description: 'Restauração de plásticos externos para carros',
    price: 'R$ 120',
    duration: 1,
    image: 'https://images.unsplash.com/photo-1622329821376-a19fd6002562?ixlib=rb-4.1.0&auto=format&fit=crop&w=400&h=250',
    vehicleType: 'car',
  },
  {
    id: 'cristalizacao-carro',
    name: 'Cristalização Carro',
    description: 'Proteção e cristalização especializada para carros',
    price: 'R$ 280',
    duration: 3,
    image: 'https://images.unsplash.com/photo-1619431856706-ca2cc58258f6?ixlib=rb-4.1.0&auto=format&fit=crop&w=400&h=250',
    vehicleType: 'car',
  },
  // Serviços para motos
  {
    id: 'lavagem-simples-moto',
    name: 'Lavagem Simples Moto',
    description: 'Limpeza externa básica com qualidade para motos',
    price: 'R$ 50',
    duration: 1,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.1.0&auto=format&fit=crop&w=400&h=250',
    vehicleType: 'moto',
  },
  {
    id: 'revitalizador-plasticos-externos-moto',
    name: 'Revitalizador Plásticos Externos Moto',
    description: 'Restauração de plásticos externos para motos',
    price: 'R$ 80',
    duration: 1,
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.1.0&auto=format&fit=crop&w=400&h=250',
    vehicleType: 'moto',
  },
  {
    id: 'cristalizacao-moto',
    name: 'Cristalização Moto',
    description: 'Proteção e cristalização especializada para motos',
    price: 'R$ 180',
    duration: 2,
    image: motoImg2,
    vehicleType: 'moto',
  },
];
