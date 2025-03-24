const mongoose = require("mongoose");

const TournamentRegistrationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  schoolName: { type: String, required: true },
  schoolID: { type: String, required: true },
  tournament: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Tournament", 
    required: true 
  }, // ✅ Link to Tournament
  players: [
    {
      name: { type: String, required: true },
      age: { type: Number, required: true },
      school: { type: String, required: true }
    },
  ],
  paymentMethod: { 
    type: String, 
    enum: ["upload", "onsite", "Bank Transfer", "Credit Card", "PayPal"], 
    required: true 
  },
  paymentFile: { type: String, default: "" },
  paymentStatus: { 
    type: String, 
    enum: ["Pending", "Paid", "Failed"], 
    default: "Pending" 
  }, // ✅ Track payments
  createdAt: { type: Date, default: Date.now },
});

// ✅ Prevent Overwriting the Model
module.exports = mongoose.models.TournamentRegistration || mongoose.model("TournamentRegistration", TournamentRegistrationSchema);
