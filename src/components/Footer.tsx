import Link from "next/link";

/* ─── Shared logo mark ─── */
function Logo() {
  return (
    <svg width="32" height="32" viewBox="108 108 460 460" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M567.898 331.595L567.304 309.742H424.881C432.634 283.708 451.205 257.733 480.26 232.351C485.847 227.467 505.186 212.73 512.164 207.455L523.373 198.992L483.289 158.264L474.659 164.843C473.688 165.582 450.726 183.102 443.082 189.782C400.259 227.192 374.646 267.493 366.791 309.735H366.255V366.251H366.871C374.812 408.334 400.404 448.497 443.075 485.776C450.784 492.515 473.942 510.158 474.927 510.904L483.572 517.491L523.59 476.712L512.388 468.263C505.367 462.967 485.912 448.149 480.268 443.222C451.371 417.978 432.844 392.147 425.018 366.251H567.319L567.913 344.398C567.971 342.101 568.007 340 568.007 337.993C568.007 335.986 567.978 333.892 567.913 331.588L567.898 331.595Z" fill="#EB4310" />
      <path d="M309.745 366.258V309.742H309.209C301.362 267.499 275.74 227.199 232.918 189.789C225.273 183.109 202.311 165.596 201.34 164.85L192.711 158.271L152.62 198.991L163.829 207.454C170.807 212.722 190.138 227.46 195.732 232.35C224.788 257.732 243.359 283.708 251.112 309.742H108.696L108.094 331.587C108.029 333.87 108 335.971 108 338C108 340.029 108.029 342.13 108.094 344.42L108.696 366.258H250.982C243.149 392.154 224.621 417.985 195.725 443.229C190.08 448.156 170.626 462.981 163.604 468.277L152.402 476.726L192.428 517.505L201.072 510.926C202.051 510.179 225.208 492.529 232.918 485.798C275.588 448.518 301.18 408.356 309.122 366.265H309.738L309.745 366.258Z" fill="#EB4310" />
      <path d="M337.997 568C340.004 568 342.098 567.971 344.402 567.906L366.255 567.311V108.703L344.424 108.094C339.917 107.963 336.076 107.963 331.577 108.094L309.745 108.703V567.311L331.598 567.906C333.895 567.963 335.997 568 338.004 568H337.997Z" fill="#EB4310" />
    </svg>
  );
}

export default function Footer() {
  const columns = [
    { h: "Product", links: [["Features", "/features"], ["Leaderboards", "/leaderboards"], ["Discover", "/discover"], ["Plans", "/plans"]] },
    { h: "Company", links: [["Contact", "/#contact"], ["Venue Partners", "/#contact"], ["Press", "/#contact"]] },
    { h: "Legal", links: [["Privacy Policy", "/privacy"], ["Terms of Service", "/terms"]] },
  ] as const;

  return (
    <footer style={{ background: "var(--dark-surface)", borderTop: "1px solid var(--dark-border)", padding: "48px 0 32px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 40 }} className="footer-grid">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <Logo />
              <span style={{ fontFamily: "var(--font-outfit)", fontWeight: 700, fontSize: 20, color: "var(--white)" }}>halfcourt</span>
            </div>
            <p style={{ fontSize: 14, color: "var(--grey)", lineHeight: 1.6, maxWidth: 300 }}>Built by players, for players. Halfcourt brings structure, trust, and competitive balance to grassroots basketball.</p>
          </div>
          {columns.map((col) => (
            <div key={col.h}>
              <h4 style={{ fontFamily: "var(--font-outfit)", fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--white)", marginBottom: 16 }}>{col.h}</h4>
              {col.links.map(([label, href]) => (
                <Link key={label} href={href} className="footer-link"
                  style={{ display: "block", color: "var(--grey)", fontSize: 14, marginBottom: 10, textDecoration: "none", fontFamily: "var(--font-dm-sans)" }}>{label}</Link>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid var(--dark-border)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <p style={{ fontSize: 13, color: "var(--grey-dark)" }}>© 2026 Halfcourt Global Pty Ltd. All rights reserved.</p>
          <p style={{ fontSize: 13, color: "var(--grey-dark)" }}>Melbourne, Victoria, Australia</p>
        </div>
      </div>
      <style>{`
        .footer-link:hover { color: var(--orange) !important; }
        @media(max-width:768px){.footer-grid{grid-template-columns:1fr 1fr!important}}
      `}</style>
    </footer>
  );
}
