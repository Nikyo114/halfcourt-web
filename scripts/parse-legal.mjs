// One-off: parse the legal .docx (document.xml dumped to /tmp) into verbatim
// structured content arrays for the /terms and /privacy pages.
import fs from "fs";

function decodeEntities(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)));
}

// The source .docx files mark headings and lists with inconsistent,
// overlapping styles, so XML heuristics misfire. Classification is instead
// content-based: an exact (verbatim) heading allow-list, plus bullets keyed
// off legal list punctuation. Prose text is never altered — only labelled.
function parse(xml, headings) {
  const headingSet = new Set(headings);
  const body = xml.replace(/[\s\S]*?<w:body>/, "").replace(/<\/w:body>[\s\S]*/, "");
  const paras = body.match(/<w:p\b[\s\S]*?<\/w:p>/g) || [];

  // Pass 1: extract verbatim paragraph text + the doc's own list markup.
  const raw = [];
  for (const p of paras) {
    // Match only real <w:t> text elements — NOT <w:tab>, <w:tabs>, etc.
    const texts = [...p.matchAll(/<w:t(?:\s[^>]*)?>([\s\S]*?)<\/w:t>/g)].map((m) => decodeEntities(m[1]));
    const text = texts.join("").replace(/\s+/g, " ").trim();
    if (!text) continue;

    // Drop StrategyEQ author/template junk and ALL-CAPS template title repeats.
    if (/strategyeq\.com\.au|Justin Hanney/i.test(text)) continue;
    const letters = text.replace(/[^A-Za-z]/g, "");
    if (letters.length > 3 && text === text.toUpperCase()) continue;

    const pPr = (p.match(/<w:pPr>[\s\S]*?<\/w:pPr>/) || [""])[0];
    const style = (pPr.match(/<w:pStyle w:val="([^"]+)"/) || [, ""])[1];
    if (/DocumentTitle/i.test(style)) continue; // we render our own <h1>

    const markupList = /<w:numPr>/.test(pPr) || /ListParagraph/i.test(style);
    raw.push({ text, markupList });
  }

  // Pass 2: classify with context. A bullet ends with ";", "; and" or "; or";
  // its final item often ends with "." but follows a bullet/intro and starts
  // lower-case. A line ending ":" is a list intro (stays a paragraph).
  const endsBullet = (t) => /;(\s+(and|or))?$/.test(t);
  const blocks = [];
  for (let i = 0; i < raw.length; i++) {
    const { text, markupList } = raw[i];
    const prev = blocks[blocks.length - 1];
    const prevIntro = i > 0 && /:$/.test(raw[i - 1].text);
    const inList = (prev && prev.type === "li") || prevIntro;

    let type = "p";
    if (headingSet.has(text)) type = "h";
    else if (markupList || endsBullet(text)) type = "li";
    else if (inList && /^[a-z(]/.test(text) && !/:$/.test(text)) type = "li"; // final "." bullet

    // A line ending in ":" introduces a list — it is always a paragraph.
    if (type === "li" && /:$/.test(text)) type = "p";
    // A list always opens with an intro line; a bullet directly under a
    // heading is really a standalone paragraph (e.g. the Severability clause).
    if (type === "li" && prev && prev.type === "h") type = "p";

    blocks.push({ type, text });
  }
  return blocks;
}

const PRIVACY_HEADINGS = [
  "Halfcourt Global Pty Ltd commitment to privacy",
  "About Halfcourt Global Pty Ltd",
  "What Information Does Halfcourt Global Pty Ltd Collect About You?",
  "Users, Participants and Prospective Clients",
  "Prospective employees/applicants",
  "Other individuals",
  "Visitors to our websites",
  "How and why does Halfcourt Global Pty Ltd collect and use your personal information?",
  "Does Halfcourt Global Pty Ltd use automated decision making?",
  "How does Halfcourt Global Pty Ltd interact with you via the internet?",
  "Can you deal with Halfcourt Global Pty Ltd anonymously?",
  "How does Halfcourt Global Pty Ltd hold information?",
  "Does Halfcourt Global Pty Ltd use or disclose your personal information for direct marketing?",
  "How does Halfcourt Global Pty Ltd use and disclose personal information?",
  "For clients",
  "For customers and participants",
  "Disclosure to contractors and other service providers",
  "Use and disclosure for administration and management",
  "Other uses and disclosures",
  "Does Halfcourt Global Pty Ltd disclose your personal information overseas?",
  "How can you access or seek correction of your personal information?",
  "What should you do if you have a complaint about the handling of your personal information?",
  "How are changes made to this privacy policy?",
  "How can you contact Halfcourt Global Pty Ltd?",
];

const TERMS_HEADINGS = [
  "General",
  "Using the Sites",
  "Intellectual Property",
  "Prices and fees",
  "Providing information through the Sites",
  "Accuracy of information and availability of the Sites",
  "Hyperlinks and third-party sites",
  "Our responsibility to you",
  "No third-party rights",
  "Termination",
  "Transfer of rights",
  "Contacting us and complaints",
  "Severability",
  "Governing law and jurisdiction",
];

function emit(blocks, varName) {
  const lines = blocks.map((b) => `  { type: ${JSON.stringify(b.type)}, text: ${JSON.stringify(b.text)} },`);
  return (
    `// AUTO-GENERATED from the source Word document — verbatim legal text. Do not hand-edit prose.\n` +
    `export type LegalBlock = { type: "h" | "p" | "li"; text: string };\n\n` +
    `export const ${varName}: LegalBlock[] = [\n${lines.join("\n")}\n];\n`
  );
}

const privacy = parse(fs.readFileSync("scripts/.tmp/privacy.xml", "utf8"), PRIVACY_HEADINGS);
const terms = parse(fs.readFileSync("scripts/.tmp/terms.xml", "utf8"), TERMS_HEADINGS);

fs.mkdirSync("src/app/privacy", { recursive: true });
fs.mkdirSync("src/app/terms", { recursive: true });
fs.writeFileSync("src/app/privacy/content.ts", emit(privacy, "privacyBlocks"));
fs.writeFileSync("src/app/terms/content.ts", emit(terms, "termsBlocks"));

console.log("privacy blocks:", privacy.length, "| headings:", privacy.filter((b) => b.type === "h").length, "| lists:", privacy.filter((b) => b.type === "li").length);
console.log("terms blocks:", terms.length, "| headings:", terms.filter((b) => b.type === "h").length, "| lists:", terms.filter((b) => b.type === "li").length);
console.log("\n--- privacy headings ---");
privacy.filter((b) => b.type === "h").forEach((b) => console.log(" •", b.text));
console.log("\n--- terms headings ---");
terms.filter((b) => b.type === "h").forEach((b) => console.log(" •", b.text));
