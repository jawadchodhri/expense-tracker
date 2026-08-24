import express from "express";
import cors from "cors";
import "dotenv/config";
import dns from "node:dns";
import authRoutes from "./routes/authRoutes.js";
import { connectDatabase } from "./config/database.js";

dns.setServers([
  "8.8.8.8",
  "8.8.4.4",
]);

const app = express();
app.use("/api/auth", authRoutes);

const port = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:3000" }));

app.use(express.json());

app.get("/api/health", function (request, response) {
  response.json({ message: "Expense Tracker backend is working." });
});

async function startServer() {
  await connectDatabase();

  app.listen(port, function () {
    console.log(
      `Backend is running at http://localhost:${port}`,
    );
  });
}

startServer();