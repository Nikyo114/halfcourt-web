"use client";
import { useState, useEffect, useCallback } from "react";

type Stage = "submit" | "confirm" | "result";

function SubmitScreen() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: "8px 0" }}>
      <div style={{ fontFamily: "var(--font-outfit)", fontSize: 15, fontWeight: 800 }}>Submit Score</div>
      <div style={{ fontSize: 10, color: "var(--grey-light)" }}>2v2 Ranked · Red Energy Arena · Today 3:00 PM</div>
      <div style={{ background: "var(--dark-card)", border: "1px solid var(--dark-border)", borderRadius: 12, padding: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 9, color: "var(--grey)", marginBottom: 6 }}>YOUR TEAM</div>
            <div style={{ display: "flex", gap: 4, justifyContent: "center", marginBottom: 6 }}>
              {["MR","DW"].map(i => <div key={i} style={{ width: 22, height: 22, borderRadius: "50%", background: "linear-gradient(135deg,#E84D1A,#FF6B35)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, fontWeight: 700 }}>{i}</div>)}
            </div>
          </div>
          <div style={{ fontFamily: "var(--font-outfit)", fontSize: 14, fontWeight: 900, color: "var(--grey)" }}>VS</div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 9, color: "var(--grey)", marginBottom: 6 }}>OPPONENTS</div>
            <div style={{ display: "flex", gap: 4, justifyContent: "center", marginBottom: 6 }}>
              {["JB","KC"].map(i => <div key={i} style={{ width: 22, height: 22, borderRadius: "50%", background: "linear-gradient(135deg,#444,#222)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, fontWeight: 700 }}>{i}</div>)}
            </div>
          </div>
        </div>
        <div style={{ fontSize: 9, color: "var(--grey)", textAlign: "center", marginBottom: 10 }}>WHAT WAS THE SCORE?</div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ flex: 1, background: "var(--dark-surface)", border: "1px solid var(--orange)", borderRadius: 10, padding: "10px 0", textAlign: "center", fontFamily: "var(--font-outfit)", fontSize: 28, fontWeight: 900, color: "var(--white)" }}>21</div>
          <div style={{ color: "var(--grey)", fontSize: 16, fontWeight: 700 }}>:</div>
          <div style={{ flex: 1, background: "var(--dark-surface)", border: "1px solid var(--dark-border)", borderRadius: 10, padding: "10px 0", textAlign: "center", fontFamily: "var(--font-outfit)", fontSize: 28, fontWeight: 900, color: "var(--grey)" }}>16</div>
        </div>
      </div>
      <div style={{ background: "var(--orange)", borderRadius: 10, padding: "11px 0", textAlign: "center", fontFamily: "var(--font-outfit)", fontSize: 12, fontWeight: 700, color: "var(--white)" }}>
        Submit Score →
      </div>
      <div style={{ fontSize: 9, color: "var(--grey)", textAlign: "center" }}>Both players must confirm. Disputes reviewed by our team.</div>
    </div>
  );
}

function ConfirmScreen() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: "8px 0", alignItems: "center" }}>
      <div style={{ width: 52, height: 52, borderRadius: "50%", background: "rgba(76,175,80,0.15)", border: "2px solid #4CAF50", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>✓</div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontFamily: "var(--font-outfit)", fontSize: 14, fontWeight: 800, color: "var(--white)" }}>Score Confirmed</div>
        <div style={{ fontSize: 10, color: "var(--grey-light)", marginTop: 4 }}>Both players agreed on the result</div>
      </div>
      <div style={{ width: "100%", background: "var(--dark-card)", border: "1px solid var(--dark-border)", borderRadius: 12, padding: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ fontSize: 9, color: "var(--grey)" }}>YOUR TEAM</span>
          <span style={{ fontSize: 9, color: "var(--grey)" }}>OPPONENTS</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontFamily: "var(--font-outfit)", fontSize: 32, fontWeight: 900, color: "var(--white)" }}>21</div>
          <div style={{ fontSize: 10, background: "rgba(76,175,80,0.1)", padding: "4px 10px", borderRadius: 100, color: "#4CAF50", fontWeight: 700 }}>WIN</div>
          <div style={{ fontFamily: "var(--font-outfit)", fontSize: 32, fontWeight: 900, color: "var(--grey)" }}>16</div>
        </div>
      </div>
      <div style={{ width: "100%", background: "var(--dark-card)", border: "1px solid var(--dark-border)", borderRadius: 12, padding: 12 }}>
        <div style={{ fontSize: 9, color: "var(--grey)", marginBottom: 8 }}>BPI UPDATING...</div>
        <div style={{ display: "flex", gap: 8 }}>
          {[["Matt","846","+18"],["Devin","823","+14"]].map(([name,bpi,change]) => (
            <div key={name} style={{ flex: 1, background: "var(--dark-surface)", borderRadius: 8, padding: "8px 6px", textAlign: "center" }}>
              <div style={{ fontSize: 9, color: "var(--grey)", marginBottom: 4 }}>{name}</div>
              <div style={{ fontFamily: "var(--font-outfit)", fontSize: 16, fontWeight: 800, color: "var(--white)" }}>{bpi}</div>
              <div style={{ fontSize: 10, color: "#4CAF50", fontWeight: 700 }}>{change}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ResultScreen() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: "8px 0" }}>
      <div style={{ background: "linear-gradient(135deg, rgba(232,77,26,0.2), rgba(232,77,26,0.05))", border: "1px solid rgba(232,77,26,0.3)", borderRadius: 14, padding: 14, textAlign: "center" }}>
        <div style={{ fontSize: 20 }}>🏆</div>
        <div style={{ fontFamily: "var(--font-outfit)", fontSize: 16, fontWeight: 900, color: "var(--white)", marginTop: 4 }}>Victory!</div>
        <div style={{ fontSize: 9, color: "var(--grey-light)" }}>21 – 16 · 2v2 Ranked</div>
      </div>

      <div style={{ background: "var(--dark-card)", border: "1px solid var(--dark-border)", borderRadius: 12, padding: 12 }}>
        <div style={{ fontSize: 9, color: "var(--grey)", marginBottom: 8, letterSpacing: 1, textTransform: "uppercase" }}>BPI Updated</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontFamily: "var(--font-outfit)", fontSize: 9, color: "var(--grey)" }}>BEFORE</div>
            <div style={{ fontFamily: "var(--font-outfit)", fontSize: 22, fontWeight: 800, color: "var(--grey-light)" }}>846</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ color: "#4CAF50", fontSize: 16 }}>→</div>
            <div style={{ fontFamily: "var(--font-outfit)", fontSize: 14, fontWeight: 900, color: "#4CAF50" }}>+18</div>
          </div>
          <div>
            <div style={{ fontFamily: "var(--font-outfit)", fontSize: 9, color: "var(--grey)" }}>NOW</div>
            <div style={{ fontFamily: "var(--font-outfit)", fontSize: 22, fontWeight: 800, color: "var(--white)" }}>864</div>
          </div>
        </div>
        <div style={{ marginTop: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ height: 4, flex: 1, background: "var(--dark-surface)", borderRadius: 4, marginRight: 8, overflow: "hidden" }}>
            <div style={{ height: "100%", width: "86%", background: "linear-gradient(90deg, #E84D1A, #FF6B35)", borderRadius: 4 }} />
          </div>
          <span style={{ fontSize: 9, color: "var(--orange)", fontWeight: 700 }}>Prestige</span>
        </div>
      </div>

      <div style={{ background: "var(--dark-card)", border: "1px solid var(--dark-border)", borderRadius: 12, padding: 10 }}>
        <div style={{ fontSize: 9, color: "var(--grey)", marginBottom: 8 }}>Rate your opponent</div>
        <div style={{ display: "flex", gap: 4 }}>
          {["Punctuality","Sportsmanship","Fair Play"].map(r => (
            <div key={r} style={{ flex: 1, textAlign: "center" }}>
              <div style={{ fontSize: 14, marginBottom: 2 }}>⭐</div>
              <div style={{ fontSize: 7, color: "var(--grey)" }}>{r}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: "var(--orange)", borderRadius: 10, padding: "11px 0", textAlign: "center", fontFamily: "var(--font-outfit)", fontSize: 12, fontWeight: 700, color: "var(--white)" }}>
        Find Next Game →
      </div>
    </div>
  );
}

