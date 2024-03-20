"use server";

import { connectDb } from "@/shared/libs/db";
import Subscriber from "@/models/Subscriber";
import { generateAnalytics } from "@/shared/utils/analytics.generator";

export const subscribersAnalytics = async () => {
  try {
    await connectDb();
    const subscribers = await generateAnalytics(Subscriber);
    return subscribers;
  } catch (error) {
    console.log(`Error while fetching subscribers analytics:- ${error}`);
  }
};
