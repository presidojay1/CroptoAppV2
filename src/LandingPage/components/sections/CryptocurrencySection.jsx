import React, { useContext } from "react";

import ListCoin from "../ListCoin/index";
import { CryptoContext } from "../../../context/CryptoContext";

export default function CryptocurrencySection() {
  const { cryptoData } = useContext(CryptoContext);

  if (!cryptoData || cryptoData.length === 0) {
    return <div></div>;
  }

  const trendingCoins = [
    {
      image: cryptoData[9]?.image,
      name: cryptoData[9]?.name,
      price: cryptoData[9]?.current_price,
      uptrend: false,
    },
    {
      image: cryptoData[8]?.image,
      name: cryptoData[8]?.name,
      price: cryptoData[8]?.current_price,
      uptrend: true,
    },
    {
      image: cryptoData[7]?.image,
      name: cryptoData[7]?.name,
      price: cryptoData[7]?.current_price,
      uptrend: true,
    },
    {
      image: cryptoData[6]?.image,
      name: cryptoData[6]?.name,
      price: cryptoData[6]?.current_price,
      uptrend: false,
    },
  ];

  const allCoins = [
    {
      image: cryptoData[0]?.image,
      name: cryptoData[0]?.name,
      price: cryptoData[0]?.current_price,
      uptrend: false,
    },
    {
      image: cryptoData[1]?.image,
      name: cryptoData[1]?.name,
      price: cryptoData[1]?.current_price,
      uptrend: true,
    },
    {
      image: cryptoData[2]?.image,
      name: cryptoData[2]?.name,
      price: cryptoData[2]?.current_price,
      uptrend: true,
    },
    {
      image: cryptoData[3]?.image,
      name: cryptoData[3]?.name,
      price: cryptoData[3]?.current_price,
      uptrend: false,
    },
  ];

  const recentlyCoins = [
    {
      image: cryptoData[4]?.image,
      name: cryptoData[4]?.name,
      price: cryptoData[4]?.current_price,
      uptrend: true,
    },
    {
      image: cryptoData[6]?.image,
      name: cryptoData[6]?.name,
      price: cryptoData[6]?.current_price,
      uptrend: true,
    },
    {
      image: cryptoData[5]?.image,
      name: cryptoData[5]?.name,
      price: cryptoData[5]?.current_price,
      uptrend: false,
    },
    {
      image: cryptoData[7]?.image,
      name: cryptoData[7]?.name,
      price: cryptoData[7]?.current_price,
      uptrend: false,
    },
  ];

  return (
    <section className="relative md:-mt-10">
      <div
        style={{ backgroundColor: "#2b0646" }}
        className="mx-auto rounded-3xl lg:mx-8 py-8 px-4 shadow-lg"
      >
        <div className="grid md:grid-cols-2 xl:grid-cols-3">
          <div className="px-4 mb-6 lg:mb-0">
            <ListCoin title="🔥 Trending" data={trendingCoins} more="/" />
          </div>
          <div className="px-4 mb-6 lg:mb-0">
            <ListCoin title="🚀  Top Gainers " data={allCoins} more="/" />
          </div>
          <div className="px-4 mb-6 lg:mb-0">
            <ListCoin
              title="💎  Recently Added"
              data={recentlyCoins}
              more="/"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
