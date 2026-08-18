import type { NextConfig } from "next";

// QR-code shortlinks for the NBL Blitz — trading cards (/c*) and digital
// signage (/s*). Paths must stay this short (they're baked into QR codes).
// 302 so destinations can change without fighting browser cache.
const CARD_UTM = "/?utm_source=card&utm_medium=print&utm_campaign=blitz26";
const CARD_VARIANTS = [
  "bronze",
  "silver",
  "gold",
  "platinum",
  "diamond",
  "prestige",
  "mythic",
  "rankers",
];

// Four LED poster messages — separate source/medium so signage scans split
// cleanly from print cards in the waitlist sheet.
const SIGNAGE_UTM = "/?utm_source=signage&utm_medium=ooh&utm_campaign=blitz26";
const SIGNAGE_MESSAGES = [
  "watch-today",
  "anyone-can-hoop",
  "halfcourt-hoops",
  "bpi",
];

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/c", destination: `${CARD_UTM}#waitlist`, statusCode: 302 },
      ...CARD_VARIANTS.map((variant, i) => ({
        source: `/c${i + 1}`,
        destination: `${CARD_UTM}&utm_content=${variant}#waitlist`,
        statusCode: 302,
      })),
      ...SIGNAGE_MESSAGES.map((message, i) => ({
        source: `/s${i + 1}`,
        destination: `${SIGNAGE_UTM}&utm_content=${message}#waitlist`,
        statusCode: 302,
      })),
    ];
  },
};

export default nextConfig;
