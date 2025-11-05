import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

// ✅ Only allow trusted frontend URLs
const allowedOrigins = [
  "http://localhost:3000",                // Local frontend
  "https://echomentor.vercel.app",        // Production frontend (replace with your actual domain)
];

// ✅ Secure CORS middleware
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("❌ Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// ✅ Example health check
app.get("/api/status", (req, res) => {
  res.json({ status: "Backend online 🚀" });
});

export default app;
