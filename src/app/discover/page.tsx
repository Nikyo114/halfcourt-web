"use client";
import { useState } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";

const courts: { name: string; address: string; distance: string; type: string; typeLabel: string; slots: string[]; booked: string[]; special?: string }[] = [
  {
    name: "Red Energy Arena",
    address: "Gaol Road, Bendigo VIC 3550",
    distance: "0.8 km",
    type: "private",
    typeLabel: "Private · Indoor",
    slots: ["9:00", "10:00", "11:00", "12:00", "14:00", "16:00", "17:00", "18:00", "19:00"],
    booked: ["9:00", "10:00", "16:00"],
  },
  {
    name: "Tom Flood Sports Centre",
    address: "Park Road, Bendigo VIC 3550",
    distance: "1.2 km",
    type: "private",
    typeLabel: "Private · Indoor",
    slots: ["9:00", "10:00", "11:00", "12:00", "15:00", "16:00", "18:00", "19:00"],
    booked: ["11:00", "12:00", "18:00"],
  },
  {
    name: "Rosalind Park Courts",
    address: "Rosalind Park, Bendigo VIC 3550",
    distance: "2.1 km",
    type: "public",
    typeLabel: "Public · Outdoor",
    slots: [],
    booked: [],
    special: "3 queuing",
  },
  {
    name: "Kangaroo Flat YMCA",
    address: "Olympic Parade, Kangaroo Flat VIC 3555",
    distance: "4.7 km",
    type: "private",
    typeLabel: "Private · Indoor",
    slots: ["10:00", "11:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"],
    booked: ["18:00", "19:00"],
  },
];

