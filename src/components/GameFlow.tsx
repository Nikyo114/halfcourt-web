"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

// Some screenshots are taller than the 7/15 frame, so objectFit "cover" would
// crop their bottom CTA (Continue / Accepted). Those use "contain" to show the
// full screen; the well-proportioned ones keep "cover" so they fill the frame.
const steps = [
  { n: 1, label: "Build Your Team", desc: "Queue solo or invite friends. Set your skill window and availability.", img: "/screens/game-builder-1.png", fit: "cover" as const },
  { n: 2, label: "Where", desc: "Pick your court. Every one has a live pulse: activity, availability, vibe.", img: "/screens/game-builder-2.png", fit: "contain" as const },
  { n: 3, label: "When", desc: "Tonight? This weekend? Set your window and we'll find the game.", img: "/screens/game-builder-3.png", fit: "cover" as const },
  { n: 4, label: "Who", desc: "1v1, 2v2, or 3v3. Shadow or Ranked. You set the terms.", img: "/screens/game-builder-4.png", fit: "contain" as const },
  { n: 5, label: "Looking…", desc: "Algorithm locks in opponents at your level. Court confirmed automatically.", img: "/screens/game-builder-5.png", fit: "cover" as const },
  { n: 6, label: "Found!", desc: "Match confirmed. Grab your gear, tip-off is on.", img: "/screens/game-builder-6.png", fit: "contain" as const },
];

export default function GameFlow() {
  const [active, setActive] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  const goTo = useCallback((i: number) => {
    setActive(i);
    setAnimKey((k) => k + 1);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      goTo((active + 1) % steps.length);
    }, 1750);
    return () => clearInterval(t);
  }, [active, goTo]);

  return (
    <section
      id="game-flow"
      style={{
        padding: "100px 0",
        background: "var(--dark)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Hero background atmosphere */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url(/hero-bg.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.45,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(10,10,10,0.65) 0%, rgba(10,10,10,0.4) 40%, rgba(10,10,10,0.9) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Orange glow */}
      <div style={{ position: "absolute", top: -100, left: "50%", transform: "translateX(-50%)", width: 800, height: 800, background: "radial-gradient(circle, rgba(232,77,26,0.14) 0%, transparent 60%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", width: "100%", position: "relative", zIndex: 2, textAlign: "center" }}>

        {/* Tagline */}
        <div style={{ fontFamily: "var(--font-outfit)", fontSize: 13, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "var(--orange)", marginBottom: 12, animation: "fadeInUp 0.8s ease both" }}>
          How It Works
        </div>
        <h2 style={{ fontFamily: "var(--font-outfit)", fontSize: "clamp(28px,4vw,44px)", fontWeight: 800, lineHeight: 1.15, marginBottom: 8, color: "var(--white)", animation: "fadeInUp 0.8s ease 0.1s both" }}>
          From open app to queue in 30 seconds.
        </h2>
        <p style={{ fontSize: 17, color: "var(--grey-light)", lineHeight: 1.6, marginBottom: 48, maxWidth: 520, marginLeft: "auto", marginRight: "auto", animation: "fadeInUp 0.8s ease 0.15s both" }}>
          Halfcourt handles the logistics. You just show up and play.
        </p>

        {/* Phone mockup, centered */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 40, animation: "fadeInUp 0.8s ease 0.2s both" }}>
          <div
            style={{
              width: 280,
              height: 600,
              background: "var(--dark-card)",
              borderRadius: 44,
              border: "2px solid var(--dark-border)",
              position: "relative",
              overflow: "hidden",
              boxShadow: "0 40px 80px rgba(0,0,0,0.6), 0 0 80px rgba(232,77,26,0.12)",
              flexShrink: 0,
            }}
            className="phone-frame"
          >
            {/* Notch */}
            <div style={{ position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)", width: 100, height: 24, background: "var(--dark-card)", borderRadius: "0 0 14px 14px", zIndex: 10 }} />
            {/* Status bar */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 36, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 20px", zIndex: 9, background: "var(--dark-card)" }}>
              <span style={{ fontSize: 9, fontWeight: 600, color: "var(--white)" }}>9:41</span>
              <span style={{ fontSize: 9, color: "var(--white)" }}>▲▲▲</span>
            </div>
            {/* Screen image */}
            <div key={animKey} className="flow-screen-enter" style={{ position: "absolute", inset: 0, top: 36 }}>
              <Image
                src={steps[active].img}
                alt={`Halfcourt app: ${steps[active].label}`}
                fill
                style={{ objectFit: steps[active].fit, objectPosition: "top" }}
                priority
              />
            </div>
          </div>
        </div>

        {/* Step pills, horizontal */}
        <div className="gameflow-steps" style={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap", marginBottom: 20, animation: "fadeInUp 0.8s ease 0.3s both" }}>
          {steps.map((s, i) => (
            <button
              key={s.n}
              onClick={() => goTo(i)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: active === i ? "10px 20px" : "10px 16px",
                borderRadius: 100,
                border: `1px solid ${active === i ? "rgba(232,77,26,0.5)" : "var(--dark-border)"}`,
                background: active === i ? "rgba(232,77,26,0.12)" : "rgba(17,17,17,0.8)",
                cursor: "pointer",
                transition: "all 0.3s",
                whiteSpace: "nowrap",
              }}
            >
              <div style={{
                width: 22, height: 22, borderRadius: "50%",
                background: active === i ? "var(--orange)" : "var(--dark-card)",
                border: `1px solid ${active === i ? "var(--orange)" : "var(--dark-border)"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 10, fontWeight: 800,
                color: active === i ? "var(--white)" : "var(--grey)",
                flexShrink: 0, transition: "all 0.3s",
              }}>
                {s.n}
              </div>
              <span style={{
                fontFamily: "var(--font-outfit)",
                fontSize: 13,
                fontWeight: active === i ? 700 : 500,
                color: active === i ? "var(--white)" : "var(--grey-light)",
                transition: "color 0.3s",
              }}>
                {s.label}
              </span>
            </button>
          ))}
        </div>

        {/* Active step description */}
        <div key={`desc-${active}`} className="flow-screen-enter" style={{ minHeight: 24 }}>
          <p style={{ fontSize: 15, color: "var(--grey-light)", lineHeight: 1.5 }}>
            {steps[active].desc}
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .gameflow-steps {
            gap: 6px !important;
          }
          .gameflow-steps button {
            padding: 8px 12px !important;
            font-size: 11px !important;
          }
        }
      `}</style>
    </section>
  );
}
