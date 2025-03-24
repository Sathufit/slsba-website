const mongoose = require("mongoose");

const TournamentSchema = new mongoose.Schema({
  tournamentName: { type: String, required: true },
  category: { type: String },
  date: { type: Date, required: true },
  venue: { type: String, required: true },
  maxParticipants: { type: Number, required: true },
  status: { type: String, default: "Upcoming" },
  registrations: [{ type: mongoose.Schema.Types.ObjectId, ref: "TournamentRegistration" }],
});

module.exports = mongoose.models.Tournament || mongoose.model("Tournament", TournamentSchema);
