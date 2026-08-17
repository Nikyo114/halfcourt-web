"use client";
import { useEffect } from "react";

export const FIRST_TOUCH_KEY = "hc_first_touch";

// Captures UTM params into localStorage on first visit. First touch wins:
// once the key exists it is never overwritten, so a later direct visit (or a
// second card scan) can't clobber the original source.
export default function FirstTouch() {
  useEffect(() => {
    try {
      if (localStorage.getItem(FIRST_TOUCH_KEY)) return;
      const params = new URLSearchParams(window.location.search);
      const hasUtm = [...params.keys()].some((k) => k.startsWith("utm_"));
      if (!hasUtm) return;
      localStorage.setItem(
        FIRST_TOUCH_KEY,
        JSON.stringify({
          source: params.get("utm_source") || "",
          medium: params.get("utm_medium") || "",
          campaign: params.get("utm_campaign") || "",
          content: params.get("utm_content") || "",
          ts: new Date().toISOString(),
          path: window.location.pathname,
        })
      );
    } catch {
      // localStorage unavailable (private mode etc.) — attribution just falls back to "direct"
    }
  }, []);
  return null;
}
