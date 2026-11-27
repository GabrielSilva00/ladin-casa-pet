export const NAV = [
  { href: "#servicos", label: "Serviços" },
  { href: "#cardapio", label: "Cardápio" },
  { href: "#cabana", label: "A Cabana" },
  { href: "#visitar", label: "Visitar" },
  { href: "/gestao", label: "Gestão" }
] as const;

export const SERVICES = [
  {
    n: "01",
    title: "Banho & Tosa",
    support: "Água morna, toalhas quentes, zero pressa.",
    fromCents: 8500,
    slug: "banho-tosa",
    img: "/images/service-banho.jpg"
  },
  {
    n: "02",
    title: "Café",
    support: "Grão de especialidade, lanches frescos todo dia.",
    fromCents: 1200,
    slug: "cafe",
    img: "/images/lazer-41.jpg"
  },
  {
    n: "03",
    title: "Gramado",
    support: "Seguro, cercado, cães soltos de verdade.",
    fromCents: 0,
    slug: "gramado",
    img: "/images/caes-44.jpg"
  }
] as const;

export const TOUR = [
  { src: "/images/lugar-65.jpg", caption: "a fachada. a cancela de madeira.", ratio: "3/4" },
  { src: "/images/service-banho.jpg", caption: "a banheira. acompanhe pelo vidro.", ratio: "4/5" },
  { src: "/images/lugar-01.jpg", caption: "o deque. onde tudo acontece devagar.", ratio: "3/4" },
  { src: "/images/caes-53.jpg", caption: "o gramado. seu bicho faz amigos.", ratio: "3/4" },
  { src: "/images/lugar-43.jpg", caption: "a varanda. o seu lugar na cabana.", ratio: "4/5" },
  { src: "/images/lugar-05.jpg", caption: "os detalhes. feitos à mão.", ratio: "3/4" }
] as const;

export const MENU_HIGHLIGHTS = [
  {
    name: "Flat white da casa",
    desc: "leite texturizado, grão do dia moído na hora.",
    priceCents: 1300,
    img: "/images/lazer-41.jpg",
    tag: "quente"
  },
  {
    name: "Croissant de amendoim",
    desc: "receita da casa, massa de dois dias.",
    priceCents: 1400,
    img: "/images/lazer-04.jpg",
    tag: "assado hoje"
  },
  {
    name: "Petit-gâteau pro pet",
    desc: "farinha de arroz, sem açúcar, pro cachorro.",
    priceCents: 1800,
    img: "/images/lazer-68.jpg",
    tag: "pet"
  }
] as const;

export const MENU_SAMPLE = [
  { name: "Espresso duplo", desc: "grão do dia, moagem fina", priceCents: 900 },
  { name: "Flat white", desc: "leite texturizado com arte", priceCents: 1300 },
  { name: "Croissant de amendoim", desc: "receita da casa, massa de dois dias", priceCents: 1400 },
  { name: "Tartine de abacate", desc: "pão de fermentação natural", priceCents: 2200 },
  { name: "Petit-gâteau para pets", desc: "farinha de arroz, sem açúcar", priceCents: 1800 },
  { name: "Sagu de uva", desc: "sobremesa da infância, do jeito certo", priceCents: 1600 }
] as const;

// Reviews reais do Google
export const TESTIMONIALS = [
  {
    text: "Minha doguinha ficou linda e cheirosa enquanto eu tomei um café. Recomendo.",
    author: "Nathalia P. Cristovão",
    initials: "NC",
    when: "há 2 meses",
    color: "#A94A2A"
  },
  {
    text: "Enquanto seu pet toma banho você toma um cafezinho super gostoso. Dá pra acompanhar o banho porque a parte é de vidro.",
    author: "Izabelle L. S. Ribeiro",
    initials: "IR",
    when: "há 1 ano",
    color: "#2E3A2B"
  },
  {
    text: "Lugar de gramado, seguro, aconchegante. Nunca vi minhas pets tão felizes para um banho. Sem medo, sem tremor.",
    author: "Neusa L. Dunder",
    initials: "ND",
    when: "há 1 ano",
    color: "#141210"
  }
] as const;
