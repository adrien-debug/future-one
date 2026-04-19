"use client";

import { useState, FormEvent } from "react";

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
      <header className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/60 to-transparent">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <span className="text-sm font-semibold tracking-widest text-white uppercase">
            Qatar National Digital Core
          </span>
          <nav className="flex gap-8 text-xs text-zinc-200 uppercase tracking-wider">
            <a href="#sovereignty" className="hover:text-white transition-colors">Sovereignty</a>
            <a href="#economy" className="hover:text-white transition-colors">Economy</a>
            <a href="#influence" className="hover:text-white transition-colors">Influence</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
          <div className="relative z-10 text-center px-6 max-w-5xl">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white drop-shadow-2xl uppercase leading-tight">
              Qatar National<br />Digital Core
            </h1>
            <p className="mt-8 text-xl md:text-2xl leading-relaxed text-zinc-100 max-w-3xl mx-auto drop-shadow-lg font-light">
              The sovereign infrastructure securing, powering, and projecting the nation&rsquo;s digital future.
            </p>
            <div className="mt-12 flex items-center justify-center gap-4">
              <a
                href="#sovereignty"
                className="rounded-none bg-white px-8 py-4 text-sm font-bold text-zinc-900 shadow-xl hover:bg-zinc-200 transition-all uppercase tracking-wider"
              >
                Explore Vision 2030
              </a>
            </div>
          </div>
          <div className="absolute bottom-8 left-0 right-0 z-10 text-center">
            <p className="text-xs text-zinc-300 uppercase tracking-widest">National Strategic Infrastructure — Vision 2030</p>
          </div>
        </section>

        <section id="sovereignty" className="bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800">
          <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6 uppercase">
                  Digital Sovereignty
                </h2>
                <h3 className="text-2xl font-semibold text-zinc-700 dark:text-zinc-300 mb-8">
                  Control your data. Protect your future.
                </h3>
                <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                  Qatar establishes an independent technological foundation, ensuring that all critical data — governmental, economic, and societal — remains under national jurisdiction.
                </p>
                <p className="mt-6 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                  This infrastructure guarantees maximum security, strategic resilience, and full autonomy in a rapidly evolving global landscape.
                </p>
              </div>
              <div className="relative h-96 bg-gradient-to-br from-zinc-900 to-zinc-700 rounded-lg shadow-2xl flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl font-black mb-4">🛡️</div>
                  <p className="text-sm uppercase tracking-widest">National Security</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="economy" className="bg-white dark:bg-black border-t border-zinc-200 dark:border-zinc-800">
          <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1 relative h-96 bg-gradient-to-br from-blue-900 to-blue-700 rounded-lg shadow-2xl flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl font-black mb-4">⚡</div>
                  <p className="text-sm uppercase tracking-widest">Innovation Engine</p>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6 uppercase">
                  Engine of the Future Economy
                </h2>
                <h3 className="text-2xl font-semibold text-zinc-700 dark:text-zinc-300 mb-8">
                  At the core of innovation and artificial intelligence
                </h3>
                <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                  The national data center serves as the backbone of the post-energy economy.
                </p>
                <p className="mt-6 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                  It powers public services, smart cities, finance, healthcare, and AI-driven technologies, accelerating the country&rsquo;s digital transformation.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="influence" className="bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800">
          <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6 uppercase">
                  Global Influence
                </h2>
                <h3 className="text-2xl font-semibold text-zinc-700 dark:text-zinc-300 mb-8">
                  A digital platform for the region and beyond
                </h3>
                <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                  Positioned as a strategic hub, Qatar strengthens its role on the global stage by providing a trusted, neutral, and highly secure infrastructure.
                </p>
                <p className="mt-6 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                  It becomes a foundation for regional cooperation and international technological initiatives.
                </p>
              </div>
              <div className="relative h-96 bg-gradient-to-br from-purple-900 to-purple-700 rounded-lg shadow-2xl flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl font-black mb-4">🌍</div>
                  <p className="text-sm uppercase tracking-widest">Strategic Hub</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="bg-white dark:bg-black border-t border-zinc-200 dark:border-zinc-800">
          <div className="max-w-2xl mx-auto px-6 py-24">
            <h2 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 text-center mb-4 uppercase">
              Contact
            </h2>
            <p className="text-center text-zinc-600 dark:text-zinc-400 mb-12">
              For inquiries regarding strategic partnerships and national initiatives.
            </p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2 uppercase tracking-wider">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-none border-2 border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-3 text-sm text-zinc-900 dark:text-zinc-50 outline-none focus:border-zinc-900 dark:focus:border-zinc-50 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2 uppercase tracking-wider">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-none border-2 border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-3 text-sm text-zinc-900 dark:text-zinc-50 outline-none focus:border-zinc-900 dark:focus:border-zinc-50 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2 uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full rounded-none border-2 border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-3 text-sm text-zinc-900 dark:text-zinc-50 outline-none focus:border-zinc-900 dark:focus:border-zinc-50 resize-none transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full rounded-none bg-zinc-900 px-6 py-4 text-sm font-bold text-white hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors disabled:opacity-50 uppercase tracking-wider"
              >
                {status === "sending" ? "Sending..." : "Submit Inquiry"}
              </button>
              {status === "sent" && (
                <p className="text-sm text-green-600 dark:text-green-400 text-center font-semibold">Message sent successfully. We will contact you shortly.</p>
              )}
              {status === "error" && (
                <p className="text-sm text-red-600 dark:text-red-400 text-center font-semibold">An error occurred. Please try again.</p>
              )}
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-zinc-900 dark:bg-black border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-wide">Qatar National Digital Core</h3>
            <p className="text-sm text-zinc-400 uppercase tracking-widest">National Strategic Infrastructure — Vision 2030</p>
          </div>
          <div className="flex justify-center gap-8 mb-8">
            <span className="text-xs text-zinc-500 uppercase tracking-wider">Security</span>
            <span className="text-zinc-700">•</span>
            <span className="text-xs text-zinc-500 uppercase tracking-wider">Sovereignty</span>
            <span className="text-zinc-700">•</span>
            <span className="text-xs text-zinc-500 uppercase tracking-wider">Innovation</span>
            <span className="text-zinc-700">•</span>
            <span className="text-xs text-zinc-500 uppercase tracking-wider">Excellence</span>
          </div>
          <div className="text-center text-xs text-zinc-600">
            © {new Date().getFullYear()} Government of Qatar. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
