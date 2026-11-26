# Cabana Pet Café — Landing + Agendamento

Monorepo Next.js 14 do site institucional + sistema de agendamento online do
**Cabana Pet Café** (Vila Paraíso, Campinas). Design system "A Clareira", paleta
editorial, sem clichês de pet shop.

> Rua José Gabeta, 522 — Vila Paraíso, Campinas/SP · Só com hora marcada ·
> Terça a Sábado · 09h — 18h

---

## Stack

| Camada           | Tecnologia                                       |
| ---------------- | ------------------------------------------------ |
| Framework        | Next.js 14 (App Router) + TypeScript             |
| Estilo           | Tailwind CSS 3 (theme customizado da paleta)     |
| Animação         | Framer Motion + Lenis (scroll suave)             |
| Fontes           | Fraunces (display), Inter (body), JetBrains Mono |
| Banco            | Supabase (Postgres + Auth + RLS)                 |
| Form / Validação | React Hook Form + Zod                            |
| Email            | Resend                                           |
| WhatsApp         | Z-API (Brasil)                                   |
| Calendar         | Google Calendar (service account)                |
| Mapa             | Mapbox GL (opcional)                             |
| Analytics        | Plausible                                        |
| Deploy           | Vercel (recomendado)                             |

---

## Rodando local

```bash
# 1. deps
npm install

# 2. env
cp .env.example .env.local
# → preencha pelo menos NEXT_PUBLIC_SUPABASE_URL + ANON_KEY + SERVICE_ROLE_KEY
#   (sem elas, a landing roda; o agendamento roda em "modo stub" — loga em console)

# 3. dev
npm run dev
# → http://localhost:3000
```

Rotas principais:

| Rota                   | O que é                                               |
| ---------------------- | ----------------------------------------------------- |
| `/`                    | Landing completa (9 seções)                           |
| `/agendar`             | Fluxo de agendamento em 5 passos                      |
| `/agendar/confirmado`  | Confirmação pós-agendamento                           |
| `/admin/*`             | Painel administrativo (7 telas) — protegido           |
| `/login`               | Magic link via Supabase Auth                          |
| `/api/bookings`        | POST para criar agendamento + disparar integrações    |
| `/api/bookings/availability?date=YYYY-MM-DD` | Slots ocupados do dia       |

---

## Supabase — primeiro setup

