"use client";
import { NextUIProvider } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import DashboardSidebar from "../widgets/dashboard/DashboardSidebar";
import { Toaster } from "react-hot-toast";
import { useUser } from "@clerk/nextjs";
import { addStripe } from "@/actions/add.stripe";
import { User } from "@clerk/nextjs/server";

interface ProviderProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProviderProps) {
  const pathname = usePathname();
  const { isLoaded, user } = useUser();

  if (!isLoaded) {
    return null;
  } else {
    if (user) {
      addStripe();
    }
  }

  return (
    <NextUIProvider>
      {pathname !== "/dashboard/new-email" &&
      pathname !== "/" &&
      pathname !== "/sign-up" &&
      pathname !== "/sign-in" &&
      pathname !== "/success" &&
      pathname !== "/subscribe" ? (
        <div className="w-full flex">
          <div className="w-[290px] h-screen overflow-y-scroll">
            <DashboardSidebar />
          </div>
          {children}
        </div>
      ) : (
        <>{children}</>
      )}
      <Toaster reverseOrder={false} position="top-center" />
    </NextUIProvider>
  );
}
