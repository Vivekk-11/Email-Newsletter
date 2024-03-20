"use server";

import { connectDb } from "@/shared/libs/db";
import Email from "@/models/Email";

export const deleteEmail = async ({ emailId }: { emailId: string }) => {
  try {
    await connectDb();
    await Email.deleteOne({ _id: emailId });
    return { message: "Email deleted successfully!" };
  } catch (error) {
    console.log(`Error while deleting the email:- ${error}`);
  }
};
