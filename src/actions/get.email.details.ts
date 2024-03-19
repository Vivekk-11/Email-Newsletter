"use server";
import { connectDb } from "@/shared/libs/db";
import Email from "@/models/Email";

export const getEmailDetails = async ({
  title,
  newsletterOwnerId,
}: {
  title: string;
  newsletterOwnerId: string | undefined | null;
}) => {
  try {
    await connectDb();
    const emailDetails = await Email.findOne({ title, newsletterOwnerId });
    if (emailDetails) {
      const email = {
        ...emailDetails._doc,
        _id: emailDetails._id.toString(),
      };
      return email;
    }
  } catch (error) {
    console.log(`Error while fetching email details:= ${error}`);
  }
};
