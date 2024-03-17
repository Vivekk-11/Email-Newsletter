"use client";
import PricingCard from "@/shared/components/cards/PricingCard";
import { Button } from "@nextui-org/react";
import React, { useState } from "react";

const Pricing = () => {
  const [active, setActive] = useState("Monthly");
  return (
    <div className="w-full bg-[#fec8eb]">
      <div className="py-5 m-auto w-[95%]">
        <div className="w-full md:flex justify-between">
          <div>
            <h3 className="font-clashDisplay text-center lg:text-left uppercase text-cyber-ink text-[2.75rem] md:text-7xl lg:text-[4rem] xl:text-[5.5rem] max-w-4xl">
              Pricing
            </h3>
            <p className="text-3xl">Simple. Predictable. Built for you.</p>
          </div>
          <div className="flex items-center mt-2 md:mt-0 gap-2">
            <Button
              className={`${
                active === "Monthly"
                  ? "bg-[#3843D0] text-white"
                  : "bg-white text-black"
              } rounded-r-[0] !p-7 text-2xl !px-16 border border-[#000]`}
              onClick={() => setActive("Monthly")}
            >
              Monthly
            </Button>
            <Button
              className={`${
                active === "Yearly"
                  ? "bg-[#3843D0] text-white"
                  : "bg-white text-black"
              } rounded-l-[0] !p-7 text-2xl !px-16 border border-[#000]`}
              onClick={() => setActive("Yearly")}
            >
              Yearly
            </Button>
          </div>
        </div>

        <PricingCard active={active} />
      </div>
    </div>
  );
};

export default Pricing;
