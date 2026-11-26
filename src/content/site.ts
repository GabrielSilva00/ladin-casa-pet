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
    title: "Café & Cozinha",
    support: "Grãos de especialidade, confeitaria da casa.",
    fromCents: 1200,
    slug: "cafe-cozinha",
    img: "/images/service-cafe.jpg"
  },
  {
    n: "03",
    title: "Convivência",
    support: "Mesas na grama, sol filtrado, cachorros contentes.",
    fromCents: 0,
    slug: "convivencia",
    img: "/images/service-convivencia.jpg"
  }
] as const;

export const TOUR = [
  { src: "/images/tour-deque.jpg", caption: "o deque. onde tudo acontece devagar.", ratio: "4/5" },
  { src: "/images/tour-banheira.jpg", caption: "a banheira. água a 37°C sempre.", ratio: "1/1" },
  { src: "/images/tour-copa.jpg", caption: "a copa. grãos do dia, moídos na hora.", ratio: "3/4" },
  { src: "/images/tour-jardim.jpg", caption: "o jardim. onde o seu bicho encontra outros bichos.", ratio: "16/9" },
  { src: "/images/tour-varanda.jpg", caption: "a varanda. o seu lugar na cabana.", ratio: "4/5" },
  { src: "/images/tour-detalhe.jpg", caption: "o acabamento. cada detalhe pensado.", ratio: "1/1" }
] as const;

export const MENU_SAMPLE = [
  { name: "Espresso duplo", desc: "grão do dia, moagem fina", priceCents: 900 },
  { name: "Flat white", desc: "leite texturizado com arte", priceCents: 1300 },
  { name: "Croissant de amendoim", desc: "receita da casa, massa de dois dias", priceCents: 1400 },
  { name: "Tartine de abacate", desc: "pão de fermentação natural", priceCents: 2200 },
  { name: "Petit-gâteau para pets", desc: "farinha de arroz, sem açúcar", priceCents: 1800 },
  { name: "Sagu de uva", desc: "sobremesa da infância, do jeito certo", priceCents: 1600 }
] as const;

export const TESTIMONIALS = [
  {
    text: "O Ben descobriu que gostava de outros cachorros no gramado do Cabana. Eu descobri que gostava de começar sábado com um flat white e um livro.",
    author: "Marina & Ben",
    meta: "golden, 4 anos",
    neighborhood: "Cambuí",
    rotate: "-1deg"
  },
  {
    text: "Marquei pra uma tosa rápida e acabei ficando duas horas a mais. Dava pra sentir que ela estava bem. Dava pra sentir que eu também.",
    author: "Rodrigo & Flor",
    meta: "lhasa, 7 anos",
    neighborhood: "Taquaral",
    rotate: "1.5deg"
  },
  {
    text: "Não é pet shop. É o lugar que eu quero que o meu cachorro associe a felicidade. E ele associa.",
    author: "Camila & Otávio",
    meta: "vira-lata, 2 anos",
    neighborhood: "Guanabara",
    rotate: "-0.5deg"
  }
] as const;
