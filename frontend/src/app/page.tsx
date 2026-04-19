"use client";

import { useState, FormEvent, useEffect } from "react";

export default function Home() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#020203] selection:bg-qatar-maroon selection:text-white">
      {/* Navigation */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-black/80 backdrop-blur-xl border-b border-white/10 py-4" : "bg-transparent py-8"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-8 flex items-center justify-between">
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="w-8 h-8 bg-qatar-maroon rounded-sm transform rotate-45 group-hover:rotate-90 transition-transform duration-500" />
            <span className="text-sm font-bold tracking-[0.3em] text-white uppercase">
              Qatar National Digital Core
            </span>
          </div>
          
          <nav className="hidden md:flex items-center gap-12 text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">
            {["Sovereignty", "Economy", "Influence"].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`} 
                className="hover:text-white transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-qatar-maroon group-hover:w-full transition-all duration-300" />
              </a>
            ))}
            <a 
              href="#contact" 
              className="px-6 py-2 border border-white/20 hover:border-white hover:bg-white hover:text-black transition-all duration-300 rounded-full"
            >
              Contact
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover scale-105"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
          
          {/* Advanced Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-[#020203]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
          
          {/* Hero Content */}
          <div className="relative z-10 text-center px-6 max-w-6xl">
            <div className="inline-block mb-8 overflow-hidden">
              <span className="block text-xs font-bold tracking-[0.5em] text-qatar-gold uppercase animate-fade-in-up">
                National Strategic Infrastructure
              </span>
            </div>
            
            <h1 className="hero-title text-7xl md:text-9xl lg:text-[11rem] font-black text-white uppercase mb-8 tracking-tighter mix-blend-difference">
              Sovereign<br />
              <span className="text-gradient">Intelligence</span>
            </h1>
            
            <p className="mt-8 text-lg md:text-xl leading-relaxed text-zinc-300 max-w-2xl mx-auto font-light tracking-wide animate-fade-in-up [animation-delay:200ms]">
              Securing, powering, and projecting the nation&rsquo;s digital future through unmatched technological autonomy.
            </p>
            
            <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up [animation-delay:400ms]">
              <a
                href="#sovereignty"
                className="group relative px-10 py-5 bg-white text-black text-xs font-bold uppercase tracking-[0.2em] overflow-hidden transition-all hover:pr-14"
              >
                <span className="relative z-10">Explore Vision 2030</span>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all">→</span>
              </a>
              <div className="w-px h-12 bg-white/20 hidden sm:block" />
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.3em]">
                Qatar Vision 2030
              </p>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-40">
             <div className="w-px h-16 bg-gradient-to-b from-white to-transparent" />
          </div>
        </section>

        {/* Section 1: Sovereignty */}
        <section id="sovereignty" className="relative bg-[#020203] py-32 md:py-56 overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-qatar-maroon/5 blur-[120px] rounded-full translate-x-1/2" />
          
          <div className="max-w-7xl mx-auto px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-[1px] bg-qatar-maroon" />
                  <span className="text-xs font-bold text-qatar-maroon uppercase tracking-[0.3em]">Phase 01</span>
                </div>
                
                <h2 className="text-5xl md:text-7xl font-black text-white uppercase mb-12 leading-[0.9] tracking-tighter">
                  Digital<br />Sovereignty
                </h2>
                
                <div className="space-y-8 max-w-xl">
                  <h3 className="text-2xl font-light text-zinc-300 leading-relaxed">
                    Control your data. <span className="text-white font-medium">Protect your future.</span>
                  </h3>
                  <p className="text-lg text-zinc-500 leading-relaxed font-light">
                    Qatar establishes an independent technological foundation, ensuring that all critical data — governmental, economic, and societal — remains under national jurisdiction.
                  </p>
                  <div className="pt-8 grid grid-cols-2 gap-12 border-t border-white/10">
                    <div>
                      <p className="text-3xl font-bold text-white mb-2">100%</p>
                      <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Data Autonomy</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-white mb-2">Tier IV</p>
                      <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Security Standard</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-5 relative group">
                <div className="absolute -inset-4 bg-qatar-maroon/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative aspect-square glass-panel flex items-center justify-center overflow-hidden">
                  <div className="text-8xl transform group-hover:scale-110 transition-transform duration-700">🛡️</div>
                  <div className="absolute bottom-0 left-0 w-full p-8 border-t border-white/10 flex justify-between items-center">
                    <span className="text-[10px] font-bold text-white uppercase tracking-widest">National Shield</span>
                    <div className="w-2 h-2 bg-qatar-maroon animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Economy */}
        <section id="economy" className="relative bg-white py-32 md:py-56 overflow-hidden">
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
              <div className="lg:col-span-5 order-2 lg:order-1">
                <div className="aspect-[4/5] bg-zinc-100 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center text-9xl group-hover:scale-110 transition-transform duration-700">⚡</div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-12 left-12">
                    <p className="text-white text-4xl font-black uppercase leading-none">AI Core</p>
                    <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mt-4">Active Processing</p>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-7 order-1 lg:order-2">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-[1px] bg-zinc-900" />
                  <span className="text-xs font-bold text-zinc-900 uppercase tracking-[0.3em]">Phase 02</span>
                </div>
                
                <h2 className="text-5xl md:text-7xl font-black text-zinc-900 uppercase mb-12 leading-[0.9] tracking-tighter">
                  Future<br />Economy
                </h2>
                
                <div className="space-y-8 max-w-xl">
                  <h3 className="text-2xl font-light text-zinc-600 leading-relaxed">
                    At the core of innovation and <span className="text-zinc-900 font-medium">artificial intelligence.</span>
                  </h3>
                  <p className="text-lg text-zinc-500 leading-relaxed font-light">
                    The national data center serves as the backbone of the post-energy economy, powering public services, smart cities, and healthcare through AI-driven technologies.
                  </p>
                  <button className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest group">
                    View Infrastructure Specs
                    <span className="w-8 h-[1px] bg-zinc-300 group-hover:w-12 group-hover:bg-zinc-900 transition-all" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Influence */}
        <section id="influence" className="relative bg-[#020203] py-32 md:py-56 overflow-hidden">
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center max-w-4xl mx-auto mb-32">
              <span className="text-xs font-bold text-qatar-gold uppercase tracking-[0.4em] mb-8 block">Phase 03</span>
              <h2 className="text-6xl md:text-8xl font-black text-white uppercase mb-12 tracking-tighter">
                Global Influence
              </h2>
              <p className="text-xl text-zinc-400 font-light leading-relaxed">
                Positioned as a strategic hub, Qatar strengthens its role on the global stage by providing a trusted, neutral, and highly secure infrastructure.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
              {[
                { label: "Neutrality", value: "Strategic Hub", icon: "🌍" },
                { label: "Connectivity", value: "Regional Node", icon: "🛰️" },
                { label: "Trust", value: "Secure Gateway", icon: "🔐" }
              ].map((item, i) => (
                <div key={i} className="glass-panel p-16 text-center group hover:bg-white/5 transition-colors">
                  <div className="text-5xl mb-8 group-hover:-translate-y-2 transition-transform">{item.icon}</div>
                  <p className="text-white text-xl font-bold uppercase tracking-wider mb-2">{item.value}</p>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-[0.2em]">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="relative bg-white py-32 md:py-56">
          <div className="max-w-4xl mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
              <div>
                <h2 className="text-5xl font-black text-zinc-900 uppercase mb-8 tracking-tighter">Connect</h2>
                <p className="text-lg text-zinc-500 font-light leading-relaxed mb-12">
                  For inquiries regarding strategic partnerships and national initiatives within the Vision 2030 framework.
                </p>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center text-xs">📍</div>
                    <p className="text-xs font-bold uppercase tracking-widest">Doha, Qatar</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center text-xs">✉️</div>
                    <p className="text-xs font-bold uppercase tracking-widest">strategic@digitalcore.qa</p>
                  </div>
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="group relative">
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="Full Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-transparent border-b-2 border-zinc-100 py-4 text-sm outline-none focus:border-zinc-900 transition-colors placeholder:text-zinc-300 placeholder:uppercase placeholder:text-[10px] placeholder:font-bold placeholder:tracking-widest"
                  />
                </div>
                <div className="group relative">
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="Official Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-transparent border-b-2 border-zinc-100 py-4 text-sm outline-none focus:border-zinc-900 transition-colors placeholder:text-zinc-300 placeholder:uppercase placeholder:text-[10px] placeholder:font-bold placeholder:tracking-widest"
                  />
                </div>
                <div className="group relative">
                  <textarea
                    id="message"
                    required
                    rows={4}
                    placeholder="Message"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-transparent border-b-2 border-zinc-100 py-4 text-sm outline-none focus:border-zinc-900 transition-colors resize-none placeholder:text-zinc-300 placeholder:uppercase placeholder:text-[10px] placeholder:font-bold placeholder:tracking-widest"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full bg-zinc-900 py-6 text-[10px] font-black text-white uppercase tracking-[0.3em] hover:bg-qatar-maroon transition-colors disabled:opacity-50"
                >
                  {status === "sending" ? "Processing..." : "Submit Inquiry"}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#020203] py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
            <div>
              <h3 className="text-white text-2xl font-black uppercase tracking-tighter mb-4">Digital Core</h3>
              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.4em]">National Strategic Infrastructure</p>
            </div>
            
            <div className="flex flex-wrap gap-x-12 gap-y-4 text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em]">
              <span>Security</span>
              <span>Sovereignty</span>
              <span>Innovation</span>
              <span>Excellence</span>
            </div>
          </div>
          
          <div className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-[9px] text-zinc-700 uppercase tracking-widest font-bold">
              © {new Date().getFullYear()} Government of Qatar. Sovereign Jurisdiction.
            </p>
            <div className="flex gap-8">
              <div className="w-8 h-px bg-qatar-maroon" />
              <div className="w-8 h-px bg-white/10" />
              <div className="w-8 h-px bg-white/10" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
