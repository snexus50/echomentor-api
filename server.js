// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import admin from "firebase-admin";

dotenv.config();
const app = express();
// ✅ Enable CORS for all domains (during testing)
app.use(cors({
  origin: "*",  // allow all origins (you can restrict later)
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// Decode Firebase credentials from BASE64 env variable
try {
  if (!admin.apps.length) {
    const firebaseBase64 = process.env.FIREBASE_BASE64;
    if (!firebaseBase64) {
      throw new Error("Missing FIREBASE_BASE64 environment variable");
    }

    const firebaseConfig = JSON.parse(
      Buffer.from(firebaseBase64, "base64").toString("utf-8")
    );

    admin.initializeApp({
      credential: admin.credential.cert(firebaseConfig),
    });

    console.log("✅ Firebase initialized successfully");
  }
} catch (error) {
  console.error("❌ Firebase initialization failed:", error.message);
}

// --- Routes ---
app.get("/", (req, res) => {
  res.send("EchoMentor API is live 🚀");
});

app.get("/api/status", (req, res) => {
  res.json({
    status: "Backend online",
    environment: process.env.NODE_ENV || "development",
    time: new Date().toISOString(),
  });
});

// --- Start server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🌍 Server running on port ${PORT}`));
