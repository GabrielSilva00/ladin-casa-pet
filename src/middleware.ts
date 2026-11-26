import { NextResponse, type NextRequest } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

const ALLOWED = (process.env.ADMIN_ALLOWED_EMAILS ?? "")
  .split(",")
  .map((s) => s.trim().toLowerCase())
  .filter(Boolean);

export async function middleware(req: NextRequest) {
  if (!req.nextUrl.pathname.startsWith("/admin")) return NextResponse.next();

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Modo WhatsApp-only (sem Supabase): o próprio layout de /admin serve um
  // splash de "painel em repouso", não há dados a proteger — deixamos passar.
  if (!url || !key) {
    return NextResponse.next();
  }

  const res = NextResponse.next();
  const supabase = createServerClient(url, key, {
    cookies: {
      get: (name: string) => req.cookies.get(name)?.value,
      set: (name: string, value: string, opts: CookieOptions) => res.cookies.set({ name, value, ...opts }),
      remove: (name: string, opts: CookieOptions) => res.cookies.set({ name, value: "", ...opts })
    }
  });

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    const to = new URL("/login", req.url);
    to.searchParams.set("next", req.nextUrl.pathname);
    return NextResponse.redirect(to);
  }

  if (ALLOWED.length > 0 && !ALLOWED.includes((user.email ?? "").toLowerCase())) {
    return new NextResponse("Acesso negado", { status: 403 });
  }

  return res;
}

export const config = {
  matcher: ["/admin/:path*"]
};
