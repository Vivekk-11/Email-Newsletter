import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Subscriber from "@/models/Subscriber";

export const POST = async (req: NextRequest) => {
  try {
    console.log("received...");
    const data = await req.json();
    const apiKey = data.apiKey;
    const decoded: any = jwt.verify(apiKey, process.env.JWT_SECRET_KEY!);
    const alreadySubscriber = await Subscriber.findOne({
      email: data.email,
      newsletterOwnerId: decoded?.user?.id,
    });

    if (alreadySubscriber) {
      return NextResponse.json(
        { error: "You are already a subscriber." },
        { status: 401 }
      );
    }

    const subscriber = await Subscriber.create({
      email: data.email,
      newsletterOwnerId: decoded?.user?.id,
      source: "By Api",
    });

    return NextResponse.json(subscriber, { status: 200 });
  } catch (error) {
    return NextResponse.json("Something went wrong, please try again!", {
      status: 500,
    });
  }
};
