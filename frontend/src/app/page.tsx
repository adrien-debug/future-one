"use client";

import { useState, FormEvent, useEffect } from "react";
import Image from "next/image";

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
    <div className="flex flex-col min-h-screen bg-[#f7f7f5] text-zinc-900 selection:bg-qatar-maroon selection:text-white font-sans">
      {/* Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled ? "bg-white/70 backdrop-blur-2xl border-b border-zinc-200/80 py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 flex items-center justify-between">
          <div className="flex items-center gap-4 md:gap-6 group cursor-pointer">
            <div className="relative">
              <div className="w-6 h-6 border border-qatar-maroon transform rotate-45 group-hover:rotate-90 transition-transform duration-1000" />
              <div className="absolute inset-0 w-6 h-6 bg-qatar-maroon/20 blur-sm transform rotate-45 group-hover:rotate-90 transition-transform duration-1000" />
            </div>
            <div className="flex flex-col">
              <span className={`text-[9px] md:text-[10px] font-black tracking-[0.32em] md:tracking-[0.4em] uppercase leading-none transition-colors duration-700 ${scrolled ? "text-zinc-900" : "text-white"}`}>
                Qatar National
              </span>
              <span className={`text-[7px] md:text-[8px] font-bold tracking-[0.16em] md:tracking-[0.2em] uppercase mt-1 transition-colors duration-700 ${scrolled ? "text-zinc-500" : "text-zinc-400"}`}>
                Digital Core
              </span>
            </div>
          </div>
          
          <nav className="hidden lg:flex items-center gap-16">
            {["Sovereignty", "Economy", "Influence"].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`} 
                className={`text-[9px] font-bold uppercase tracking-[0.3em] relative group transition-colors duration-700 ${scrolled ? "text-zinc-600 hover:text-zinc-900" : "text-zinc-300 hover:text-white"}`}
              >
                {item}
                <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-0 h-px bg-qatar-maroon group-hover:w-full transition-all duration-500" />
              </a>
            ))}
            <a 
              href="#contact" 
              className={`px-8 py-2.5 border hover:border-qatar-maroon hover:bg-qatar-maroon/10 text-[9px] font-bold uppercase tracking-[0.3em] transition-all duration-500 backdrop-blur-md ${scrolled ? "border-zinc-300/80 text-zinc-900" : "border-white/20 text-white"}`}
            >
              Inquiry
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
          <div className="absolute inset-0 z-0 animate-slow-zoom">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/hero-video.mp4" type="video/mp4" />
            </video>
          </div>
          
          {/* Refined Overlays for Hero */}
          <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/20 to-black/80 z-1" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)] z-1" />
          
          {/* Hero Content */}
          <div className="relative z-10 w-full max-w-6xl mx-auto text-center px-6 md:px-10 pt-28 md:pt-20">
            <div className="inline-flex items-center gap-3 md:gap-4 mb-8 md:mb-12 animate-fade-in-up">
                <div className="w-6 md:w-8 h-px bg-qatar-gold/60" />
              <span className="text-[8px] md:text-[9px] font-black tracking-[0.35em] md:tracking-[0.6em] text-qatar-gold uppercase">
                Vision 2030 Strategic Infrastructure
              </span>
              <div className="w-6 md:w-8 h-px bg-qatar-gold/60" />
            </div>

            <div className="mx-auto max-w-5xl mb-6 md:mb-10">
              <h1 className="text-[clamp(2.5rem,7vw,5.5rem)] md:text-[clamp(3.5rem,6vw,6rem)] font-bold text-white uppercase tracking-[0.02em] leading-none drop-shadow-2xl">
                Future One
              </h1>
              <p className="mt-4 md:mt-6 text-[clamp(0.9rem,2.5vw,1.4rem)] md:text-[clamp(1.1rem,2vw,1.6rem)] font-medium uppercase tracking-[0.3em] md:tracking-[0.4em] text-zinc-300">
                Sovereign Intelligence
              </p>
            </div>

            <p className="mt-8 md:mt-12 text-[11px] md:text-sm leading-[2] text-zinc-300 max-w-2xl mx-auto font-medium tracking-[0.15em] md:tracking-[0.2em] uppercase animate-fade-in-up [animation-delay:300ms]">
              The technological bedrock of national autonomy.
              <br className="hidden md:block" />
              <span className="md:hidden"> </span>
              Securing the future of the State of Qatar.
            </p>

            <div className="mt-16 md:mt-24 flex flex-col items-center gap-8 md:gap-10 animate-fade-in-up [animation-delay:600ms]">
              <a
                href="#sovereignty"
                className="group relative px-10 md:px-14 py-5 md:py-7 bg-white/5 backdrop-blur-md border border-white/20 text-white text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] md:tracking-[0.5em] transition-all hover:bg-qatar-maroon hover:border-qatar-maroon"
              >
                Explore the Core
              </a>
              <div className="flex flex-col items-center gap-4">
                <div className="w-px h-16 md:h-24 bg-linear-to-b from-qatar-maroon to-transparent" />
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: Sovereignty - Massive Visual */}
        <section id="sovereignty" className="relative min-h-screen flex items-center py-32 overflow-hidden">
          {/* Immersive Parallax Background */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/light-corridor.webp"
              alt="Futuristic Institutional Corridor"
              fill
              className="object-cover object-center"
              quality={100}
              priority
            />
            <div className="absolute inset-0 bg-linear-to-r from-white/90 via-white/50 to-transparent" />
            <div className="absolute inset-0 bg-linear-to-b from-[#f7f7f5]/80 via-transparent to-[#f7f7f5]" />
          </div>
          
          <div className="max-w-[1600px] mx-auto px-6 md:px-10 w-full relative z-10">
            <div className="max-w-2xl">
              <div className="flex items-center gap-6 mb-12">
                <span className="text-[10px] font-black text-qatar-maroon uppercase tracking-[0.5em]">01 / Sovereignty</span>
                <div className="w-24 h-px bg-qatar-maroon/30" />
              </div>
              
              <div className="bg-white/60 backdrop-blur-2xl border border-white p-10 md:p-16 rounded-sm shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
                <h2 className="text-4xl md:text-6xl font-bold text-zinc-900 uppercase mb-8 leading-tight tracking-tight">
                  National<br />Data Shield
                </h2>
                
                <p className="text-lg md:text-xl font-light text-zinc-700 leading-relaxed italic mb-8 border-l-2 border-qatar-maroon pl-6">
                  &ldquo;Establishing an independent technological foundation where critical national data remains under absolute jurisdiction.&rdquo;
                </p>
                
                <p className="text-sm text-zinc-600 leading-loose font-light tracking-wide mb-12">
                  The Digital Core ensures that governmental, economic, and societal data is protected by the highest standards of strategic resilience and autonomous infrastructure.
                </p>
                
                <div className="grid grid-cols-2 gap-12">
                  <div className="group">
                    <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-3 group-hover:text-qatar-maroon transition-colors">Jurisdiction</p>
                    <p className="text-3xl md:text-4xl font-light text-zinc-900 tracking-tighter">100% Local</p>
                  </div>
                  <div className="group">
                    <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-3 group-hover:text-qatar-maroon transition-colors">Resilience</p>
                    <p className="text-3xl md:text-4xl font-light text-zinc-900 tracking-tighter">Tier IV+</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Economy - Massive Visual */}
        <section id="economy" className="relative min-h-screen flex items-center py-32 overflow-hidden">
          {/* Immersive Parallax Background */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/light-datacore.webp"
              alt="Digital Infrastructure Hub"
              fill
              className="object-cover object-center"
              quality={100}
            />
            <div className="absolute inset-0 bg-linear-to-l from-white/95 via-white/70 to-white/20" />
            <div className="absolute inset-0 bg-linear-to-b from-[#f7f7f5]/80 via-transparent to-[#f7f7f5]" />
          </div>
          
          <div className="max-w-[1600px] mx-auto px-6 md:px-10 w-full relative z-10 flex justify-end">
            <div className="max-w-2xl">
              <div className="flex items-center justify-end gap-6 mb-12">
                <div className="w-24 h-px bg-qatar-gold/50" />
                <span className="text-[10px] font-black text-qatar-gold uppercase tracking-[0.5em]">02 / Economy</span>
              </div>
              
              <div className="bg-white/70 backdrop-blur-2xl border border-white p-10 md:p-16 rounded-sm shadow-[0_30px_80px_rgba(15,23,42,0.08)] text-right">
                <h2 className="text-4xl md:text-6xl font-bold text-zinc-900 uppercase mb-8 leading-tight tracking-tight">
                  The Engine<br />of Progress
                </h2>
                
                <h3 className="text-xl md:text-2xl font-light text-zinc-600 leading-relaxed mb-8">
                  Powering the <span className="text-zinc-900 font-bold">post-energy economy</span> through massive-scale artificial intelligence integration.
                </h3>
                
                <p className="text-sm text-zinc-500 leading-loose font-light tracking-wide mb-12">
                  From smart city orchestration to advanced healthcare analytics, the Digital Core provides the computational power required for Qatar&rsquo;s next era of growth.
                </p>
                
                <div className="flex justify-end gap-12">
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-[8px] font-black uppercase tracking-[0.4em] text-zinc-400">Status</span>
                    <span className="text-xs font-bold uppercase tracking-widest flex items-center gap-3 text-zinc-900">
                      Operational
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Influence - Massive Visual Grid */}
        <section id="influence" className="relative min-h-screen py-32 overflow-hidden bg-[#e9e9e7]">
          <div className="absolute inset-0 z-0 opacity-60">
            <Image
              src="/images/light-globalnode.webp"
              alt="Global Connectivity Node"
              fill
              className="object-cover object-center"
              quality={100}
            />
            <div className="absolute inset-0 bg-white/40 backdrop-blur-sm" />
          </div>

          <div className="max-w-[1600px] mx-auto px-6 md:px-10 relative z-10">
            <div className="flex flex-col items-center text-center mb-24">
              <div className="w-px h-24 bg-linear-to-b from-transparent to-qatar-maroon mb-8" />
              <span className="text-[10px] font-black text-qatar-maroon uppercase tracking-[0.6em] mb-8 block">03 / Global Influence</span>
              <h2 className="text-5xl md:text-7xl font-bold text-zinc-900 uppercase mb-8 tracking-tight leading-none">
                A Trusted<br />Global Node
              </h2>
              <p className="text-lg md:text-xl text-zinc-600 font-light leading-relaxed max-w-3xl mx-auto">
                A neutral, highly secure infrastructure serving as a strategic bridge for international technological cooperation.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
              {[
                { label: "Neutrality", value: "Strategic Hub", desc: "A sovereign zone for international data exchange." },
                { label: "Connectivity", value: "Regional Node", desc: "Ultra-low latency connections across three continents." },
                { label: "Trust", value: "Secure Gateway", desc: "Military-grade encryption for diplomatic and financial flows." }
              ].map((item, i) => (
                <div key={i} className="relative group overflow-hidden h-[400px] md:h-[500px] border border-white/40 bg-white/60 backdrop-blur-xl shadow-xl">
                  <div className="absolute inset-0 z-0 opacity-30 group-hover:opacity-80 transition-opacity duration-1000">
                    <Image
                      src="/images/light-globalnode.webp"
                      alt={item.value}
                      fill
                      className="object-cover filter grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-white via-white/50 to-transparent" />
                  </div>
                  
                  <div className="absolute inset-0 z-10 p-10 flex flex-col justify-end">
                    <div className="w-8 h-px bg-qatar-maroon mb-6 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                    <p className="text-zinc-900 text-2xl font-bold uppercase tracking-wide mb-2">{item.value}</p>
                    <p className="text-[10px] text-qatar-maroon font-black uppercase tracking-[0.4em] mb-6">{item.label}</p>
                    <p className="text-sm text-zinc-600 font-light leading-relaxed opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-700 delay-100">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section - Immersive Texture */}
        <section id="contact" className="relative min-h-screen flex items-center py-32">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/light-texture.webp"
              alt="Premium Architectural Texture"
              fill
              className="object-cover object-center opacity-50"
              quality={100}
            />
            <div className="absolute inset-0 bg-white/70 backdrop-blur-sm" />
          </div>

          <div className="max-w-[1600px] mx-auto px-6 md:px-10 w-full relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-40 items-center">
              <div>
                <span className="text-[9px] font-black text-qatar-maroon uppercase tracking-[0.5em] block mb-8">Contact / Inquiries</span>
                <h2 className="text-5xl md:text-7xl font-bold text-zinc-900 uppercase mb-8 tracking-tight leading-none">Connect with<br />the Future</h2>
                <p className="text-lg text-zinc-600 font-light leading-relaxed mb-16 max-w-md">
                  Direct channel for strategic partnerships, governmental initiatives, and institutional inquiries.
                </p>
                
                <div className="space-y-10">
                  <div className="group cursor-pointer border-l border-zinc-200 pl-6 hover:border-qatar-maroon transition-colors duration-500">
                    <p className="text-[8px] font-black text-zinc-400 uppercase tracking-[0.4em] mb-2">Location</p>
                    <p className="text-sm font-bold uppercase tracking-widest text-zinc-900">Doha, State of Qatar</p>
                  </div>
                  <div className="group cursor-pointer border-l border-zinc-200 pl-6 hover:border-qatar-maroon transition-colors duration-500">
                    <p className="text-[8px] font-black text-zinc-400 uppercase tracking-[0.4em] mb-2">Secure Email</p>
                    <p className="text-sm font-bold uppercase tracking-widest text-zinc-900">strategic@digitalcore.qa</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/80 backdrop-blur-2xl border border-white p-10 md:p-16 relative shadow-[0_30px_80px_rgba(15,23,42,0.06)]">
                <div className="absolute top-0 left-0 w-1 h-full bg-qatar-maroon" />
                <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="space-y-3">
                    <label className="text-[8px] font-black text-zinc-400 uppercase tracking-[0.4em]">Identity</label>
                    <input
                      type="text"
                      required
                      placeholder="Full Name / Title"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-transparent border-b border-zinc-200 py-4 text-sm text-zinc-900 outline-none focus:border-qatar-maroon transition-colors placeholder:text-zinc-400 placeholder:uppercase placeholder:text-[9px] placeholder:font-bold placeholder:tracking-widest"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[8px] font-black text-zinc-400 uppercase tracking-[0.4em]">Authentication</label>
                    <input
                      type="email"
                      required
                      placeholder="Official Institution Email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-transparent border-b border-zinc-200 py-4 text-sm text-zinc-900 outline-none focus:border-qatar-maroon transition-colors placeholder:text-zinc-400 placeholder:uppercase placeholder:text-[9px] placeholder:font-bold placeholder:tracking-widest"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[8px] font-black text-zinc-400 uppercase tracking-[0.4em]">Inquiry Details</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Strategic Message"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full bg-transparent border-b border-zinc-200 py-4 text-sm text-zinc-900 outline-none focus:border-qatar-maroon transition-colors resize-none placeholder:text-zinc-400 placeholder:uppercase placeholder:text-[9px] placeholder:font-bold placeholder:tracking-widest"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="group flex items-center justify-between w-full bg-zinc-900 text-white px-10 py-6 text-[10px] font-black uppercase tracking-[0.5em] hover:bg-qatar-maroon transition-all duration-500 disabled:opacity-50 mt-8"
                  >
                    <span>{status === "sending" ? "Transmitting..." : "Submit Inquiry"}</span>
                    <span className="group-hover:translate-x-2 transition-transform">→</span>
                  </button>
                  {status === "sent" && (
                    <p className="text-[10px] text-qatar-maroon font-black uppercase tracking-widest text-center mt-6">Transmission Successful. Awaiting Protocol.</p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#ececea] py-24 border-t border-zinc-200 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(138,21,56,0.05)_0%,transparent_70%)]" />
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start gap-20">
            <div className="max-w-sm">
              <h3 className="text-zinc-900 text-3xl font-black uppercase tracking-tighter mb-6 italic">Digital Core</h3>
              <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-[0.4em] leading-loose">
                The sovereign infrastructure securing, powering, and projecting the nation&rsquo;s digital future.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-16 md:gap-24">
              {["Security", "Sovereignty", "Innovation", "Excellence"].map((item) => (
                <div key={item} className="flex flex-col gap-4">
                  <span className="text-[8px] font-black text-zinc-600 uppercase tracking-[0.4em] hover:text-qatar-maroon cursor-pointer transition-colors">{item}</span>
                  <div className="w-4 h-px bg-zinc-300" />
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-32 pt-12 border-t border-zinc-200 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-6">
              <p className="text-[8px] text-zinc-500 uppercase tracking-[0.5em] font-black">
                © {new Date().getFullYear()} Government of Qatar
              </p>
              <div className="w-px h-3 bg-zinc-300" />
              <p className="text-[8px] text-zinc-400 uppercase tracking-[0.5em] font-black">
                Sovereign Jurisdiction
              </p>
            </div>
            
            <div className="flex gap-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className={`w-8 h-px ${i === 1 ? "bg-qatar-maroon" : "bg-zinc-300"}`} />
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
