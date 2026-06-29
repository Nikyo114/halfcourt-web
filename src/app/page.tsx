"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Nav";
import GameFlow from "@/components/GameFlow";
import Footer from "@/components/Footer";

/* ─── Shared helpers ─── */
function FadeUp({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
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
  return <div ref={ref} className="fade-up" style={style}>{children}</div>;
}

/* ─── Phone Mockup ─── */
function PhoneMockup({ src, alt, width = 220, height = 470 }: { src: string; alt: string; width?: number; height?: number }) {
  return (
    <div style={{
      width, height,
      background: "var(--dark-card)",
      borderRadius: 36,
      border: "2px solid var(--dark-border)",
      position: "relative",
      overflow: "hidden",
      boxShadow: "0 30px 60px rgba(0,0,0,0.5), 0 0 40px rgba(232,77,26,0.08)",
      flexShrink: 0,
    }}>
      <div style={{ position: "absolute", top: 6, left: "50%", transform: "translateX(-50%)", width: 80, height: 20, background: "var(--dark-card)", borderRadius: "0 0 12px 12px", zIndex: 10 }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 30, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 16px", zIndex: 9, background: "var(--dark-card)" }}>
        <span style={{ fontSize: 8, fontWeight: 600, color: "var(--white)" }}>9:41</span>
        <span style={{ fontSize: 8, color: "var(--white)" }}>▲▲▲</span>
      </div>
      <div style={{ position: "absolute", inset: 0, top: 30 }}>
        <Image src={src} alt={alt} fill style={{ objectFit: "cover", objectPosition: "top" }} />
      </div>
    </div>
  );
}

/* ─── Hero ─── */
// Left column: static value-prop questions (permanent white, no rotation).
const heroQuestions = [
  "Can't find courts to book?",
  "Want to play for something?",
  "Like tracking progress?",
  "Just something chill?",
];

// Right column: the phone cycles the journey — launch → queue → play → win —
// with a caption above it that stays in sync.
const flowStages = [
  { word: "Launch", img: "/victory/victory-2.png", alt: "Halfcourt home screen — your BPI, rank, and Find a Game" },
  { word: "Queue",  img: "/victory/victory-3.png", alt: "Halfcourt matchmaking — finding a game near you" },
  { word: "Play",   img: "/victory/victory-4.png", alt: "Halfcourt game found — your matched opponent and court" },
  { word: "Win",    img: "/victory/victory-1.png", alt: "Halfcourt victory screen — your BPI climb after the win" },
];

function Hero() {
  const [active, setActive] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setActive((i) => (i + 1) % flowStages.length);
      setAnimKey((k) => k + 1);
    }, 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="hero-section" style={{ minHeight: "calc(100vh - 80px)", display: "flex", alignItems: "center", paddingTop: 120, paddingBottom: 60, position: "relative", overflow: "hidden" }}>
      {/* Atmospheric hero background */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "url(/hero-bg.png)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.55, pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,10,10,0.35) 0%, rgba(10,10,10,0.55) 60%, rgba(10,10,10,0.85) 100%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: -200, right: -200, width: 900, height: 900, background: "radial-gradient(circle, rgba(232,77,26,0.28) 0%, transparent 60%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", width: "100%", position: "relative", zIndex: 2 }}>
        <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 64, alignItems: "center" }}>

          {/* Left: copy */}
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(232,77,26,0.1)", border: "1px solid rgba(232,77,26,0.3)", borderRadius: 100, padding: "8px 20px", fontSize: 13, fontWeight: 600, color: "var(--orange)", marginBottom: 28, animation: "fadeInUp 0.8s ease both" }}>
              <span style={{ width: 8, height: 8, background: "var(--orange)", borderRadius: "50%", animation: "pulse-dot 2s ease infinite", display: "inline-block" }} />
              Launching Soon
            </div>
            <h1 style={{ fontFamily: "var(--font-outfit)", fontSize: "clamp(44px,6vw,76px)", fontWeight: 900, lineHeight: 1.05, marginBottom: 20, animation: "fadeInUp 0.8s ease 0.1s both" }}>
              <span style={{ background: "linear-gradient(135deg, #E84D1A, #FF6B35)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Own your court.</span>
              <br />Earn your rank.
            </h1>
            <p style={{ fontFamily: "var(--font-outfit)", fontSize: "clamp(18px,2.5vw,24px)", fontWeight: 600, color: "var(--grey-light)", marginBottom: 36, animation: "fadeInUp 0.8s ease 0.15s both" }}>
              Pickup basketball, done for all.
            </p>

            {/* Value-prop questions: permanent white, static (no rotation) */}
            <div style={{ marginBottom: 36, animation: "fadeInUp 0.8s ease 0.2s both" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {heroQuestions.map((q) => (
                  <div
                    key={q}
                    style={{
                      fontFamily: "var(--font-outfit)",
                      fontSize: 17,
                      fontWeight: 600,
                      color: "var(--white)",
                    }}
                  >
                    {q}
                  </div>
                ))}
                <div style={{ fontFamily: "var(--font-outfit)", fontSize: 22, fontWeight: 900, color: "var(--orange)", marginTop: 8, letterSpacing: 0.5 }}>
                  We got you.
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", animation: "fadeInUp 0.8s ease 0.3s both" }}>
              <Link
                href="/#waitlist"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--orange)", color: "var(--white)", padding: "16px 32px", borderRadius: 12, fontSize: 16, fontWeight: 700, textDecoration: "none", fontFamily: "var(--font-dm-sans)", transition: "all 0.3s" }}
                onMouseEnter={(e) => { const el = e.currentTarget; el.style.background = "var(--orange-light)"; el.style.transform = "translateY(-2px)"; el.style.boxShadow = "0 8px 30px var(--orange-glow)"; }}
                onMouseLeave={(e) => { const el = e.currentTarget; el.style.background = "var(--orange)"; el.style.transform = "translateY(0)"; el.style.boxShadow = "none"; }}
              >
                Join the Waitlist →
              </Link>
              <Link
                href="/features"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "transparent", color: "var(--white)", padding: "16px 32px", borderRadius: 12, fontSize: 16, fontWeight: 600, textDecoration: "none", border: "1px solid rgba(255,255,255,0.15)", fontFamily: "var(--font-dm-sans)", transition: "all 0.3s" }}
                onMouseEnter={(e) => { const el = e.currentTarget; el.style.borderColor = "rgba(255,255,255,0.4)"; el.style.background = "rgba(255,255,255,0.05)"; }}
                onMouseLeave={(e) => { const el = e.currentTarget; el.style.borderColor = "rgba(255,255,255,0.15)"; el.style.background = "transparent"; }}
              >
                See Features
              </Link>
            </div>
          </div>

          {/* Right: journey phone with a synced launch → win caption above it */}
          <div className="hero-victory" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 20, animation: "fadeInUp 0.8s ease 0.25s both" }}>
            {/* Stage caption: highlight rotates in sync with the phone screen */}
            <div className="hero-stages" style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {flowStages.map((s, i) => (
                <div key={s.word} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span
                    className="hero-stage-word"
                    style={{
                      fontFamily: "var(--font-outfit)",
                      fontSize: 14,
                      fontWeight: active === i ? 800 : 600,
                      letterSpacing: 2,
                      textTransform: "uppercase",
                      color: active === i ? "var(--orange)" : "var(--grey-dark)",
                      transition: "color 0.4s, font-weight 0.4s",
                    }}
                  >
                    {s.word}
                  </span>
                  {i < flowStages.length - 1 && (
                    <span aria-hidden="true" style={{ width: 12, height: 1, background: "var(--dark-border)" }} />
                  )}
                </div>
              ))}
            </div>
            <div
              style={{
                width: 300,
                height: 620,
                background: "var(--dark-card)",
                borderRadius: 44,
                border: "2px solid var(--dark-border)",
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 40px 100px rgba(0,0,0,0.7), 0 0 100px rgba(232,77,26,0.2)",
                flexShrink: 0,
              }}
              className="phone-frame hero-phone"
            >
              {/* Notch */}
              <div style={{ position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)", width: 100, height: 24, background: "var(--dark-card)", borderRadius: "0 0 14px 14px", zIndex: 10 }} />
              {/* Status bar */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 36, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 20px", zIndex: 9, background: "var(--dark-card)" }}>
                <span style={{ fontSize: 9, fontWeight: 600, color: "var(--white)" }}>9:41</span>
                <span style={{ fontSize: 9, color: "var(--white)" }}>▲▲▲</span>
              </div>
              {/* App screen (cycles launch → queue → play → win) */}
              <div key={animKey} className="flow-screen-enter" style={{ position: "absolute", inset: 0, top: 36 }}>
                <Image
                  src={flowStages[active].img}
                  alt={flowStages[active].alt}
                  fill
                  style={{ objectFit: "cover", objectPosition: "top" }}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          /* Stack the phone below the copy and let it show in full. The global
             .phone-frame rule (aspect-ratio 7/15) keeps the whole screen
             visible instead of clipping it to a peek. */
          .hero-victory {
            order: 2;
          }
        }
        /* Clear the fixed nav: the global mobile rule shrinks section padding
           to 64px, which tucks the "Launching Soon" badge under the navbar. */
        @media (max-width: 768px) {
          .hero-section { padding-top: 104px !important; }
          .hero-stage-word { font-size: 12px !important; letter-spacing: 1.5px !important; }
        }
      `}</style>
    </section>
  );
}

/* ─── Stats bar ─── */
function StatsBar() {
  return (
    <div style={{ borderTop: "1px solid var(--dark-border)", borderBottom: "1px solid var(--dark-border)", padding: "40px 0", background: "var(--dark-surface)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 32, textAlign: "center" }} className="stats-grid">
        {[["30s","From open app to queue"],["$0","To get started. Free forever."],["$1000+","Opening tournament prize pool"],["Coming Soon","Melbourne. Then global."]].map(([v,l]) => (
          <div key={l}>
            <div style={{ fontFamily: "var(--font-outfit)", fontSize: 36, fontWeight: 800, color: "var(--orange)" }}>{v}</div>
            <div style={{ fontSize: 14, color: "var(--grey)", marginTop: 4 }}>{l}</div>
          </div>
        ))}
      </div>
      <style>{`@media(max-width:768px){.stats-grid{grid-template-columns:repeat(2,1fr)!important}}`}</style>
    </div>
  );
}

/* ─── Features teaser with phone mockups ─── */
function FeatureTeaser() {
  const features = [
    { n: "01", tag: "Matchmaking", h: "Never get outmatched again.", p: "BPI pairs you with opponents at your exact level, factoring skill, height, age, and experience. Every game is competitive.", phone: { src: "/victory/victory-4.png", alt: "Halfcourt game found screen showing your matched opponent and court" } },
    { n: "02", tag: "Rankings", h: "Your reputation follows you.", p: "BPI tracks skill. Trust Factor tracks character. Show up on time, play fair, and the system rewards you with better games.", phone: { src: "/screens/profile.png", alt: "Player profile showing BPI stats, trust factor, and match history" } },
    { n: "03", tag: "Community", h: "Your court has a pulse.", p: "Discover nearby people, courts, events and competitions.", phone: { src: "/screens/courts-map-view.png", alt: "Court discovery map showing nearby basketball courts with activity indicators" } },
  ];
  return (
    <section id="features" style={{ padding: "100px 0", background: "var(--dark-surface)", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 600, height: 600, background: "radial-gradient(circle, rgba(232,77,26,0.07) 0%, transparent 60%)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <FadeUp><div style={{ fontFamily: "var(--font-outfit)", fontSize: 13, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "var(--orange)", marginBottom: 16 }}>Features</div></FadeUp>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48, flexWrap: "wrap", gap: 16 }}>
          <FadeUp delay={100}><h2 style={{ fontFamily: "var(--font-outfit)", fontSize: "clamp(32px,5vw,52px)", fontWeight: 800, lineHeight: 1.1 }}>Every court becomes<br />a competitive stadium.</h2></FadeUp>
          <FadeUp delay={150}>
            <Link href="/features" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--orange)", fontWeight: 700, fontSize: 15, textDecoration: "none", fontFamily: "var(--font-dm-sans)", transition: "gap 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.gap = "12px")}
              onMouseLeave={(e) => (e.currentTarget.style.gap = "8px")}>
              See all features →
            </Link>
          </FadeUp>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 24 }}>
          {features.map((f, i) => (
            <FadeUp key={f.n} delay={i * 60}>
              <div style={{ background: "var(--dark-card)", border: "1px solid var(--dark-border)", borderRadius: 20, padding: 32, transition: "all 0.3s", height: "100%", position: "relative", overflow: "hidden" }}
                onMouseEnter={(e) => { const el = e.currentTarget; el.style.borderColor = "rgba(232,77,26,0.4)"; el.style.transform = "translateY(-4px)"; }}
                onMouseLeave={(e) => { const el = e.currentTarget; el.style.borderColor = "var(--dark-border)"; el.style.transform = "translateY(0)"; }}>
                <div style={{ fontFamily: "var(--font-outfit)", fontSize: 48, fontWeight: 900, color: "rgba(232,77,26,0.3)", lineHeight: 1, marginBottom: 12 }}>{f.n}</div>
                <div style={{ display: "inline-block", background: "rgba(232,77,26,0.1)", color: "var(--orange)", fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 100, letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>{f.tag}</div>
                <h3 style={{ fontFamily: "var(--font-outfit)", fontSize: 22, fontWeight: 700, marginBottom: 10 }}>{f.h}</h3>
                <p style={{ fontSize: 15, color: "var(--grey-light)", lineHeight: 1.7, marginBottom: f.phone ? 20 : 0 }}>{f.p}</p>
                {f.phone && (
                  <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
                    <div style={{
                      width: 140, height: 280,
                      background: "var(--dark-surface)",
                      borderRadius: 24,
                      border: "1px solid var(--dark-border)",
                      position: "relative",
                      overflow: "hidden",
                      boxShadow: "0 16px 40px rgba(0,0,0,0.4)",
                      transform: "rotate(3deg)",
                    }}>
                      <Image src={f.phone.src} alt={f.phone.alt} fill style={{ objectFit: "cover", objectPosition: "top" }} />
                    </div>
                  </div>
                )}
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Ranks strip with leaderboard phone ─── */
function Ranks() {
  const tierRanks = [
    { name: "Bronze", elo: "0–300", color: "#CD7F32", badge: "/ranks/bronze.png" },
    { name: "Silver", elo: "300–400", color: "#C0C0C0", badge: "/ranks/silver.png" },
    { name: "Gold", elo: "400–500", color: "#FFD700", badge: "/ranks/gold.png" },
    { name: "Platinum", elo: "500–600", color: "#00CED1", badge: "/ranks/platinum.png" },
    { name: "Diamond", elo: "600–700", color: "#B9F2FF", badge: "/ranks/diamond.png" },
    { name: "Prestige", elo: "700–800", color: "#E84D1A", badge: "/ranks/prestige.png" },
    { name: "Mythic", elo: "800+", color: "#FF4500", badge: "/ranks/mythic.png" },
  ];
  return (
    <section id="ranks" style={{ padding: "100px 0", background: "var(--dark)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 60, alignItems: "center" }} className="ranks-grid">
          {/* Left: rank strip */}
          <div style={{ textAlign: "center" }}>
            <FadeUp><div style={{ fontFamily: "var(--font-outfit)", fontSize: 13, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "var(--orange)", marginBottom: 16 }}>Progression</div></FadeUp>
            <FadeUp delay={100}><h2 style={{ fontFamily: "var(--font-outfit)", fontSize: "clamp(32px,5vw,52px)", fontWeight: 800, lineHeight: 1.1, marginBottom: 12 }}>Earn your rank.</h2></FadeUp>
            <FadeUp delay={150}><p style={{ fontSize: 18, color: "var(--grey-light)", marginBottom: 48 }}>From Bronze to Mythic, and beyond. Grind to rank 1.</p></FadeUp>

            {/* Rankers: featured, on its own row */}
            <FadeUp delay={180}>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 48 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 28,
                    maxWidth: 560,
                    background: "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(232,77,26,0.05))",
                    border: "1px solid rgba(255,255,255,0.25)",
                    borderRadius: 24,
                    padding: "28px 32px",
                    transition: "all 0.3s",
                    boxShadow: "0 20px 60px rgba(232,77,26,0.12), 0 0 40px rgba(255,255,255,0.04)",
                    textAlign: "left",
                  }}
                  className="rankers-card"
                  onMouseEnter={(e) => { const el = e.currentTarget; el.style.transform = "translateY(-6px)"; el.style.borderColor = "#FFFFFF"; }}
                  onMouseLeave={(e) => { const el = e.currentTarget; el.style.transform = "translateY(0)"; el.style.borderColor = "rgba(255,255,255,0.25)"; }}
                >
                  {/* Left: badge + title */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, flexShrink: 0 }}>
                    <div style={{ fontFamily: "var(--font-outfit)", fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--orange)" }}>Top 1% Global</div>
                    <div style={{ position: "relative", width: 110, height: 110 }}>
                      <Image src="/ranks/rankers.png" alt="Rankers rank badge" fill style={{ objectFit: "contain" }} />
                    </div>
                    <div style={{ fontFamily: "var(--font-outfit)", fontSize: 18, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase", color: "#FFFFFF" }}>Rankers</div>
                    <div style={{ fontSize: 12, color: "var(--grey-light)" }}>Just a number.</div>
                  </div>

                  {/* Right: perks */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                    <div style={{ fontFamily: "var(--font-outfit)", fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "var(--orange)", marginBottom: 4 }}>Perks</div>
                    {[
                      "Automatic invite to finals",
                      "Free matchmaking",
                      "Discounts on courts",
                    ].map((perk) => (
                      <div key={perk} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ color: "var(--orange)", fontSize: 16, fontWeight: 900, flexShrink: 0, lineHeight: 1 }}>✦</span>
                        <span style={{ fontSize: 14, color: "var(--orange)", fontWeight: 600, fontFamily: "var(--font-dm-sans)" }}>{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={200}>
              <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
                {tierRanks.map((r) => (
                  <div key={r.name}
                    style={{ width: 100, background: "var(--dark-surface)", border: "1px solid var(--dark-border)", borderRadius: 16, padding: "16px 8px 14px", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, transition: "all 0.3s", cursor: "default" }}
                    onMouseEnter={(e) => { const el = e.currentTarget; el.style.transform = "translateY(-6px)"; el.style.borderColor = r.color; }}
                    onMouseLeave={(e) => { const el = e.currentTarget; el.style.transform = "translateY(0)"; el.style.borderColor = "var(--dark-border)"; }}>
                    <div style={{ position: "relative", width: 64, height: 64, flexShrink: 0 }}>
                      <Image src={r.badge} alt={`${r.name} rank badge`} fill style={{ objectFit: "contain" }} />
                    </div>
                    <div style={{ fontFamily: "var(--font-outfit)", fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: r.color }}>{r.name}</div>
                    <div style={{ fontSize: 9, color: "var(--grey)" }}>{r.elo}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 32 }}>
                <Link href="/leaderboards" style={{ color: "var(--orange)", fontWeight: 700, fontSize: 15, textDecoration: "none", fontFamily: "var(--font-dm-sans)" }}>
                  See the leaderboard →
                </Link>
              </div>
            </FadeUp>
          </div>

          {/* Right: leaderboard phone mockup */}
          <FadeUp delay={250}>
            <div className="ranks-phone" style={{ display: "flex", justifyContent: "center" }}>
              <PhoneMockup src="/screens/community-leaderboard.png" alt="Halfcourt leaderboard showing ranked players with BPI scores and rank badges" />
            </div>
          </FadeUp>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .ranks-grid { grid-template-columns: 1fr !important; }
          .ranks-phone { margin-top: 32px; }
          .rankers-card {
            flex-direction: column !important;
            gap: 20px !important;
            padding: 24px !important;
            text-align: center !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ─── Launch Event — Q4 2026 pilot at Bendigo – Red Energy Arena ─── */
function Launch() {
  return (
    <section id="launch" style={{ padding: "100px 0", position: "relative", overflow: "hidden" }}>
      {/* Arena background */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "url(/arena-bg.png)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.25, pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,10,10,0.7), rgba(10,10,10,0.95))", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 2 }}>
        <FadeUp><div style={{ fontFamily: "var(--font-outfit)", fontSize: 13, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "var(--orange)", marginBottom: 16 }}>Q4 2026 Pilot</div></FadeUp>
        <FadeUp delay={100}><h2 style={{ fontFamily: "var(--font-outfit)", fontSize: "clamp(32px,5vw,52px)", fontWeight: 800, lineHeight: 1.1, marginBottom: 16 }}>It starts in Bendigo.<br />It doesn&apos;t stop there.</h2></FadeUp>
        <FadeUp delay={150}><p style={{ fontSize: 18, color: "var(--grey-light)", lineHeight: 1.6, marginBottom: 48, maxWidth: 600 }}>Bendigo – Red Energy Arena. A Q4 2026 pilot. Australia&apos;s first ranked pickup basketball tournament. Two divisions, real prize money, and a leaderboard that follows you for life.</p></FadeUp>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }} className="launch-grid">
          <FadeUp>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {[
                ["📍", "Bendigo – Red Energy Arena", "Central Goldfields' premier basketball venue."],
                ["🏀", "Two Divisions", "Above and below 500 BPI. Every skill level, fair competition."],
                ["🎟️", "Free Entry for Subscribers", "Or earn free entry by referring 3 friends."],
                ["📅", "Monthly Tournaments", "Major tournament every 1st Saturday of the month."],
              ].map(([icon, h, p]) => (
                <div key={h as string} style={{ display: "flex", gap: 16 }}>
                  <div style={{ width: 44, height: 44, minWidth: 44, background: "rgba(232,77,26,0.1)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{icon}</div>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{h}</div>
                    <div style={{ fontSize: 14, color: "var(--grey)", lineHeight: 1.5 }}>{p}</div>
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>
          <FadeUp delay={200}>
            <div style={{ display: "flex", gap: 32, alignItems: "center" }} className="launch-card-wrap">
              <div style={{ flex: 1, background: "linear-gradient(135deg,rgba(232,77,26,0.12),rgba(232,77,26,0.02))", border: "1px solid rgba(232,77,26,0.25)", borderRadius: 24, padding: "40px 32px", textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-outfit)", fontSize: 64, fontWeight: 900, color: "var(--orange)", lineHeight: 1 }}>$1000</div>
                <div style={{ fontSize: 16, color: "var(--grey-light)", marginBottom: 24, marginTop: 4 }}>Opening Tournament Prize Pool</div>
                <div style={{ fontFamily: "var(--font-outfit)", fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Bendigo – Red Energy Arena</div>
                <div style={{ fontSize: 14, color: "var(--grey)", marginBottom: 24 }}>Bendigo, Victoria · Q4 2026 Pilot</div>
                <Link href="/#waitlist" style={{ background: "var(--orange)", color: "var(--white)", padding: "14px 28px", borderRadius: 12, fontSize: 15, fontWeight: 700, textDecoration: "none", display: "inline-block", fontFamily: "var(--font-dm-sans)" }}>
                  Register Interest →
                </Link>
              </div>
              <div className="launch-phone" style={{ flexShrink: 0 }}>
                <PhoneMockup src="/screens/tournament-entry.png" alt="Halfcourt tournament registration screen showing entry details and sign-up" width={180} height={380} />
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .launch-grid { grid-template-columns: 1fr !important; }
          .launch-card-wrap { flex-direction: column !important; }
          .launch-phone { display: flex; justify-content: center; }
        }
      `}</style>
    </section>
  );
}

