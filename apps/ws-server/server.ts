import { prismaClient } from "@repo/db/client";
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8081 });

wss.on("connection", (ws) => {
  console.log("New client connected");

  // Handle incoming messages
  ws.on("message", async (message) => {
    console.log(`Received message: ${message}`);

    // Create a new user in the database
    try {
      const user = await prismaClient.user.create({
        data: {
          username: Math.random().toString(),
          password: Math.random().toString(),
        },
      });
      console.log("User created:", user);

      // Send a response back to the client
      ws.send(`User created with ID: ${user.id}`);
    } catch (error) {
      console.error("Error creating user:", error);
      ws.send("Error creating user");
    }
  });

  // Handle client disconnection
  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

console.log("WebSocket server is running on ws://localhost:8081");
