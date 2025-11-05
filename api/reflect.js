import express from "express";
import admin from "firebase-admin";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

const firebaseCredentials = JSON.parse(process.env.FIREBASE_CREDENTIALS);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseCredentials),
  });
}

// Firebase connection test route
app.get("/api/check-firebase-env", (req, res) => {
  res.send("Firebase connected successfully");
});

// Reflect route
app.post("/api/reflect", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "Missing text" });

    // simple reflection logic
    const reflection = `I hear you saying "${text}". It sounds like something meaningful to you. Take a deep breath, you’re doing well.`;

    return res.json({ reflection });
  } catch (err) {
    console.error("Error in reflection route:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Health check route
app.get("/", (req, res) => {
  res.send("EchoMentor API is running successfully!");
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`🌿 EchoMentor API running on port ${PORT}`);
});
