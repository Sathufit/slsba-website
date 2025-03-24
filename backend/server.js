const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const connectDB = require("./shared/db");

const app = express();

// ✅ Middleware
app.use(express.json());

// ✅ Flexible CORS setup for localhost + production
const allowedOrigins = [
  "http://localhost:5173", // Vite default
  "http://localhost:3000", // React default
  "https://your-production-frontend.com", // Replace with your real frontend
];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("❌ Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

// ✅ Static files for uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Health check
app.get("/", (req, res) => {
  res.send("✅ SLSBA API is running");
});

// ✅ Core Routes (tournament module)
app.use("/api/tournaments", require("./routes/tournamentRoutes"));
app.use("/api/tournament-registrations", require("./routes/tournamentRegistrationRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/payments", require("./routes/payments"));

// ✅ Optional Feature Routes (Safe try/catch)
try {
  app.use("/api/finance", require("./routes/financeRoutes")); // e.g., ./routes/financeRoutes.js
} catch (err) {
  console.warn("⚠️ Finance routes not found.");
}

try {
  app.use("/api/news", require("./routes/newsRoutes"));
} catch (err) {
  console.warn("⚠️ News routes not found.");
}

try {
  app.use("/api/training", require("./routes/trainingRoutes"));
} catch (err) {
  console.warn("⚠️ Training routes not found.");
}

try {
  app.use("/api/support", require("./routes/supportRoutes"));
} catch (err) {
  console.warn("⚠️ Customer Support routes not found.");
}

// ✅ Start the server after DB connection
const startServer = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB:", err);
    process.exit(1);
  }
};

startServer();

// ✅ Crash-safe handlers
process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.error("❌ Unhandled Promise Rejection:", err);
  process.exit(1);
});
