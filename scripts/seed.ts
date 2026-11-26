// Executa supabase/seed.sql contra a instância configurada.
// Uso: npm run db:seed  (requer NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY)

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("Defina NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const sb = createClient(url, key, { auth: { persistSession: false } });

const sql = readFileSync(resolve(process.cwd(), "supabase/seed.sql"), "utf8");

async function main() {
  // Supabase JS client não executa SQL cru — recomendamos rodar via psql ou dashboard.
  // Esta função apenas lista o SQL e lembra como executar.
  console.log("Este script não aplica DDL/DML direto via REST.");
  console.log("Aplique com:\n");
  console.log("  supabase db push   # se usar Supabase CLI");
  console.log("  OR cole o conteúdo em  Supabase Studio → SQL editor:\n");
  console.log(sql);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
