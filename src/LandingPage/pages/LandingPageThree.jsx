import React, { useContext } from "react";
import "./LandingPageThree.css";
import Slider from "./Slider";
import ImageSlider from "./ImageSlider";
import { CryptoContext } from "../../context/CryptoContext";
const LandingPageThree = () => {
  const { cryptoData } = useContext(CryptoContext);
  return (
    <>
      <section className="LP-ThreeSection">
        <div className="LPThree-Header">
          <h1>All your Investment in a Single View</h1>
          <p>
            Communal Trader is the best tool to track everything from NFTs to
            DeFi and Stock
          </p>
        </div>

        <section className="LPThree-SliderSection">
          <div className="LPThree-SliderBoxes">
            <div className="LPThree-SliderWidth">
              <p className="SliderBigP">
                With support for over 300+ wallets and exchange, everyone is
                included
              </p>
              <p className="SliderSmallP">
                Setup challenges and games to see who is the best trader in the
                group!.Setup challenges and games to see who is the best trader
                in the group!. Setup challenges and games to see who is the best
                trader in the group!.
              </p>
              <div className="SliderDiv">
                <Slider items={cryptoData} direction="left" />
              </div>
              <div className="SliderDiv">
                <Slider items={cryptoData} direction="right" />
              </div>
            </div>
          </div>

          <div className="LPThree-SliderBoxes">
            <div className="LPThree-SliderWidth">
              <p className="SliderBigP">
                WiCheck over 500 crypto with detailed information
              </p>
              <p className="SliderSmallP">
                Setup challenges and games to see who is the best trader in the
                group!.Setup challenges and games to see who is the best trader
                in the group!. Setup challenges and games to see who is the best
                trader in the group!.
              </p>
              <div className="SliderDiv">
                <ImageSlider items={cryptoData} direction="right" />
              </div>
              <div className="SliderDiv">
                <ImageSlider items={cryptoData} direction="left" />
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default LandingPageThree;
