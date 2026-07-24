export type TourCategory =
  | 'full-day' | 'historico' | 'costa'
  | 'cultural' | 'natureza' | 'enoturismo'
  | 'peregrinacao' | 'urbana' | 'multidia';

export const categoryLabel: Record<TourCategory, string> = {
  'full-day': 'Full Day',
  'historico': 'Histórico',
  'costa': 'Costa',
  'cultural': 'Cultural',
  'natureza': 'Natureza',
  'enoturismo': 'Enoturismo',
  'peregrinacao': 'Peregrinação',
  'urbana': 'Cidade',
  'multidia': 'Multidía',
};

export const categoryColor: Record<TourCategory, string> = {
  'full-day': 'bg-brand-green/10 text-brand-green',
  'historico': 'bg-amber-100 text-amber-700',
  'costa': 'bg-blue-100 text-blue-700',
  'cultural': 'bg-purple-100 text-purple-700',
  'natureza': 'bg-emerald-100 text-emerald-700',
  'enoturismo': 'bg-rose-100 text-rose-700',
  'peregrinacao': 'bg-orange-100 text-orange-700',
  'urbana': 'bg-sky-100 text-sky-700',
  'multidia': 'bg-indigo-100 text-indigo-700',
};

export interface TourDetail {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  priceFrom: number;
  priceDisplay: string;
  priceNote: string;
  sidebarPriceNote: string;
  duration: string;
  capacityNote: string;
  maxPax: string;
  pickup: string;
  ages: string;
  languages: string[];
  category: TourCategory;
  type: 'tuktuk' | 'excursao';
  // Flexible tours: choose duration + pick points of interest
  howItWorks?: string[];
  durationOptions?: { label: string; price: string }[];
  canInclude?: string[];
  // Fixed tours: predefined stops
  itinerary?: string[];
  included: string[];
  notIncluded: string[];
  sidebarFeatures: string[];
}

const TUK_FEATURES = [
  'Tuk-tuk elétrico 100% privativo',
  'Pick-up grátis no hotel (Lisboa)',
  'Cancelamento grátis até 48h',
  'Confirmação imediata',
];

const EXCURSION_FEATURES = [
  'Transporte privativo climatizado',
  'Guia certificado bilíngue',
  'Pick-up grátis no hotel (Lisboa)',
  'Cancelamento grátis até 48h',
  'Confirmação imediata',
];

