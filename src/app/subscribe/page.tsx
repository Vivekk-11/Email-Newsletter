"use client";
import { addSubscriber } from "@/actions/add.subscribe";
import { useClerk } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import React, { FormEvent, useState } from "react";
import toast from "react-hot-toast";

const SubscribePage = () => {
  const [value, setValue] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const username: string = searchParams.get("username")!;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const response: string | { error: string } = await addSubscriber({
      email: value,
      username,
    });
    setLoading(false);
    if (typeof response === "object" && response.error) {
      toast.error(response.error);
      return;
    }
    toast.success("You are successfully subscribed!");
  };

  return (
    <div className="w-full flex flex-col items-center justify-center h-screen">
      <div>
        <h1 className="text-7xl capitalize pb-8">{username} Newsletter</h1>
      </div>
      <form
        className="flex w-full max-w-md border rounded overflow-hidden"
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          name="email"
          required
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter your email"
          className="px-4 py-4 w-full text-gray-700 leading-tight focus:outline-none border border-gray-300"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-8 bg-blue-500 text-white font-bold py-4 rounded-r hover:bg-blue-600 focus:outline-none"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default SubscribePage;
