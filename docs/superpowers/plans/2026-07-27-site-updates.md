# Site Updates Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship six approved updates to the Halfcourt landing site: flash-free phone carousels, a tabbed Discover page (Games scaffold + Booking behind "Coming Soon"), a `/tournaments` scaffold page, new Plans offerings, new Waitlist copy, footer cleanup, and social-icon links.

**Architecture:** All changes are edits to existing App Router client pages/components plus one new server-component page (`/tournaments`) and one new shared icon component. The carousel fix keeps every slide mounted and cross-fades opacity, so images fetch once on mount and never load mid-rotation.

**Tech Stack:** Next.js 16.2.1 (App Router), React 19, TypeScript, inline styles + per-component `<style>` media queries (the site's existing idiom).

## Global Constraints

- **Never** render the string "Goldfields Cup" anywhere. The tournament is referred to only as "Major Tournament — details announced soon".
- All new/changed UI must be mobile friendly at ≤768px (and ≤480px for form-like rows), using per-component `<style>` media queries exactly like the existing code.
- Next 16 deprecated the `priority` prop on `next/image` — use `preload` (boolean) for the LCP image and `loading="eager"` for other must-load-now images. Never combine `preload` and `loading` on the same image (per `node_modules/next/dist/docs/01-app/03-api-reference/02-components/image.md`).
- No new dependencies. No CSS frameworks — inline styles + `<style>` tags only, matching existing files.
- The Booking tab's existing court/map content must be preserved intact (it returns after launch), only wrapped/disabled — not deleted.
- Verification per task = `npm run lint` and `npm run build` (repo has no test framework; do not add one). Final task does a browser walkthrough at desktop and 375px-wide mobile.
- Commit after each task with the trailer: `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`.

---

### Task 1: Flash-free hero carousel

**Files:**
- Modify: `src/app/page.tsx:70-80` (Hero state) and `src/app/page.tsx:195-204` (screen block)

**Interfaces:**
- Consumes: existing `flowStages` array (unchanged).
- Produces: nothing used by later tasks.

- [ ] **Step 1: Remove the remount-key state from `Hero`**

In `src/app/page.tsx`, replace:

```tsx
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
```

with:

```tsx
function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setActive((i) => (i + 1) % flowStages.length);
    }, 2200);
    return () => clearInterval(t);
  }, []);
```

- [ ] **Step 2: Stack all slides and cross-fade**

Still in `src/app/page.tsx`, replace:

```tsx
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
```

with:

```tsx
              {/* App screen (cycles launch → queue → play → win). Every slide
                  stays mounted and fetches up front; the active one fades in,
                  so no image ever loads mid-rotation. */}
              {flowStages.map((s, i) => (
                <div key={s.word} aria-hidden={active !== i} style={{ position: "absolute", inset: 0, top: 36, opacity: active === i ? 1 : 0, transition: "opacity 0.45s ease" }}>
                  {i === 0 ? (
                    <Image src={s.img} alt={s.alt} fill sizes="300px" style={{ objectFit: "cover", objectPosition: "top" }} preload />
                  ) : (
                    <Image src={s.img} alt={s.alt} fill sizes="300px" style={{ objectFit: "cover", objectPosition: "top" }} loading="eager" />
                  )}
                </div>
              ))}
```

(The first slide is the LCP candidate → `preload`; the rest use `loading="eager"`. `sizes="300px"` matches the phone frame width so smaller variants are served.)

- [ ] **Step 3: Verify**

Run: `npm run lint` — expected: no errors.
Run: `npm run build` — expected: build succeeds, no `priority` deprecation warning for the hero.

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "Fix hero carousel black flash by keeping all slides mounted"
```

---

### Task 2: Flash-free GameFlow carousel

**Files:**
- Modify: `src/components/GameFlow.tsx:17-31` (state) and `src/components/GameFlow.tsx:103-112` (screen block)

**Interfaces:**
- Consumes: existing `steps` array (unchanged, including per-slide `fit`).
- Produces: nothing used by later tasks.

- [ ] **Step 1: Remove the remount-key state**

In `src/components/GameFlow.tsx`, replace:

```tsx
export default function GameFlow() {
  const [active, setActive] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  const goTo = useCallback((i: number) => {
    setActive(i);
    setAnimKey((k) => k + 1);
  }, []);
```

with:

```tsx
export default function GameFlow() {
  const [active, setActive] = useState(0);

  const goTo = useCallback((i: number) => {
    setActive(i);
  }, []);
```

- [ ] **Step 2: Stack all slides and cross-fade**

Replace:

```tsx
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
```

with:

```tsx
            {/* Screen images: all steps stay mounted and fetch up front; the
                active one fades in, so no image ever loads mid-rotation. */}
            {steps.map((s, i) => (
              <div key={s.n} aria-hidden={active !== i} style={{ position: "absolute", inset: 0, top: 36, opacity: active === i ? 1 : 0, transition: "opacity 0.45s ease" }}>
                <Image
                  src={s.img}
                  alt={`Halfcourt app: ${s.label}`}
                  fill
                  sizes="280px"
                  style={{ objectFit: s.fit, objectPosition: "top" }}
                  loading="eager"
                />
              </div>
            ))}
```

(This section is below the fold, so no `preload` — `loading="eager"` warms all six on mount. The step-description text block keeps its existing keyed fade; text can't flash black.)

- [ ] **Step 3: Verify**

Run: `npm run lint` — expected: no errors.
Run: `npm run build` — expected: build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/components/GameFlow.tsx
git commit -m "Fix GameFlow carousel black flash by keeping all slides mounted"
```

---

### Task 3: Plans page — new offerings + comparison table

**Files:**
- Modify: `src/app/plans/page.tsx:6-40` (data arrays) and `src/app/plans/page.tsx:108` (Locked In list lead-in)

**Interfaces:**
- Consumes: nothing from earlier tasks.
- Produces: nothing used by later tasks.

- [ ] **Step 1: Replace the three data arrays**

In `src/app/plans/page.tsx`, replace the `free`, `pro`, and `comparison` arrays (lines 6–40) with:

```tsx
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
```

- [ ] **Step 2: Add the "Everything in Free, plus…" lead-in to the Locked In card**

In the Locked In card, directly above `<ul style={{ listStyle: "none", ...` (the one mapping `pro`), insert:

```tsx
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--white)", letterSpacing: 0.3, marginBottom: 12 }}>Everything in Free, plus…</div>
```

- [ ] **Step 3: Verify**

Run: `npm run lint` — expected: no errors.
Run: `npm run build` — expected: build succeeds.
The plan cards already stack single-column ≤768px via the existing `.plans-grid` rule; the longer Free list changes nothing structurally.

- [ ] **Step 4: Commit**

```bash
git add src/app/plans/page.tsx
git commit -m "Update Free and Locked In offerings and comparison table"
```

---

### Task 4: Waitlist section copy

**Files:**
- Modify: `src/app/page.tsx:682` (Waitlist paragraph)

**Interfaces:**
- Consumes: nothing from earlier tasks.
- Produces: nothing used by later tasks.

- [ ] **Step 1: Replace the paragraph**

In the `Waitlist` component in `src/app/page.tsx`, replace:

```tsx
        <FadeUp delay={150}><p style={{ fontSize: 18, color: "var(--grey-light)", marginBottom: 40, maxWidth: 500, margin: "0 auto 40px" }}>Get early access to Halfcourt and be first on the court when we launch in Bendigo. Refer 3 friends and your tournament entry is on us.</p></FadeUp>
```

with:

```tsx
        <FadeUp delay={150}><p style={{ fontSize: 18, color: "var(--grey-light)", marginBottom: 40, maxWidth: 560, margin: "0 auto 40px" }}>Get early access to Halfcourt and be first on the court when we launch in Bendigo. Join the waitlist and get an email sent with a download code once we are live. Refer 3 friends, and your tournament entry is on us.</p></FadeUp>
```

(Copy is verbatim from the spec; `maxWidth` bumped 500→560 so three sentences don't tower on desktop. Centered block, already fine on mobile.)

- [ ] **Step 2: Verify**

Run: `npm run lint` — expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "Update waitlist copy to explain download code and referral reward"
```

---

### Task 5: Social icons + footer Company column removal

**Files:**
- Create: `src/components/SocialIcons.tsx`
- Modify: `src/components/Footer.tsx:15-19` (columns), `src/components/Footer.tsx:24` (grid), `src/components/Footer.tsx:44-48` (bottom-bar links)
- Modify: `src/app/page.tsx:725` (Contact section "Social" row)

**Interfaces:**
- Consumes: nothing from earlier tasks.
- Produces: `SocialLinks` component — `export default function SocialLinks({ color }: { color?: string })` — renders both icon links; used by Footer and the home Contact section.

- [ ] **Step 1: Create `src/components/SocialIcons.tsx`**

```tsx
/* Instagram + TikTok brand icons as inline SVG links. Icons use
   currentColor so hover color comes from the anchor (e.g. .footer-link). */

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.2" />
      <circle cx="12" cy="12" r="4.4" />
      <circle cx="17.3" cy="6.7" r="1.25" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

export default function SocialLinks({ color = "var(--grey-dark)" }: { color?: string }) {
  return (
    <span style={{ display: "inline-flex", gap: 16, alignItems: "center" }}>
      <a href="https://www.instagram.com/playhalfcourt/" target="_blank" rel="noopener noreferrer" aria-label="Halfcourt on Instagram" className="footer-link" style={{ color, display: "inline-flex" }}>
        <InstagramIcon />
      </a>
      <a href="https://www.tiktok.com/@playhalfcourt" target="_blank" rel="noopener noreferrer" aria-label="Halfcourt on TikTok" className="footer-link" style={{ color, display: "inline-flex" }}>
        <TikTokIcon />
      </a>
    </span>
  );
}
```

- [ ] **Step 2: Footer — remove Company column, shrink grid, swap text links for icons**

In `src/components/Footer.tsx`:

Add the import at the top:

```tsx
import SocialLinks from "@/components/SocialIcons";
```

Replace the `columns` array with (Company column removed):

```tsx
  const columns = [
    { h: "Product", links: [["Features", "/features"], ["Leaderboards", "/leaderboards"], ["Discover", "/discover"], ["Plans", "/plans"]] },
    { h: "Legal", links: [["Privacy Policy", "/privacy"], ["Terms of Service", "/terms"]] },
  ] as const;
```

Change the footer grid from `gridTemplateColumns: "2fr 1fr 1fr 1fr"` to `gridTemplateColumns: "2fr 1fr 1fr"`.

Replace the two bottom-bar text links:

```tsx
            <a href="https://www.instagram.com/playhalfcourt/" target="_blank" rel="noopener noreferrer" className="footer-link" style={{ fontSize: 13, color: "var(--grey-dark)", textDecoration: "none" }}>Instagram</a>
            <a href="https://www.tiktok.com/@playhalfcourt" target="_blank" rel="noopener noreferrer" className="footer-link" style={{ fontSize: 13, color: "var(--grey-dark)", textDecoration: "none" }}>TikTok</a>
```

with:

```tsx
            <SocialLinks />
```

(The existing `.footer-link:hover { color: var(--orange) }` rule now colors the SVGs via currentColor. Mobile: the 2-column ≤768px footer-grid rule still applies and now shows brand + Product / Legal cleanly.)

- [ ] **Step 3: Home Contact section — swap text links for icons**

In `src/app/page.tsx`, add the import:

```tsx
import SocialLinks from "@/components/SocialIcons";
```

In the `Contact` component, replace the Social row:

```tsx
                ["📱","Social",<span key="social"><a href="https://www.instagram.com/playhalfcourt/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--grey-light)", textDecoration: "underline", textUnderlineOffset: 3 }}>Instagram</a> · <a href="https://www.tiktok.com/@playhalfcourt" target="_blank" rel="noopener noreferrer" style={{ color: "var(--grey-light)", textDecoration: "underline", textUnderlineOffset: 3 }}>TikTok</a></span>],
```

with:

```tsx
                ["📱","Social",<SocialLinks key="social" color="var(--grey-light)" />],
```

(The home page has no `.footer-link` hover rule, so add `.footer-link:hover { color: var(--orange) !important; }` to the Contact section's existing `<style>` tag: change `` <style>{`@media(max-width:768px){.contact-grid{grid-template-columns:1fr!important}}`}</style> `` to `` <style>{`.footer-link:hover{color:var(--orange)!important}@media(max-width:768px){.contact-grid{grid-template-columns:1fr!important}}`}</style> ``.)

- [ ] **Step 4: Verify**

Run: `npm run lint` — expected: no errors.
Run: `npm run build` — expected: build succeeds.

- [ ] **Step 5: Commit**

```bash
git add src/components/SocialIcons.tsx src/components/Footer.tsx src/app/page.tsx
git commit -m "Replace social text links with brand icons; remove footer Company column"
```

---

### Task 6: `/tournaments` scaffold page

**Files:**
- Create: `src/app/tournaments/page.tsx`
- Modify: `src/app/sitemap.ts` (add `/tournaments` entry following the file's existing pattern)

**Interfaces:**
- Consumes: `Nav`, `Footer` components (existing).
- Produces: the `/tournaments` route — Task 7's pinned tournament card links to it via `<Link href="/tournaments">`.

- [ ] **Step 1: Create `src/app/tournaments/page.tsx`**

Server component (no state needed), matching the site's visual idiom:

```tsx
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
```

(Max-width containers and clamp() type scale keep this mobile friendly with no extra media queries.)

- [ ] **Step 2: Add `/tournaments` to `src/app/sitemap.ts`**

Insert this entry after the `/plans` entry (before `/privacy`):

```ts
    {
      url: "https://playhalfcourt.com/tournaments",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
```

- [ ] **Step 3: Verify**

Run: `npm run lint` — expected: no errors.
Run: `npm run build` — expected: build succeeds and the route list includes `/tournaments`.

- [ ] **Step 4: Commit**

```bash
git add src/app/tournaments/page.tsx src/app/sitemap.ts
git commit -m "Add tournaments scaffold page"
```

---

### Task 7: Discover page — Games tab (default) + Booking behind Coming Soon

**Files:**
- Modify: `src/app/discover/page.tsx` (restructure into tabs; booking content preserved intact)

**Interfaces:**
- Consumes: `/tournaments` route from Task 6.
- Produces: nothing used by later tasks.

- [ ] **Step 1: Add tab state, games scaffold data, and tab-aware header**

In `src/app/discover/page.tsx`, after the existing `courts` array, add:

```tsx
const scheduledRuns = [
  { format: "3v3", mode: "Ranked", time: "Sat · 12:00 PM", venue: "Red Energy Arena", slots: "4 slots left" },
  { format: "4v4", mode: "Shadow", time: "Sat · 2:00 PM", venue: "Tom Flood Sports Centre", slots: "2 slots left" },
  { format: "1v1", mode: "Ranked", time: "Sun · 10:00 AM", venue: "Rosalind Park Courts", slots: "Open queue" },
  { format: "3v3", mode: "Shadow", time: "Sun · 4:00 PM", venue: "Kangaroo Flat YMCA", slots: "6 slots left" },
];
```

In the component, add tab state alongside the existing filters state:

```tsx
  const [tab, setTab] = useState<"games" | "booking">("games");
```

Make the header tab-aware. Replace the `<h1>` and `<p>` in the header with:

```tsx
            <h1 style={{ fontFamily: "var(--font-outfit)", fontSize: "clamp(32px,5vw,56px)", fontWeight: 900, lineHeight: 1.05, marginBottom: 8 }}>
              {tab === "games" ? <>Find a game.<br />Join the run.</> : <>Find a court.<br />Book a slot.</>}
            </h1>
            <p style={{ fontSize: 16, color: "var(--grey-light)", marginBottom: 32, maxWidth: 600 }}>
              {tab === "games"
                ? "Scheduled runs, pinned games, and events happening on Halfcourt near you."
                : "Browse available courts near you, check open time slots, and lock in your next game."}
            </p>
```

Directly below that `<p>`, add the tab switcher (same visual pattern as the Plans page toggle):

```tsx
            <div style={{ display: "flex", gap: 4, background: "var(--dark-card)", border: "1px solid var(--dark-border)", borderRadius: 12, padding: 4, width: "fit-content", marginBottom: 8 }}>
              {([["games", "Games"], ["booking", "Booking"]] as const).map(([key, label]) => (
                <button key={key} onClick={() => setTab(key)} style={{
                  padding: "10px 28px", borderRadius: 10, fontSize: 14, fontWeight: 600, border: "none", cursor: "pointer",
                  fontFamily: "var(--font-dm-sans)", transition: "all 0.2s",
                  background: tab === key ? "var(--orange)" : "transparent",
                  color: tab === key ? "var(--white)" : "var(--grey)",
                }}>{label}</button>
              ))}
            </div>
```

The existing filters row (location/date/type/sort inputs) belongs to Booking: wrap it in `{tab === "booking" && ( ... )}` and leave its contents untouched.

- [ ] **Step 2: Wrap the existing booking layout in a Coming Soon overlay**

Wrap the existing map + court list grid (`<div ... className="discover-layout">...</div>`) in:

```tsx
        {tab === "booking" && (
          <div style={{ position: "relative" }}>
            {/* Coming soon banner */}
            <div style={{ position: "absolute", inset: 0, zIndex: 5, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
              <div style={{ background: "rgba(10,10,10,0.92)", border: "1px solid var(--orange)", borderRadius: 16, padding: "20px 40px", textAlign: "center", transform: "rotate(-3deg)", boxShadow: "0 20px 60px rgba(0,0,0,0.6)" }}>
                <div style={{ fontFamily: "var(--font-outfit)", fontSize: "clamp(22px,4vw,32px)", fontWeight: 900, letterSpacing: 3, textTransform: "uppercase", color: "var(--orange)" }}>Coming Soon</div>
                <div style={{ fontSize: 14, color: "var(--grey-light)", marginTop: 6 }}>Court booking opens with the app launch.</div>
              </div>
            </div>
            {/* Existing booking content, greyed out and non-interactive */}
            <div aria-hidden="true" style={{ opacity: 0.35, filter: "grayscale(0.7)", pointerEvents: "none", userSelect: "none" }}>
              [existing .discover-layout grid goes here, completely unchanged]
            </div>
          </div>
        )}
```

The `[existing .discover-layout grid goes here]` placeholder means: move the current grid inside this wrapper verbatim — do not edit a single line of the court list or map markup.

- [ ] **Step 3: Add the Games tab content**

Directly above the booking wrapper, add:

```tsx
        {tab === "games" && (
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px 80px" }}>

            {/* Pinned */}
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--orange)", marginBottom: 16, fontFamily: "var(--font-outfit)" }}>📌 Pinned</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 48 }} className="pinned-grid">
              {/* Tournament card */}
              <Link href="/tournaments" style={{ textDecoration: "none", color: "inherit" }}>
                <div style={{ background: "linear-gradient(135deg,rgba(232,77,26,0.12),rgba(232,77,26,0.02))", border: "1px solid rgba(232,77,26,0.35)", borderRadius: 16, padding: 24, height: "100%", transition: "all 0.3s", cursor: "pointer" }}
                  onMouseEnter={(e) => { const el = e.currentTarget; el.style.borderColor = "var(--orange)"; el.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={(e) => { const el = e.currentTarget; el.style.borderColor = "rgba(232,77,26,0.35)"; el.style.transform = "translateY(0)"; }}>
                  <div style={{ fontSize: 28, marginBottom: 10 }}>🏆</div>
                  <h3 style={{ fontFamily: "var(--font-outfit)", fontSize: 20, fontWeight: 800, marginBottom: 6 }}>Major Tournament</h3>
                  <p style={{ fontSize: 14, color: "var(--grey-light)", lineHeight: 1.6, marginBottom: 12 }}>Details announced soon. Real venue, real prizes, seeded by BPI.</p>
                  <span style={{ color: "var(--orange)", fontWeight: 700, fontSize: 14, fontFamily: "var(--font-dm-sans)" }}>Learn more →</span>
                </div>
              </Link>
              {/* Pinned community run */}
              <div style={{ background: "var(--dark-card)", border: "1px solid var(--dark-border)", borderRadius: 16, padding: 24 }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>🏀</div>
                <h3 style={{ fontFamily: "var(--font-outfit)", fontSize: 20, fontWeight: 800, marginBottom: 6 }}>Saturday Open Run</h3>
                <p style={{ fontSize: 14, color: "var(--grey-light)", lineHeight: 1.6, marginBottom: 12 }}>Weekly community run. All levels welcome — matchmaking balances the teams.</p>
                <span style={{ display: "inline-block", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 100, background: "rgba(46,125,50,0.1)", color: "var(--green-light)" }}>Weekly · Free</span>
              </div>
            </div>

            {/* Schedule */}
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--orange)", marginBottom: 16, fontFamily: "var(--font-outfit)" }}>This Week</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
              {scheduledRuns.map((run) => (
                <div key={`${run.format}-${run.time}`} className="run-row" style={{ display: "grid", gridTemplateColumns: "72px 1fr auto auto", gap: 16, alignItems: "center", background: "var(--dark-card)", border: "1px solid var(--dark-border)", borderRadius: 14, padding: "16px 20px", transition: "all 0.3s" }}
                  onMouseEnter={(e) => { const el = e.currentTarget; el.style.borderColor = "rgba(232,77,26,0.3)"; el.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={(e) => { const el = e.currentTarget; el.style.borderColor = "var(--dark-border)"; el.style.transform = "translateY(0)"; }}>
                  <div style={{ fontFamily: "var(--font-outfit)", fontSize: 20, fontWeight: 900, color: "var(--orange)" }}>{run.format}</div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 600 }}>{run.venue}</div>
                    <div style={{ fontSize: 13, color: "var(--grey)" }}>{run.time}</div>
                  </div>
                  <span style={{
                    fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 100,
                    background: run.mode === "Ranked" ? "rgba(232,77,26,0.1)" : "rgba(46,125,50,0.1)",
                    color: run.mode === "Ranked" ? "var(--orange)" : "var(--green-light)",
                  }}>{run.mode}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "var(--grey-light)", whiteSpace: "nowrap" }}>{run.slots}</span>
                </div>
              ))}
            </div>

            <p style={{ fontSize: 13, color: "var(--grey)", textAlign: "center" }}>Live schedule syncs with the app at launch. <Link href="/#waitlist" style={{ color: "var(--orange)", textDecoration: "none", fontWeight: 700 }}>Join the waitlist →</Link></p>
          </div>
        )}
```

Add `Link` to the imports if not present (it already is), and add mobile rules to the page's existing `<style>` block:

```tsx
      <style>{`
        @media (max-width: 968px) {
          .discover-layout { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          .pinned-grid { grid-template-columns: 1fr !important; }
          .run-row { grid-template-columns: 56px 1fr !important; }
          .run-row > span { justify-self: start; }
        }
      `}</style>
```

- [ ] **Step 4: Verify**

Run: `npm run lint` — expected: no errors.
Run: `npm run build` — expected: build succeeds.
Confirm with `git diff` that the court list / map markup inside the booking wrapper is byte-identical to before (only indentation may change).

- [ ] **Step 5: Commit**

```bash
git add src/app/discover/page.tsx
git commit -m "Split Discover into Games and Booking tabs; Booking behind Coming Soon"
```

---

### Task 8: Full verification pass

**Files:** none (verification only)

- [ ] **Step 1: Clean build**

Run: `npm run lint && npm run build`
Expected: zero errors; route list includes `/`, `/discover`, `/plans`, `/tournaments`.

- [ ] **Step 2: Browser walkthrough (desktop)**

Run `npm run dev`, open the site, and confirm:
- Hero and How It Works phones rotate with **no black frame ever**, including the very first rotation on a hard reload with cache disabled (DevTools → Network → Disable cache).
- Discover defaults to the Games tab; Booking tab shows greyed content + Coming Soon banner; tournament card links to `/tournaments`.
- The string "Goldfields" appears nowhere: `grep -ri "goldfields" src/` returns nothing.
- Plans lists and table match the spec; waitlist copy is verbatim; footer has no Company column; social icons render and turn orange on hover in both footer and Contact.

- [ ] **Step 3: Browser walkthrough (mobile, 375px)**

DevTools responsive mode at 375×812: hero stacks, tabs fit, pinned cards stack single-column, run rows wrap to two lines, plans cards stack, footer is 2-column.

- [ ] **Step 4: Report results to the user with any deviations**
