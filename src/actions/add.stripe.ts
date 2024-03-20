"use server";
import Membership from "@/models/Membership";
import { connectDb } from "@/shared/libs/db";
import { currentUser } from "@clerk/nextjs";
import Stripe from "stripe";

export const addStripe = async () => {
  try {
    await connectDb();
    const user = await currentUser();
    const membership = await Membership.findOne({ userId: user?.id });
    if (membership) {
      return;
    } else {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: "2023-10-16",
      });

      const customer = await stripe.customers.create({
        email: user?.emailAddresses[0].emailAddress,
        name: user?.firstName! + user?.lastName!,
      });
      await Membership.create({
        userId: user?.id,
        stripeCustomerId: customer.id,
        plan: "LAUNCH",
      });
    }
  } catch (error) {
    console.log("Something went wrong:-", error);
  }
};
