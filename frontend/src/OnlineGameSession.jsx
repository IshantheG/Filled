import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import OnlineGame from "./OnlineGame";

export default function OnlineGameSession() {
  const { roomId } = useParams();
  const socketRef = useRef(null);
  const [connected, setConnected] = useState(false);
  const [playerId, setPlayerId] = useState(null);
  const [gameState, setGameState] = useState(null);

  useEffect(() => {
    if (!roomId) return;

    console.log("Creating WS for room:", roomId);
    const ws = new WebSocket(`ws://localhost:8000/ws/${roomId}`);
    socketRef.current = ws;

    ws.onopen = () => {
      console.log("WS connected");
      setConnected(true);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Received:", data);

      if (data.type === "init") {
        setPlayerId(data.playerId);
        setGameState(data.state);
      } else if (data.type === "update") {
        setGameState(data.state);
      }
    };

    ws.onclose = (e) => {
      console.log("WS closed", e.code, e.reason);
      setConnected(false);
    };

    ws.onerror = (e) => {
      console.error("WS error", e);
    };

    return () => {
      console.log("Cleaning up WS");
      if (ws.readyState !== WebSocket.CLOSED) {
        ws.close(1000, "Leaving online mode");
      }
    };
  }, [roomId]);

  if (!connected || playerId === null) return <p>Connecting...</p>;

  return (
    <OnlineGame 
      socket={socketRef.current} 
      playerId={playerId}
      gameState={gameState}
    />
  );
}