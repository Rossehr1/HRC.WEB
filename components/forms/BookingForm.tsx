"use client";

import { useState } from "react";
import { isEmail } from "@/lib/validators";

type Status = "idle" | "sending" | "success" | "error";

export function BookingForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    const website = String(payload.website || "");

    const required = ["org", "contact", "email", "dateWindow", "venueAddress", "audience", "message"];
    for (const r of required) {
      if (!String(payload[r] || "").trim()) {
        setError("Please complete all required fields.");
        return;
      }
    }
    if (!isEmail(String(payload.email))) {
      setError("Please enter a valid email.");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ kind: "booking", ...payload, website })
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
          <label className="text-sm font-medium">Organization *</label>
          <input name="org" className="mt-1 w-full rounded-md border border-black/15 bg-paper px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="text-sm font-medium">Primary Contact *</label>
          <input name="contact" className="mt-1 w-full rounded-md border border-black/15 bg-paper px-3 py-2 text-sm" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium">Email *</label>
          <input name="email" className="mt-1 w-full rounded-md border border-black/15 bg-paper px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="text-sm font-medium">Phone</label>
          <input name="phone" className="mt-1 w-full rounded-md border border-black/15 bg-paper px-3 py-2 text-sm" />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium">Preferred date/time window *</label>
        <input name="dateWindow" className="mt-1 w-full rounded-md border border-black/15 bg-paper px-3 py-2 text-sm" placeholder="e.g., May 10–12, afternoons" />
      </div>

      <div>
        <label className="text-sm font-medium">Venue address *</label>
        <input name="venueAddress" className="mt-1 w-full rounded-md border border-black/15 bg-paper px-3 py-2 text-sm" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium">Indoor/Outdoor</label>
          <select name="setting" className="mt-1 w-full rounded-md border border-black/15 bg-paper px-3 py-2 text-sm">
            <option>Outdoor</option>
            <option>Indoor</option>
            <option>Both possible</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium">Estimated audience *</label>
          <input name="audience" className="mt-1 w-full rounded-md border border-black/15 bg-paper px-3 py-2 text-sm" placeholder="e.g., 200" />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium">Program interest</label>
        <select name="program" className="mt-1 w-full rounded-md border border-black/15 bg-paper px-3 py-2 text-sm">
          <option>Recommend for my venue</option>
          <option>Living History Demonstration</option>
          <option>Family-Friendly Old West Show</option>
          <option>Workshops / Talks</option>
        </select>
      </div>

      <div>
        <label className="text-sm font-medium">Details *</label>
        <textarea
          name="message"
          rows={6}
          className="mt-1 w-full rounded-md border border-black/15 bg-paper px-3 py-2 text-sm"
          placeholder="Space dimensions (if known), schedule constraints, venue policies, etc."
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
        {status === "sending" ? "Sending..." : status === "success" ? "Request Sent" : "Submit Booking Request"}
      </button>
    </form>
  );
}
