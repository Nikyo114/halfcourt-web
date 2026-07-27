import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Tournaments — Halfcourt",
  description: "Ranked pickup basketball tournaments with real prizes. Details announced soon.",
};

export default function TournamentsPage() {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: 80, minHeight: "100vh" }}>
        {/* Header */}
        <div style={{ background: "var(--dark-surface)", borderBottom: "1px solid var(--dark-border)", padding: "48px 0 40px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "var(--orange)", marginBottom: 12, fontFamily: "var(--font-outfit)" }}>Tournaments</div>
            <h1 style={{ fontFamily: "var(--font-outfit)", fontSize: "clamp(32px,5vw,56px)", fontWeight: 900, lineHeight: 1.05, marginBottom: 8 }}>Play for something real.</h1>
            <p style={{ fontSize: 16, color: "var(--grey-light)", maxWidth: 600 }}>Ranked pickup tournaments at real venues, seeded by BPI, with real prizes.</p>
          </div>
        </div>

        {/* Coming soon card */}
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px 80px" }}>
          <div style={{ background: "linear-gradient(135deg,rgba(232,77,26,0.12),rgba(232,77,26,0.02))", border: "1px solid rgba(232,77,26,0.25)", borderRadius: 24, padding: "48px 32px", textAlign: "center" }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>🏆</div>
            <h2 style={{ fontFamily: "var(--font-outfit)", fontSize: "clamp(24px,4vw,36px)", fontWeight: 800, marginBottom: 12 }}>Major Tournament</h2>
            <p style={{ fontSize: 16, color: "var(--grey-light)", lineHeight: 1.7, maxWidth: 480, margin: "0 auto 28px" }}>
              Details announced soon. Dates, formats, prize pool and entry — everything drops here first. Join the waitlist to hear it before anyone else.
            </p>
            <Link href="/#waitlist" style={{ background: "var(--orange)", color: "var(--white)", padding: "14px 28px", borderRadius: 12, fontSize: 15, fontWeight: 700, textDecoration: "none", display: "inline-block", fontFamily: "var(--font-dm-sans)" }}>
              Join the Waitlist →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
