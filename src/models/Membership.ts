import mongoose from "mongoose";

const { Schema } = mongoose;

const membershipSchema = new Schema(
  {
    userId: String,
    stripeCustomerId: String,
    plan: String,
  },
  { timestamps: true }
);

const Membership =
  mongoose.models.Membership || mongoose.model("Membership", membershipSchema);

export default Membership;
