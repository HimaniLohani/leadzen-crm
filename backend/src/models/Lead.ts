import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      enum: ["instagram", "google", "facebook", "other"],
      default: "other",
    },
    interest: {
      type: String,
    },
    isQualified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Lead = mongoose.model("Lead", leadSchema);

export default Lead;