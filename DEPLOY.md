# Deploy na Vercel — passo a passo

> Fluxo testado para o primeiro deploy do Cabana Pet Café. Leva de 15 a 30 minutos,
> contando o tempo de criar o projeto Supabase.

---

## Antes de começar — o que você precisa ter em mãos

- [ ] Conta na **Vercel** (grátis já serve): <https://vercel.com/signup>
- [ ] Conta no **Supabase** (grátis até 500MB): <https://app.supabase.com>
- [ ] O repositório deste projeto no GitHub conectado à sua conta Vercel
- [ ] (Opcional p/ v1) Domínio `cabanapetcafe.com.br` — pode plugar depois
- [ ] (Opcional p/ v1) Conta **Z-API** para WhatsApp — sem ela, o agendamento
      funciona mas não dispara WhatsApp
- [ ] (Opcional p/ v1) Conta **Resend** para e-mail — mesmo caso

> **Importante:** sem nenhuma dessas chaves, o deploy funciona e a landing
> fica acessível. O agendamento roda em "modo stub" (loga confirmações no
> console da Vercel) até você plugar o Supabase.

---

## Passo 1 — Supabase (5 min)

1. Em <https://app.supabase.com> clique em **New project**.
2. Dê o nome `cabana-pet-cafe`, escolha região **South America (sa-east-1)**,
   gere a senha do banco e salve num cofre (1Password / Bitwarden).
3. Aguarde provisionar (~2 min).
4. Vá em **SQL Editor → New query**.
5. Abra o arquivo `supabase/migrations/20261126_000000_init.sql` deste repo,
   cole o conteúdo inteiro e rode (**RUN** no canto inferior direito).
6. Faça o mesmo com `supabase/seed.sql`.
7. Em **Project Settings → API**, copie e anote:
   - `Project URL` → vai para `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` → vai para `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` (secret!) → vai para `SUPABASE_SERVICE_ROLE_KEY`
8. Em **Authentication → Providers → Email**, deixe habilitado (padrão).
9. (Opcional) Em **Authentication → URL Configuration**, defina
   **Site URL** = `https://seu-dominio-vercel.app` depois do primeiro deploy.

---

## Passo 2 — Vercel (3 min)

1. Em <https://vercel.com/new>, escolha **Import Git Repository** e selecione
   `GabrielSilva00/ladin-casa-pet`.
2. Na tela de configuração:
   - **Framework Preset:** Next.js *(detectado automaticamente)*
   - **Root Directory:** `.` *(raiz)*
   - **Build Command:** deixe o padrão (`next build`)
   - **Install Command:** deixe o padrão
   - **Output Directory:** deixe em branco
3. Abra a seção **Environment Variables** e cole uma a uma (ou use
   **Bulk Edit** colando o bloco abaixo e preenchendo os valores):

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
SUPABASE_PROJECT_ID=xxxxx

ADMIN_ALLOWED_EMAILS=seu-email@gmail.com

NEXT_PUBLIC_SITE_URL=https://cabanapetcafe.vercel.app
```

4. Clique **Deploy**. A Vercel vai buildar e publicar. ~2 min.

> Variáveis que você pode deixar em branco agora e preencher depois sem
> rebuildar: todas as de WhatsApp (ZAPI_*), Resend, Google Calendar,
> Mapbox e Plausible. O código detecta e ativa cada integração assim que
> a chave aparece.

---

## Passo 3 — Primeiro acesso ao painel (2 min)

1. Abra `https://<seu-deploy>.vercel.app/login`.
2. Digite o e-mail que você colocou em `ADMIN_ALLOWED_EMAILS`.
3. Clique **Enviar link**. Confira a caixa de entrada.
4. Clique no link mágico → você cai em `/admin/hoje`.
5. Como ainda não há agendamentos, você vê "Dia leve.". ✅

---

## Passo 4 — Plugar o WhatsApp (opcional, 10 min)

1. Em <https://z-api.io> compre uma instância (R$ 49/mês).
2. Conecte seu número de WhatsApp Business pelo QR Code.
3. Em **Instância → Dados**, copie:
   - `instanceId` → `ZAPI_INSTANCE_ID`
   - `token` → `ZAPI_TOKEN`
   - `client-token` (em Security) → `ZAPI_CLIENT_TOKEN`
4. Na Vercel, **Settings → Environment Variables**, adicione as três e
   rode um **Redeploy** (Deployments → último → ⋯ → Redeploy).

---

## Passo 5 — Plugar o e-mail (opcional, 10 min)

1. Em <https://resend.com> crie conta e verifique o domínio (SPF + DKIM).
2. Gere uma API key.
3. Na Vercel:
   ```env
   RESEND_API_KEY=re_xxxxx
   RESEND_FROM=Cabana Pet Café <ola@cabanapetcafe.com.br>
   ```
4. Redeploy.

---

## Passo 6 — Plugar o domínio (opcional, 5 min)

1. Na Vercel, **Project → Settings → Domains → Add** → `cabanapetcafe.com.br`.
2. A Vercel mostra os registros DNS para configurar no seu provedor.
3. Após propagar (até 1h), SSL é automático.
4. Atualize na Vercel: `NEXT_PUBLIC_SITE_URL=https://cabanapetcafe.com.br`
5. Atualize no Supabase: **Authentication → URL Configuration → Site URL**
   para o mesmo valor.

---

## Verificação final

Depois do deploy, teste:

- [ ] `/` carrega a landing completa, sem imagens quebradas
- [ ] `/agendar` abre o passo-a-passo, calendário funciona
- [ ] Fazer um agendamento de teste de ponta a ponta
- [ ] `/admin/hoje` lista o teste
- [ ] WhatsApp de confirmação chega (se Z-API plugado)
- [ ] E-mail de confirmação chega (se Resend plugado)

---

## Redeploys e branches

- O deploy de produção é feito só a partir do commit em `main`.
- Esta branch atual (`ccr-4a55cea3-l02r94`) está **habilitada** em
  `vercel.json` para criar Preview Deployments automáticos a cada push —
  cada URL `*.vercel.app` é independente, para testar antes de promover
  para produção.
- Para promover: merge PR → `main`.

---

## Problemas comuns

**Build falha com "Supabase não configurado"**
→ Verifique se as 3 variáveis Supabase estão em **Production** (e
Preview, se você usa). A seção **Environment Variables** diferencia
escopo.

**Login mágico não chega**
→ Supabase: **Authentication → URL Configuration → Site URL** precisa
bater com o domínio real do deploy; **Email templates** podem cair em
spam se o domínio ainda não foi verificado.

**Admin volta "Acesso negado"**
→ Seu e-mail não está em `ADMIN_ALLOWED_EMAILS`. É case-insensitive,
mas verifique vírgulas sem espaços entre múltiplos e-mails.

**Agendamento retorna 500**
→ Veja os logs em **Vercel → Deployments → Functions → `/api/bookings`**.
Normalmente é schema Supabase não aplicado — rode o SQL do Passo 1.6.

---

Pronto. Qualquer coisa que tenha dado errado, me manda o log da Vercel.
