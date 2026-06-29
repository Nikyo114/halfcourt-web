"use client";
import { useState } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";

type Tab = "local" | "state" | "national" | "global";

const tabs: { id: Tab; label: string }[] = [
  { id: "local", label: "Bendigo" },
  { id: "state", label: "Victoria" },
  { id: "national", label: "Australia" },
  { id: "global", label: "Global" },
];

const rankBadge = (rank: string) => {
  const styles: Record<string, { bg: string; color: string }> = {
    RANKER: { bg: "rgba(255,255,255,0.1)", color: "#FFFFFF" },
    MYTHIC: { bg: "rgba(255,69,0,0.15)", color: "#FF4500" },
    PRESTIGE: { bg: "rgba(232,77,26,0.15)", color: "#E84D1A" },
    DIAMOND: { bg: "rgba(185,242,255,0.15)", color: "#B9F2FF" },
    PLATINUM: { bg: "rgba(0,206,209,0.15)", color: "#00CED1" },
    GOLD: { bg: "rgba(255,215,0,0.15)", color: "#FFD700" },
    SILVER: { bg: "rgba(192,192,192,0.15)", color: "#C0C0C0" },
    BRONZE: { bg: "rgba(205,127,50,0.15)", color: "#CD7F32" },
  };
  const s = styles[rank] ?? styles.BRONZE;
  return (
    <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 4, letterSpacing: 0.5, background: s.bg, color: s.color, whiteSpace: "nowrap" }}>
      {rank}
    </span>
  );
};

const avatarGrad: Record<string, string> = {
  RANKER: "linear-gradient(135deg,#FFFFFF,#AAAAAA)",
  MYTHIC: "linear-gradient(135deg,#FF4500,#8B0000)",
  PRESTIGE: "linear-gradient(135deg,#E84D1A,#B83000)",
  DIAMOND: "linear-gradient(135deg,#B9F2FF,#4FC3F7)",
  PLATINUM: "linear-gradient(135deg,#00CED1,#008B8B)",
  GOLD: "linear-gradient(135deg,#FFD700,#B8860B)",
  SILVER: "linear-gradient(135deg,#C0C0C0,#808080)",
  BRONZE: "linear-gradient(135deg,#CD7F32,#8B5E3C)",
};

