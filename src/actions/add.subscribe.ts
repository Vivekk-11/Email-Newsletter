"use server";

import Subscriber from "@/models/Subscriber";
import { connectDb } from "@/shared/libs/db";
import { validateEmail } from "@/shared/utils/ZeroBounceApi";
import { clerkClient } from "@clerk/nextjs";

export const addSubscriber = async ({
  email,
  username,
}: {
  email: string;
  username: string;
}) => {
  try {
    await connectDb();

    const allUsers = await clerkClient.users.getUserList();
    const newsletterOwner = allUsers.find((user) => user.username === username);

    if (!newsletterOwner) {
      return { error: "Username is not valid." };
    }

    const alreadySubscriber = await Subscriber.findOne({
      email,
      newsletterOwnerId: newsletterOwner?.id,
    });

    if (alreadySubscriber) {
      return { error: "You are already a subscriber." };
    }

    const validateResponse = await validateEmail({ email });

    if (validateResponse.status === "invalid") {
      return { error: "Email is not valid. Please enter a valid email." };
    }

    const subscriber = await Subscriber.create({
      email,
      newsletterOwnerId: newsletterOwner?.id,
    });

    return subscriber;
  } catch (error) {
    console.log(`Error while adding the subscriber:-`, error);
  }
};
