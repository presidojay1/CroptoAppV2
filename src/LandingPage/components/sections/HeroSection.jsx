import React from "react";
import { FaWindows, FaLinux, FaAppStore, FaAndroid } from "react-icons/fa";

import globoCrypto from "../../images/illustrations/globe.png";
import PrimaryButton from "../buttons/PrimaryButton/index";
import BlueCircleParticle from "../particles/BlueCircleParticle";
import OrangeCircleParticle from "../particles/OrangeCircleParticle";
import StarParticle from "../particles/StarParticle";
import PurpleCircleParticle from "../particles/PurpleCircleParticle";
import DropdownButton from "../buttons/DropdownButton";

export default function HeroSection() {
  return (
    <section className="relative bg-primary pt-[140px] bg-opacity-5 pb-24">
      <span className="absolute bg-purple-400 -left-28 -top-28 rounded-full opacity-[20%] blur-3xl aspect-square h-[350px] -z-10 animate-pulse" />
      <span className="absolute bg-gradient-to-br from-primary to-secondary -right-28 -bottom-28 rounded-full opacity-[15%] blur-3xl  delay-700 duration-1000 aspect-square h-[550px] -z-10" />

      <div className="container px-4 mx-auto grid md:grid-cols-2">
        <div className="flex items-center">
          <div className="relative">
            <StarParticle className="absolute top-0 right-0" />
            <PurpleCircleParticle className="absolute bottom-0 -left-12" />

            <p className="text-primary">SIGN UP TODAY</p>
            <h1 className="text-4xl text-white md:text-5xl lg:text-6xl font-bold leading-normal">
              The World’s <br />
              <span className="text-blue-gradient">Fastest Growing</span> <br />
              Crypto Web App
            </h1>
            <div className="mt-4 mb-8">
              <p className="text-white">
                Buy and sell 200+ cryptocurrencies with 20+ flat currencies
                using
              </p>
              <p className="text-white">
                bank transfers or your credit/debit card.
              </p>
            </div>
            <div className="col-span-2 lg:flex gap-4 lg:mb-12">
              <PrimaryButton className="w-full lg:w-auto mb-2 lg:mb-0">
                Connect Wallet
              </PrimaryButton>
            </div>
          </div>
        </div>
        <div className="relative hidden md:block">
          <BlueCircleParticle className="absolute top-0 left-11 duration-[5s]" />
          <OrangeCircleParticle className="absolute bottom-1/4 right-0" />

          <img src={globoCrypto} alt="Globe" />
        </div>
      </div>
    </section>
  );
}
