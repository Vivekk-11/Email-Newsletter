"use client";
import { ICONS } from "@/shared/utils/icons";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

const Write = () => {
  const [emailTitle, setEmailTitle] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter()

  const handleCreate = () => {
    if (emailTitle.trim().length === 0) {
      toast.error("Enter the email subject to continue!");
    } else {
      const formattedTitle = emailTitle.replace(/\s+/g, "-").replace(/&/g, "-");
      router.push(`/dashboard/new-email?subject=${formattedTitle}`);
    }
  };

  return (
    <div className="w-full flex p-5 flex-wrap relative gap-6">
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="w-[200px] h-[200px] bg-slate-300 flex flex-col items-center justify-center border rounded cursor-pointer"
      >
        <span className="text-2xl block text-center mb-3">{ICONS.plus}</span>
        <p className="text-2xl">Create New</p>
      </div>

      {open && (
        <div className="absolute flex items-center justify-center top-0 left-0 bg-[#00000028] h-screen w-full">
          <div className="shadow p-5 bg-white rounded relative w-[600px]">
            <div className="absolute top-3 right-3">
              <span
                className="text-lg cursor-pointer"
                onClick={() => setOpen((prev) => !prev)}
              >
                {ICONS.cross}
              </span>
            </div>
            <h5 className="text-2xl">Enter your Email subject</h5>
            <input
              type="text"
              name=""
              id=""
              className="border border-gray-500 w-full my-2 h-[35px] px-2 outline-none"
              value={emailTitle}
              onChange={(e) => setEmailTitle(e.target.value)}
            />
            <Button
              color="primary"
              className="rounded text-xl mt-3"
              onClick={handleCreate}
            >
              Continue
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Write;