const data: Record<Tab, { initials: string; name: string; location: string; rank: string; elo: number; trust: string; winrate: string }[]> = {
  local: [
    { initials: "JM", name: "Jake Mitchell", location: "Bendigo", rank: "MYTHIC", elo: 934, trust: "4.97", winrate: "78%" },
    { initials: "SR", name: "Sam Reynolds", location: "Bendigo", rank: "PRESTIGE", elo: 812, trust: "4.89", winrate: "71%" },
    { initials: "TW", name: "Tara Williams", location: "Bendigo", rank: "PRESTIGE", elo: 789, trust: "4.95", winrate: "69%" },
    { initials: "DC", name: "Dennis Chen", location: "Eaglehawk", rank: "DIAMOND", elo: 688, trust: "4.82", winrate: "64%" },
    { initials: "KP", name: "Kai Patel", location: "Strathdale", rank: "DIAMOND", elo: 671, trust: "4.91", winrate: "62%" },
    { initials: "LB", name: "Liam Brown", location: "Bendigo", rank: "PLATINUM", elo: 587, trust: "4.76", winrate: "58%" },
    { initials: "MK", name: "Mia Kowalski", location: "Bendigo", rank: "PLATINUM", elo: 563, trust: "4.98", winrate: "57%" },
    { initials: "AJ", name: "Alex Johnson", location: "Kangaroo Flat", rank: "GOLD", elo: 487, trust: "4.85", winrate: "54%" },
    { initials: "RN", name: "Ruby Nguyen", location: "Flora Hill", rank: "GOLD", elo: 462, trust: "4.93", winrate: "52%" },
    { initials: "TS", name: "Tyler Scott", location: "Bendigo", rank: "SILVER", elo: 378, trust: "4.71", winrate: "48%" },
  ],
  state: [
    { initials: "CM", name: "Chris Maloney", location: "Melbourne", rank: "MYTHIC", elo: 967, trust: "4.94", winrate: "81%" },
    { initials: "JM", name: "Jake Mitchell", location: "Bendigo", rank: "MYTHIC", elo: 934, trust: "4.97", winrate: "78%" },
    { initials: "AK", name: "Aisha Khan", location: "Richmond", rank: "PRESTIGE", elo: 841, trust: "4.99", winrate: "74%" },
    { initials: "BT", name: "Beau Thompson", location: "Geelong", rank: "PRESTIGE", elo: 823, trust: "4.88", winrate: "72%" },
    { initials: "SR", name: "Sam Reynolds", location: "Bendigo", rank: "PRESTIGE", elo: 812, trust: "4.89", winrate: "71%" },
    { initials: "NL", name: "Nina Lam", location: "Brunswick", rank: "PRESTIGE", elo: 797, trust: "4.96", winrate: "70%" },
    { initials: "TW", name: "Tara Williams", location: "Bendigo", rank: "PRESTIGE", elo: 789, trust: "4.95", winrate: "69%" },
    { initials: "RO", name: "Remy Okafor", location: "Fitzroy", rank: "DIAMOND", elo: 712, trust: "4.83", winrate: "65%" },
    { initials: "DC", name: "Dennis Chen", location: "Eaglehawk", rank: "DIAMOND", elo: 688, trust: "4.82", winrate: "64%" },
    { initials: "KP", name: "Kai Patel", location: "Strathdale", rank: "DIAMOND", elo: 671, trust: "4.91", winrate: "62%" },
  ],
  national: [
    { initials: "DW", name: "Dylan Walsh", location: "Sydney", rank: "MYTHIC", elo: 998, trust: "4.92", winrate: "84%" },
    { initials: "CM", name: "Chris Maloney", location: "Melbourne", rank: "MYTHIC", elo: 967, trust: "4.94", winrate: "81%" },
    { initials: "PP", name: "Priya Pillai", location: "Brisbane", rank: "MYTHIC", elo: 951, trust: "4.99", winrate: "80%" },
    { initials: "JM", name: "Jake Mitchell", location: "Bendigo", rank: "MYTHIC", elo: 934, trust: "4.97", winrate: "78%" },
    { initials: "TG", name: "Tom Griffiths", location: "Perth", rank: "MYTHIC", elo: 921, trust: "4.91", winrate: "77%" },
    { initials: "SH", name: "Sofia Hassan", location: "Adelaide", rank: "PRESTIGE", elo: 876, trust: "4.97", winrate: "75%" },
    { initials: "AK", name: "Aisha Khan", location: "Richmond", rank: "PRESTIGE", elo: 841, trust: "4.99", winrate: "74%" },
    { initials: "BT", name: "Beau Thompson", location: "Geelong", rank: "PRESTIGE", elo: 823, trust: "4.88", winrate: "72%" },
    { initials: "SR", name: "Sam Reynolds", location: "Bendigo", rank: "PRESTIGE", elo: 812, trust: "4.89", winrate: "71%" },
    { initials: "NL", name: "Nina Lam", location: "Brunswick", rank: "PRESTIGE", elo: 797, trust: "4.96", winrate: "70%" },
  ],
  global: [
    { initials: "MJ", name: "Marcus Jones", location: "New York, USA", rank: "MYTHIC", elo: 1043, trust: "4.91", winrate: "87%" },
    { initials: "LF", name: "Lucas Ferreira", location: "São Paulo, BR", rank: "MYTHIC", elo: 1021, trust: "4.95", winrate: "85%" },
    { initials: "YT", name: "Yuki Tanaka", location: "Tokyo, JP", rank: "MYTHIC", elo: 1009, trust: "4.98", winrate: "84%" },
    { initials: "DW", name: "Dylan Walsh", location: "Sydney, AU", rank: "MYTHIC", elo: 998, trust: "4.92", winrate: "84%" },
    { initials: "OA", name: "Oluwaseun Adeyemi", location: "Lagos, NG", rank: "MYTHIC", elo: 987, trust: "4.94", winrate: "83%" },
    { initials: "CM", name: "Chris Maloney", location: "Melbourne, AU", rank: "MYTHIC", elo: 967, trust: "4.94", winrate: "81%" },
    { initials: "PP", name: "Priya Pillai", location: "Brisbane, AU", rank: "MYTHIC", elo: 951, trust: "4.99", winrate: "80%" },
    { initials: "JM", name: "Jake Mitchell", location: "Bendigo, AU", rank: "MYTHIC", elo: 934, trust: "4.97", winrate: "78%" },
    { initials: "TG", name: "Tom Griffiths", location: "Perth, AU", rank: "MYTHIC", elo: 921, trust: "4.91", winrate: "77%" },
    { initials: "SH", name: "Sofia Hassan", location: "Adelaide, AU", rank: "PRESTIGE", elo: 876, trust: "4.97", winrate: "75%" },
  ],
};

const rankColors = ["gold", "silver", "bronze"] as const;
type RankColor = typeof rankColors[number];
const rankColorMap: Record<RankColor, string> = { gold: "#FFD700", silver: "#C0C0C0", bronze: "#CD7F32" };

