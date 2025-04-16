import React, { useEffect, useState, useRef } from "react";
import { createRoot } from "react-dom/client";

function SecondsCounter({ alertAt = null }) {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds(prev => {
          const next = prev + 1;
          if (alertAt !== null && next === alertAt) {
            alert(`Has alcanzado los ${alertAt} segundos.`);
          }
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const handlePause = () => setIsRunning(false);
  const handleResume = () => setIsRunning(true);
  const handleReset = () => {
    setSeconds(0);
    setIsRunning(false);
  };

  return (
    <div style={{ 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      height: "100vh", 
      background: "#f9f9f9" 
    }}>
      <div style={{ padding: "20px", background: "#eee", borderRadius: "10px", textAlign: "center" }}>
        <div style={{ fontSize: "24px", marginBottom: "10px" }}>{seconds} segundos</div>
        <button onClick={handlePause}>Pausar</button>
        <button onClick={handleResume} style={{ marginLeft: "5px" }}>Reanudar</button>
        <button onClick={handleReset} style={{ marginLeft: "5px" }}>Reiniciar</button>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

// a los 10 segundos me avisa
root.render(<SecondsCounter alertAt={10} />);
