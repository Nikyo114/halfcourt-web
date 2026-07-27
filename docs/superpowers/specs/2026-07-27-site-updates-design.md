# Halfcourt Web — Site Updates Design (2026-07-27)

Six approved updates to the landing site. All copy below is final unless marked as scaffold/sample.

## 1. Fix black-flash on rotating phone screens

**Problem:** The hero carousel (`src/app/page.tsx`, `flowStages`) and the How It Works carousel (`src/components/GameFlow.tsx`, `steps`) render only the active slide and remount it every cycle (`key={animKey}`). Each slide's first appearance triggers a fresh image fetch — the phone frame shows black while it loads. First impression risk.

**Fix:** Render **all slides stacked** (absolutely positioned, all `<Image>` components mounted once) inside the phone frame. The active index toggles opacity to cross-fade; nothing remounts. All images fetch once on mount, so no slide ever loads mid-rotation.

- Hero images keep `priority` so they're fetched before the first rotation.
- GameFlow images load eagerly on mount (below the fold, no `priority` needed on all six; the stack itself guarantees they're warm before the user scrolls to them in practice).
- The existing `flow-screen-enter` remount animation is replaced by an opacity cross-fade transition (~0.4s ease).
- Applies to both carousels. `PhoneMockup` (static images) is unaffected.

## 2. Discover page → two tabs: Games (default) + Booking

**Tabs** live at the top of the existing `/discover` page (`src/app/discover/page.tsx`).

**Booking tab** — existing court list + map content preserved 100% intact (do not delete; it returns later). Wrapped in a greyed-out (reduced opacity / greyscale), non-interactive (`pointer-events: none`) container with a **"Coming Soon"** banner overlaid across it.

**Games tab (scaffold)** — new content, clearly placeholder until the app schedule feed exists:

- **Schedule list**: sample scheduled-run cards, e.g. "3v3 · 12:00 PM · Red Energy Arena · 4 slots left".
- **Pinned section**: pinned games area.
- **Pinned tournament card**: reads **"Major Tournament — details announced soon"**, links to `/tournaments`.

**New `/tournaments` page (scaffold)** — generic: heading, coming-soon copy, waitlist CTA linking to `/#waitlist`.

**Constraint:** The name "Goldfields Cup" must NOT appear anywhere on the site until formally announced. Keep the tournament generic everywhere.

## 3. Plans page — new offerings (`src/app/plans/page.tsx`)

**Free** (replaces current list):

- Find matches
- Queue for multiple courts
- Get a BPI (Basketball Player Index)
- Schedule games 24 hours in advance
- Book courts 24 hours in advance
- Discover nearby courts, games and events
- Basic stats and leaderboards
- Add friends
- View rank progression

**Locked In** (replaces current list, led by "Everything in Free, plus…"):

- Discounts on bookings
- Schedule up to 1 week in advance
- View booking availabilities 1 week in advance
- Access exclusive tournaments + early entry to public ones
- Limited edition trading cards

**Comparison table** (replaces current rows):

| Feature | Free | Locked In |
|---|---|---|
| Find matches | ✓ | ✓ |
| Queue for multiple courts | ✓ | ✓ |
| BPI (Basketball Player Index) | ✓ | ✓ |
| Schedule games in advance | 24 hours | 1 week |
| Book courts / view availability | 24 hours | 1 week |
| Discover courts, games & events | ✓ | ✓ |
| Basic stats & leaderboards | ✓ | ✓ |
| Add friends | ✓ | ✓ |
| Rank progression | ✓ | ✓ |
| Booking discounts | – | ✓ |
| Exclusive tournaments + early public entry | – | ✓ |
| Limited edition trading cards | – | ✓ |

Pricing ($6.99/mo, $48.90/yr), the 1-month-free-trial line, and the Monthly/Annual toggle stay as-is.

## 4. Waitlist section copy (`src/app/page.tsx`, `Waitlist`)

Replace the paragraph under "The court is yours. / If you want it." with, verbatim:

> Get early access to Halfcourt and be first on the court when we launch in Bendigo. Join the waitlist and get an email sent with a download code once we are live. Refer 3 friends, and your tournament entry is on us.

## 5. Footer — remove the Company column (`src/components/Footer.tsx`)

Remove the "Company" column (Contact / Venue Partners / Press — all pointed at `/#contact`). Footer grid goes from `2fr 1fr 1fr 1fr` to `2fr 1fr 1fr` (brand + Product + Legal). Contact remains reachable via nav, the home-page contact section, and the support email in the footer bottom bar.

## 6. Social links → brand icons

Replace the "Instagram" and "TikTok" text links with inline SVG brand icons (no external assets), each with an accessible label (`aria-label`), preserving the existing hrefs and `target="_blank" rel="noopener noreferrer"`:

- Footer bottom bar (`src/components/Footer.tsx`)
- Home-page Contact section "Social" row (`src/app/page.tsx`)

Icon color matches current link grey, hover turns orange (consistent with `.footer-link` behavior).

## Implementation notes

- Repo runs Next 16.2.1 with breaking changes vs. training data — read the relevant guides in `node_modules/next/dist/docs/` (at minimum the Image and routing docs) before writing code (per AGENTS.md).
- All pages are client components with inline styles; follow that existing idiom rather than introducing CSS modules or Tailwind.
- No new dependencies.

## Out of scope

- Goldfields Cup naming/details (post-announcement task)
- Real schedule feed / app integration for the Games tab
- Image compression or format conversion (current sizes are acceptable; the flash is a mounting issue, not a size issue)