1. Crie um projeto em <https://app.supabase.com>.
2. Pegue:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY`
3. Aplique o schema e os seeds:

   ```bash
   # Opção A — CLI oficial
   npx supabase link --project-ref <SEU_PROJECT_REF>
   npx supabase db push

   # Opção B — manual
   # Cole o conteúdo de supabase/migrations/20261126_000000_init.sql
   # no SQL editor do dashboard e execute.
   # Em seguida cole supabase/seed.sql.
   ```

4. (Opcional) Gere os tipos TypeScript do banco:
   ```bash
   npm run db:types
   ```

### Autenticação do painel

O painel `/admin/*` usa Supabase Auth (magic link). Para liberar seu e-mail:

```env
ADMIN_ALLOWED_EMAILS=lucas@cabanapetcafe.com.br,atendimento@cabanapetcafe.com.br
```

Qualquer e-mail fora dessa lista recebe 403. Em dev, se as env vars do Supabase
não estiverem definidas, o middleware deixa passar com um warning no console.

---

## Integrações

Todas as integrações têm **stub automático** quando a chave não está configurada:
o módulo loga a chamada e segue em frente, para você conseguir testar o fluxo
sem depender de nenhum serviço externo.

### WhatsApp (Z-API)

```env
ZAPI_INSTANCE_ID=
ZAPI_TOKEN=
ZAPI_CLIENT_TOKEN=
ZAPI_FROM_NUMBER=551931991405
```

Confirmação e lembretes de agendamento são enviados por
`src/lib/integrations/whatsapp.ts`.

### Email (Resend)

```env
RESEND_API_KEY=
RESEND_FROM="Cabana Pet Café <ola@cabanapetcafe.com.br>"
```

Template editorial em `src/lib/integrations/email.ts`.

### Google Calendar

```env
GOOGLE_SERVICE_ACCOUNT_JSON_B64=<base64 do JSON da service account>
GOOGLE_CALENDAR_ID=cabanapetcafe@group.calendar.google.com
```

A implementação real está comentada em `src/lib/integrations/calendar.ts` —
basta instalar `googleapis` e descomentar quando houver credencial.

### Mapbox (opcional)

```env
NEXT_PUBLIC_MAPBOX_TOKEN=
NEXT_PUBLIC_MAPBOX_STYLE=mapbox://styles/cabana/clxxxxxxx
```

A seção **Encontre a Cabana** já carrega um SVG estilizado como fallback — é
só plugar o token e trocar por um `<MapboxMap />` quando o estilo custom
estiver pronto.

---

## Design system — "A Clareira"

Paleta (tokens em `tailwind.config.ts`):

| Token        | HEX       | Uso                              |
| ------------ | --------- | -------------------------------- |
| `clorofila`  | `#2D5F3F` | Primária, estados ativos         |
| `terracota`  | `#B8502E` | CTA, filetes, ano, assinatura    |
| `osso`       | `#F4EDE0` | Background base (60% da tela)    |
| `carvao`     | `#1A1512` | Texto, bordas                    |
| `tamara`     | `#D4917A` | Hover, badges                    |
| `mate`       | `#E8C566` | Easter eggs, loader              |
| `noite`      | `#0F2419` | Footer / modo escuro             |
| `vinho`      | `#8B2E2E` | Erros                             |

Tipografia: Fraunces (display/serif variável), Inter (body), JetBrains Mono
(preços, horários, labels). Carregadas via `next/font` — zero FOUT.

Utilidades de assinatura (em `src/styles/globals.css`):

- `.corner-chamfer` / `.corner-chamfer-sm` → cantos quebrados em diagonal
- `.underline-wavy` → sublinhado wavy em terracota
- `.film-grain` → overlay granulado 35mm
- `.warm-filter` → preset para fotos
- `.paper-texture` → fundo de papel kraft sutil
- `.bleed-right-full` / `.bleed-left-full` → bleed para fora do container

---

## Estrutura

```
src/
  app/
    (landing)/           page.tsx, layout.tsx
    agendar/             layout + 5 steps + confirmado
    admin/               layout + 7 screens (hoje, agenda, clientes…)
    api/
      bookings/          POST + availability
      subscribe/         newsletter
    login/               magic-link
  components/
    landing/             Hero, Manifesto, Services, Tour, Menu, …
    booking/             BookingContext + StepPet/Service/Schedule/Tutor/Review
    ui/                  Button, Card, Input, Chip, Logo
    smooth/              SmoothScroll (Lenis) + ScrollProgress
  lib/
    booking/             schema (Zod) + availability (date logic)
    integrations/        whatsapp, email, calendar (stubs incluídos)
    supabase/            server + browser clients
    admin/               queries para o painel
    utils.ts             cn, brl, formatPhone, BRAND
  content/
    site.ts              copies da landing (centralizado)
  styles/
    globals.css          tokens CSS + utilidades
supabase/
  migrations/            SQL versionado (tabelas, RLS)
  seed.sql               serviços + cardápio + settings
```

---

## Deploy na Vercel

```bash
# 1. conecte o repo
vercel link

# 2. adicione TODAS as env vars em: Project → Settings → Environment Variables
#    (o .env.example lista o conjunto completo)

# 3. deploy
vercel --prod
```

Aponte o domínio em **Settings → Domains**. A Vercel cuida do SSL e dos
redirects `www → apex`.

---

## O que falta (próximas entregas)

Esta é a **v1 completa** — tudo compila, renderiza e integra. Alguns itens do
brief ficaram para iterações seguintes porque dependem de ativos externos:

- **Fotografia real** do estabelecimento (sessão a agendar). As fotos de tour /
  serviços usam `background-image` em URLs `/images/*.jpg` que você precisa
  colocar em `public/images/`. Enquanto não houver, aparece um fundo tonal
  terracota/clorofila como placeholder.
- **Logo SVG real** — hoje temos um wordmark tipográfico e um `LogoMark` de
  cabana desenhado em código. Quando o estúdio entregar o SVG do logo,
  substituir em `src/components/ui/Logo.tsx`.
- **Páginas secundárias**: `/cardapio`, `/servicos/[slug]`, `/sobre`,
  `/privacidade`, `/termos` — stubs linkados mas ainda a escrever.
- **Admin — ações de escrita**: as 7 telas listam tudo via Supabase. A edição
  inline (reagendar com drag, criar bloqueio, editar cardápio) está estruturada
  mas falta cobrir com formulários.
- **Mapbox custom style** — hoje é um SVG estilizado como fallback. Criar um
  style no Mapbox Studio e trocar.
- **Konami code, cursor custom, confete em pétalas, loader de entrada** — a
  base de animação (Lenis + Framer Motion) está pronta, estes micro-detalhes
  são 1 sprint de polimento.
- **Canva Brand Kit** — processo manual na plataforma com conta Canva Pro do
  cliente (seção 10 do brief).

---

## Scripts

```bash
npm run dev         # Next em modo dev
npm run build       # produção
npm run start       # produção local
npm run typecheck   # TS sem build
npm run lint        # ESLint (next/core-web-vitals)
npm run db:types    # gera src/lib/database.types.ts (precisa supabase CLI)
npm run db:seed     # imprime o SQL de seed para rodar manualmente
```

---

## Checklist de produção

- [ ] Fotos reais em `public/images/` (hero, service-*, tour-*)
- [ ] Logo SVG definitivo em `src/components/ui/Logo.tsx`
- [ ] `og.png` 1200×630 em `public/`
- [ ] Domínio apontado + SSL Vercel
- [ ] Supabase: schema aplicado, seed rodado, backups ativados
- [ ] Z-API: instância comprada, token + client-token configurados
- [ ] Resend: domínio verificado (SPF/DKIM), API key no `.env`
- [ ] Google Calendar: service account criada, calendário compartilhado
- [ ] Mapbox: token restrito ao domínio de produção
- [ ] Plausible: domínio cadastrado
- [ ] `ADMIN_ALLOWED_EMAILS` preenchido
- [ ] Teste de agendamento end-to-end (criar → WhatsApp → Calendar → email)
- [ ] Teste em Chrome, Safari, Firefox e em mobile real
- [ ] `axe-core` sem erros críticos
- [ ] Lighthouse: Performance 95+, LCP < 1.8s, CLS < 0.05

---

## Licença

Proprietário — Cabana Pet Café · 2026.
