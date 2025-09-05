// Sistema de Gerenciamento de Assets Reais da Garagem 599
// Estrutura otimizada para receber fotos reais do Instagram @garagem599_

export interface RealAsset {
  src: string;
  alt: string;
  category: string;
  service?: string;
  priority?: 'high' | 'medium' | 'low';
}

// Carregamento dinâmico de assets reais (quando disponíveis)
const realImageImports = import.meta.glob('@assets/real/**/*.{jpg,jpeg,png,webp}', { 
  eager: false, 
  query: '?url',
  import: 'default'
}) as Record<string, () => Promise<string>>;

// Asset resolver que tenta encontrar a imagem real ou usa fallback
export async function getAssetUrl(path: string): Promise<string> {
  const normalizedPath = path.replace('@assets/', '/src/assets/');
  const importPath = `@assets/${path.split('@assets/')[1]}`;
  
  if (importPath in realImageImports) {
    try {
      const module = await realImageImports[importPath]();
      return module;
    } catch (error) {
      console.log(`Asset real não encontrado: ${path}, usando fallback`);
      return getFallbackUrl(path);
    }
  }
  
  return getFallbackUrl(path);
}

// Fallback URLs para imagens Unsplash atuais  
function getFallbackUrl(path: string): string {
  // Mapear categorias para imagens Unsplash correspondentes
  if (path.includes('detailing')) {
    return "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600";
  }
  if (path.includes('interior')) {
    return "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600";
  }
  if (path.includes('washing')) {
    return "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600";
  }
  if (path.includes('specialized')) {
    return "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600";
  }
  if (path.includes('results')) {
    return "https://images.unsplash.com/photo-1502877338535-766e1452684a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600";
  }
  
  // Default fallback
  return "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600";
}

// Estrutura de assets organizados por categorias temáticas
export const realAssets = {
  // SEÇÃO 1: Detalhamento Externo (4 fotos)
  detailing: [
    {
      src: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Carro após detalhamento premium da Garagem 599",
      category: "detailing",
      service: "detalhamento",
      priority: "high" as const,
    },
    {
      src: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600", 
      alt: "Antes e depois do polimento profissional",
      category: "detailing",
      service: "polimento",
      priority: "high" as const,
    },
    {
      src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Aplicação de cera premium",
      category: "detailing", 
      service: "enceramento",
      priority: "medium" as const,
    },
    {
      src: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Processo de vitrificação automotiva",
      category: "detailing",
      service: "vitrificacao", 
      priority: "medium" as const,
    },
  ],

  // SEÇÃO 2: Interior e Detalhes (4 fotos)
  interior: [
    {
      src: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Interior completamente limpo e detalhado",
      category: "interior",
      service: "limpeza-interna",
      priority: "high" as const,
    },
    {
      src: "https://images.unsplash.com/photo-1596008194705-2091cd6764d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Detalhamento especializado de rodas",
      category: "interior", 
      service: "detalhamento-rodas",
      priority: "medium" as const,
    },
    {
      src: "https://images.unsplash.com/photo-1622993719488-fb6b03b3e087?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Restauração e polimento de faróis",
      category: "interior",
      service: "polimento-farois",
      priority: "medium" as const,
    },
    {
      src: "https://images.unsplash.com/photo-1615906655593-ad0386982805?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Limpeza técnica de motor",
      category: "interior",
      service: "limpeza-motor", 
      priority: "low" as const,
    },
  ],

  // SEÇÃO 3: Lavagem e Acabamento (4 fotos)
  washing: [
    {
      src: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Lavagem premium completa na Garagem 599",
      category: "washing",
      service: "lavagem-completa",
      priority: "high" as const,
    },
    {
      src: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Processo de espuma ativa na lavagem",
      category: "washing",
      service: "espuma-ativa", 
      priority: "medium" as const,
    },
    {
      src: "https://images.unsplash.com/photo-1621274790572-7c823df7d53d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Secagem profissional sem riscos",
      category: "washing",
      service: "secagem",
      priority: "medium" as const,
    },
    {
      src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Enceramento final de proteção",
      category: "washing", 
      service: "enceramento-final",
      priority: "low" as const,
    },
  ],

  // SEÇÃO 4: Serviços Especializados (4 fotos)  
  specialized: [
    {
      src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Instalação de sistema de som automotivo",
      category: "specialized",
      service: "som-automotivo",
      priority: "high" as const,
    },
    {
      src: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Aplicação profissional de insulfilm",
      category: "specialized",
      service: "insulfilm",
      priority: "high" as const,
    },
    {
      src: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Serviço de auto elétrica especializada",
      category: "specialized", 
      service: "auto-eletrica",
      priority: "medium" as const,
    },
    {
      src: "https://images.unsplash.com/photo-1494976688994-7cc60a1ac132?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Restauração profissional de peças",
      category: "specialized",
      service: "restauracao",
      priority: "low" as const,
    },
  ],

  // SEÇÃO 5: Resultados Finais (4 fotos)
  results: [
    {
      src: "https://images.unsplash.com/photo-1502877338535-766e1452684a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Resultado final - sedan premium transformado",
      category: "results",
      service: "resultado-sedan",
      priority: "high" as const,
    },
    {
      src: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600", 
      alt: "SUV após tratamento completo na Garagem 599",
      category: "results",
      service: "resultado-suv",
      priority: "high" as const,
    },
    {
      src: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Carro esportivo com vitrificação premium",
      category: "results",
      service: "resultado-esportivo", 
      priority: "medium" as const,
    },
    {
      src: "https://images.unsplash.com/photo-1542586252-a44dcaa10ef6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Picape com detalhamento completo",
      category: "results",
      service: "resultado-picape",
      priority: "medium" as const,
    },
  ],

  // ASSETS DOS SERVIÇOS (Cards da seção de serviços) - usando fallbacks por enquanto
  services: {
    detalhamento: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    vitrificacao: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250", 
    polimento: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    lavagem: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    som: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    insulfilm: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    eletrica: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
  }
};

