import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();

const port = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:3000" }));

app.use(express.json());

app.get("/api/health", function (request, response) {
  response.json({ message: "Expense Tracker backend is working." });
});

app.listen(port, function () {
  console.log(`Backend is running at http://localhost:${port}`,);
});