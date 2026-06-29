// ARCHIVED 2026-04-24: Launch Event section was removed from the home page.
// Kept here for future restoration. To bring it back:
//   1. import Launch from "@/archive/Launch";
//   2. drop <Launch /> back into the Home component order in src/app/page.tsx
// Requires: Link (next/link), the FadeUp + PhoneMockup helpers (re-export or inline them).
"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

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

export default function Launch() {
  return (
    <section id="launch" style={{ padding: "100px 0", position: "relative", overflow: "hidden" }}>
      {/* Arena background */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "url(/arena-bg.png)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.25, pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,10,10,0.7), rgba(10,10,10,0.95))", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 2 }}>
        <FadeUp><div style={{ fontFamily: "var(--font-outfit)", fontSize: 13, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "var(--orange)", marginBottom: 16 }}>Launch Event</div></FadeUp>
        <FadeUp delay={100}><h2 style={{ fontFamily: "var(--font-outfit)", fontSize: "clamp(32px,5vw,52px)", fontWeight: 800, lineHeight: 1.1, marginBottom: 16 }}>It starts in Bendigo.<br />It doesn&apos;t stop there.</h2></FadeUp>
        <FadeUp delay={150}><p style={{ fontSize: 18, color: "var(--grey-light)", lineHeight: 1.6, marginBottom: 48, maxWidth: 600 }}>Red Energy Arena. Launching soon. Australia&apos;s first ranked pickup basketball tournament. Two divisions, real prize money, and a leaderboard that follows you for life.</p></FadeUp>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }} className="launch-grid">
          <FadeUp>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {[
                ["📍","Red Energy Arena, Bendigo","Central Goldfields' premier basketball venue."],
                ["🏀","Two Divisions","Above and below 500 BPI. Every skill level, fair competition."],
                ["🎟️","Free Entry for Subscribers","Or earn free entry by referring 3 friends."],
                ["📅","Monthly Tournaments","Major tournament every 1st Saturday of the month."]
              ].map(([icon,h,p]) => (
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
                <div style={{ fontFamily: "var(--font-outfit)", fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Red Energy Arena</div>
                <div style={{ fontSize: 14, color: "var(--grey)", marginBottom: 24 }}>Bendigo, Victoria · Launching Soon</div>
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