export const tukTukTours: TourDetail[] = [
  {
    slug: 'lisboa-total',
    title: 'Lisboa Total em Tuk-Tuk',
    subtitle: 'Alfama · Graça · Chiado · Bairro Alto · Belém',
    description:
      'A experiência mais completa sobre três rodas. Explore a alma de Lisboa desde os bairros medievais de Alfama e Graça até à elegância do Chiado e Bairro Alto, terminando em Belém com pastel de cortesia.',
    longDescription:
      'Descubra tudo o que Lisboa tem para oferecer numa única e inesquecível experiência. O seu guia privado conduz-o pelos bairros medievais de Alfama e Graça, onde ouvirá histórias de fado e verá azulejos únicos no mundo. Depois, a elegância do Chiado e o movimento do Bairro Alto dão lugar à grandiosidade histórica de Belém — com pastel de nata na famosa fábrica incluído. Um dia inteiro para guardar para sempre.',
    priceFrom: 340,
    priceDisplay: '€340',
    priceNote: 'por grupo (1–3 pax) · 4+ sob consulta',
    sidebarPriceNote: 'por grupo · até 3 pax',
    duration: '6 horas',
    capacityNote: '1–3 pax · 4+ sob consulta',
    maxPax: 'Até 3 pessoas',
    pickup: 'Hotel ou ponto acordado',
    ages: 'Todas as idades',
    languages: ['PT', 'EN', 'ES'],
    category: 'full-day',
    type: 'tuktuk',
    itinerary: [
      'Pick-up no hotel (Lisboa)',
      'Alfama — Sé Catedral, ruelas e azulejos históricos',
      'Castelo de São Jorge (exterior e panorâmicas)',
      'Graça — Miradouro e Panteão Nacional',
      'Chiado e Livraria Bertrand',
      'Bairro Alto',
      'Baixa Pombalina e Praça do Comércio',
      'LX Factory e vistas para a Ponte 25 de Abril',
      'Belém — Padrão dos Descobrimentos e Torre de Belém',
      'Pastel de nata de cortesia',
      'Regresso ao hotel',
    ],
    included: [
      'Tuk-tuk elétrico privativo durante as 6 horas',
      'Guia local certificado',
      'Pick-up e drop-off no hotel (Lisboa)',
      'Pastel de nata de cortesia em Belém',
      'Água a bordo',
    ],
    notIncluded: [
      'Entradas em monumentos',
      'Refeições e bebidas (exceto pastel de nata)',
      'Gorjeta (opcional)',
    ],
    sidebarFeatures: TUK_FEATURES,
  },
  {
    slug: 'alfama-graca',
    title: 'Alfama e Graça Histórica',
    subtitle: 'Sé · Santo António · Miradores · Panteão Nacional',
    description:
      'Uma viagem pelas ruelas mais antigas de Lisboa. Descubra a Sé Catedral, os miradores icónicos de Santa Luzia e Portas do Sol, o Convento da Graça e a majestade do Panteão Nacional.',
    longDescription:
      'Alfama é a alma mais antiga de Lisboa — um labirinto de ruelas onde o fado nasceu e onde o tempo parece ter parado. Suba até à Graça para contemplar uma das mais belas vistas panorâmicas sobre o Tejo e a Baixa Pombalina. O seu guia partilhará histórias que não constam em nenhum guia de viagens, desde lendas mouriscas até ao fado de Amália Rodrigues.',
    priceFrom: 120,
    priceDisplay: 'Desde €120',
    priceNote: '90 min: €120 · 2h: €150 (1–3 pax) · 4+ sob consulta',
    sidebarPriceNote: 'por grupo · até 3 pax',
    duration: '90 min / 2 horas',
    capacityNote: '1–3 pax · 4+ sob consulta',
    maxPax: 'Até 3 pessoas',
    pickup: 'Hotel ou ponto acordado',
    ages: 'Todas as idades',
    languages: ['PT', 'EN', 'ES'],
    category: 'historico',
    type: 'tuktuk',
    howItWorks: [
      'Escolha a duração — 90 minutos ou 2 horas',
      'Diga-nos o que quer priorizar (ou deixe nas nossas mãos)',
      'Desfrute de um roteiro feito só para si',
    ],
    durationOptions: [
      { label: '90 min', price: '€120' },
      { label: '2h', price: '€150' },
    ],
    canInclude: [
      'Sé Catedral de Lisboa',
      'Casa de Santo António',
      'Miradouro de Santa Luzia',
      'Portas do Sol',
      'Convento da Graça',
      'Panteão Nacional',
      'Castelo de São Jorge (exterior)',
      'Feira da Ladra (aos sábados)',
    ],
    included: [
      'Tuk-tuk elétrico privativo',
      'Guia local certificado',
      'Pick-up no hotel (Lisboa)',
      'Água a bordo',
    ],
    notIncluded: [
      'Entradas em monumentos',
      'Refeições e bebidas',
      'Gorjeta (opcional)',
    ],
    sidebarFeatures: TUK_FEATURES,
  },
  {
    slug: 'belem-descobrimentos',
    title: 'Rota dos Descobrimentos',
    subtitle: 'LX Factory · Ponte 25 de Abril · Torre de Belém',
    description:
      'Explore a época dourada da navegação portuguesa. Passe pela LX Factory, debaixo da Ponte 25 de Abril, pelo Palácio Presidencial e pela histórica Torre de Belém — com pastel de cortesia incluído.',
    longDescription:
      'Reviva a era mais gloriosa de Portugal neste tour dedicado aos Descobrimentos. Das caravelas que partiram de Belém para explorar o mundo até à Torre que vigia o Tejo há séculos, cada paragem conta uma parte da épica história portuguesa. Inclui passagem pelo criativo espaço da LX Factory, o Padrão dos Descobrimentos, o Palácio de Belém e o icónico Mosteiro dos Jerónimos.',
    priceFrom: 150,
    priceDisplay: '€150',
    priceNote: 'por grupo (1–3 pax) · 4+ sob consulta',
    sidebarPriceNote: 'por grupo · até 3 pax',
    duration: '2 horas',
    capacityNote: '1–3 pax · 4+ sob consulta',
    maxPax: 'Até 3 pessoas',
    pickup: 'Hotel ou ponto acordado',
    ages: 'Todas as idades',
    languages: ['PT', 'EN', 'ES'],
    category: 'historico',
    type: 'tuktuk',
    itinerary: [
      'Pick-up no hotel',
      'LX Factory — o bairro criativo',
      'Vistas da Ponte 25 de Abril',
      'Padrão dos Descobrimentos',
      'Palácio de Belém (residência presidencial)',
      'Mosteiro dos Jerónimos (exterior)',
      'Torre de Belém',
      'Pastel de nata de cortesia',
      'Regresso ao hotel',
    ],
    included: [
      'Tuk-tuk elétrico privativo',
      'Guia local certificado',
      'Pick-up no hotel (Lisboa)',
      'Pastel de nata de cortesia',
      'Água a bordo',
    ],
    notIncluded: [
      'Entrada no Mosteiro dos Jerónimos (≈€10/pax)',
      'Entrada na Torre de Belém (≈€10/pax)',
      'Refeições adicionais',
      'Gorjeta (opcional)',
    ],
    sidebarFeatures: TUK_FEATURES,
  },
  {
    slug: 'chiado-poetico',
    title: 'Chiado Romântico e Poético',
    subtitle: 'Chiado · Baixa · Livraria Bertrand · Av. Liberdade',
    description:
      'Um percurso elegante pelo centro histórico. Conheça a Livraria Bertrand (a mais antiga do mundo em atividade), igrejas barrocas, os jardins de São Pedro de Alcântara e a imponente Avenida da Liberdade.',
    longDescription:
      'O Chiado é o coração cultural de Lisboa — terra de Fernando Pessoa, do fado moderno e da arquitectura neoclássica. Das livrarias históricas às esplanadas animadas, dos miradores escondidos à grandiosidade da Avenida da Liberdade, este passeio revela a Lisboa mais cosmopolita e poética.',
    priceFrom: 120,
    priceDisplay: 'Desde €120',
    priceNote: '90 min: €120 · 2h: €150 (1–3 pax) · 4+ sob consulta',
    sidebarPriceNote: 'por grupo · até 3 pax',
    duration: '90 min / 2 horas',
    capacityNote: '1–3 pax · 4+ sob consulta',
    maxPax: 'Até 3 pessoas',
    pickup: 'Hotel ou ponto acordado',
    ages: 'Todas as idades',
    languages: ['PT', 'EN', 'ES'],
    category: 'historico',
    type: 'tuktuk',
    howItWorks: [
      'Escolha a duração — 90 minutos ou 2 horas',
      'Diga-nos o que quer priorizar',
      'Desfrute de um roteiro personalizado',
    ],
    durationOptions: [
      { label: '90 min', price: '€120' },
      { label: '2h', price: '€150' },
    ],
    canInclude: [
      'Livraria Bertrand (a mais antiga do mundo em funcionamento)',
      'Praça do Comércio e Arco da Rua Augusta',
      'Igreja do Carmo',
      'Jardim de São Pedro de Alcântara',
      'Estátua de Fernando Pessoa',
      'Elevador de Santa Justa',
      'Avenida da Liberdade',
      'Bairro Alto',
    ],
    included: [
      'Tuk-tuk elétrico privativo',
      'Guia local certificado',
      'Pick-up no hotel (Lisboa)',
      'Água a bordo',
    ],
    notIncluded: [
      'Entradas em monumentos',
      'Refeições e bebidas',
      'Gorjeta (opcional)',
    ],
    sidebarFeatures: TUK_FEATURES,
  },
  {
    slug: 'cascais-cabo-da-roca',
    title: 'Cascais e Cabo da Roca',
    subtitle: 'Costa · Boca do Inferno · Fim do Mundo',
    description:
      'Um passeio costeiro exclusivo de Lisboa a Cascais. Visite a Boca do Inferno, o espetacular Cabo da Roca — o ponto mais ocidental da Europa continental — e as paisagens marítimas de Azenhas do Mar.',
    longDescription:
      'Abandone Lisboa por algumas horas e descubra a deslumbrante costa atlântica. A estrada marginal ao longo do Tejo dá lugar a falésias dramáticas e enseadas secretas. O Cabo da Roca, onde "a terra acaba e o mar começa" nas imortais palavras de Camões, é uma das experiências mais marcantes de Portugal.',
    priceFrom: 340,
    priceDisplay: '€340',
    priceNote: 'por grupo (1–3 pax) · 4+ sob consulta',
    sidebarPriceNote: 'por grupo · até 3 pax',
    duration: '6 horas',
    capacityNote: '1–3 pax · 4+ sob consulta',
    maxPax: 'Até 3 pessoas',
    pickup: 'Hotel ou ponto acordado',
    ages: 'Todas as idades',
    languages: ['PT', 'EN', 'ES'],
    category: 'costa',
    type: 'tuktuk',
    itinerary: [
      'Pick-up no hotel em Lisboa',
      'Estoril — Casino e jardins',
      'Cascais — centro histórico e marina',
      'Boca do Inferno — formações rochosas',
      'Praia do Guincho (panorâmicas)',
      'Cabo da Roca — o ponto mais ocidental da Europa',
      'Azenhas do Mar (paragem fotográfica)',
      'Regresso a Lisboa',
    ],
    included: [
      'Tuk-tuk elétrico privativo',
      'Guia local certificado',
      'Pick-up e drop-off no hotel',
      'Água a bordo',
      'Certificado Cabo da Roca (opcional)',
    ],
    notIncluded: ['Refeições e bebidas', 'Gorjeta (opcional)'],
    sidebarFeatures: TUK_FEATURES,
  },
];