/* ─── For Everyone with silhouette images ─── */
function ForEveryone() {
  return (
    <section style={{ padding: "100px 0", background: "var(--dark)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <FadeUp><div style={{ fontFamily: "var(--font-outfit)", fontSize: 13, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "var(--orange)", marginBottom: 16 }}>For Everyone</div></FadeUp>
        <FadeUp delay={100}><h2 style={{ fontFamily: "var(--font-outfit)", fontSize: "clamp(32px,5vw,52px)", fontWeight: 800, lineHeight: 1.1, marginBottom: 48 }}>Basketball has no boundaries.</h2></FadeUp>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="everyone-grid">
          {[
            { tag: "Women's Basketball", tagStyle: { background: "rgba(200,50,150,0.1)", color: "#E868A8" }, h: "Compete on your terms.", p: "Female-only matchmaking queues mean you're always playing against the right competition. No mixed lobbies, no nonsense. Just serious basketball with players who are there for the same reason you are.", img: "/silhouette-women.png", fallbackGrad: "linear-gradient(135deg, rgba(232,77,26,0.15), rgba(200,50,150,0.1))" },
            { tag: "Under 18", tagStyle: { background: "rgba(50,150,255,0.1)", color: "#5BA8FF" }, h: "Build your game from day one.", p: "U18 vs U18 matchmaking so you're always developing against the right age group. Safety features built in from the ground up. Get your reps in, climb the ranks, and have something to show for it.", img: "/silhouette-u18.png", fallbackGrad: "linear-gradient(135deg, rgba(232,77,26,0.15), rgba(50,150,255,0.1))" },
          ].map((c) => (
            <FadeUp key={c.h}>
              <div style={{ background: "var(--dark-surface)", border: "1px solid var(--dark-border)", borderRadius: 20, overflow: "hidden", height: "100%" }}>
                {/* Silhouette image: CSS background for graceful degradation */}
                <div style={{ position: "relative", width: "100%", height: 220, overflow: "hidden", backgroundImage: `url(${c.img})`, backgroundSize: "cover", backgroundPosition: "center", backgroundColor: "var(--dark-card)" }}>
                  <div style={{ position: "absolute", inset: 0, background: c.fallbackGrad, opacity: 0.6 }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 40%, var(--dark-surface) 100%)" }} />
                </div>
                <div style={{ padding: "24px 40px 40px" }}>
                  <span style={{ display: "inline-block", fontSize: 11, fontWeight: 700, padding: "6px 14px", borderRadius: 100, letterSpacing: 1, textTransform: "uppercase", marginBottom: 16, ...c.tagStyle }}>{c.tag}</span>
                  <h3 style={{ fontFamily: "var(--font-outfit)", fontSize: 26, fontWeight: 700, marginBottom: 12 }}>{c.h}</h3>
                  <p style={{ fontSize: 15, color: "var(--grey-light)", lineHeight: 1.7 }}>{c.p}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:768px){.everyone-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

/* ─── FAQ ─── */
const faqItems = [
  {
    q: "What is BPI?",
    a: "BPI stands for Basketball Player Index. It's your skill rating on Halfcourt, powered by an ELO system similar to chess. When you sign up, we use your height, age, experience, and playing frequency to set your starting BPI. After your first few games, your actual performance overrides those initial estimates. The system is designed to find your true skill level quickly.",
  },
  {
    q: "What is Trust Factor?",
    a: "Trust Factor is your reliability and sportsmanship score, shown as a star rating on your profile (e.g. 4.93 out of 5). After each game, your opponent rates you on punctuality, fair play, respect, reliability, and score accuracy. High-trust players get matched with other high-trust players. Be reliable and respectful, and you'll play with others who are too.",
  },
  {
    q: "What's the difference between Shadow and Ranked?",
    a: "Shadow is casual mode. Play for fun with no entry fees or rank. Ranked is competitive mode. Play for a rank, get access to guilds, higher prize pool tournaments, pop up tournaments with cash prizes.",
  },
  {
    q: "How does matchmaking work?",
    a: "When you queue for a match, the system looks for opponents based on your BPI (skill rating), Trust Factor, location, time window, and format (1v1, 2v2, 3v3). It starts with a tight skill range and widens over time if needed. You can queue solo or create a party with friends.",
  },
  {
    q: "Is Halfcourt really free?",
    a: "Completely. Court discovery, matchmaking, chatrooms, guilds, scheduling. All free, forever. Of course additional features are available if you lock in, which unlocks unlimited ranked games, discounts on bookings, tournament access and much more.",
  },
  {
    q: "How do tournaments work?",
    a: "Real prize pools. Real venues. Seeded brackets based on your BPI and Trust Factor so every match is competitive. Major tournaments run monthly at partner arenas. Locked In subscribers enter free. Everyone else can pay a small entry fee or earn free entry by referring 3 friends.",
  },
  {
    q: "How do I submit my score?",
    a: "After your match, both players submit their scores independently through the app. If both scores match, the result is confirmed and your BPI updates. If they don't match, you can adjust, cancel, or mutually agree to cancel. The system is built to keep things fair and honest.",
  },
  {
    q: "What are Guilds?",
    a: "Your competitive crew. Form a Guild with your mates, build a team BPI, earn badges, and challenge other guilds in 1v1, 2v2, and 3v3 formats. Guild tournaments run weekly and you'll get the chance to play in league tables.",
  },
  {
    q: "Can I book a court through Halfcourt?",
    a: "Yes. You can discover courts on the map, check available time slots, and book directly through the app. Costs can be split automatically between players. You can also pair a court booking with matchmaking, so the app handles finding both your opponent and your court.",
  },
];

function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" style={{ padding: "100px 0", background: "var(--dark-surface)" }}>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px" }}>
        <FadeUp>
          <div style={{ fontFamily: "var(--font-outfit)", fontSize: 13, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "var(--orange)", marginBottom: 16, textAlign: "center" }}>
            FAQ
          </div>
        </FadeUp>
        <FadeUp delay={100}>
          <h2 style={{ fontFamily: "var(--font-outfit)", fontSize: "clamp(32px,5vw,52px)", fontWeight: 800, lineHeight: 1.1, marginBottom: 48, textAlign: "center" }}>
            Got questions?
          </h2>
        </FadeUp>
        <FadeUp delay={150}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {faqItems.map((item, i) => {
              const isOpen = openIdx === i;
              return (
                <div key={item.q} style={{ borderBottom: "1px solid var(--dark-border)" }}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${i}`}
                    onClick={() => setOpenIdx(isOpen ? null : i)}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 24,
                      padding: "22px 0",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                      color: "var(--white)",
                      fontFamily: "var(--font-outfit)",
                      fontSize: 17,
                      fontWeight: 600,
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "var(--orange)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "var(--white)"; }}
                  >
                    <span>{item.q}</span>
                    <span
                      aria-hidden="true"
                      style={{
                        color: "var(--orange)",
                        fontSize: 22,
                        fontWeight: 400,
                        lineHeight: 1,
                        transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                        transition: "transform 0.3s ease",
                        flexShrink: 0,
                      }}
                    >
                      +
                    </span>
                  </button>
                  <div
                    id={`faq-answer-${i}`}
                    role="region"
                    style={{
                      maxHeight: isOpen ? 400 : 0,
                      overflow: "hidden",
                      transition: "max-height 0.3s ease, padding 0.3s ease",
                      paddingBottom: isOpen ? 24 : 0,
                    }}
                  >
                    <p style={{ fontSize: 15, color: "var(--grey-light)", lineHeight: 1.7, margin: 0, fontFamily: "var(--font-dm-sans)", paddingRight: 40 }}>
                      {item.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ─── Waitlist ─── */
function Waitlist() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError("");
    try {
      const webhookUrl = process.env.NEXT_PUBLIC_WAITLIST_WEBHOOK_URL;
      if (!webhookUrl) throw new Error("Webhook not configured");
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="waitlist" style={{ padding: "120px 0", textAlign: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 800, height: 400, background: "radial-gradient(ellipse, rgba(232,77,26,0.2), transparent 60%)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
        <FadeUp><div style={{ fontFamily: "var(--font-outfit)", fontSize: 13, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "var(--orange)", marginBottom: 16 }}>Join the Movement</div></FadeUp>
        <FadeUp delay={100}><h2 style={{ fontFamily: "var(--font-outfit)", fontSize: "clamp(36px,5vw,60px)", fontWeight: 900, lineHeight: 1.1, marginBottom: 16 }}>The court is yours.<br />If you want it.</h2></FadeUp>
        <FadeUp delay={150}><p style={{ fontSize: 18, color: "var(--grey-light)", marginBottom: 40, maxWidth: 500, margin: "0 auto 40px" }}>Get early access to Halfcourt and be first on the court when we launch in Bendigo. Refer 3 friends and your tournament entry is on us.</p></FadeUp>
        <FadeUp delay={200}>
          {!submitted ? (
            <>
              <form onSubmit={handleSubmit} style={{ display: "flex", gap: 12, maxWidth: 500, margin: "0 auto" }} className="waitlist-form">
                <label htmlFor="waitlist-email" className="sr-only">Email address</label>
                <input id="waitlist-email" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={loading}
                  style={{ flex: 1, padding: "16px 20px", background: "var(--dark-surface)", border: "1px solid var(--dark-border)", borderRadius: 12, color: "var(--white)", fontSize: 16, fontFamily: "var(--font-dm-sans)", outline: "none", opacity: loading ? 0.6 : 1 }} />
                <button type="submit" disabled={loading}
                  style={{ background: "var(--orange)", color: "var(--white)", padding: "16px 28px", borderRadius: 12, fontSize: 16, fontWeight: 700, border: "none", cursor: loading ? "not-allowed" : "pointer", whiteSpace: "nowrap", opacity: loading ? 0.7 : 1 }}>
                  {loading ? "Joining..." : "Join Waitlist"}
                </button>
              </form>
              {error && <p style={{ fontSize: 13, color: "#FF6B6B", marginTop: 12 }} role="alert">{error}</p>}
              {!error && <p style={{ fontSize: 13, color: "var(--grey)", marginTop: 16 }}>No spam. Just game time.</p>}
            </>
          ) : (
            <div style={{ padding: "32px 48px", background: "rgba(232,77,26,0.1)", border: "1px solid rgba(232,77,26,0.3)", borderRadius: 16, display: "inline-block" }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>🏀</div>
              <h3 style={{ fontFamily: "var(--font-outfit)", fontSize: 22, fontWeight: 700, marginBottom: 8 }}>You&apos;re on the list!</h3>
              <p style={{ color: "var(--grey-light)" }}>Check your inbox. We&apos;ve sent you a welcome email. Game time is coming.</p>
            </div>
          )}
        </FadeUp>
      </div>
      <style>{`@media(max-width:480px){.waitlist-form{flex-direction:column!important}}`}</style>
    </section>
  );
}

/* ─── Contact ─── */
function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" style={{ padding: "100px 0", background: "var(--dark-surface)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <FadeUp><div style={{ fontFamily: "var(--font-outfit)", fontSize: 13, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "var(--orange)", marginBottom: 16 }}>Get in Touch</div></FadeUp>
        <FadeUp delay={100}><h2 style={{ fontFamily: "var(--font-outfit)", fontSize: "clamp(32px,5vw,52px)", fontWeight: 800, lineHeight: 1.1, marginBottom: 48 }}>Contact Us</h2></FadeUp>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }} className="contact-grid">
          <FadeUp>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {[["📧","Email","team@playhalfcourt.com"],["📍","Location","Melbourne, Victoria, Australia"],["📱","Social","@playhalfcourt on Instagram & TikTok"],["🏟️","Venue Partnerships","Want to list your court? Get in touch."]].map(([icon,h,p]) => (
                <div key={h as string} style={{ display: "flex", gap: 16 }}>
                  <div style={{ width: 48, height: 48, minWidth: 48, background: "rgba(232,77,26,0.1)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{icon}</div>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{h}</div>
                    <div style={{ fontSize: 14, color: "var(--grey)" }}>{p}</div>
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>
          <FadeUp delay={150}>
            {!sent ? (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <label htmlFor="contact-name" className="sr-only">Your name</label>
                <input id="contact-name" type="text" placeholder="Your name" required style={{ padding: "14px 18px", background: "var(--dark-card)", border: "1px solid var(--dark-border)", borderRadius: 10, color: "var(--white)", fontSize: 15, fontFamily: "var(--font-dm-sans)", outline: "none" }} />
                <label htmlFor="contact-email" className="sr-only">Your email</label>
                <input id="contact-email" type="email" placeholder="Your email" required style={{ padding: "14px 18px", background: "var(--dark-card)", border: "1px solid var(--dark-border)", borderRadius: 10, color: "var(--white)", fontSize: 15, fontFamily: "var(--font-dm-sans)", outline: "none" }} />
                <label htmlFor="contact-category" className="sr-only">Category</label>
                <select id="contact-category" defaultValue="" style={{ padding: "14px 18px", background: "var(--dark-card)", border: "1px solid var(--dark-border)", borderRadius: 10, color: "var(--grey)", fontSize: 15, fontFamily: "var(--font-dm-sans)", outline: "none" }}>
                  <option value="" disabled>What&apos;s this about?</option>
                  {["General enquiry","Venue / court partnership","Sponsorship","Media / press","Bug report","Other"].map(o => <option key={o}>{o}</option>)}
                </select>
                <label htmlFor="contact-message" className="sr-only">Your message</label>
                <textarea id="contact-message" placeholder="Your message" required rows={4} style={{ padding: "14px 18px", background: "var(--dark-card)", border: "1px solid var(--dark-border)", borderRadius: 10, color: "var(--white)", fontSize: 15, fontFamily: "var(--font-dm-sans)", outline: "none", resize: "vertical" }} />
                <button type="submit" style={{ background: "var(--orange)", color: "var(--white)", padding: "15px", borderRadius: 10, border: "none", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>Send Message</button>
              </form>
            ) : (
              <div style={{ textAlign: "center", padding: 40, background: "rgba(46,125,50,0.1)", border: "1px solid rgba(46,125,50,0.3)", borderRadius: 16 }}>
                <h3 style={{ fontFamily: "var(--font-outfit)", fontSize: 22, marginBottom: 8, color: "var(--green-light)" }}>Message sent!</h3>
                <p style={{ color: "var(--grey-light)" }}>We&apos;ll get back to you within 24 hours.</p>
              </div>
            )}
          </FadeUp>
        </div>
      </div>
      <style>{`@media(max-width:768px){.contact-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

/* ─── Page: new section order ─── */
export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <GameFlow />
        <StatsBar />
        <FeatureTeaser />
        <Ranks />
        <Launch />
        <ForEveryone />
        <FAQ />
        <Waitlist />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
