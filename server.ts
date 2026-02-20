
import express from "express";
import { createServer } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { createServer as createViteServer } from "vite";
import path from "path";

async function startServer() {
  const app = express();
  const server = createServer(app);
  const wss = new WebSocketServer({ server });

  const PORT = 3000;

  // Track active connections
  let activeConnections = 0;
  // Total visitors (persisted in memory for this session, could use a file/db for real persistence)
  let totalVisitors = 1240; 

  wss.on("connection", (ws: WebSocket) => {
    activeConnections++;
    totalVisitors++;
    
    // Broadcast to all clients
    const broadcast = () => {
      const data = JSON.stringify({
        type: "VISITOR_UPDATE",
        active: activeConnections,
        total: totalVisitors
      });
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      });
    };

    broadcast();

    ws.on("close", () => {
      activeConnections--;
      broadcast();
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving
    app.use(express.static(path.join(process.cwd(), "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(process.cwd(), "dist", "index.html"));
    });
  }

  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
