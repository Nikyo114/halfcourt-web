"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Nav";
import GameFlow from "@/components/GameFlow";

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transitionDelay = `${delay}ms`;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return <div ref={ref} className="fade-up">{children}</div>;
}

const sidebarSections = [
  { id: "features", label: "Features" },
  { id: "how-it-works", label: "How It Works" },
  { id: "score-flow", label: "Score & BPI" },
  { id: "ranks", label: "Ranks" },
];

const allFeatures = [
  { n: "01", tag: "Matchmaking", h: "Never get outmatched again.", p: "Our BPI algorithm pairs you with opponents at your exact level, factoring in skill, height, age, and experience. Every game is competitive. Every game is winnable. That's the point." },
  { n: "02", tag: "Rankings", h: "Your reputation follows you.", p: "BPI tracks your skill. Trust Factor tracks your character. Show up on time, play fair, respect your opponents, and the system rewards you with better games and better players." },
  { n: "03", tag: "Scheduling", h: "Your next game, locked in.", p: "Know who you're playing, where, and when, up to 7 days out. No more day-of scrambles. Browse real courts near you, register for upcoming tournaments, and build your week around ball." },
  { n: "04", tag: "Community", h: "Your court has a pulse.", p: "Every court has its own chatroom. See who's heading down before you leave the house. Find runs, invite friends, talk trash. Form a Guild and compete as a crew with real team rankings." },
  { n: "05", tag: "Courts", h: "One tap to court and opponent.", p: "Discover public courts or book private ones, all in-app. Costs split automatically. Pair a court booking with matchmaking and the app handles everything. You just show up." },
  { n: "06", tag: "Progression", h: "Something to play for. Always.", p: "Climb from Bronze to Mythic. Monthly tournaments with real prize pools, seeded by your BPI and Trust Factor. Locked In subscribers play free. Everyone else plays for the climb." },
];

const ranks = [
  { name: "Bronze", elo: "0–300", color: "#CD7F32", badge: "/ranks/bronze.png", desc: "Just starting out. The grind begins here." },
  { name: "Silver", elo: "300–400", color: "#C0C0C0", badge: "/ranks/silver.png", desc: "Finding your feet. Consistency pays off." },
  { name: "Gold", elo: "400–500", color: "#FFD700", badge: "/ranks/gold.png", desc: "A solid player. Games start to matter." },
  { name: "Platinum", elo: "500–600", color: "#00CED1", badge: "/ranks/platinum.png", desc: "Above average. You're turning heads." },
  { name: "Diamond", elo: "600–700", color: "#B9F2FF", badge: "/ranks/diamond.png", desc: "Elite level. Top 15% of all players." },
  { name: "Prestige", elo: "700–800", color: "#E84D1A", badge: "/ranks/prestige.png", desc: "Feared on every court. Tournament seeded." },
  { name: "Mythic", elo: "800+", color: "#FF4500", badge: "/ranks/mythic.png", desc: "The pinnacle. Elite players who dominate every court they step on." },
  { name: "Rankers", elo: "Top 1%", color: "#FFFFFF", badge: "/ranks/rankers.png", desc: "Grind to rank 1. You're not chasing a tier. You're chasing a number." },
];

const scoreBeats = [
  { label: "Submit your score", desc: "Both players log the result. No disputes, no drama. Just the number.", img: "/victory/victory-1.png", alt: "Halfcourt victory screen showing the final score 21 to 16 with a submit rating button" },
  { label: "BPI updates instantly", desc: "Every game shifts your rating. Win big, climb fast. Lose to a lower BPI, pay the tax.", img: "/victory/victory-2.png", alt: "Halfcourt home dashboard showing your updated BPI, rating, and win rate" },
  { label: "Track your climb", desc: "See every rank, every match, every point. Your basketball career in one place.", img: "/screens/profile.png", alt: "Halfcourt profile showing your BPI progression chart and match record over time" },
];

