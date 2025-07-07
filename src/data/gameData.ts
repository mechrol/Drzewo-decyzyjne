import { Topic, Factor } from '../types/game';

export const sampleTopics: Topic[] = [
  {
    id: 'ecosystem',
    name: 'Ekosystem Leśny',
    description: 'Zbuduj zrównoważony ekosystem leśny poprzez właściwe rozmieszczenie elementów',
    targetScore: 80,
    branches: [
      {
        id: 'producers',
        name: 'Producenci',
        factors: [],
        isComplete: false,
        score: 0
      },
      {
        id: 'consumers',
        name: 'Konsumenci',
        factors: [],
        isComplete: false,
        score: 0
      },
      {
        id: 'decomposers',
        name: 'Rozkładacze',
        factors: [],
        isComplete: false,
        score: 0
      }
    ]
  },
  {
    id: 'business',
    name: 'Startup Technologiczny',
    description: 'Stwórz sukces biznesowy poprzez optymalne zarządzanie zasobami',
    targetScore: 85,
    branches: [
      {
        id: 'product',
        name: 'Produkt',
        factors: [],
        isComplete: false,
        score: 0
      },
      {
        id: 'marketing',
        name: 'Marketing',
        factors: [],
        isComplete: false,
        score: 0
      },
      {
        id: 'operations',
        name: 'Operacje',
        factors: [],
        isComplete: false,
        score: 0
      }
    ]
  },
  {
    id: 'marketing',
    name: 'Marketing Mix 4P',
    description: 'Zoptymalizuj strategię marketingową poprzez właściwe połączenie elementów 4P',
    targetScore: 90,
    branches: [
      {
        id: 'distribution',
        name: 'Dystrybucja',
        factors: [],
        isComplete: false,
        score: 0
      },
      {
        id: 'price',
        name: 'Cena',
        factors: [],
        isComplete: false,
        score: 0
      },
      {
        id: 'product-marketing',
        name: 'Produkt',
        factors: [],
        isComplete: false,
        score: 0
      },
      {
        id: 'promotion',
        name: 'Promocja',
        factors: [],
        isComplete: false,
        score: 0
      }
    ]
  }
];

export const ecosystemFactors: Factor[] = [
  // Parts
  { id: 'leaves', name: 'Liście', type: 'part', value: 15, description: 'Podstawowe elementy fotosyntezy' },
  { id: 'roots', name: 'Korzenie', type: 'part', value: 12, description: 'System pobierania składników' },
  { id: 'insects', name: 'Owady', type: 'part', value: 10, description: 'Małe organizmy konsumenckie' },
  { id: 'bacteria', name: 'Bakterie', type: 'part', value: 8, description: 'Mikroorganizmy rozkładające' },
  
  // Wholes
  { id: 'trees', name: 'Drzewa', type: 'whole', value: 20, description: 'Główni producenci ekosystemu' },
  { id: 'animals', name: 'Zwierzęta', type: 'whole', value: 18, description: 'Konsumenci wyższego rzędu' },
  { id: 'soil', name: 'Gleba', type: 'whole', value: 16, description: 'Środowisko życia rozkładaczy' },
  
  // Causes
  { id: 'sunlight', name: 'Światło słoneczne', type: 'cause', value: 25, description: 'Energia napędzająca fotosyntezę' },
  { id: 'water', name: 'Woda', type: 'cause', value: 22, description: 'Niezbędny składnik życia' },
  { id: 'nutrients', name: 'Składniki odżywcze', type: 'cause', value: 18, description: 'Materiały budulcowe organizmów' },
  
  // Effects
  { id: 'oxygen', name: 'Tlen', type: 'effect', value: 20, description: 'Produkt fotosyntezy' },
  { id: 'biomass', name: 'Biomasa', type: 'effect', value: 15, description: 'Nagromadzona materia organiczna' },
  { id: 'biodiversity', name: 'Bioróżnorodność', type: 'effect', value: 18, description: 'Różnorodność gatunkowa' }
];

