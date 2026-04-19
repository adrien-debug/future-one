"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";

export default function Home() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
      const res = await fetch(`${apiUrl}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black">
      <header className="absolute top-0 left-0 right-0 z-20">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
          <span className="text-xl font-bold tracking-tight text-white drop-shadow">
            Future One
          </span>
          <nav className="flex gap-6 text-sm text-zinc-200">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative flex items-center justify-center min-h-[80vh] overflow-hidden">
          <Image
            src="/hero.webp"
            alt="Future One — Futuristic digital infrastructure"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 text-center px-6">
            <h1 className="text-6xl font-extrabold tracking-tight text-white sm:text-8xl drop-shadow-lg">
              Future One
            </h1>
            <p className="mt-6 text-lg leading-8 text-zinc-200 max-w-2xl mx-auto drop-shadow">
              A modern full-stack platform powered by Next.js, Express, and Supabase.
              Fast, scalable, and ready to grow with you.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <a
                href="#contact"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-900 shadow-sm hover:bg-zinc-200 transition-colors"
              >
                Get started
              </a>
              <a
                href="#features"
                className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                Learn more
              </a>
            </div>
          </div>
        </section>

        <section id="features" className="border-t border-zinc-200 dark:border-zinc-800">
          <div className="max-w-5xl mx-auto px-6 py-20">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 text-center mb-12">
              Why Future One?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Lightning Fast", desc: "Built on Next.js with server-side rendering for blazing performance." },
                { title: "Scalable Backend", desc: "Express.js API deployed on Railway, ready for production traffic." },
                { title: "Real-time Data", desc: "Supabase provides instant Postgres with built-in auth and real-time." },
              ].map((f) => (
                <div
                  key={f.title}
                  className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">{f.title}</h3>
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="border-t border-zinc-200 dark:border-zinc-800">
          <div className="max-w-xl mx-auto px-6 py-20">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 text-center mb-8">
              Get in touch
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2.5 text-sm text-zinc-900 dark:text-zinc-50 outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-50"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2.5 text-sm text-zinc-900 dark:text-zinc-50 outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-50"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2.5 text-sm text-zinc-900 dark:text-zinc-50 outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-50 resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors disabled:opacity-50"
              >
                {status === "sending" ? "Sending..." : "Send message"}
              </button>
              {status === "sent" && (
                <p className="text-sm text-green-600 dark:text-green-400 text-center">Message sent successfully!</p>
              )}
              {status === "error" && (
                <p className="text-sm text-red-600 dark:text-red-400 text-center">Something went wrong. Try again.</p>
              )}
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-5xl mx-auto px-6 py-6 text-center text-sm text-zinc-500 dark:text-zinc-500">
          &copy; {new Date().getFullYear()} Future One. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