export const excursionTours: TourDetail[] = [
  {
    slug: 'sintra-cascais',
    title: 'Sintra Mágica, Cabo da Roca e Cascais',
    subtitle: 'Sintra · Cabo da Roca · Cascais',
    description:
      'Um percurso pela romântica vila de Sintra visitando o Palácio da Pena ou a Quinta da Regaleira. Continua até ao Cabo da Roca e encerra com um passeio pela elegante baía de Cascais.',
    longDescription:
      'Sintra é um lugar de conto de fadas — palácios que emergem da floresta entre névoa e mistério, jardins secretos com fontes e grutas. Este tour combina a magia de Sintra (Património UNESCO) com a força bruta do Cabo da Roca e o charme costeiro de Cascais. Um dia completo inesquecível.',
    priceFrom: 350,
    priceDisplay: '€350',
    priceNote: '1–4 pax: €350 · 5–8 pax: €420',
    sidebarPriceNote: '1–4 pax · 5–8 pax: €420',
    duration: 'Full day (≈8h)',
    capacityNote: '1–8 pax',
    maxPax: 'Até 8 pessoas',
    pickup: 'Hotel ou ponto acordado (Lisboa)',
    ages: 'Todas as idades',
    languages: ['PT', 'EN', 'ES'],
    category: 'cultural',
    type: 'excursao',
    itinerary: [
      'Pick-up em Lisboa (≈9h)',
      'Sintra — Palácio da Pena ou Quinta da Regaleira',
      'Cabo da Roca — ponto mais ocidental da Europa',
      'Cascais — centro histórico e marina',
      'Retorno a Lisboa (≈18h)',
    ],
    included: [
      'Transporte privativo climatizado (van/minibus)',
      'Guia certificado durante todo o dia',
      'Pick-up e drop-off no hotel',
      'Água a bordo',
    ],
    notIncluded: [
      'Entradas em monumentos (Palácio da Pena ≈€20/pax)',
      'Refeições e bebidas',
      'Gorjeta (opcional)',
    ],
    sidebarFeatures: EXCURSION_FEATURES,
  },
  {
    slug: 'fatima-nazare-obidos',
    title: 'Fé, História e Mar: Fátima, Nazaré e Óbidos',
    subtitle: 'Fátima · Nazaré · Óbidos',
    description:
      'Um tour que une a devoção no Santuário de Fátima, as ondas gigantes da Nazaré e o encanto medieval da vila amuralhada de Óbidos.',
    longDescription:
      'Três destinos únicos num único dia extraordinário. O místico Santuário de Fátima, um dos maiores centros de peregrinação do mundo. A Nazaré com as suas ondas gigantes e tradição piscatória. E por fim Óbidos, uma vila medieval perfeitamente preservada dentro das suas muralhas do século XII.',
    priceFrom: 400,
    priceDisplay: '€400',
    priceNote: '1–4 pax: €400 · 5–8 pax: €480',
    sidebarPriceNote: '1–4 pax · 5–8 pax: €480',
    duration: 'Full day (≈9h)',
    capacityNote: '1–8 pax',
    maxPax: 'Até 8 pessoas',
    pickup: 'Hotel ou ponto acordado (Lisboa)',
    ages: 'Todas as idades',
    languages: ['PT', 'EN', 'ES'],
    category: 'peregrinacao',
    type: 'excursao',
    itinerary: [
      'Pick-up em Lisboa (≈8h30)',
      'Santuário de Fátima — Basílica e Capelinha das Aparições',
      'Nazaré — Sítio, miradouro e mercado de peixe',
      'Óbidos — vila medieval amuralhada e ginja de Óbidos',
      'Retorno a Lisboa (≈19h)',
    ],
    included: [
      'Transporte privativo climatizado',
      'Guia certificado',
      'Pick-up e drop-off no hotel',
      'Água a bordo',
    ],
    notIncluded: ['Entradas em monumentos', 'Refeições e bebidas', 'Gorjeta (opcional)'],
    sidebarFeatures: EXCURSION_FEATURES,
  },
  {
    slug: 'queluz-mafra-ericeira',
    title: 'Palácios Reais e as Ondas de Ericeira',
    subtitle: 'Queluz · Mafra · Ericeira',
    description:
      'Explore a suntuosidade da realeza portuguesa no Palácio de Queluz (o Versalhes português) e no monumental Palácio de Mafra. Termine em Ericeira, a única Reserva Mundial de Surf da Europa.',
    longDescription:
      'Um tour que combina a opulência barroca dos palácios reais com o sabor fresco do Atlântico. O Palácio de Queluz (século XVIII) é uma obra-prima do rococó português, enquanto o Convento Palácio de Mafra impressiona pela escala monumental. Ericeira, a única Reserva Mundial de Surf da Europa, é o final perfeito para o dia.',
    priceFrom: 350,
    priceDisplay: '€350',
    priceNote: '1–4 pax: €350 · 5–8 pax: €420',
    sidebarPriceNote: '1–4 pax · 5–8 pax: €420',
    duration: 'Full day (≈8h)',
    capacityNote: '1–8 pax',
    maxPax: 'Até 8 pessoas',
    pickup: 'Hotel ou ponto acordado (Lisboa)',
    ages: 'Todas as idades',
    languages: ['PT', 'EN', 'ES'],
    category: 'historico',
    type: 'excursao',
    itinerary: [
      'Pick-up em Lisboa',
      'Palácio de Queluz (o Versalhes português)',
      'Convento Palácio de Mafra',
      'Ericeira — Reserva Mundial de Surf',
      'Retorno a Lisboa',
    ],
    included: [
      'Transporte privativo climatizado',
      'Guia certificado',
      'Pick-up e drop-off no hotel',
      'Água a bordo',
    ],
    notIncluded: [
      'Entradas nos palácios (≈€10/pax)',
      'Refeições e bebidas',
      'Gorjeta (opcional)',
    ],
    sidebarFeatures: EXCURSION_FEATURES,
  },
  {
    slug: 'arrabida-cristo-rei',
    title: 'Paraíso Azul: Arrábida, Praias e Cristo Rei',
    subtitle: 'Arrábida · Sesimbra · Setúbal · Cristo Rei',
    description:
      'O tour perfeito para o verão. Desfrute da Serra da Arrábida, praias de águas cristalinas, o Mercado de Setúbal e uma paragem panorâmica no monumento de Cristo Rei em Almada.',
    longDescription:
      'A Serra da Arrábida esconde algumas das praias mais bonitas da Europa — areias brancas, águas turquesa e falésias calcárias. Este tour combina a beleza natural da Arrábida com o misticismo do Cristo Rei (réplica do Rio de Janeiro) e o genuíno mercado de peixe de Setúbal.',
    priceFrom: 350,
    priceDisplay: '€350',
    priceNote: '1–4 pax: €350 · 5–8 pax: €420',
    sidebarPriceNote: '1–4 pax · 5–8 pax: €420',
    duration: 'Full day (≈8h)',
    capacityNote: '1–8 pax',
    maxPax: 'Até 8 pessoas',
    pickup: 'Hotel ou ponto acordado (Lisboa)',
    ages: 'Todas as idades',
    languages: ['PT', 'EN', 'ES'],
    category: 'natureza',
    type: 'excursao',
    itinerary: [
      'Pick-up em Lisboa',
      'Cristo Rei — vista panorâmica sobre Lisboa e o Tejo',
      'Sesimbra — vila piscatória',
      'Serra da Arrábida — Praia de Galapos ou Portinho',
      'Setúbal — mercado de peixe',
      'Retorno a Lisboa',
    ],
    included: [
      'Transporte privativo climatizado',
      'Guia certificado',
      'Pick-up e drop-off no hotel',
      'Água a bordo',
    ],
    notIncluded: ['Refeições e bebidas', 'Gorjeta (opcional)'],
    sidebarFeatures: EXCURSION_FEATURES,
  },
  {
    slug: 'evora-vinhos',
    title: 'História e Vinhos em Évora',
    subtitle: 'Évora · Templo de Diana · Adegas do Alentejo',
    description:
      'Uma viagem ao coração do Alentejo para conhecer a Évora romana e medieval: Templo de Diana, Capela dos Ossos. Completa-se com uma visita e prova numa adega de prestígio.',
    longDescription:
      'Évora é um museu ao ar livre com 2000 anos de história, da Roma Antiga ao barroco português. A visita a uma adega premium do Alentejo (Fitapreta ou Cartuxa) completa um dia que mistura riqueza patrimonial com o melhor que a enologia alentejana tem para oferecer.',
    priceFrom: 420,
    priceDisplay: '€420',
    priceNote: '1–4 pax: €420 · 5–8 pax: €500',
    sidebarPriceNote: '1–4 pax · 5–8 pax: €500',
    duration: 'Full day (≈8-9h)',
    capacityNote: '1–8 pax',
    maxPax: 'Até 8 pessoas',
    pickup: 'Hotel ou ponto acordado (Lisboa)',
    ages: 'Maiores de 18 (prova de vinhos)',
    languages: ['PT', 'EN', 'ES'],
    category: 'enoturismo',
    type: 'excursao',
    itinerary: [
      'Pick-up em Lisboa (≈8h)',
      'Évora — Templo Romano de Diana',
      'Évora — Igreja de São Francisco e Capela dos Ossos',
      'Évora — centro histórico e Sé Catedral',
      'Adega premium do Alentejo — visita e prova de vinhos',
      'Retorno a Lisboa (≈19h)',
    ],
    included: [
      'Transporte privativo climatizado',
      'Guia certificado',
      'Pick-up e drop-off no hotel',
      'Prova de vinhos na adega',
      'Água a bordo',
    ],
    notIncluded: [
      'Entradas em monumentos em Évora',
      'Refeições (almoço recomendado em Évora)',
      'Gorjeta (opcional)',
    ],
    sidebarFeatures: EXCURSION_FEATURES,
  },
  {
    slug: 'templarios',
    title: 'A Rota dos Cavaleiros Templários',
    subtitle: 'Tomar · Convento de Cristo · Castelo de Almourol',
    description:
      'Siga as pisadas dos monges guerreiros. Visite o imponente Convento de Cristo em Tomar e descubra o místico Castelo de Almourol, numa ilha rochosa no meio do Tejo acessível de barco.',
    longDescription:
      'Os Cavaleiros Templários deixaram em Portugal um legado arquitectónico único. O Convento de Cristo em Tomar (Património UNESCO) mistura arquitetura mourisca, românica, gótica e manuelina. O Castelo de Almourol, numa ilha do Tejo, é um dos locais mais misteriosos e fotogénicos de Portugal.',
    priceFrom: 400,
    priceDisplay: '€400',
    priceNote: '1–4 pax: €400 · 5–8 pax: €480',
    sidebarPriceNote: '1–4 pax · 5–8 pax: €480',
    duration: 'Full day (≈8h)',
    capacityNote: '1–8 pax',
    maxPax: 'Até 8 pessoas',
    pickup: 'Hotel ou ponto acordado (Lisboa)',
    ages: 'Todas as idades',
    languages: ['PT', 'EN', 'ES'],
    category: 'historico',
    type: 'excursao',
    itinerary: [
      'Pick-up em Lisboa',
      'Castelo de Almourol — acesso de barco pela ilha',
      'Tomar — Convento de Cristo (Património UNESCO)',
      'Tomar — centro histórico e Sinagoga',
      'Retorno a Lisboa',
    ],
    included: [
      'Transporte privativo climatizado',
      'Guia certificado',
      'Pick-up e drop-off no hotel',
      'Barco para o Castelo de Almourol',
      'Água a bordo',
    ],
    notIncluded: [
      'Entrada no Convento de Cristo (≈€10/pax)',
      'Refeições e bebidas',
      'Gorjeta (opcional)',
    ],
    sidebarFeatures: EXCURSION_FEATURES,
  },
  {
    slug: 'coimbra-aveiro',
    title: 'Tradições Portuguesas: Coimbra e Aveiro',
    subtitle: 'Coimbra · Universidade · Aveiro · Moliceiros',
    description:
      'Descubra Coimbra, a cidade do conhecimento. Depois, explore Aveiro, a "Veneza portuguesa", famosa pelos canais coloridos, moliceiros e pelos doces ovos moles.',
    longDescription:
      'Coimbra foi a primeira capital de Portugal e mantém vivo o espírito académico mais antigo do país. A Universidade de Coimbra (UNESCO) guarda tesouros como a Biblioteca Joanina (1724). Aveiro, com os seus canais navegados por coloridos moliceiros e a tradição dos ovos moles, é a doce surpresa do dia.',
    priceFrom: 450,
    priceDisplay: '€450',
    priceNote: '1–4 pax: €450 · 5–8 pax: €520',
    sidebarPriceNote: '1–4 pax · 5–8 pax: €520',
    duration: 'Full day (≈9-10h)',
    capacityNote: '1–8 pax',
    maxPax: 'Até 8 pessoas',
    pickup: 'Hotel ou ponto acordado (Lisboa)',
    ages: 'Todas as idades',
    languages: ['PT', 'EN', 'ES'],
    category: 'cultural',
    type: 'excursao',
    itinerary: [
      'Pick-up em Lisboa (≈8h)',
      'Coimbra — Universidade e Biblioteca Joanina (exterior)',
      'Coimbra — centro histórico e Sé Velha',
      'Aveiro — passeio de moliceiro pelos canais',
      'Aveiro — centro histórico e mercado',
      'Retorno a Lisboa (≈19h30)',
    ],
    included: [
      'Transporte privativo climatizado',
      'Guia certificado',
      'Pick-up e drop-off no hotel',
      'Passeio de moliceiro em Aveiro',
      'Água a bordo',
    ],
    notIncluded: [
      'Entrada na Biblioteca Joanina (≈€13/pax)',
      'Refeições e bebidas',
      'Gorjeta (opcional)',
    ],
    sidebarFeatures: EXCURSION_FEATURES,
  },
  {
    slug: 'porto-1-dia',
    title: 'Essência do Porto em 1 Dia',
    subtitle: 'Porto · Torre dos Clérigos · Livraria Lello · Bolhão',
    description:
      'Um percurso intenso pelos pontos mais importantes do Porto: azulejos de São Bento, a Livraria Lello, as vistas da Ponte Dom Luís I e o ambiente local no Mercado de Bolhão.',
    longDescription:
      'O Porto é um dos destinos mais amados da Europa — pelo Vinho do Porto, pelos azulejos, pela arquitectura à beira-rio e pelo genuíno espírito tripeiro. Neste dia intenso, o seu guia revela a melhor versão do Porto, desde a ribeira animada até às caves históricas de Vinho do Porto em Vila Nova de Gaia.',
    priceFrom: 500,
    priceDisplay: '€500',
    priceNote: '1–4 pax: €500 · 5–8 pax: €600',
    sidebarPriceNote: '1–4 pax · 5–8 pax: €600',
    duration: 'Full day extendido (≈10h)',
    capacityNote: '1–8 pax',
    maxPax: 'Até 8 pessoas',
    pickup: 'Hotel ou ponto acordado (Lisboa)',
    ages: 'Todas as idades',
    languages: ['PT', 'EN', 'ES'],
    category: 'urbana',
    type: 'excursao',
    itinerary: [
      'Partida de Lisboa (≈7h30)',
      'Estação de São Bento — azulejos históricos',
      'Livraria Lello',
      'Torre dos Clérigos (vista panorâmica)',
      'Ribeira e Ponte Dom Luís I',
      'Vila Nova de Gaia — cave de Vinho do Porto',
      'Mercado de Bolhão',
      'Retorno a Lisboa (≈20h)',
    ],
    included: [
      'Transporte privativo climatizado',
      'Guia certificado',
      'Pick-up e drop-off no hotel',
      'Prova de Vinho do Porto',
      'Água a bordo',
    ],
    notIncluded: [
      'Entrada na Livraria Lello (≈€5 descontado em compras)',
      'Refeições e bebidas (exceto prova)',
      'Gorjeta (opcional)',
    ],
    sidebarFeatures: EXCURSION_FEATURES,
  },
  {
    slug: 'porto-braga-guimaraes',
    title: 'Porto, Braga e Guimarães',
    subtitle: 'Porto · Guimarães · Braga · Santuário do Bom Jesus',
    description:
      'Circuito de dois dias. O primeiro dedicado às joias do Porto; o segundo para descobrir Guimarães, o berço de Portugal, e Braga com o impressionante Santuário do Bom Jesus.',
    longDescription:
      'Dois dias no norte de Portugal para descobrir as suas três cidades mais históricas. Porto, Guimarães (onde Portugal nasceu em 1143) e Braga (a capital religiosa do país). Um circuito que percorre séculos de história, arquitectura e gastronomia — com pernoita incluída num hotel de charme.',
    priceFrom: 0,
    priceDisplay: 'Sob consulta',
    priceNote: 'Preço sob consulta (com pernoita)',
    sidebarPriceNote: 'por grupo (pernoita incluída)',
    duration: '2 dias',
    capacityNote: '1–8 pax',
    maxPax: 'Até 8 pessoas',
    pickup: 'Hotel ou ponto acordado (Lisboa)',
    ages: 'Todas as idades',
    languages: ['PT', 'EN', 'ES'],
    category: 'multidia',
    type: 'excursao',
    itinerary: [
      'Dia 1: Partida de Lisboa — Porto (ribeira, Lello, Clérigos, Gaia)',
      'Dia 1: Pernoita no Porto',
      'Dia 2: Guimarães — berço de Portugal (Paço dos Duques e Castelo)',
      'Dia 2: Braga — Sé Catedral e Santuário do Bom Jesus',
      'Dia 2: Retorno a Lisboa',
    ],
    included: [
      'Transporte privativo climatizado',
      'Guia certificado',
      'Pick-up e drop-off no hotel (Lisboa)',
      '1 noite de pernoita (hotel incluído — sob consulta)',
      'Água a bordo',
    ],
    notIncluded: ['Entradas em monumentos', 'Refeições e bebidas', 'Gorjeta (opcional)'],
    sidebarFeatures: EXCURSION_FEATURES,
  },
  {
    slug: 'norte-total-enoturismo',
    title: 'Experiência Norte Total com Enoturismo',
    subtitle: 'Porto · Braga · Guimarães · Vale do Douro',
    description:
      'A experiência definitiva no norte. Combina a história do Porto, as raízes medievais de Guimarães e Braga, e um terceiro dia dedicado ao Vinho do Porto numa adega histórica.',
    longDescription:
      'Três dias imersivos no norte de Portugal para os que querem ir além do turismo convencional. Para além dos highlights de Porto, Guimarães e Braga, o terceiro dia é dedicado ao Vinho do Porto — um tour pela região do Douro ou pelas caves históricas de Gaia, com provas premium incluídas.',
    priceFrom: 0,
    priceDisplay: 'Sob consulta',
    priceNote: 'Preço sob consulta (com pernoita)',
    sidebarPriceNote: 'por grupo (pernoitas incluídas)',
    duration: '3 dias',
    capacityNote: '1–8 pax',
    maxPax: 'Até 8 pessoas',
    pickup: 'Hotel ou ponto acordado (Lisboa)',
    ages: 'Maiores de 18 (provas de vinho)',
    languages: ['PT', 'EN', 'ES'],
    category: 'multidia',
    type: 'excursao',
    itinerary: [
      'Dia 1: Lisboa → Porto (ribeira, Lello, Clérigos, Gaia)',
      'Dia 2: Guimarães + Braga + Santuário do Bom Jesus',
      'Dia 3: Vale do Douro ou caves de Gaia — visita e prova premium',
      'Dia 3: Retorno a Lisboa',
    ],
    included: [
      'Transporte privativo climatizado',
      'Guia certificado',
      'Pick-up e drop-off no hotel (Lisboa)',
      '2 noites de pernoita (hotel incluído — sob consulta)',
      'Provas de Vinho do Porto (premium)',
      'Água a bordo',
    ],
    notIncluded: [
      'Entradas em monumentos',
      'Refeições e bebidas (exceto provas)',
      'Gorjeta (opcional)',
    ],
    sidebarFeatures: EXCURSION_FEATURES,
  },
  {
    slug: 'algarve-benagil',
    title: 'Maravilhas do Algarve: Benagil e Silves',
    subtitle: 'Algarve · Gruta de Benagil · Castelo de Silves',
    description:
      'Uma viagem ao sul de Portugal para maravilhar com as formações rochosas do Algarve. Vistas para a Gruta de Benagil, passeio pela Ermida da Rocha e visita ao Castelo árabe de Silves.',
    longDescription:
      'O Algarve é a joia do sul de Portugal — falésias douradas, grutas oceânicas e praias premiadas. A gruta de Benagil, com a luz a entrar pelo teto, é uma das imagens mais icónicas de Portugal. O Castelo árabe de Silves, com mais de 1000 anos de história, completa um dia de contrastes único.',
    priceFrom: 550,
    priceDisplay: '€550',
    priceNote: '1–4 pax: €550 · 5–8 pax: €650',
    sidebarPriceNote: '1–4 pax · 5–8 pax: €650',
    duration: 'Full day extendido (10-12h)',
    capacityNote: '1–8 pax',
    maxPax: 'Até 8 pessoas',
    pickup: 'Hotel ou ponto acordado (Lisboa)',
    ages: 'Todas as idades',
    languages: ['PT', 'EN', 'ES'],
    category: 'natureza',
    type: 'excursao',
    itinerary: [
      'Partida de Lisboa (≈7h)',
      'Lagoa — vistas panorâmicas para a Gruta de Benagil',
      'Armação de Pêra — ermida e falésia',
      'Silves — Castelo árabe e Sé Catedral',
      'Praia de Carvoeiro (paragem fotográfica)',
      'Retorno a Lisboa (≈20h)',
    ],
    included: [
      'Transporte privativo climatizado',
      'Guia certificado',
      'Pick-up e drop-off no hotel',
      'Água a bordo',
    ],
    notIncluded: [
      'Barco para interior da gruta de Benagil (opcional ≈€20/pax)',
      'Entrada no Castelo de Silves (≈€4/pax)',
      'Refeições e bebidas',
      'Gorjeta (opcional)',
    ],
    sidebarFeatures: EXCURSION_FEATURES,
  },
];

export const allTours: TourDetail[] = [...tukTukTours, ...excursionTours];

export function getTourBySlug(slug: string): TourDetail | undefined {
  return allTours.find((t) => t.slug === slug);
}

export function getRelatedTours(slug: string, type: 'tuktuk' | 'excursao', count = 3): TourDetail[] {
  return allTours.filter((t) => t.type === type && t.slug !== slug).slice(0, count);
}