export default function DiscoverPage() {
  const [courtType, setCourtType] = useState("All courts");
  const [sortBy, setSortBy] = useState("Sort by: Distance");

  const filtered = courts.filter((c) => {
    if (courtType === "Indoor") return c.typeLabel.includes("Indoor");
    if (courtType === "Outdoor") return c.typeLabel.includes("Outdoor");
    if (courtType === "Private") return c.type === "private";
    if (courtType === "Public") return c.type === "public";
    return true;
  });

  return (
    <>
      <Nav />
      <main style={{ paddingTop: 80, minHeight: "100vh" }}>
        {/* Header */}
        <div style={{ background: "var(--dark-surface)", borderBottom: "1px solid var(--dark-border)", padding: "48px 0 32px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "var(--orange)", marginBottom: 12, fontFamily: "var(--font-outfit)" }}>Discover</div>
            <h1 style={{ fontFamily: "var(--font-outfit)", fontSize: "clamp(32px,5vw,56px)", fontWeight: 900, lineHeight: 1.05, marginBottom: 8 }}>Find a court.<br />Book a slot.</h1>
            <p style={{ fontSize: 16, color: "var(--grey-light)", marginBottom: 32, maxWidth: 600 }}>Browse available courts near you, check open time slots, and lock in your next game.</p>

            {/* Filters */}
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <input type="text" defaultValue="Bendigo, VIC" style={{ padding: "12px 16px", background: "var(--dark-card)", border: "1px solid var(--dark-border)", borderRadius: 10, color: "var(--white)", fontSize: 14, fontFamily: "var(--font-dm-sans)", outline: "none", minWidth: 160 }}
                onFocus={(e) => (e.target.style.borderColor = "var(--orange)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--dark-border)")} />
              <input type="date" style={{ padding: "12px 16px", background: "var(--dark-card)", border: "1px solid var(--dark-border)", borderRadius: 10, color: "var(--white)", fontSize: 14, fontFamily: "var(--font-dm-sans)", outline: "none", colorScheme: "dark" }}
                onFocus={(e) => (e.target.style.borderColor = "var(--orange)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--dark-border)")} />
              <select value={courtType} onChange={(e) => setCourtType(e.target.value)} style={{ padding: "12px 16px", background: "var(--dark-card)", border: "1px solid var(--dark-border)", borderRadius: 10, color: "var(--white)", fontSize: 14, fontFamily: "var(--font-dm-sans)", outline: "none", cursor: "pointer" }}>
                {["All courts", "Indoor", "Outdoor", "Private", "Public"].map(o => <option key={o}>{o}</option>)}
              </select>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ padding: "12px 16px", background: "var(--dark-card)", border: "1px solid var(--dark-border)", borderRadius: 10, color: "var(--white)", fontSize: 14, fontFamily: "var(--font-dm-sans)", outline: "none", cursor: "pointer" }}>
                {["Sort by: Distance", "Sort by: Price", "Sort by: Availability", "Sort by: Rating"].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Layout: map + court list */}
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px 80px", display: "grid", gridTemplateColumns: "1fr 380px", gap: 24 }} className="discover-layout">

          {/* Map placeholder */}
          <div style={{ background: "var(--dark-surface)", border: "1px solid var(--dark-border)", borderRadius: 16, minHeight: 520, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(232,77,26,0.03), rgba(232,77,26,0.01))" }} />

            {/* Fake map grid */}
            <div style={{ position: "absolute", inset: 0, opacity: 0.04 }}>
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} style={{ position: "absolute", top: 0, bottom: 0, left: `${i * 10}%`, width: 1, background: "var(--white)" }} />
              ))}
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} style={{ position: "absolute", left: 0, right: 0, top: `${i * 12.5}%`, height: 1, background: "var(--white)" }} />
              ))}
            </div>

            {/* Fake pins */}
            {[{ top: "35%", left: "45%", label: "REA" }, { top: "52%", left: "38%", label: "TFS" }, { top: "28%", left: "60%", label: "RPK" }, { top: "65%", left: "30%", label: "KFY" }].map((pin) => (
              <div key={pin.label} style={{ position: "absolute", top: pin.top, left: pin.left, transform: "translate(-50%,-100%)", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ background: "var(--orange)", color: "var(--white)", fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 6, whiteSpace: "nowrap", boxShadow: "0 2px 8px rgba(0,0,0,0.4)" }}>{pin.label}</div>
                <div style={{ width: 2, height: 8, background: "var(--orange)" }} />
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--orange)" }} />
              </div>
            ))}

            <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🗺️</div>
              <h3 style={{ fontFamily: "var(--font-outfit)", fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Interactive Map</h3>
              <p style={{ color: "var(--grey)", fontSize: 14, maxWidth: 240 }}>Full map integration launches with the app. Courts will show real-time availability.</p>
            </div>
          </div>

          {/* Court list */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {filtered.length === 0 && (
              <div style={{ textAlign: "center", padding: 40, color: "var(--grey)" }}>No courts match this filter.</div>
            )}
            {filtered.map((court) => (
              <div key={court.name} style={{ background: "var(--dark-card)", border: "1px solid var(--dark-border)", borderRadius: 14, padding: 20, transition: "all 0.3s", cursor: "default" }}
                onMouseEnter={(e) => { const el = e.currentTarget; el.style.borderColor = "rgba(232,77,26,0.3)"; el.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { const el = e.currentTarget; el.style.borderColor = "var(--dark-border)"; el.style.transform = "translateY(0)"; }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <h4 style={{ fontFamily: "var(--font-outfit)", fontSize: 16, fontWeight: 700 }}>{court.name}</h4>
                  <span style={{ fontSize: 12, color: "var(--orange)", fontWeight: 600, whiteSpace: "nowrap", marginLeft: 8 }}>{court.distance}</span>
                </div>
                <p style={{ fontSize: 13, color: "var(--grey)", marginBottom: 10 }}>{court.address}</p>
                <span style={{
                  display: "inline-block", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 100, letterSpacing: 0.5, marginBottom: 12,
                  background: court.type === "private" ? "rgba(232,77,26,0.1)" : "rgba(46,125,50,0.1)",
                  color: court.type === "private" ? "var(--orange)" : "var(--green-light)",
                }}>
                  {court.typeLabel}
                </span>

                {court.special ? (
                  <div style={{ display: "flex", gap: 8 }}>
                    <span style={{ padding: "6px 12px", background: "var(--dark-surface)", border: "1px solid var(--dark-border)", borderRadius: 8, fontSize: 12, fontWeight: 600, color: "var(--grey-light)" }}>Open</span>
                    <span style={{ padding: "6px 12px", background: "rgba(232,77,26,0.1)", border: "1px solid var(--orange)", borderRadius: 8, fontSize: 12, fontWeight: 600, color: "var(--orange)" }}>{court.special}</span>
                  </div>
                ) : (
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {court.slots.map((slot) => {
                      const isBooked = court.booked.includes(slot);
                      return (
                        <span key={slot} style={{
                          padding: "5px 10px", borderRadius: 8, fontSize: 12, fontWeight: 600,
                          background: isBooked ? "transparent" : "var(--dark-surface)",
                          border: `1px solid ${isBooked ? "var(--dark-border)" : "var(--dark-border)"}`,
                          color: isBooked ? "var(--grey-dark)" : "var(--grey-light)",
                          textDecoration: isBooked ? "line-through" : "none",
                          opacity: isBooked ? 0.4 : 1,
                          cursor: isBooked ? "not-allowed" : "pointer",
                          transition: "all 0.15s",
                        }}
                          onMouseEnter={(e) => { if (!isBooked) { const el = e.currentTarget; el.style.borderColor = "var(--orange)"; el.style.color = "var(--orange)"; } }}
                          onMouseLeave={(e) => { if (!isBooked) { const el = e.currentTarget; el.style.borderColor = "var(--dark-border)"; el.style.color = "var(--grey-light)"; } }}>
                          {slot}
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}

            <div style={{ background: "var(--dark-surface)", border: "1px solid var(--dark-border)", borderRadius: 14, padding: 20, textAlign: "center" }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>🏟️</div>
              <p style={{ fontSize: 13, color: "var(--grey)", marginBottom: 12 }}>Own a court? List it on Halfcourt and reach hundreds of local players.</p>
              <Link href="/#contact" style={{ color: "var(--orange)", fontWeight: 700, fontSize: 13, textDecoration: "none", fontFamily: "var(--font-dm-sans)" }}>Become a venue partner →</Link>
            </div>
          </div>
        </div>
      </main>

      <style>{`
        @media (max-width: 968px) {
          .discover-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
