import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({ email: z.string().email() });

export async function POST(req: Request) {
  let payload: unknown;
  const contentType = req.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    payload = await req.json().catch(() => null);
  } else {
    const form = await req.formData();
    payload = { email: form.get("email") };
  }
  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.redirect(new URL("/?newsletter=invalid", req.url));
  }
  // TODO: integrar com Resend Audience ou Mailchimp
  console.info("[newsletter]", parsed.data.email);
  return NextResponse.redirect(new URL("/?newsletter=ok", req.url));
}
