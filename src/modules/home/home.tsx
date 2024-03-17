import Header from "@/shared/widgets/header/Header";
import React from "react";
import Banner from "./features/Banner";
import Branding from "./features/Branding";
import Benefits from "./features/Benefits";

const Home = () => {
  return (
    <div>
      <Header />
      <Banner />
      <Branding />
      <Benefits />
    </div>
  );
};

export default Home;
