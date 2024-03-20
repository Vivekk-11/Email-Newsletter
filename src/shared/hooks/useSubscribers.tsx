"use client";
import { getSubscribers } from "@/actions/get.subscribers";
import { useClerk } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useSubscribers = () => {
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useClerk();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await getSubscribers({ newsletterOwnerId: user?.id });
        setLoading(false);
        if (Array.isArray(data)) {
          setSubscribers(data);
        }
      } catch (error) {
        setLoading(false);
        toast.error("Something went wrong, please try again!");
      }
    })();
  }, [user?.id]);

  return { subscribers, loading };
};

export default useSubscribers;
