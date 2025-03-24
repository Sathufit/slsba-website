const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const connectDB = require("./shared/db");

const app = express();

// ✅ Middleware
app.use(express.json());

// ✅ Flexible CORS setup for localhost + production
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || origin.startsWith("http://localhost")) {
      callback(null, true);
    } else if (origin === "https://your-production-frontend.com") {
      callback(null, true); // replace with real frontend domain
    } else {
      callback(new Error("❌ Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

// ✅ Static files for file uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Health check route
app.get("/", (req, res) => {
  res.send("✅ SLSBA API is running");
});

// ✅ Route Imports from Feature Folders
app.use("/api/tournaments", require("./tournament/routes/tournamentRoutes"));
app.use("/api/tournament-registrations", require("./tournament/routes/tournamentRegistrationRoutes"));
app.use("/api/admin", require("./tournament/routes/adminRoutes"));
app.use("/api/payments", require("./tournament/routes/payments"));

// ✅ Finance Feature (to be added by teammate)
try {
  app.use("/api/finance", require("./finance/routes")); // fallback if team adds later
} catch (err) {
  console.warn("⚠️ Finance routes not found (yet)");
}

// ✅ News Feature (future-proof)
try {
  app.use("/api/news", require("./news/routes"));
} catch (err) {
  console.warn("⚠️ News routes not found (yet)");
}

// ✅ Start the server only after DB connects
const startServer = async () => {
  try {
    await connectDB(); // MongoDB connection
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Server start failed:", err);
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
