import React from "react";
import PropTypes from "prop-types";

import emoji from "react-easy-emoji";
import { BsChevronRight } from "react-icons/bs";

import CoinRow from "./CoinRow";

export default function ListCoin({ title, more, data }) {
  return (
    <>
      <div className="flex justify-between mb-6">
        <span className="font-bold text-lg">
          {emoji(title, {
            props: { className: "inline-block mr-4 text-normal" },
          })}
        </span>
        <a href={more} className="text-primary">
          More
          <BsChevronRight className="inline ml-2" />
        </a>
      </div>
      <div>
        <div className="grid grid-cols-3 mb-4">
          <span className="text-white">Name</span>
          <span className="text-white">Price</span>
          <span className="text-white">Chart</span>
        </div>
        {data.map(({ image, name, price, uptrend }, i) => (
          <CoinRow
            key={i}
            image={image}
            coinName={name}
            coinPrice={price}
            coinUpTrend={uptrend}
          />
        ))}
      </div>
    </>
  );
}

ListCoin.propTypes = {
  title: PropTypes.string,
  more: PropTypes.string,
  data: PropTypes.array.isRequired,
};
