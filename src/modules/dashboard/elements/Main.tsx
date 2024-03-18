"use client";
import OverviewCard from "@/shared/components/cards/OverviewCard";
import SubscribersChart from "@/shared/components/charts/SubscribersChart";
import { ICONS } from "@/shared/utils/icons";
import { useUser } from "@clerk/nextjs";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

const Main = () => {
  const [copied, setCopied] = useState<boolean>(false);
  const { user } = useUser();

  const handleCopyClick = () => {
    const smallText = document.querySelector(".copy-text")! as HTMLElement;
    const textCopy = smallText.innerText;
    navigator.clipboard.writeText(textCopy).then(() => {
      setCopied(true);
      toast.success("Copied");
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    });
  };

  return (
    <div className="p-5 w-full min-h-screen bg-[#ccc]">
      <h1 className="text-2xl text-surface-900 font-medium capitalize">
        Hi {user?.fullName} 👋
      </h1>
      <p className="opacity-[.7] text-sm pt-2">
        Here&apos;s how your publication is doing
      </p>
      <div className="w-full flex">
        <div className="w-[65%] min-h-[85vh] pr-5">
          <br />
          <OverviewCard />
          <SubscribersChart />
        </div>

        <div className="p-5 w-[35%]">
          {/* create newsletter button */}
          <div className="w-full flex justify-end">
            <Button className="bg-black text-white text-lg rounded !p-6">
              <span className="mr-1 ml-[-5px]">{ICONS.write}</span>
              Start Writing
            </Button>
          </div>
          <br />
          {/* resources */}
          <h5 className="font-medium text-xl">Resources</h5>
          <div className="w-full bg-white border rounded p-5 my-3">
            {/* home page url */}
            <div>
              <h4 className="font-medium">Home Page</h4>
              <div
                className="w-full px-2 my-1 h-[38px] bg-transparent border rounded-lg relative flex items-center cursor-pointer"
                onClick={handleCopyClick}
              >
                <small
                  className={`w-[70%] text-sm overflow-hidden overflow-ellipsis whitespace-nowrap copy-text ${
                    copied ? "bg-blue-200" : "bg-transparent"
                  }`}
                >
                  {process.env.NEXT_PUBLIC_WEBSITE_URL}/subscribe?username=
                  {user?.username}
                </small>
                <div className="absolute h-[38px] w-[90px] rounded-r-lg bg-[#DFE7FF] right-0 flex items-center justify-center">
                  <span className="text-lg">{ICONS.copy}</span>
                  <span className="pl-1">copy</span>
                </div>
              </div>
            </div>
          </div>

          {/* tutorials */}
          <div className="w-full bg-white border rounded p-5 my-3">
            <h5 className="font-medium">Tutorials</h5>
            <p className="text-sm opacity-[.7]">
              Learn how to get started on our website and utilize all our
              features, directly from the our team.
            </p>
            <br />
            <Button className="bg-[#FBCFE8] text-[#831743] rounded-lg h-[35px] flex items-center">
              Tutorials <span>{ICONS.link}</span>
            </Button>
          </div>

          {/* Need help */}
          <div className="w-full bg-white border rounded p-5 my-3">
            <h5 className="font-medium">Need help?</h5>
            <Link href={"/"}>
              <div className="w-max px-3 my-2 h-[33px] bg-transparent border rounded-lg flex items-center">
                <span className="text-sm">Knowledge base</span>
                <span className="ml-1">{ICONS.link}</span>
              </div>
            </Link>
            <Link href={"/"}>
              <div className="w-max px-3 my-2 h-[33px] bg-transparent border rounded-lg flex items-center">
                <span className="text-sm">API Documentation</span>
                <span className="ml-1">{ICONS.link}</span>
              </div>
            </Link>
            <Link href={"/"}>
              <div className="w-max px-3 my-2 h-[33px] bg-transparent border rounded-lg flex items-center">
                <span className="text-sm">Blog</span>
                <span className="ml-1">{ICONS.link}</span>
              </div>
            </Link>
            <Link href={"/"}>
              <div className="w-max px-3 my-2 h-[33px] bg-transparent border rounded-lg flex items-center">
                <span className="text-sm">FAQ</span>
                <span className="ml-1">{ICONS.link}</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
