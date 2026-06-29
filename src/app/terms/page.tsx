import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { termsBlocks } from "./content";

export const metadata: Metadata = {
  title: "Terms & Conditions of Use | Halfcourt",
  description:
    "The terms and conditions governing your use of the Halfcourt website, operated by Halfcourt Global Pty Ltd.",
  alternates: { canonical: "/terms" },
};

// The "Last updated" line is shown in the page header, so drop it from the body.
const body = termsBlocks.filter((b) => !/^Last updated:/i.test(b.text));

export default function TermsPage() {
  return (
    <LegalPage
      title="Website Terms & Conditions of Use"
      updated="Last updated: June 2026"
      blocks={body}
      pdfHref="/legal/halfcourt-terms-and-conditions.pdf"
      pdfLabel="Download PDF"
    />
  );
}
