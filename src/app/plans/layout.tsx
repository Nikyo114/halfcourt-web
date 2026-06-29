import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Upgrade · Halfcourt",
  description:
    "Play free forever or lock in with a Halfcourt subscription. Every new player gets a 3-month free trial.",
};

export default function PlansLayout({ children }: { children: React.ReactNode }) {
  return children;
}