const stages: Stage[] = ["submit", "confirm", "result"];
const labels = ["Submit Score", "Confirmed", "BPI Updated"];

export default function ScoreFlow() {
  const [stage, setStage] = useState<Stage>("submit");
  const [key, setKey] = useState(0);

  const next = useCallback(() => {
    setStage((s) => {
      const i = stages.indexOf(s);
      return stages[(i + 1) % stages.length];
    });
    setKey((k) => k + 1);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 3500);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section
      style={{
        padding: "100px 0",
        background: "var(--dark)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", bottom: 0, right: 0, width: 500, height: 500, background: "radial-gradient(circle, rgba(232,77,26,0.05) 0%, transparent 60%)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}
          className="score-grid"
        >
          {/* Left: phone */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{
              width: 260,
              background: "var(--dark-card)",
              borderRadius: 40,
              border: "2px solid var(--dark-border)",
              padding: "40px 16px 20px",
              position: "relative",
              boxShadow: "0 40px 80px rgba(0,0,0,0.5), 0 0 60px rgba(232,77,26,0.15)",
              minHeight: 500,
            }} className="phone-frame">
              <div style={{ position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)", width: 100, height: 24, background: "var(--dark)", borderRadius: "0 0 14px 14px" }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, padding: "0 4px" }}>
                <span style={{ fontSize: 9, fontWeight: 600 }}>9:41</span>
                <span style={{ fontSize: 9 }}>▲▲▲</span>
              </div>
              <div key={key} className="flow-screen-enter">
                {stage === "submit" && <SubmitScreen />}
                {stage === "confirm" && <ConfirmScreen />}
                {stage === "result" && <ResultScreen />}
              </div>
            </div>
          </div>

          {/* Right: copy */}
          <div>
            <div style={{ fontFamily: "var(--font-outfit)", fontSize: 13, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "var(--orange)", marginBottom: 16 }}>
              After the Game
            </div>
            <h2 style={{ fontFamily: "var(--font-outfit)", fontSize: "clamp(32px,4vw,48px)", fontWeight: 800, lineHeight: 1.1, marginBottom: 16, color: "var(--white)" }}>
              Every point.<br />Every ranking shift.<br />All counted.
            </h2>
            <p style={{ fontSize: 18, color: "var(--grey-light)", lineHeight: 1.6, marginBottom: 48 }}>
              Submit your score in seconds. Your BPI updates instantly, so your ranking always reflects your actual game.
            </p>

            {/* Stage indicators */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {stages.map((s, i) => (
                <button
                  key={s}
                  onClick={() => { setStage(s); setKey(k => k + 1); }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "14px 18px",
                    borderRadius: 12,
                    border: `1px solid ${stage === s ? "rgba(232,77,26,0.4)" : "var(--dark-border)"}`,
                    background: stage === s ? "rgba(232,77,26,0.08)" : "transparent",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.3s",
                    width: "100%",
                  }}
                >
                  <div style={{
                    width: 28, height: 28, borderRadius: "50%",
                    background: stage === s ? "var(--orange)" : "var(--dark-card)",
                    border: `1px solid ${stage === s ? "var(--orange)" : "var(--dark-border)"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 12, fontWeight: 800,
                    color: stage === s ? "var(--white)" : "var(--grey)",
                    flexShrink: 0, transition: "all 0.3s",
                  }}>
                    {i + 1}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "var(--font-outfit)", fontSize: 15, fontWeight: 700, color: stage === s ? "var(--white)" : "var(--grey-light)" }}>
                      {labels[i]}
                    </div>
                    {stage === s && (
                      <div style={{ fontSize: 13, color: "var(--grey-light)", marginTop: 3, lineHeight: 1.4 }}>
                        {s === "submit" && "Both players submit scores independently. If they match, it's locked in."}
                        {s === "confirm" && "Scores match. Result confirmed. No disputes, no drama."}
                        {s === "result" && "Your BPI shifts based on opponent strength, win margin, and match type."}
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .score-grid { grid-template-columns: 1fr !important; }
          .score-grid > div:first-child { order: 2; }
          .score-grid > div:last-child { order: 1; }
        }
      `}</style>
    </section>
  );
}
