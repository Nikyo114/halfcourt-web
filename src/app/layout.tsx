import type { Metadata } from "next";
import { Outfit, DM_Sans } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Halfcourt: Pickup Basketball, Finally Done Right",
  description:
    "Skill-matched opponents, real courts, ranked games. Halfcourt is the pickup basketball app launching soon in Bendigo, AU. Join the waitlist free.",
  keywords: [
    "pickup basketball app",
    "basketball matchmaking",
    "find pickup basketball game",
    "basketball ranking app",
    "BPI basketball",
    "ranked pickup basketball",
    "grassroots basketball app",
    "basketball app Australia",
    "Bendigo basketball",
    "basketball skill rating",
    "court booking app",
    "Halfcourt app",
  ],
  authors: [{ name: "Halfcourt" }],
  openGraph: {
    title: "Halfcourt: Pickup Basketball, Finally Done Right",
    description:
      "Skill-matched opponents, real courts, ranked games. Launching soon in Bendigo, Australia.",
    url: "https://playhalfcourt.com",
    siteName: "Halfcourt",
    type: "website",
    // Image auto-generated from src/app/opengraph-image.tsx
  },
  twitter: {
    card: "summary_large_image",
    title: "Halfcourt: Pickup Basketball, Finally Done Right",
    description:
      "Skill-matched opponents. Real courts. Ranked games. Join the waitlist.",
    // Image auto-generated from src/app/opengraph-image.tsx (shared)
  },
  metadataBase: new URL("https://playhalfcourt.com"),
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Halfcourt",
  url: "https://playhalfcourt.com",
  logo: "https://playhalfcourt.com/logo.png",
  sameAs: [
    "https://www.instagram.com/playhalfcourt",
    "https://www.tiktok.com/@playhalfcourt",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "team@playhalfcourt.com",
    contactType: "customer support",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Halfcourt",
  url: "https://playhalfcourt.com",
  description:
    "Pickup basketball, finally done right. Skill-matched opponents, real courts, ranked games. Launching soon in Bendigo, Australia.",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://playhalfcourt.com/?s={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is BPI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "BPI stands for Basketball Player Index. It's your skill rating on Halfcourt, powered by an ELO system similar to chess. When you sign up, we use your height, age, experience, and playing frequency to set your starting BPI. After your first few games, your actual performance overrides those initial estimates. The system is designed to find your true skill level quickly.",
      },
    },
    {
      "@type": "Question",
      name: "What is Trust Factor?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Trust Factor is your reliability and sportsmanship score, shown as a star rating on your profile (e.g. 4.93 out of 5). After each game, your opponent rates you on punctuality, fair play, respect, reliability, and score accuracy. High-trust players get matched with other high-trust players. Be reliable and respectful, and you'll play with others who are too.",
      },
    },
    {
      "@type": "Question",
      name: "What's the difference between Shadow and Ranked?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Shadow is casual mode. Play for fun with no entry fees or rank. Ranked is competitive mode. Play for a rank, get access to guilds, higher prize pool tournaments, pop up tournaments with cash prizes.",
      },
    },
    {
      "@type": "Question",
      name: "How does matchmaking work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "When you queue for a match, the system looks for opponents based on your BPI (skill rating), Trust Factor, location, time window, and format (1v1, 2v2, 3v3). It starts with a tight skill range and widens over time if needed. You can queue solo or create a party with friends.",
      },
    },
    {
      "@type": "Question",
      name: "Is Halfcourt really free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Completely. Court discovery, matchmaking, chatrooms, guilds, scheduling. All free, forever. Of course additional features are available if you lock in, which unlocks unlimited ranked games, discounts on bookings, tournament access and much more.",
      },
    },
    {
      "@type": "Question",
      name: "How do tournaments work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Real prize pools. Real venues. Seeded brackets based on your BPI and Trust Factor so every match is competitive. Major tournaments run monthly at partner arenas. Locked In subscribers enter free. Everyone else can pay a small entry fee or earn free entry by referring 3 friends.",
      },
    },
    {
      "@type": "Question",
      name: "How do I submit my score?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "After your match, both players submit their scores independently through the app. If both scores match, the result is confirmed and your BPI updates. If they don't match, you can adjust, cancel, or mutually agree to cancel. The system is built to keep things fair and honest.",
      },
    },
    {
      "@type": "Question",
      name: "What are Guilds?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Your competitive crew. Form a Guild with your mates, build a team BPI, earn badges, and challenge other guilds in 1v1, 2v2, and 3v3 formats. Guild tournaments run weekly and you'll get the chance to play in league tables.",
      },
    },
    {
      "@type": "Question",
      name: "Can I book a court through Halfcourt?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You can discover courts on the map, check available time slots, and book directly through the app. Costs can be split automatically between players. You can also pair a court booking with matchmaking, so the app handles finding both your opponent and your court.",
      },
    },
  ],
};

const softwareAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Halfcourt",
  operatingSystem: "iOS, Android",
  applicationCategory: "SportsApplication",
  offers: [
    {
      "@type": "Offer",
      price: "0",
      priceCurrency: "AUD",
      name: "Free",
    },
    {
      "@type": "Offer",
      price: "6.99",
      priceCurrency: "AUD",
      name: "Locked In",
      billingIncrement: "P1M",
    },
  ],
  description:
    "Pickup basketball matchmaking app. Find skill-matched opponents, track your BPI ranking, book courts, and compete in ranked tournaments.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${dmSans.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
        />
      </head>
      <body className="min-h-full antialiased">
        <a href="#game-flow" className="skip-to-content">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
