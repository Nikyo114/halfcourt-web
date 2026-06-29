"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Discover", href: "/discover" },
  { label: "Leaderboards", href: "/leaderboards" },
  { label: "Features", href: "/features" },
  { label: "Upgrade", href: "/plans" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change (intentional sync with navigation)
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: "16px 0",
        background: scrolled ? "rgba(10,10,10,0.97)" : "rgba(10,10,10,0.85)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        transition: "background 0.3s",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <Link href="/" aria-label="Halfcourt home" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <Image
            src="/brand/logo-on-black.svg"
            alt="Halfcourt"
            width={918}
            height={220}
            unoptimized
            style={{ height: 28, width: "auto", display: "block" }}
          />
        </Link>

        {/* Right side: desktop links + mobile hamburger */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {/* Desktop links */}
          <ul className="nav-links" style={{ display: "flex", alignItems: "center", gap: 28, listStyle: "none" }}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  style={{
                    color: pathname === link.href ? "var(--orange)" : "var(--grey-light)",
                    textDecoration: "none",
                    fontSize: 14,
                    fontWeight: 500,
                    transition: "color 0.2s",
                    fontFamily: "var(--font-dm-sans)",
                  }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--white)")}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = pathname === link.href ? "var(--orange)" : "var(--grey-light)")}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/#waitlist"
                style={{
                  background: "var(--orange)",
                  color: "var(--white)",
                  padding: "10px 24px",
                  borderRadius: 8,
                  fontWeight: 600,
                  fontSize: 14,
                  textDecoration: "none",
                  fontFamily: "var(--font-dm-sans)",
                  display: "inline-block",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "var(--orange-light)";
                  el.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "var(--orange)";
                  el.style.transform = "translateY(0)";
                }}
              >
                Join Waitlist
              </Link>
            </li>
          </ul>

          {/* Mobile toggle */}
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: 8, flexDirection: "column", gap: 6 }}
          >
            {[0, 1, 2].map((i) => (
              <span key={i} style={{ display: "block", width: 24, height: 2, background: "var(--white)", transition: "all 0.3s" }} />
            ))}
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: "rgba(10,10,10,0.98)", padding: "24px", display: "flex", flexDirection: "column", gap: 20, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                color: pathname === link.href ? "var(--orange)" : "var(--grey-light)",
                textDecoration: "none",
                fontSize: 16,
                fontWeight: 500,
                fontFamily: "var(--font-dm-sans)",
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#waitlist"
            style={{ background: "var(--orange)", color: "var(--white)", padding: "14px", borderRadius: 10, fontWeight: 700, fontSize: 15, textDecoration: "none", textAlign: "center" }}
          >
            Join Waitlist
          </Link>
        </div>
      )}
    </nav>
  );
}
