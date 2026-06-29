import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import type { LegalBlock } from "@/app/privacy/content";

/* Renders a legal document (verbatim blocks) in the Halfcourt theme,
   grouping consecutive list items into <ul> and offering a PDF download. */
export default function LegalPage({
  title,
  updated,
  intro,
  blocks,
  pdfHref,
  pdfLabel,
}: {
  title: string;
  updated: string;
  intro?: string;
  blocks: LegalBlock[];
  pdfHref: string;
  pdfLabel: string;
}) {
  // Group adjacent list items so they render inside a single <ul>.
  const groups: Array<{ type: "h" | "p"; text: string } | { type: "ul"; items: string[] }> = [];
  for (const b of blocks) {
    const last = groups[groups.length - 1];
    if (b.type === "li") {
      if (last && last.type === "ul") last.items.push(b.text);
      else groups.push({ type: "ul", items: [b.text] });
    } else {
      groups.push({ type: b.type, text: b.text });
    }
  }

  return (
    <>
      <Nav />
      <main style={{ paddingTop: 80 }}>
        {/* Header band */}
        <div style={{ background: "var(--dark-surface)", borderBottom: "1px solid var(--dark-border)", padding: "48px 0 36px" }}>
          <div style={{ maxWidth: 820, margin: "0 auto", padding: "0 24px" }}>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "var(--orange)", marginBottom: 12, fontFamily: "var(--font-outfit)" }}>Legal</div>
            <h1 style={{ fontFamily: "var(--font-outfit)", fontSize: "clamp(30px,5vw,48px)", fontWeight: 900, lineHeight: 1.08, marginBottom: 16 }}>{title}</h1>
            <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              <span style={{ fontSize: 14, color: "var(--grey)", fontFamily: "var(--font-dm-sans)" }}>{updated}</span>
              <a
                href={pdfHref}
                download
                style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(232,77,26,0.1)", border: "1px solid rgba(232,77,26,0.3)", color: "var(--orange)", padding: "8px 16px", borderRadius: 10, fontSize: 13, fontWeight: 700, textDecoration: "none", fontFamily: "var(--font-dm-sans)" }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                {pdfLabel}
              </a>
            </div>
          </div>
        </div>

        {/* Document body */}
        <article className="legal-body" style={{ maxWidth: 820, margin: "0 auto", padding: "48px 24px 96px" }}>
          {intro && (
            <p style={{ fontSize: 16, color: "var(--grey-light)", lineHeight: 1.7, marginBottom: 32, paddingBottom: 32, borderBottom: "1px solid var(--dark-border)" }}>
              {intro}
            </p>
          )}
          {groups.map((g, i) => {
            if (g.type === "h") {
              return (
                <h2 key={i} style={{ fontFamily: "var(--font-outfit)", fontSize: "clamp(20px,3vw,26px)", fontWeight: 700, color: "var(--white)", lineHeight: 1.25, marginTop: i === 0 ? 0 : 40, marginBottom: 14 }}>
                  {g.text}
                </h2>
              );
            }
            if (g.type === "ul") {
              return (
                <ul key={i} style={{ listStyle: "none", margin: "0 0 18px", padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                  {g.items.map((it, j) => (
                    <li key={j} style={{ position: "relative", paddingLeft: 24, fontSize: 15.5, color: "var(--grey-light)", lineHeight: 1.7, fontFamily: "var(--font-dm-sans)" }}>
                      <span aria-hidden="true" style={{ position: "absolute", left: 4, top: 11, width: 6, height: 6, borderRadius: "50%", background: "var(--orange)" }} />
                      {it}
                    </li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={i} style={{ fontSize: 15.5, color: "var(--grey-light)", lineHeight: 1.75, margin: "0 0 18px", fontFamily: "var(--font-dm-sans)" }}>
                {g.text}
              </p>
            );
          })}
        </article>
      </main>
      <Footer />
    </>
  );
}
