import mongoose from "mongoose";

const { Schema } = mongoose;

const emailSchema = new Schema(
  {
    title: String,
    content: String,
    newsletterOwnerId: String,
  },
  { timestamps: true }
);

const Email = mongoose.models.Email || mongoose.model("Email", emailSchema);

export default Email;
