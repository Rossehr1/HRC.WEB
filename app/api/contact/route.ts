import { NextResponse } from "next/server";
import { clampLen, isEmail } from "@/lib/validators";

type ContactPayload =
  | {
      kind: "contact";
      name: string;
      email: string;
      topic?: string;
      message: string;
      website?: string; // honeypot
    }
  | {
      kind: "booking";
      org: string;
      contact: string;
      email: string;
      phone?: string;
      dateWindow: string;
      venueAddress: string;
      setting?: string;
      audience: string;
      program?: string;
      message: string;
      website?: string; // honeypot
    };

export async function POST(req: Request) {
  let data: ContactPayload;

  try {
    data = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot: if filled, accept silently (prevents spammers from learning)
  // Return ok but do nothing.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const website = (data as any).website ? String((data as any).website) : "";
  if (website.trim()) return NextResponse.json({ ok: true });

  // Basic validation
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const email = String((data as any).email || "");
  if (!isEmail(email)) {
    return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
  }

  // Normalize/clamp
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const message = clampLen(String((data as any).message || ""), 5000);
  if (!message.trim()) {
    return NextResponse.json({ ok: false, error: "Message required" }, { status: 400 });
  }

  // MVP behavior: log to server (replace with email provider later)
  // This is safe for now; do not store sensitive data beyond what user submits.
  console.log("CONTACT_SUBMISSION", {
    kind: data.kind,
    at: new Date().toISOString(),
    payload: { ...data, message }
  });

  return NextResponse.json({ ok: true });
}