export default function LeaderboardsPage() {
  const [tab, setTab] = useState<Tab>("local");
  const players = data[tab];

  return (
    <>
      <Nav />
      <main style={{ paddingTop: 80, minHeight: "100vh" }}>
        <div style={{ background: "var(--dark-surface)", borderBottom: "1px solid var(--dark-border)", padding: "36px 0 0" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2.5, textTransform: "uppercase", color: "var(--orange)", marginBottom: 10, fontFamily: "var(--font-outfit)" }}>Leaderboards</div>
            <h1 style={{ fontFamily: "var(--font-outfit)", fontSize: "clamp(28px,4.5vw,48px)", fontWeight: 800, lineHeight: 1.05, marginBottom: 6 }}>Who&apos;s on top?</h1>
            <p style={{ fontSize: 15, color: "var(--grey-light)", marginBottom: 24 }}>Live rankings from the app. Refreshed after every confirmed result.</p>

            {/* Tabs */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {tabs.map((t) => (
                <button key={t.id} onClick={() => setTab(t.id)} style={{
                  padding: "9px 18px", borderRadius: "4px 4px 0 0", fontSize: 13, fontWeight: 600,
                  border: `1px solid ${tab === t.id ? "var(--dark-border)" : "transparent"}`,
                  borderBottom: tab === t.id ? "1px solid var(--dark-surface)" : "1px solid transparent",
                  background: tab === t.id ? "var(--dark-surface)" : "transparent",
                  color: tab === t.id ? "var(--white)" : "var(--grey)",
                  cursor: "pointer", fontFamily: "var(--font-dm-sans)", transition: "all 0.2s", marginBottom: -1,
                }}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "28px 24px 72px" }}>
          {/* Header row */}
          <div style={{ display: "grid", gridTemplateColumns: "52px 1fr 120px 100px 80px", gap: 16, padding: "10px 16px", borderBottom: "1px solid var(--dark-border)", marginBottom: 4 }} className="lb-row-grid">
            {["#", "Player", "BPI", "Trust", "Win %"].map((h) => (
              <span key={h} style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "var(--grey)" }}>{h}</span>
            ))}
          </div>

          {players.map((p, i) => {
            const pos = i + 1;
            const colorKey = pos <= 3 ? rankColors[i] : null;
            const rankColor = colorKey ? rankColorMap[colorKey] : "var(--grey-light)";
            return (
              <div key={p.name} style={{ display: "grid", gridTemplateColumns: "52px 1fr 120px 100px 80px", gap: 16, alignItems: "center", padding: "12px 16px", borderRadius: 4, borderBottom: "1px solid var(--dark-border)", transition: "background 0.2s", cursor: "default" }}
                className="lb-row"
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--dark-surface)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                <span style={{ fontFamily: "var(--font-outfit)", fontSize: 18, fontWeight: 800, textAlign: "center", color: rankColor }}>{pos}</span>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: avatarGrad[p.rank] ?? avatarGrad.BRONZE, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, flexShrink: 0 }}>{p.initials}</div>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                      <span style={{ fontWeight: 600, fontSize: 15 }}>{p.name}</span>
                      {rankBadge(p.rank)}
                    </div>
                    <div style={{ fontSize: 12, color: "var(--grey)" }}>{p.location}</div>
                  </div>
                </div>
                <span style={{ fontFamily: "var(--font-outfit)", fontSize: 16, fontWeight: 700 }}>{p.elo}</span>
                <span style={{ fontSize: 13, color: "var(--grey-light)", fontVariantNumeric: "tabular-nums" }}>{p.trust}</span>
                <span style={{ fontSize: 13, color: "var(--grey-light)", fontVariantNumeric: "tabular-nums" }} className="lb-winrate">{p.winrate}</span>
              </div>
            );
          })}

          <div style={{ textAlign: "center", marginTop: 40, padding: 28, background: "var(--dark-card)", border: "1px solid var(--dark-border)", borderRadius: 8 }}>
            <p style={{ color: "var(--grey)", fontSize: 14, marginBottom: 16 }}>Leaderboard data syncs live from the Halfcourt app after launch.</p>
            <Link href="/#waitlist" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--orange)", color: "var(--white)", padding: "11px 24px", borderRadius: 6, fontWeight: 700, fontSize: 14, textDecoration: "none", fontFamily: "var(--font-dm-sans)" }}>
              Sign up to get ranked →
            </Link>
          </div>
        </div>
      </main>

      <style>{`
        @media (max-width: 768px) {
          .lb-row-grid { grid-template-columns: 40px 1fr 80px 60px !important; }
          .lb-row { grid-template-columns: 40px 1fr 80px 60px !important; }
          .lb-winrate { display: none !important; }
        }
      `}</style>
    </>
  );
}