export default function FeaturesPage() {
  const [activeSection, setActiveSection] = useState("features");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeBeat, setActiveBeat] = useState(0);
  const [beatKey, setBeatKey] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setActiveBeat((i) => (i + 1) % scoreBeats.length);
      setBeatKey((k) => k + 1);
    }, 2500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      for (const s of [...sidebarSections].reverse()) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(s.id);
          return;
        }
      }
      setActiveSection("features");
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setSidebarOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Nav />
      <main style={{ paddingTop: 80 }}>

        {/* Page header */}
        <div style={{ background: "var(--dark-surface)", borderBottom: "1px solid var(--dark-border)", padding: "48px 0 32px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "var(--orange)", marginBottom: 12, fontFamily: "var(--font-outfit)" }}>Platform</div>
            <h1 style={{ fontFamily: "var(--font-outfit)", fontSize: "clamp(32px,5vw,56px)", fontWeight: 900, lineHeight: 1.05, marginBottom: 16 }}>Everything you need.<br />Nothing you don&apos;t.</h1>
            <p style={{ fontSize: 18, color: "var(--grey-light)", maxWidth: 600, lineHeight: 1.6 }}>Features built around the game, not around engagement metrics. Halfcourt is a tool for players who take pickup seriously.</p>
          </div>
        </div>

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "220px 1fr", gap: 48, alignItems: "start" }} className="features-page-grid">

          {/* Sticky sidebar: desktop */}
          <div style={{ position: "sticky", top: 96, paddingTop: 48 }} className="features-sidebar">
            <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {sidebarSections.map((s) => (
                <button key={s.id} onClick={() => scrollTo(s.id)} style={{
                  textAlign: "left", background: activeSection === s.id ? "rgba(232,77,26,0.1)" : "transparent",
                  border: `1px solid ${activeSection === s.id ? "rgba(232,77,26,0.3)" : "transparent"}`,
                  borderRadius: 10, padding: "10px 14px", color: activeSection === s.id ? "var(--white)" : "var(--grey)",
                  fontFamily: "var(--font-dm-sans)", fontSize: 14, fontWeight: activeSection === s.id ? 600 : 400,
                  cursor: "pointer", transition: "all 0.2s",
                  borderLeft: activeSection === s.id ? "3px solid var(--orange)" : "3px solid transparent",
                }}>
                  {s.label}
                </button>
              ))}
              <div style={{ borderTop: "1px solid var(--dark-border)", marginTop: 16, paddingTop: 16 }}>
                <Link href="/#waitlist" style={{ display: "block", background: "var(--orange)", color: "var(--white)", padding: "12px 14px", borderRadius: 10, fontWeight: 700, fontSize: 14, textDecoration: "none", textAlign: "center", fontFamily: "var(--font-dm-sans)" }}>
                  Join Waitlist →
                </Link>
              </div>
            </nav>
          </div>

          {/* Main content */}
          <div style={{ minWidth: 0 }}>

            {/* Mobile section toggle */}
            <div className="features-mobile-nav" style={{ display: "none", padding: "16px 0", borderBottom: "1px solid var(--dark-border)", marginBottom: 32 }}>
              <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--dark-card)", border: "1px solid var(--dark-border)", borderRadius: 10, padding: "10px 16px", color: "var(--white)", fontWeight: 600, fontSize: 14, cursor: "pointer", width: "100%", justifyContent: "space-between" }}>
                <span>{sidebarSections.find(s => s.id === activeSection)?.label ?? "Navigate"}</span>
                <span style={{ transform: sidebarOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▼</span>
              </button>
              {sidebarOpen && (
                <div style={{ background: "var(--dark-card)", border: "1px solid var(--dark-border)", borderRadius: 10, marginTop: 4, overflow: "hidden" }}>
                  {sidebarSections.map(s => (
                    <button key={s.id} onClick={() => scrollTo(s.id)} style={{ display: "block", width: "100%", textAlign: "left", padding: "12px 16px", background: activeSection === s.id ? "rgba(232,77,26,0.1)" : "transparent", color: activeSection === s.id ? "var(--orange)" : "var(--grey-light)", border: "none", cursor: "pointer", fontSize: 14, fontFamily: "var(--font-dm-sans)", fontWeight: activeSection === s.id ? 600 : 400 }}>
                      {s.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ── Features ── */}
            <section id="features" style={{ padding: "48px 0 80px" }}>
              <FadeUp>
                <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "var(--orange)", marginBottom: 12, fontFamily: "var(--font-outfit)" }}>Features</div>
                <h2 style={{ fontFamily: "var(--font-outfit)", fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, lineHeight: 1.1, marginBottom: 40 }}>Every court becomes<br />a competitive stadium.</h2>
              </FadeUp>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 24 }}>
                {allFeatures.map((f, i) => (
                  <FadeUp key={f.n} delay={i * 50}>
                    <div style={{ background: "var(--dark-card)", border: "1px solid var(--dark-border)", borderRadius: 20, padding: 32, transition: "all 0.3s", height: "100%" }}
                      onMouseEnter={(e) => { const el = e.currentTarget; el.style.borderColor = "rgba(232,77,26,0.4)"; el.style.transform = "translateY(-4px)"; }}
                      onMouseLeave={(e) => { const el = e.currentTarget; el.style.borderColor = "var(--dark-border)"; el.style.transform = "translateY(0)"; }}>
                      <div style={{ fontFamily: "var(--font-outfit)", fontSize: 48, fontWeight: 900, color: "rgba(232,77,26,0.3)", lineHeight: 1, marginBottom: 12 }}>{f.n}</div>
                      <div style={{ display: "inline-block", background: "rgba(232,77,26,0.1)", color: "var(--orange)", fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 100, letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>{f.tag}</div>
                      <h3 style={{ fontFamily: "var(--font-outfit)", fontSize: 20, fontWeight: 700, marginBottom: 10 }}>{f.h}</h3>
                      <p style={{ fontSize: 15, color: "var(--grey-light)", lineHeight: 1.7 }}>{f.p}</p>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </section>

            {/* ── How It Works ── */}
            <section id="how-it-works" style={{ paddingBottom: 80 }}>
              <FadeUp>
                <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "var(--orange)", marginBottom: 12, fontFamily: "var(--font-outfit)" }}>How It Works</div>
                <h2 style={{ fontFamily: "var(--font-outfit)", fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, lineHeight: 1.1, marginBottom: 8 }}>From open app to tip-off in 60s.</h2>
                <p style={{ fontSize: 16, color: "var(--grey-light)", marginBottom: 0 }}>Six steps. No friction.</p>
              </FadeUp>
              <GameFlow />
            </section>

            {/* ── Score & BPI ── */}
            <section id="score-flow" style={{ paddingBottom: 80 }}>
              <FadeUp>
                <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "var(--orange)", marginBottom: 12, fontFamily: "var(--font-outfit)" }}>Score & BPI</div>
                <h2 style={{ fontFamily: "var(--font-outfit)", fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, lineHeight: 1.1, marginBottom: 8 }}>Every point counted.</h2>
                <p style={{ fontSize: 16, color: "var(--grey-light)", marginBottom: 40 }}>Submit your score, watch your BPI update in real time.</p>
              </FadeUp>
              <FadeUp delay={100}>
                <div className="score-layout" style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 48, alignItems: "center", padding: "32px 0" }}>
                  {/* Phone mockup */}
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div
                      style={{
                        width: 260,
                        height: 560,
                        background: "var(--dark-card)",
                        borderRadius: 40,
                        border: "2px solid var(--dark-border)",
                        position: "relative",
                        overflow: "hidden",
                        boxShadow: "0 40px 80px rgba(0,0,0,0.6), 0 0 80px rgba(232,77,26,0.15)",
                        flexShrink: 0,
                      }}
                      className="phone-frame"
                    >
                      <div style={{ position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)", width: 100, height: 24, background: "var(--dark-card)", borderRadius: "0 0 14px 14px", zIndex: 10 }} />
                      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 36, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 20px", zIndex: 9, background: "var(--dark-card)" }}>
                        <span style={{ fontSize: 9, fontWeight: 600, color: "var(--white)" }}>9:41</span>
                        <span style={{ fontSize: 9, color: "var(--white)" }}>▲▲▲</span>
                      </div>
                      <div key={beatKey} className="flow-screen-enter" style={{ position: "absolute", inset: 0, top: 36 }}>
                        <Image
                          src={scoreBeats[activeBeat].img}
                          alt={scoreBeats[activeBeat].alt}
                          fill
                          style={{ objectFit: "cover", objectPosition: "top" }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Expanded explanation cards */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {[
                      {
                        title: "What is BPI?",
                        body: "Your Basketball Player Index, a skill rating powered by an ELO system similar to chess. When you sign up, Halfcourt uses your height, age, experience, and playing frequency to set your starting BPI. After your first few games, your actual performance takes over. The system is designed to find your true skill level fast.",
                      },
                      {
                        title: "How scoring works",
                        body: "After every game, both players submit their scores independently through the app. If the scores match, the result is confirmed instantly and your BPI updates. Win against a higher-rated opponent and you'll climb faster. Lose to someone below you and you'll feel it. The bigger the upset, the bigger the shift.",
                      },
                      {
                        title: "Trust Factor",
                        body: "Your reliability and sportsmanship score, shown as a star rating on your profile (e.g. 4.93/5). After each game, your opponent rates you on punctuality, sportsmanship, and fair play. High-trust players get matched with other high-trust players. Be reliable and respectful, and you'll play with people who are too. Low trust? You'll notice the difference in your matchmaking quality.",
                      },
                      {
                        title: "Shadow vs Ranked",
                        body: "Shadow mode is casual. Play for fun with no entry fee. You still get a separate Shadow ELO visible on your profile, so every game still counts for something. Ranked is where it matters. Your BPI shifts based on results, you earn or lose rank, and everything feeds into guild standings and tournament seeding. Ranked costs $1 per game on the free tier, or it's unlimited with Locked In.",
                      },
                    ].map((c) => (
                      <div
                        key={c.title}
                        style={{
                          background: "var(--dark-card)",
                          border: "1px solid var(--dark-border)",
                          borderRadius: 16,
                          padding: 24,
                          transition: "border-color 0.3s",
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(232,77,26,0.35)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--dark-border)"; }}
                      >
                        <h3 style={{ fontFamily: "var(--font-outfit)", fontSize: 18, fontWeight: 700, color: "var(--white)", marginBottom: 10 }}>
                          {c.title}
                        </h3>
                        <p style={{ fontSize: 15, color: "var(--grey-light)", lineHeight: 1.7, margin: 0, fontFamily: "var(--font-dm-sans)" }}>
                          {c.body}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeUp>
              <style>{`
                @media (max-width: 768px) {
                  .score-layout {
                    grid-template-columns: 1fr !important;
                    gap: 32px !important;
                  }
                }
              `}</style>
            </section>

            {/* ── Ranks ── */}
            <section id="ranks" style={{ paddingBottom: 80 }}>
              <FadeUp>
                <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "var(--orange)", marginBottom: 12, fontFamily: "var(--font-outfit)" }}>Ranks</div>
                <h2 style={{ fontFamily: "var(--font-outfit)", fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, lineHeight: 1.1, marginBottom: 12 }}>Earn your rank.</h2>
                <p style={{ fontSize: 16, color: "var(--grey-light)", marginBottom: 40 }}>Eight tiers. One path. Every game moves the needle. Grind to rank 1.</p>
              </FadeUp>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {ranks.map((r, i) => (
                  <FadeUp key={r.name} delay={i * 40}>
                    <div style={{ background: r.name === "Rankers" ? "rgba(255,255,255,0.03)" : "var(--dark-card)", border: `1px solid ${r.name === "Rankers" ? "rgba(255,255,255,0.15)" : "var(--dark-border)"}`, borderRadius: 16, padding: "20px 24px", display: "flex", alignItems: "center", gap: 24, transition: "all 0.3s" }}
                      onMouseEnter={(e) => { const el = e.currentTarget; el.style.borderColor = r.color; el.style.transform = "translateX(4px)"; }}
                      onMouseLeave={(e) => { const el = e.currentTarget; el.style.borderColor = r.name === "Rankers" ? "rgba(255,255,255,0.15)" : "var(--dark-border)"; el.style.transform = "translateX(0)"; }}>
                      <div style={{ position: "relative", width: 68, height: 68, flexShrink: 0 }}>
                        <Image src={r.badge} alt={`${r.name} rank badge`} fill style={{ objectFit: "contain" }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
                          <span style={{ fontFamily: "var(--font-outfit)", fontSize: 18, fontWeight: 700, color: r.color, letterSpacing: 0.3 }}>{r.name}</span>
                          <span style={{ fontSize: 12, color: "var(--grey)", background: "var(--dark-surface)", padding: "2px 10px", borderRadius: 100 }}>{r.elo} BPI</span>
                        </div>
                        <p style={{ fontSize: 14, color: "var(--grey-light)", margin: 0 }}>{r.desc}</p>
                      </div>
                    </div>
                  </FadeUp>
                ))}
              </div>
              <FadeUp delay={300}>
                <div style={{ marginTop: 32, textAlign: "center" }}>
                  <Link href="/leaderboards" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--orange)", fontWeight: 700, fontSize: 15, textDecoration: "none", fontFamily: "var(--font-dm-sans)" }}>
                    See the leaderboard →
                  </Link>
                </div>
              </FadeUp>
            </section>

          </div>
        </div>
      </main>

      <style>{`
        @media (max-width: 768px) {
          .features-page-grid { grid-template-columns: 1fr !important; }
          .features-sidebar { display: none !important; }
          .features-mobile-nav { display: block !important; }
        }
      `}</style>
    </>
  );
}
