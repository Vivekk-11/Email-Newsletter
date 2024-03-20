"use server";
import Subscriber from "@/models/Subscriber";
import { connectDb } from "@/shared/libs/db";

export const getSubscribers = async ({
  newsletterOwnerId,
}: {
  newsletterOwnerId: string | undefined | null;
}) => {
  try {
    await connectDb();
    const subscribers = await Subscriber.find({ newsletterOwnerId });
    const allSubscribers = subscribers.map((subscriber) => {
      return { ...subscriber._doc, _id: subscriber._id.toString() };
    });
    return allSubscribers;
  } catch (error) {
    console.log(`Error while fetching the subscribers:- ${error}`);
  }
};
