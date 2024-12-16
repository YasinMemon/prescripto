import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user", // Reference to User collection
    required: true,
  },
  docId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "doctor", // Reference to Doctor collection
    required: true,
  },
  slotDate: {
    type: String, // Format: "dd_mm_yyyy"
    required: true,
  },
  slotTime: {
    type: String, // Format: "HH:mm AM/PM"
    required: true,
  },
  userData: {
    type: Object, // Embedded user data
    required: true,
  },
  docData: {
    type: Object, // Embedded doctor data
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date, // Automatically manage dates
    default: Date.now,
  },
  cancelled: {
    type: Boolean,
    default: false,
  },
  payment: {
    type: Boolean,
    default: false,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

// Prevent re-compiling the model
const appointmentModel =
  mongoose.models.Appointment || mongoose.model("Appointment", appointmentSchema);

export default appointmentModel;
