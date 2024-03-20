import mongoose from "mongoose";

const { Schema } = mongoose;

const subscriberSchema = new Schema(
  {
    email: String,
    newsletterOwnerId: String,
    source: { type: String, default: "By our website." },
    status: { type: String, default: "Subscribed" },
  },
  { timestamps: true }
);

const Subscriber =
  mongoose.models.Subscriber || mongoose.model("Subscriber", subscriberSchema);

export default Subscriber;
