"use server";

import Email from "@/models/Email";
import { connectDb } from "@/shared/libs/db";

export const saveEmail = async ({
  title,
  content,
  newsletterOwnerId,
}: {
  title: string;
  content: string;
  newsletterOwnerId: string;
}) => {
  try {
    await connectDb();
    console.log("Database connected");
    const email = await Email.findOne({ title, newsletterOwnerId });
    if (email) {
      await Email.findByIdAndUpdate(email._id, {
        content,
      });
      await email.save();
      return { message: "Updated the email successfully!" };
    } else {
      await Email.create({ title, content, newsletterOwnerId });
      return { message: "Saved the email successfully!" };
    }
  } catch (error) {
    console.log(`An error occurred while saving the email:- ${error}`);
  }
};
