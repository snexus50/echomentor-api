import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

// ✅ Allow trusted frontend URLs
const allowedOrigins = [
  "http://localhost:3000",
  "https://echomentor.vercel.app",        // your production frontend
];

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

// ✅ Health check
app.get("/api/status", (req, res) => {
  res.json({ status: "Backend online 🚀" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🌍 Server running on port ${PORT}`));
