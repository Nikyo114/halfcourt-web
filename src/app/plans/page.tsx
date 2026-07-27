"use client";
import { useState } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";

const free = [
  "Find matches",
  "Queue for multiple courts",
  "Get a BPI (Basketball Player Index)",
  "Schedule games 24 hours in advance",
  "Book courts 24 hours in advance",
  "Discover nearby courts, games and events",
  "Basic stats and leaderboards",
  "Add friends",
  "View rank progression",
];

const pro = [
  "Discounts on bookings",
  "Schedule up to 1 week in advance",
  "View booking availabilities 1 week in advance",
  "Access exclusive tournaments + early entry to public ones",
  "Limited edition trading cards",
];

const comparison = [
  { feature: "Find matches", free: true, locked: true },
  { feature: "Queue for multiple courts", free: true, locked: true },
  { feature: "BPI (Basketball Player Index)", free: true, locked: true },
  { feature: "Schedule games in advance", free: "24 hours", locked: "1 week" },
  { feature: "Book courts / view availability", free: "24 hours", locked: "1 week" },
  { feature: "Discover courts, games & events", free: true, locked: true },
  { feature: "Basic stats & leaderboards", free: true, locked: true },
  { feature: "Add friends", free: true, locked: true },
  { feature: "Rank progression", free: true, locked: true },
  { feature: "Booking discounts", free: false, locked: true },
  { feature: "Exclusive tournaments + early public entry", free: false, locked: true },
  { feature: "Limited edition trading cards", free: false, locked: true },
];

