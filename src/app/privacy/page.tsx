import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { privacyBlocks } from "./content";

export const metadata: Metadata = {
  title: "Privacy Policy | Halfcourt",
  description:
    "How Halfcourt Global Pty Ltd collects, uses, holds and discloses your personal information, in accordance with the Australian Privacy Principles.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="Last updated: June 2026"
      blocks={privacyBlocks}
      pdfHref="/legal/halfcourt-privacy-policy.pdf"
      pdfLabel="Download PDF"
    />
  );
}
