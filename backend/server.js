import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dns from "node:dns";
import "dotenv/config";
import authRoutes from "./routes/authRoutes.js";
import { connectDatabase } from "./config/database.js";
import accountRoutes from "./routes/accountRoutes.js";
import incomeRoutes from "./routes/incomeRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";

// Only use custom DNS when running locally on Windows
if (!process.env.VERCEL) {
  dns.setServers(["8.8.8.8", "8.8.4.4"]);
}

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

// Connect to DB for incoming serverless requests
connectDatabase();

app.use("/api/auth", authRoutes);
app.use("/api/accounts", accountRoutes);
app.use("/api/income", incomeRoutes);
app.use("/api/expenses", expenseRoutes);

app.get("/api/health", function (request, response) {
  response.json({ message: "Expense Tracker backend is working." });
});

// Only listen on port 5000 when running locally
if (!process.env.VERCEL) {
  app.listen(port, function () {
    console.log(`Backend is running at http://localhost:${port}`);
  });
}

export default app;