import type { NextConfig } from "next";

// QR-code shortlinks printed on NBL Blitz trading cards — paths must stay this
// short (they're baked into printed QR codes). 302 so destinations can change
// without fighting browser cache.
const CARD_UTM = "/?utm_source=card&utm_medium=print&utm_campaign=blitz26";
const CARD_VARIANTS = [
  "bronze",
  "silver",
  "gold",
  "platinum",
  "diamond",
  "prestige",
  "mythic",
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
      // Eighth card — utm_content is a placeholder until the card is named;
      // safe to relabel after printing since only /c8 is in the QR code.
      { source: "/c8", destination: `${CARD_UTM}&utm_content=c8#waitlist`, statusCode: 302 },
    ];
  },
};

export default nextConfig;
