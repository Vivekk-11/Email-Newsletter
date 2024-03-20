"use client";

import { subscribersAnalytics } from "@/actions/subscribers.analytics";
import { useEffect, useState } from "react";

interface subscribersAnalyticsData {
  month: string;
  count: number;
}

const useSubscribersAnalytics = () => {
  const [subscribersData, setSubscribersData] = useState<
    subscribersAnalyticsData[]
  >([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await subscribersAnalytics();
      if (data?.last7Months) {
        setSubscribersData(data?.last7Months);
        setLoading(false);
      }
    })();
  }, []);
  return { subscribersData, loading };
};

export default useSubscribersAnalytics;
