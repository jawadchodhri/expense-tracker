import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dns from "node:dns";
import "dotenv/config";
import authRoutes from "./routes/authRoutes.js";
import { connectDatabase } from "./config/database.js";

dns.setServers([
  "8.8.8.8",
  "8.8.4.4",
]);

const app = express();

const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

app.use(express.json());

app.use(cookieParser());

app.use("/api/auth", authRoutes);


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