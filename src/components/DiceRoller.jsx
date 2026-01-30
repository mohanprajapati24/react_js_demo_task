import React, { useEffect, useRef, useState } from "react";

export default function DiceRoller() {
  const [sides, setSides] = useState(6);
  const [count, setCount] = useState(1);
  const [rolling, setRolling] = useState(false);
  const [current, setCurrent] = useState([]);
  const [history, setHistory] = useState(() => {
    try {
      const raw = localStorage.getItem("dice_history_demo");
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  const animRef = useRef(null);

  useEffect(() => {
    try {
      localStorage.setItem("dice_history_demo", JSON.stringify(history));
    } catch (e) {}
  }, [history]);

  useEffect(() => () => clearInterval(animRef.current), []);

  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  const rollOnce = () => Math.floor(Math.random() * sides) + 1;

  const handleRoll = () => {
    if (rolling) return;
    const c = clamp(count, 1, 10);
    setRolling(true);
    // quick flicker animation (700ms) then final
    const start = Date.now();
    animRef.current = setInterval(() => {
      const elapsed = Date.now() - start;
      const temp = Array.from({ length: c }, () => Math.floor(Math.random() * sides) + 1);
      setCurrent(temp);
      if (elapsed > 700) {
        clearInterval(animRef.current);
        const final = Array.from({ length: c }, () => rollOnce());
        setCurrent(final);
        const total = final.reduce((s, n) => s + n, 0);
        const entry = {
          id: Math.random().toString(36).slice(2, 9),
          when: new Date().toISOString(),
          rolls: final,
          total,
        };
        setHistory((h) => [entry, ...h].slice(0, 50));
        setRolling(false);
      }
    }, 80);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h3 style={{ margin: 0 }}>🎲 Dice Roller</h3>
        <p style={{ color: "#666", marginTop: 6 }}>Roll beautifully styled dice with animation and history.</p>

        <div style={styles.controls}>
          <label style={styles.label}>
            Dice count
            <input
              type="number"
              min={1}
              max={10}
              value={count}
              onChange={(e) => setCount(Number(e.target.value) || 1)}
              style={styles.input}
            />
          </label>

          <label style={styles.label}>
            Sides
            <input
              type="number"
              min={2}
              max={100}
              value={sides}
              onChange={(e) => setSides(clamp(Number(e.target.value) || 6, 2, 100))}
              style={styles.input}
            />
          </label>
        </div>

        <div style={styles.diceRow}>
          {current.length === 0 && <div style={{ color: "#777" }}>No roll yet</div>}
          {current.map((n, i) => (
            <div key={i} style={{ ...styles.die, transform: rolling ? "translateY(-4px) rotate(3deg)" : "none" }}>
              <div style={styles.dieFace}>{n}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          <button onClick={handleRoll} disabled={rolling} style={{ ...styles.button, background: rolling ? "#999" : "#2b8aef" }}>
            {rolling ? "Rolling…" : "Roll"}
          </button>
          <button onClick={() => setCurrent([])} style={{ ...styles.button, background: "#6c757d" }}>
            Clear
          </button>
          <button onClick={clearHistory} style={{ ...styles.button, background: "#e74c3c" }}>
            Clear History
          </button>
        </div>
      </div>

      <div style={styles.historyCard}>
        <h4 style={{ marginTop: 0 }}>History</h4>
        {history.length === 0 && <div style={{ color: "#666" }}>No previous rolls</div>}
        <div style={{ marginTop: 8 }}>
          {history.map((h) => (
            <div key={h.id} style={styles.historyRow}>
              <div>
                <div style={{ fontWeight: 600 }}>{h.rolls.join(" + ")} = <span style={{ color: "#2b8aef" }}>{h.total}</span></div>
                <div style={{ fontSize: 12, color: "#666" }}>{new Date(h.when).toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    gap: 12,
    alignItems: "flex-start",
  },
  card: {
    background: "white",
    padding: 16,
    borderRadius: 10,
    boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
    minWidth: 320,
  },
  historyCard: {
    background: "white",
    padding: 12,
    borderRadius: 10,
    boxShadow: "0 6px 18px rgba(0,0,0,0.04)",
    minWidth: 260,
    maxHeight: 380,
    overflow: "auto",
  },
  controls: {
    display: "flex",
    gap: 10,
    marginTop: 8,
  },
  label: {
    display: "flex",
    flexDirection: "column",
    fontSize: 13,
    color: "#333",
  },
  input: {
    marginTop: 6,
    padding: "6px 8px",
    borderRadius: 6,
    border: "1px solid #ddd",
    width: 100,
  },
  diceRow: {
    display: "flex",
    gap: 10,
    marginTop: 12,
    alignItems: "center",
    minHeight: 72,
  },
  die: {
    width: 64,
    height: 64,
    borderRadius: 8,
    background: "linear-gradient(180deg,#fff,#f6f9ff)",
    boxShadow: "0 6px 14px rgba(11,27,60,0.08)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 22,
    fontWeight: 700,
  },
  dieFace: {
    userSelect: "none",
  },
  button: {
    padding: "8px 12px",
    color: "white",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
  },
  historyRow: {
    padding: 10,
    borderBottom: "1px solid #f1f1f1",
  },
};
