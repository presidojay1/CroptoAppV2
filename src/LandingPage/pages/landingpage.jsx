import React from "react";

import Layout from "../components/Layout/index";
import CryptocurrencySection from "../components/sections/CryptocurrencySection";
import HeroSection from "../components/sections/HeroSection";
import BuyAndTradeSection from "../components/sections/BuyAndTradeSection";
import PartnerSection from "../components/sections/PartnerSection";
import CreditCardSection from "../components/sections/CreditCardSection";
import TradingToolsSection from "../components/sections/TradingToolsSection";
import SecuritySection from "../components/sections/SecuritySection";
import StepSection from "../components/sections/StepSection";
import FaqSection from "../components/sections/FaqSection";
import BackToTopSection from "../components/sections/BackToTopSection";
import LandingPageThree from "./LandingPageThree";
import LandingPageFive from "./LandingPageFive";
import LandingPageFour from "./LandingPageFour";

const landingpage = () => {
  return (
    <Layout>
      <HeroSection />
      <CryptocurrencySection />
      <BuyAndTradeSection />
      <PartnerSection />
      <LandingPageThree />
      <CreditCardSection />
      <TradingToolsSection />
      <LandingPageFour />
      <SecuritySection />
      <StepSection />
      <LandingPageFive />
      <FaqSection />
      <BackToTopSection />
    </Layout>
  );
};

export default landingpage;
