export const NAV = [
  { href: "#manifesto", label: "Manifesto" },
  { href: "#servicos", label: "Serviços" },
  { href: "#cardapio", label: "Cardápio" },
  { href: "#cabana", label: "A Cabana" },
  { href: "#visitar", label: "Visitar" }
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
    support: "Grãos de especialidade. Lanches frescos.",
    fromCents: 1200,
    slug: "cafe",
    img: "/images/service-cafe.jpg"
  },
  {
    n: "03",
    title: "Gramado",
    support: "Seguro, cercado, cães soltos.",
    fromCents: 0,
    slug: "gramado",
    img: "/images/service-convivencia.jpg"
  }
] as const;

export const TOUR = [
  { src: "/images/tour-deque.jpg", caption: "o deque. onde tudo acontece devagar.", ratio: "4/5" },
  { src: "/images/tour-banheira.jpg", caption: "a banheira. acompanhe pelo vidro.", ratio: "1/1" },
  { src: "/images/tour-copa.jpg", caption: "a copa. grãos do dia, moídos na hora.", ratio: "3/4" },
  { src: "/images/tour-jardim.jpg", caption: "o gramado. onde o seu bicho faz amigos.", ratio: "16/9" },
  { src: "/images/tour-varanda.jpg", caption: "a varanda. o seu lugar na cabana.", ratio: "4/5" },
  { src: "/images/tour-detalhe.jpg", caption: "os detalhes. feitos à mão.", ratio: "1/1" }
] as const;

export const MENU_SAMPLE = [
  { name: "Espresso duplo", desc: "grão do dia, moagem fina", priceCents: 900 },
  { name: "Flat white", desc: "leite texturizado com arte", priceCents: 1300 },
  { name: "Croissant de amendoim", desc: "receita da casa, massa de dois dias", priceCents: 1400 },
  { name: "Tartine de abacate", desc: "pão de fermentação natural", priceCents: 2200 },
  { name: "Petit-gâteau para pets", desc: "farinha de arroz, sem açúcar", priceCents: 1800 },
  { name: "Sagu de uva", desc: "sobremesa da infância, do jeito certo", priceCents: 1600 }
] as const;

// Reviews reais do Google · 5,0 estrelas, 242 avaliações
export const TESTIMONIALS = [
  {
    text: "Minha doguinha ficou linda e cheirosa enquanto eu tomei um café. Recomendo.",
    author: "Nathalia Penucho Cristovão",
    meta: "no Google",
    neighborhood: "há 2 meses",
    rotate: "-1deg"
  },
  {
    text: "Experiência única. O lugar é lindo, aconchegante e estruturado. Enquanto seu pet toma banho você toma um cafezinho super gostoso. Dá pra acompanhar o banho porque a parte é de vidro.",
    author: "Izabelle Lemos Sene Ribeiro",
    meta: "no Google",
    neighborhood: "há 1 ano",
    rotate: "1.5deg"
  },
  {
    text: "Experiência incrível. Recepção com as filhas de pelo, excepcional. Lugar de gramado, seguro, aconchegante. Nunca vi minhas pets tão felizes para um banho. Sem medo, sem tremor.",
    author: "Neusa Luciene Dunder",
    meta: "no Google",
    neighborhood: "há 1 ano",
    rotate: "-0.5deg"
  }
] as const;
