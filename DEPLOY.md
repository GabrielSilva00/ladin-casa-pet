# Deploy na Vercel

> Dois modos de operação. Comece pelo primeiro — dá para ir para o segundo
> depois, sem rebuildar nada.

---

## Modo 1 · WhatsApp-only (recomendado para começar) — **2 min**

**Zero banco, zero integrações.** O tutor preenche o formulário de agendamento
e, ao confirmar, o próprio WhatsApp dele abre com a mensagem pronta para
enviar ao estabelecimento. Você responde à vontade.

### Passo 1 — Importar na Vercel (1 min)

1. <https://vercel.com/new> → importe `GabrielSilva00/ladin-casa-pet`
2. **Framework:** Next.js (detectado)
3. Não precisa configurar nada de build
4. **Environment Variables** — adicione só uma (opcional):
   ```env
   NEXT_PUBLIC_SITE_URL=https://cabanapetcafe.vercel.app
   ```
   Se deixar vazio, o site usa o próprio domínio da Vercel como fallback.
5. **Deploy** → ~2 min

### Passo 2 — Testar

- Abra o deploy → faça um agendamento de teste
- Ao confirmar, o WhatsApp abre numa aba nova com a mensagem formatada
- Envie para `+55 19 3199-1405` (o número configurado em `src/lib/utils.ts`
  como `BRAND.phoneDigits` — troque pelo da Cabana real antes de lançar)

### Como a mensagem chega

```
Olá, Cabana! 🐾

Gostaria de agendar um horário:

*Pet:* Rex
  Cão · porte médio · pelo médio
  Primeira vez na Cabana

*Serviço:* Banho + Tosa higiênica + Hidratação
*Dia:* sábado, 14 de dezembro
*Horário:* 10:30
*Valor estimado:* R$ 165,00

— — —
Tutor: Marina Oliveira
WhatsApp: +55 (19) 99999-9999
```

### O que acontece com `/admin` neste modo

O painel detecta que não há banco e mostra um splash "Painel em repouso" com
as instruções para ativá-lo depois. Sem erro, sem crash.

### Trocar o número do WhatsApp

Edite `src/lib/utils.ts`:

```ts
export const BRAND = {
  ...
  phone: "+55 19 3199-1405",
  phoneDigits: "551931991405",   // <- sem +, sem (), sem -
  ...
};
```

Commit, push → a Vercel faz o redeploy sozinha.

---

## Modo 2 · Com banco (quando quiser o painel) — **+ 15 min**

Ativa o painel em `/admin` com 7 telas (hoje, agenda, clientes&pets, cardápio,
bloqueios, configurações, relatórios), salva agendamentos no Postgres com RLS,
e deixa pronto para plugar WhatsApp automático, e-mail e Google Calendar.

### Passo A — Supabase (5 min)

1. <https://app.supabase.com> → **New project**
2. Nome `cabana-pet-cafe`, região **South America (sa-east-1)**, senha segura
3. Aguarde ~2 min
4. **SQL Editor → New query**, cole `supabase/migrations/20261126_000000_init.sql`, **RUN**
5. Nova query, cole `supabase/seed.sql`, **RUN**
6. **Project Settings → API** copie:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` (secret) → `SUPABASE_SERVICE_ROLE_KEY`

### Passo B — Adicionar as variáveis na Vercel (2 min)

Project → **Settings → Environment Variables** → cole as 3 variáveis acima +
seu e-mail para `ADMIN_ALLOWED_EMAILS`. Clique **Redeploy** no último deploy.

Pronto: o `/admin` agora pede login por link mágico, o agendamento salva no
banco **e também** continua abrindo o WhatsApp para o tutor confirmar.

### Passo C — Confirmações automáticas (opcional, 10 min)

**WhatsApp Z-API** (R$ 49/mês) — <https://z-api.io>:
```env
ZAPI_INSTANCE_ID=
ZAPI_TOKEN=
ZAPI_CLIENT_TOKEN=
```

**E-mail Resend** (grátis até 3k/mês) — <https://resend.com>:
```env
RESEND_API_KEY=
RESEND_FROM="Cabana Pet Café <ola@cabanapetcafe.com.br>"
```

Redeploy e pronto — confirmações automatizadas.

---

## Domínio próprio (opcional)

1. Vercel → **Settings → Domains → Add** → `cabanapetcafe.com.br`
2. Siga as instruções de DNS do painel
3. Atualize `NEXT_PUBLIC_SITE_URL=https://cabanapetcafe.com.br`
4. (Se estiver no modo 2) Supabase → **Authentication → URL Configuration →
   Site URL** = mesmo valor

---

## Problemas comuns

**"Site não abre"** → Veja **Deployments → último** na Vercel. Se o build
falhou, o log diz exatamente onde. Em quase todos os casos é env var
faltando — releia a seção acima.

**"WhatsApp não abre no mobile"** → Browsers como Chrome Android costumam
pedir permissão para abrir apps externos; tutores precisam tocar "Permitir".
Em último caso, o link `wa.me` sempre funciona manualmente.

**"Modo 2 — login mágico não chega"** → Supabase → **Authentication → URL
Configuration → Site URL** precisa bater com o domínio do deploy. E-mail
pode cair em spam se o domínio ainda não estiver verificado.

**"Modo 2 — admin volta 'Acesso negado'"** → Seu e-mail não está em
`ADMIN_ALLOWED_EMAILS`. Case-insensitive, mas sem espaços entre vírgulas.
