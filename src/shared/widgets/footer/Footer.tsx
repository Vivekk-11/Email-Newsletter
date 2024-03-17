import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-black text-white pt-10">
      <div className="md:flex m-auto py-5 w-[95%]">
        <div className="w-full md:w-[40%]">
          <Link href="/">
            <h1 className="text-white font-extrabold text-3xl">LOGO</h1>
          </Link>
          <p className="text-2xl py-2">
            Get our updates delivered directly to your inbox.
          </p>
          <div className="flex items-center w-full">
            <input
              type="email"
              placeholder="Enter your Email"
              className="bg-transparent w-full md:w-[50%] border h-[42px] px-2 rounded rounded-r-[0] outline-none"
            />
            <button className="w-[90px] cursor-pointer rounded-r h-[43px] bg-blue-500 text-xl outline-none">
              Submit
            </button>
          </div>
          <br />
          <p className="text-xs">
            By subscribing you agree to with our Privacy Policy and provide
            consent to receive updates from our company.
          </p>
        </div>
        <div className="w-full md:w-[60%] flex md:justify-end justify-center py-5 md:py-0">
          <div className="md:w-[50%] flex justify-around">
            <div>
              <ul>
                <li className="text-xl pb-4 cursor-pointer">Create</li>
                <li className="text-xl pb-4 cursor-pointer">Write</li>
                <li className="text-xl pb-4 cursor-pointer">Grow</li>
                <li className="text-xl pb-4 cursor-pointer">Monetize</li>
                <li className="text-xl pb-4 cursor-pointer">Analyze</li>
              </ul>
            </div>

            <div>
              <ul>
                <li className="text-xl pb-4 cursor-pointer">Carers</li>
                <li className="text-xl pb-4 cursor-pointer">Pricing</li>
                <li className="text-xl pb-4 cursor-pointer">Shop</li>
                <li className="text-xl pb-4 cursor-pointer">Compare</li>
                <li className="text-xl pb-4 cursor-pointer">Love</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