export const businessFactors: Factor[] = [
  // Parts
  { id: 'features', name: 'Funkcje', type: 'part', value: 12, description: 'Elementy składowe produktu' },
  { id: 'team-members', name: 'Członkowie zespołu', type: 'part', value: 15, description: 'Indywidualni pracownicy' },
  { id: 'campaigns', name: 'Kampanie', type: 'part', value: 10, description: 'Pojedyncze akcje marketingowe' },
  { id: 'processes', name: 'Procesy', type: 'part', value: 8, description: 'Procedury operacyjne' },
  
  // Wholes
  { id: 'platform', name: 'Platforma', type: 'whole', value: 18, description: 'Kompletny system produktowy' },
  { id: 'organization', name: 'Organizacja', type: 'whole', value: 20, description: 'Cała struktura firmy' },
  { id: 'brand', name: 'Marka', type: 'whole', value: 16, description: 'Całościowy wizerunek firmy' },
  
  // Causes
  { id: 'investment', name: 'Inwestycje', type: 'cause', value: 25, description: 'Kapitał napędzający rozwój' },
  { id: 'market-demand', name: 'Popyt rynkowy', type: 'cause', value: 22, description: 'Potrzeby klientów' },
  { id: 'innovation', name: 'Innowacje', type: 'cause', value: 20, description: 'Nowe rozwiązania technologiczne' },
  
  // Effects
  { id: 'revenue', name: 'Przychody', type: 'effect', value: 20, description: 'Zyski finansowe' },
  { id: 'growth', name: 'Wzrost', type: 'effect', value: 18, description: 'Ekspansja biznesowa' },
  { id: 'satisfaction', name: 'Satysfakcja', type: 'effect', value: 15, description: 'Zadowolenie klientów' }
];

export const marketingFactors: Factor[] = [
  // Parts - Dystrybucja
  { id: 'retail-stores', name: 'Sklepy detaliczne', type: 'part', value: 14, description: 'Punkty sprzedaży stacjonarnej' },
  { id: 'online-channels', name: 'Kanały online', type: 'part', value: 16, description: 'Platformy sprzedaży internetowej' },
  { id: 'distributors', name: 'Dystrybutorzy', type: 'part', value: 12, description: 'Pośrednicy w łańcuchu dostaw' },
  { id: 'logistics', name: 'Logistyka', type: 'part', value: 13, description: 'System transportu i magazynowania' },
  
  // Wholes - Cena
  { id: 'pricing-strategy', name: 'Strategia cenowa', type: 'whole', value: 20, description: 'Kompleksowe podejście do ustalania cen' },
  { id: 'cost-structure', name: 'Struktura kosztów', type: 'whole', value: 18, description: 'Całościowy model kosztowy' },
  { id: 'value-proposition', name: 'Propozycja wartości', type: 'whole', value: 22, description: 'Całościowa oferta wartości dla klienta' },
  { id: 'market-positioning', name: 'Pozycjonowanie rynkowe', type: 'whole', value: 19, description: 'Miejsce marki na rynku' },
  
  // Causes - Produkt
  { id: 'customer-needs', name: 'Potrzeby klientów', type: 'cause', value: 25, description: 'Podstawowe wymagania rynku' },
  { id: 'market-research', name: 'Badania rynku', type: 'cause', value: 20, description: 'Analiza preferencji konsumentów' },
  { id: 'innovation-drive', name: 'Dążenie do innowacji', type: 'cause', value: 23, description: 'Motywacja do tworzenia nowości' },
  { id: 'competition', name: 'Konkurencja', type: 'cause', value: 18, description: 'Presja konkurencyjna na rynku' },
  
  // Effects - Promocja
  { id: 'brand-awareness', name: 'Świadomość marki', type: 'effect', value: 22, description: 'Rozpoznawalność marki na rynku' },
  { id: 'customer-engagement', name: 'Zaangażowanie klientów', type: 'effect', value: 20, description: 'Poziom interakcji z marką' },
  { id: 'sales-growth', name: 'Wzrost sprzedaży', type: 'effect', value: 24, description: 'Zwiększenie obrotów handlowych' },
  { id: 'market-share', name: 'Udział w rynku', type: 'effect', value: 18, description: 'Pozycja konkurencyjna' }
];
