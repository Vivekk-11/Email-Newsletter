"use server";

import Membership from "@/models/Membership";
import { connectDb } from "@/shared/libs/db";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export const stripeSubscribe = async ({
  price,
  userId,
  plan,
}: {
  price: string;
  userId: string;
  plan: string;
}) => {
  await connectDb();
  const membership = await Membership.findOne({ userId });
  const customer = membership.customer;

  try {
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer,
      line_items: [
        {
          price,
          quantity: 1,
        },
      ],
      success_url: process.env.NEXT_PUBLIC_WEBSITE_URL + "/success",
      cancel_url: process.env.NEXT_PUBLIC_WEBSITE_URL + "/error",
      subscription_data: {
        metadata: {
          payingUserId: userId,
        },
      },
    });

    if (!checkoutSession.url) {
      return { message: "Could not create the checkout session." };
    }

    membership.plan = plan;
    await membership.save();
    return {
      message: "Subscribed successfully!",
      status: "success",
      url: checkoutSession.url,
    };
  } catch (error) {
    console.log(`Error while subscribing:- ${error}`);
  }
};
