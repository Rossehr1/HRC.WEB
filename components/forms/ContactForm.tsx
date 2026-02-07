"use client";

import { useState } from "react";
import { isEmail } from "@/lib/validators";

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "");
    const email = String(form.get("email") || "");
    const topic = String(form.get("topic") || "General");
    const message = String(form.get("message") || "");
    const website = String(form.get("website") || ""); // honeypot

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("Please complete all required fields.");
      return;
    }
    if (!isEmail(email)) {
      setError("Please enter a valid email.");
      return;
    }

    setStatus("sending");
    const endpoint = process.env.NEXT_PUBLIC_CONTACT_FORM_ACTION || "/api/contact";
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ kind: "contact", name, email, topic, message, website })
      });

      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      (e.currentTarget as HTMLFormElement).reset();
    } catch {
      setStatus("error");
      setError("Sorry—something went wrong. Please try again.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium">Name *</label>
          <input name="name" className="mt-1 w-full rounded-md border border-black/15 bg-paper px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="text-sm font-medium">Email *</label>
          <input name="email" className="mt-1 w-full rounded-md border border-black/15 bg-paper px-3 py-2 text-sm" />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium">Topic</label>
        <select name="topic" className="mt-1 w-full rounded-md border border-black/15 bg-paper px-3 py-2 text-sm">
          <option>General</option>
          <option>Booking</option>
          <option>Partnership</option>
          <option>Media</option>
          <option>Join/Volunteer</option>
          <option>Sponsorship/Donations</option>
        </select>
      </div>

      <div>
        <label className="text-sm font-medium">Message *</label>
        <textarea
          name="message"
          rows={6}
          className="mt-1 w-full rounded-md border border-black/15 bg-paper px-3 py-2 text-sm"
        />
      </div>

      {/* honeypot */}
      <div className="hidden">
        <label>Website</label>
        <input name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {error ? <div className="text-sm text-oxblood">{error}</div> : null}

      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-md bg-oxblood px-4 py-2.5 text-sm font-medium text-paper disabled:opacity-60"
      >
        {status === "sending" ? "Sending..." : status === "success" ? "Sent" : "Send Message"}
      </button>
    </form>
  );
}
