"use server";
import { connectDb } from "@/shared/libs/db";
import Email from "@/models/Email";

export const getEmails = async (
  newsletterOwnerId: string | undefined | null
) => {
  try {
    await connectDb();
    const emails = await Email.find({ newsletterOwnerId });
    const allEmails = emails.map((email) => {
      return { ...email._doc, _id: email._id.toString() };
    });
    return allEmails;
  } catch (error) {
    console.log(`Error while fetching the emails:- ${error}`);
  }
};