// Função para obter asset com fallback
export function getRealAsset(category: string, index: number): RealAsset {
  const categoryAssets = realAssets[category as keyof typeof realAssets];
  
  if (Array.isArray(categoryAssets) && categoryAssets[index]) {
    return categoryAssets[index];
  }
  
  // Fallback para imagens Unsplash atuais caso a foto real ainda não esteja disponível
  return getFallbackAsset(category, index);
}

// Fallbacks temporários usando as URLs atuais do Unsplash
function getFallbackAsset(category: string, index: number): RealAsset {
  const fallbacks = {
    detailing: [
      {
        src: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        alt: "Carro após detalhamento premium",
        category: "detailing",
      },
      {
        src: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        alt: "Antes e depois polimento", 
        category: "detailing",
      },
      {
        src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        alt: "Cera premium aplicada",
        category: "detailing",
      },
      {
        src: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        alt: "Aplicação de vitrificação",
        category: "detailing",
      },
    ],
    // Adicionar outros fallbacks conforme necessário...
  };
  
  const categoryFallbacks = fallbacks[category as keyof typeof fallbacks];
  if (categoryFallbacks && categoryFallbacks[index]) {
    return categoryFallbacks[index];
  }
  
  // Fallback final
  return {
    src: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    alt: "Serviço automotivo premium",
    category: "default",
  };
}

// Função para verificar se um asset real existe
export async function assetExists(src: string): Promise<boolean> {
  try {
    const response = await fetch(src, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
}

// Lista de fotos necessárias para coleta do Instagram
export const requiredPhotosFromInstagram = {
  total: 27,
  categories: {
    "Galeria Principal (20 fotos)": {
      "Detalhamento Externo": 4,
      "Interior e Detalhes": 4, 
      "Lavagem e Acabamento": 4,
      "Serviços Especializados": 4,
      "Resultados Finais": 4,
    },
    "Cards de Serviços (7 fotos)": {
      "Detalhamento": 1,
      "Vitrificação": 1,
      "Polimento": 1, 
      "Lavagem": 1,
      "Som Automotivo": 1,
      "Insulfilm": 1,
      "Auto Elétrica": 1,
    }
  }
};