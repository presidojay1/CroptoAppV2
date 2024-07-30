import React from "react";

import tradingTools from "../../images/illustrations/tradingtools.png";
import SecondaryButton from "../buttons/SecondaryButton/index";
import { Fade } from "react-reveal";

export default function TradingToolsSection() {
  return (
    <section className="px-6">
      <div
        style={{ backgroundColor: "#2b0646", color: "white" }}
        className="rounded-3xl py-20"
      >
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="lg:row-start-1 max-w-lg">
              <h2 className="font-bold text-4xl mb-6 leading-normal">
                Advanced Trading{" "}
                <span className="text-blue-gradient">Tools</span>
              </h2>
              <div className="mb-6">
                <h3 className="font-bold text-xl mb-4">
                  Professional Access, Non-stop Availability
                </h3>
                <p className="text-white">
                  We provide premium access to crypto trading for both
                  individuals and institutions through high liquidity, reliable
                  order execution and constant uptime.
                </p>
              </div>
              <div className="mb-6">
                <h3 className="font-bold text-xl mb-4">
                  A Range of Powerful Apis
                </h3>
                <p className="text-white">
                  Set up your own trading interface or deploy your algorithmic
                  strategy with our high-performance FIX and HTTP APIs. Connect
                  to our WebSocket for real-time data streaming.
                </p>
              </div>
              <div className="mb-6">
                <h3 className="font-bold text-xl mb-4">Customer Support</h3>
                <p className="text-white">
                  Premium 24/7 support available to all customers worldwide by
                  phone or email. Dedicated account managers for partners.
                </p>
              </div>
              <SecondaryButton>Get Started</SecondaryButton>
              <a href="#">
                <button className="py-4 px-10 text-primary underline">
                  Learn more
                </button>
              </a>
            </div>
            <div className="row-start-1 mb-8">
              <Fade up>
                <img src={tradingTools} alt="" />
              </Fade>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
