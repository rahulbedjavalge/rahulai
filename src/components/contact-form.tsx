"use client";

import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    website: "",
    goal: "",
    budget: "",
    timeline: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [summary, setSummary] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);
    try {
      const res = await fetch(`/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data?.ok) setMessage("Thanks — I received your brief.");
      else setMessage("Submission received (no email delivery configured).");
    } catch (err) {
      setMessage("Failed to submit. Please email rahulinberlinn@gmail.com");
    } finally {
      setSubmitting(false);
    }
  }

  async function summarize() {
    setSummary(null);
    try {
      const res = await fetch(`/api/ai/summarize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: form.notes }),
      });
      const data = await res.json();
      setSummary(data?.summary || "(no summary)");
    } catch (err) {
      setSummary("Summarization failed.");
    }
  }

  return (
    <form onSubmit={submit} className="grid gap-4">
      <div className="grid gap-2 sm:grid-cols-2">
        <input className="rounded-2xl border p-3" placeholder="Name" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} />
        <input className="rounded-2xl border p-3" placeholder="Email" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} />
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        <input className="rounded-2xl border p-3" placeholder="Company" value={form.company} onChange={(e)=>setForm({...form,company:e.target.value})} />
        <input className="rounded-2xl border p-3" placeholder="Website" value={form.website} onChange={(e)=>setForm({...form,website:e.target.value})} />
      </div>
      <input className="rounded-2xl border p-3" placeholder="Goal (one sentence)" value={form.goal} onChange={(e)=>setForm({...form,goal:e.target.value})} />
      <div className="grid gap-2 sm:grid-cols-2">
        <input className="rounded-2xl border p-3" placeholder="Budget range" value={form.budget} onChange={(e)=>setForm({...form,budget:e.target.value})} />
        <input className="rounded-2xl border p-3" placeholder="Timeline" value={form.timeline} onChange={(e)=>setForm({...form,timeline:e.target.value})} />
      </div>
      <textarea className="rounded-2xl border p-3" placeholder="Notes / brief" rows={6} value={form.notes} onChange={(e)=>setForm({...form,notes:e.target.value})} />

      <div className="flex gap-3">
        <button type="button" onClick={summarize} className="rounded-full border px-4 py-2 text-sm">Summarize brief</button>
        <button type="submit" disabled={submitting} className="rounded-full bg-sky-600 px-4 py-2 text-sm text-white">Submit brief</button>
      </div>

      {summary ? <div className="rounded-md bg-white/70 p-3 text-sm">Summary: {summary}</div> : null}
      {message ? <div className="text-sm text-[var(--muted)]">{message}</div> : null}
    </form>
  );
}
