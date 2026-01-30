import React, { useEffect, useRef, useState } from "react";

function formatDateIso(dateStr) {
  if (!dateStr) return "-";
  try {
    return new Date(dateStr).toLocaleString();
  } catch (e) {
    return dateStr;
  }
}

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

export default function FlightBooker() {
  const [flightType, setFlightType] = useState("oneway");
  const [origin, setOrigin] = useState("DEL");
  const [destination, setDestination] = useState("BOM");
  const [startDate, setStartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [bookings, setBookings] = useState(() => {
    try {
      const raw = localStorage.getItem("bookings_demo");
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  const [now, setNow] = useState(new Date());
  const tickerRef = useRef(null);

  useEffect(() => {
    tickerRef.current = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(tickerRef.current);
  }, []);

  // Persist bookings
  useEffect(() => {
    try {
      localStorage.setItem("bookings_demo", JSON.stringify(bookings));
    } catch (e) {}
  }, [bookings]);

  // Live tracking simulation: update progress/status periodically
  useEffect(() => {
    const id = setInterval(() => {
      setBookings((prev) =>
        prev.map((b) => {
          // only update active flights
          if (b.status === "landed") return b;

          const nowTs = Date.now();
          const elapsed = Math.max(0, nowTs - b._created);
          // simulate 30s flight duration for demo
          const total = 30 * 1000;
          const progress = Math.min(100, Math.floor((elapsed / total) * 100));

          let status = b.status;
          if (progress === 0) status = "scheduled";
          else if (progress < 10) status = "departed";
          else if (progress < 100) status = "in-flight";
          else status = "landed";

          return { ...b, progress, status, lastUpdated: nowTs };
        })
      );
    }, 1000);
    return () => clearInterval(id);
  }, []);

  // Convert string to Date safely
  const parseDate = (dateStr) => {
    if (!dateStr) return null;
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? null : d;
  };

  const start = parseDate(startDate);
  const end = parseDate(returnDate);

  const isReturn = flightType === "return";

  // Validation
  const isValid = start && (!isReturn || (end && end >= start));

  const handleBook = () => {
    if (!isValid) return;

    const created = Date.now();
    const newBooking = {
      id: uid(),
      flightType,
      origin,
      destination,
      startDate,
      returnDate: isReturn ? returnDate : null,
      passengers,
      createdAt: new Date(created).toISOString(),
      _created: created,
      status: "scheduled",
      progress: 0,
      lastUpdated: created,
    };

    setBookings((b) => [newBooking, ...b]);
  };

  const cancelBooking = (id) => {
    setBookings((b) => b.filter((x) => x.id !== id));
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>✈️ Flight Booker (Demo)</h2>
        <div style={styles.rowBetween}>
          <small>Current time: {now.toLocaleString()}</small>
          <small style={{ color: "#666" }}>Bookings: {bookings.length}</small>
        </div>

        <div style={styles.field}>
          <label>Flight Type</label>
          <select value={flightType} onChange={(e) => setFlightType(e.target.value)}>
            <option value="oneway">One-way</option>
            <option value="return">Return</option>
          </select>
        </div>

        <div style={styles.inlineFields}>
          <div style={{ ...styles.field, flex: 1 }}>
            <label>Origin</label>
            <input value={origin} onChange={(e) => setOrigin(e.target.value.toUpperCase())} />
          </div>
          <div style={{ ...styles.field, flex: 1, marginLeft: 10 }}>
            <label>Destination</label>
            <input value={destination} onChange={(e) => setDestination(e.target.value.toUpperCase())} />
          </div>
        </div>

        <div style={styles.inlineFields}>
          <div style={{ ...styles.field, flex: 1 }}>
            <label>Departure Date</label>
            <input type="datetime-local" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </div>
          <div style={{ ...styles.field, flex: 1, marginLeft: 10 }}>
            <label>Return Date</label>
            <input type="datetime-local" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} disabled={!isReturn} />
          </div>
        </div>

        <div style={styles.inlineFields}>
          <div style={{ ...styles.field, width: 140 }}>
            <label>Passengers</label>
            <input type="number" min={1} value={passengers} onChange={(e) => setPassengers(Number(e.target.value) || 1)} />
          </div>
        </div>

        {!isValid && startDate && (
          <p style={styles.error}>{isReturn ? "Return date must be after departure" : "Please select a valid departure"}</p>
        )}

        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          <button onClick={handleBook} disabled={!isValid} style={{ ...styles.button, backgroundColor: isValid ? "#007bff" : "#999" }}>
            Book Flight
          </button>
          <button
            onClick={() => {
              setFlightType("oneway");
              setOrigin("DEL");
              setDestination("BOM");
              setStartDate("");
              setReturnDate("");
              setPassengers(1);
            }}
            style={{ ...styles.button, backgroundColor: "#6c757d" }}
          >
            Reset
          </button>
        </div>
      </div>

      <div style={styles.listCard}>
        <h3>Live Tracking</h3>
        {bookings.length === 0 && <p style={{ color: "#666" }}>No bookings yet — create one to see live tracking.</p>}

        {bookings.map((b) => (
          <div key={b.id} style={styles.bookingRow}>
            <div style={{ flex: 1 }}>
              <div style={styles.rowBetween}>
                <strong>{b.origin} → {b.destination}</strong>
                <small style={{ color: "#666" }}>{b.flightType}</small>
              </div>
              <div style={{ fontSize: 13, color: "#444", marginTop: 6 }}>
                <div>Depart: {formatDateIso(b.startDate)}</div>
                {b.returnDate && <div>Return: {formatDateIso(b.returnDate)}</div>}
                <div>Passengers: {b.passengers}</div>
              </div>

              <div style={{ marginTop: 10 }}>
                <div style={styles.progressBarBackground}>
                  <div style={{ ...styles.progressBar, width: `${b.progress}%` }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                  <small style={{ color: "#333" }}>{b.status}</small>
                  <small style={{ color: "#333" }}>{b.progress}%</small>
                </div>
              </div>
            </div>

            <div style={{ marginLeft: 12, textAlign: "right" }}>
              <div style={{ fontSize: 12, color: "#666" }}>{new Date(b.createdAt).toLocaleString()}</div>
              <button onClick={() => cancelBooking(b.id)} style={{ ...styles.smallButton }}>Cancel</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 980,
    margin: "24px auto",
    padding: 12,
    fontFamily: "Inter, Roboto, sans-serif",
    display: "grid",
    gridTemplateColumns: "1fr 420px",
    gap: 16,
  },
  card: {
    padding: 18,
    borderRadius: 10,
    boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
    background: "white",
  },
  listCard: {
    padding: 18,
    borderRadius: 10,
    boxShadow: "0 6px 18px rgba(0,0,0,0.04)",
    background: "white",
    height: "fit-content",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 12,
  },
  inlineFields: {
    display: "flex",
    width: "100%",
  },
  rowBetween: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    padding: "8px 12px",
    border: "none",
    borderRadius: 8,
    color: "white",
    fontSize: 14,
    cursor: "pointer",
  },
  smallButton: {
    marginTop: 10,
    padding: "6px 8px",
    borderRadius: 6,
    background: "#e74c3c",
    color: "white",
    border: "none",
    cursor: "pointer",
    fontSize: 12,
  },
  bookingRow: {
    display: "flex",
    alignItems: "flex-start",
    padding: 12,
    borderRadius: 8,
    border: "1px solid #f1f1f1",
    marginBottom: 10,
    gap: 8,
  },
  progressBarBackground: {
    height: 8,
    background: "#eee",
    borderRadius: 6,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    background: "linear-gradient(90deg,#28a745,#ffc107)",
  },
  error: {
    color: "red",
    fontSize: 13,
    marginBottom: 10,
  },
};
