"use client";
import SettingsTab from "@/shared/components/tabs/SettingsTab";
import useGetMembership from "@/shared/hooks/useGetMembership";
import useSettingsFilter from "@/shared/hooks/useSettingsFilter";
import { UserProfile } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import Cookie from "js-cookie";
import { generateApiKey } from "@/shared/utils/token.generator";
import { Snippet } from "@nextui-org/react";
import { ICONS } from "@/shared/utils/icons";
import toast from "react-hot-toast";

const SettingsPage = () => {
  const [apiKey, setApiKey] = useState<string>("");
  const { activeItem } = useSettingsFilter();
  const { data } = useGetMembership();

  const handleCopy = () => {
    const smallText = document.querySelector(".copy-text")! as HTMLElement;
    const textCopy = smallText.innerText;
    navigator.clipboard.writeText(textCopy).then(() => {
      toast.success("Copied");
    });
  };

  useEffect(() => {
    const apiKey = Cookie.get("api_key");
    if (!apiKey) {
      (async () => {
        const response = await generateApiKey();
        if (response) {
          Cookie.set("api_key", response);
          setApiKey(response);
        }
      })();
    } else {
      setApiKey(apiKey);
    }
  }, []);

  return (
    <div className="w-full p-5">
      <SettingsTab />
      {activeItem === "Customize Profile" && (
        <div className="w-full flex justify-center">
          <UserProfile />
        </div>
      )}
      {activeItem === "API Access" && (
        <div>
          {data?.plan === "Grow" ? (
            <div className="w-full h-[90vh] flex items-center justify-center">
              <h3>Please update your subscription plan to get API access.</h3>
            </div>
          ) : (
            <div className="p-4 w-full overflow-hidden">
              <h3>API KEY:</h3>
              <p className="whitespace-pre-line overflow-hidden break-words copy-text">
                {apiKey}
              </p>
              <div
                onClick={handleCopy}
                className="h-[38px] w-[90px] bg-[#b3c3f3] flex items-center justify-center cursor-pointer rounded my-3"
              >
                <span className="text-lg">{ICONS.copy}</span>
                <span className="pl-1">copy</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
