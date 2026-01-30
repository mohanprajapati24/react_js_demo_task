import React, { useEffect, useState } from "react";

export default function TicTacToe() {
  const emptyBoard = Array(9).fill(null);
  const [board, setBoard] = useState(() => {
    try {
      const raw = localStorage.getItem("ttt_board");
      return raw ? JSON.parse(raw) : emptyBoard;
    } catch (e) {
      return emptyBoard;
    }
  });
  const [xIsNext, setXIsNext] = useState(() => {
    try {
      const raw = localStorage.getItem("ttt_xIsNext");
      return raw ? JSON.parse(raw) : true;
    } catch (e) {
      return true;
    }
  });
  const [history, setHistory] = useState(() => {
    try {
      const raw = localStorage.getItem("ttt_history");
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });
  const [scores, setScores] = useState(() => {
    try {
      const raw = localStorage.getItem("ttt_scores");
      return raw ? JSON.parse(raw) : { X: 0, O: 0, D: 0 };
    } catch (e) {
      return { X: 0, O: 0, D: 0 };
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("ttt_board", JSON.stringify(board));
      localStorage.setItem("ttt_xIsNext", JSON.stringify(xIsNext));
      localStorage.setItem("ttt_history", JSON.stringify(history));
      localStorage.setItem("ttt_scores", JSON.stringify(scores));
    } catch (e) {}
  }, [board, xIsNext, history, scores]);

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every(Boolean);

  useEffect(() => {
    if (winner) {
      setScores((s) => ({ ...s, [winner]: s[winner] + 1 }));
    } else if (isDraw) {
      setScores((s) => ({ ...s, D: s.D + 1 }));
    }
    // only run when round finishes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [winner, isDraw]);

  function handleClick(i) {
    if (board[i] || winner) return;
    const boardCopy = board.slice();
    boardCopy[i] = xIsNext ? "X" : "O";
    setHistory((h) => [...h, board]);
    setBoard(boardCopy);
    setXIsNext((v) => !v);
  }

  function restart() {
    setBoard(emptyBoard);
    setXIsNext(true);
    setHistory([]);
  }

  function undo() {
    setHistory((h) => {
      if (h.length === 0) return h;
      const prev = h[h.length - 1];
      setBoard(prev);
      setXIsNext((v) => !v);
      return h.slice(0, h.length - 1);
    });
  }

  function resetScores() {
    setScores({ X: 0, O: 0, D: 0 });
  }

  return (
    <div style={styles.wrap}>
      <div style={styles.card}>
        <h3 style={{ margin: 0 }}>Tic‑Tac‑Toe</h3>
        <div style={styles.statusRow}>
          {winner ? (
            <div style={styles.status}>Winner: <strong>{winner}</strong></div>
          ) : isDraw ? (
            <div style={styles.status}>Draw</div>
          ) : (
            <div style={styles.status}>Next: <strong>{xIsNext ? "X" : "O"}</strong></div>
          )}

          <div style={styles.score}>X: {scores.X} • O: {scores.O} • Draws: {scores.D}</div>
        </div>

        <div style={styles.board} role="grid" aria-label="Tic Tac Toe board">
          {board.map((cell, i) => (
            <button
              key={i}
              aria-label={`cell-${i}`}
              onClick={() => handleClick(i)}
              style={{
                ...styles.cell,
                background: cell ? (cell === "X" ? "#dbeafe" : "#fff0f6") : "white",
                cursor: cell || winner ? "not-allowed" : "pointer",
              }}
            >
              <span style={{ fontSize: 28, fontWeight: 700 }}>{cell}</span>
            </button>
          ))}
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          <button onClick={restart} style={{ ...styles.btn, background: "#10b981" }}>Restart</button>
          <button onClick={undo} style={{ ...styles.btn, background: "#6b7280" }} disabled={history.length === 0}>Undo</button>
          <button onClick={resetScores} style={{ ...styles.btn, background: "#ef4444" }}>Reset Scores</button>
        </div>

        <div style={{ marginTop: 12, color: "#555", fontSize: 13 }}>
          <div>Tip: click any cell to place your mark. Use Undo to step back one move.</div>
        </div>
      </div>
    </div>
  );
}

function calculateWinner(sq) {
  const lines = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a,b,c] = lines[i];
    if (sq[a] && sq[a] === sq[b] && sq[a] === sq[c]) return sq[a];
  }
  return null;
}

const styles = {
  wrap: { display: "flex", justifyContent: "center", padding: 12 },
  card: {
    background: "white",
    padding: 16,
    borderRadius: 10,
    boxShadow: "0 8px 24px rgba(15,23,42,0.06)",
    minWidth: 320,
  },
  statusRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  status: { color: "#111", fontSize: 15 },
  score: { color: "#555", fontSize: 13 },
  board: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 80px)",
    gridTemplateRows: "repeat(3, 80px)",
    gap: 8,
    marginTop: 12,
  },
  cell: {
    width: 80,
    height: 80,
    borderRadius: 8,
    border: "1px solid #e6e6e6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "white",
    boxShadow: "inset 0 -2px 0 rgba(0,0,0,0.02)",
  },
  btn: {
    padding: "8px 12px",
    color: "white",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
  },
};