export default function PlansPage() {
  const [annual, setAnnual] = useState(false);

  const renderVal = (val: boolean | string) => {
    if (val === true) return <span style={{ color: "var(--green-light)", fontWeight: 700 }}>✓</span>;
    if (val === false) return <span style={{ color: "var(--grey-dark)" }}>·</span>;
    return <span style={{ color: "var(--grey-light)", fontSize: 13 }}>{val}</span>;
  };

  return (
    <>
      <Nav />
      <main style={{ paddingTop: 80, minHeight: "100vh" }}>
        {/* Header */}
        <div style={{ background: "var(--dark-surface)", borderBottom: "1px solid var(--dark-border)", padding: "48px 0 48px", textAlign: "center" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "var(--orange)", marginBottom: 12, fontFamily: "var(--font-outfit)" }}>Plans</div>
            <h1 style={{ fontFamily: "var(--font-outfit)", fontSize: "clamp(32px,5vw,56px)", fontWeight: 900, lineHeight: 1.05, marginBottom: 12 }}>Play Free or Lock in.</h1>
            <p style={{ fontSize: 18, color: "var(--white)", fontWeight: 700, marginBottom: 32 }}>Every new player gets a 1-month free trial.</p>

            {/* Toggle */}
            <div style={{ display: "flex", justifyContent: "center", gap: 4, background: "var(--dark-card)", border: "1px solid var(--dark-border)", borderRadius: 12, padding: 4, width: "fit-content", margin: "0 auto" }}>
              {["Monthly", "Annual (save 42%)"].map((t, i) => (
                <button key={t} onClick={() => setAnnual(i === 1)} style={{
                  padding: "10px 28px", borderRadius: 10, fontSize: 14, fontWeight: 600, border: "none", cursor: "pointer",
                  fontFamily: "var(--font-dm-sans)", transition: "all 0.2s",
                  background: annual === (i === 1) ? "var(--orange)" : "transparent",
                  color: annual === (i === 1) ? "var(--white)" : "var(--grey)",
                }}>{t}</button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px 80px" }}>
          {/* Plan cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, maxWidth: 800, margin: "0 auto 64px" }} className="plans-grid">
            {/* Free */}
            <div style={{ background: "var(--dark-card)", border: "1px solid var(--dark-border)", borderRadius: 20, padding: 36, textAlign: "left" }}>
              <div style={{ fontFamily: "var(--font-outfit)", fontSize: 24, fontWeight: 700, marginBottom: 4 }}>Free</div>
              <div style={{ fontFamily: "var(--font-outfit)", fontSize: 48, fontWeight: 900, color: "var(--orange)", lineHeight: 1 }}>$0</div>
              <div style={{ fontSize: 13, color: "var(--grey)", marginTop: 4, marginBottom: 24 }}>Forever free</div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
                {free.map(f => (
                  <li key={f} style={{ fontSize: 14, color: "var(--grey-light)", display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span style={{ color: "var(--green-light)", fontWeight: 700, flexShrink: 0 }}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <Link href="/#waitlist" style={{ display: "block", textAlign: "center", padding: "14px", borderRadius: 10, background: "transparent", border: "1px solid var(--dark-border)", color: "var(--white)", fontSize: 15, fontWeight: 600, textDecoration: "none", fontFamily: "var(--font-dm-sans)", transition: "all 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--orange)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--dark-border)")}>
                Join Free
              </Link>
            </div>

            {/* Locked In */}
            <div style={{ background: "var(--dark-card)", border: "1px solid var(--orange)", borderRadius: 20, padding: 36, position: "relative", textAlign: "left", boxShadow: "0 0 40px rgba(232,77,26,0.15)" }}>
              <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "var(--orange)", color: "var(--white)", fontSize: 11, fontWeight: 700, letterSpacing: 1.5, padding: "4px 16px", borderRadius: 100, whiteSpace: "nowrap" }}>MOST POPULAR</div>
              <div style={{ fontFamily: "var(--font-outfit)", fontSize: 24, fontWeight: 700, marginBottom: 4 }}>Locked In</div>
              <div style={{ fontFamily: "var(--font-outfit)", fontSize: 48, fontWeight: 900, color: "var(--orange)", lineHeight: 1 }}>
                {annual ? "$48.90" : "$6.99"}
                <span style={{ fontSize: 16, fontWeight: 500, color: "var(--grey)" }}>{annual ? "/yr" : "/mo"}</span>
              </div>
              <div style={{ fontSize: 14, color: "var(--white)", fontWeight: 800, marginTop: 6, letterSpacing: 0.3 }}>1 month free trial</div>
              <div style={{ fontSize: 12, color: "var(--grey)", marginTop: 2, marginBottom: 24 }}>Cancel anytime</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--white)", letterSpacing: 0.3, marginBottom: 12 }}>Everything in Free, plus…</div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
                {pro.map(f => (
                  <li key={f} style={{ fontSize: 14, color: "var(--grey-light)", display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span style={{ color: "var(--green-light)", fontWeight: 700, flexShrink: 0 }}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <Link href="/#waitlist" style={{ display: "block", textAlign: "center", padding: "14px", borderRadius: 10, background: "var(--orange)", border: "none", color: "var(--white)", fontSize: 15, fontWeight: 700, textDecoration: "none", fontFamily: "var(--font-dm-sans)" }}>
                Start Free Trial
              </Link>
            </div>
          </div>

          {/* Comparison table */}
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <h2 style={{ fontFamily: "var(--font-outfit)", fontSize: 24, fontWeight: 700, marginBottom: 24, textAlign: "center" }}>Full comparison</h2>
            {/* Header */}
            <div className="comp-table-row" style={{ display: "grid", gridTemplateColumns: "1fr 120px 120px", gap: 16, padding: "12px 20px", borderBottom: "1px solid var(--dark-border)" }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "var(--grey)" }}>Feature</span>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "var(--grey)", textAlign: "center" }}>Free</span>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "var(--orange)", textAlign: "center" }}>Locked In</span>
            </div>
            {comparison.map((row, i) => (
              <div key={row.feature} className="comp-table-row" style={{ display: "grid", gridTemplateColumns: "1fr 120px 120px", gap: 16, padding: "14px 20px", borderRadius: 8, background: i % 2 === 0 ? "var(--dark-surface)" : "transparent", alignItems: "center" }}>
                <span style={{ fontSize: 14, color: "var(--grey-light)" }}>{row.feature}</span>
                <span style={{ textAlign: "center" }}>{renderVal(row.free)}</span>
                <span style={{ textAlign: "center" }}>{renderVal(row.locked)}</span>
              </div>
            ))}
          </div>

          {/* FAQ snippet */}
          <div className="plans-cta-card" style={{ maxWidth: 800, margin: "64px auto 0", background: "var(--dark-card)", border: "1px solid var(--dark-border)", borderRadius: 20, padding: "40px 48px", textAlign: "center" }}>
            <h3 style={{ fontFamily: "var(--font-outfit)", fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Still have questions?</h3>
            <p style={{ color: "var(--grey-light)", fontSize: 15, marginBottom: 24 }}>Check the FAQ or reach out to the team directly.</p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/#faq" style={{ color: "var(--orange)", fontWeight: 700, fontSize: 14, textDecoration: "none", padding: "10px 24px", border: "1px solid rgba(232,77,26,0.4)", borderRadius: 8, fontFamily: "var(--font-dm-sans)" }}>Read the FAQ</Link>
              <Link href="/#contact" style={{ color: "var(--white)", fontWeight: 700, fontSize: 14, textDecoration: "none", padding: "10px 24px", background: "var(--orange)", borderRadius: 8, fontFamily: "var(--font-dm-sans)" }}>Contact Us</Link>
            </div>
          </div>
        </div>
      </main>

      <style>{`
        @media (max-width: 768px) {
          .plans-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
