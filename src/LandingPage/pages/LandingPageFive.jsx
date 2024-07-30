import React, { useState, useEffect } from "react";
import "./LandingPageFive.css";
import photo1 from "../../assets/humanimages/first.jpg";
import photo2 from "../../assets/humanimages/second.jpeg";
import photo3 from "../../assets/humanimages/third.jpg";
import photo4 from "../../assets/humanimages/fourth.jpg";
import photo5 from "../../assets/humanimages/fifth.jpg";
import photo6 from "../../assets/humanimages/fifth.png";
import Eth from "../../assets/images/Ethereum.png";
import Btc from "../../assets/images/bitcoin.svg";
import Bnb from "../../assets/images/binancesmartchain.svg";
import Usdt from "../../assets/images/USDT.png";
import Base from "../../assets/images/Base.png";
const items = [
  {
    id: 1,
    name: "Alice Johnson",
    img: photo6,
    wallet: "0xA...sdfghd5e4",
    amount: "$55,000",
    coinImg: Eth,
  },
  {
    id: 2,
    name: "Bob Smith",
    img: photo5,
    wallet: "0xB...fghijkbf6",
    amount: "$120 USD",
    coinImg: Btc,
  },
  {
    id: 3,
    name: "Charlie Davis",
    img: photo3,
    wallet: "0xC...ghijklr56",
    amount: "$735",
    coinImg: Usdt,
  },
  {
    id: 4,
    name: "Dana Lee",
    img: photo2,
    wallet: "0xD...hijklmtr5",
    amount: "$3,000",
    coinImg: Usdt,
  },
  {
    id: 5,
    name: "Eve Martin",
    img: photo1,
    wallet: "0xE...ijklnm67",
    amount: "$12,000",
    coinImg: Eth,
  },
  {
    id: 6,
    name: "Frank White",
    img: photo4,
    wallet: "0xF...jklopqbf5",
    amount: "$957",
    coinImg: Bnb,
  },
];

const LandingPageFive = () => {
  const [currentIndexes, setCurrentIndexes] = useState([0, 1, 2]);
  const [animationClasses, setAnimationClasses] = useState([
    "slide-up",
    "slide-up",
    "slide-up",
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationClasses(["slide-down", "slide-down", "slide-down"]);

      setTimeout(() => {
        setCurrentIndexes((prevIndexes) => {
          return prevIndexes.map((index) => (index + 1) % items.length);
        });
        setAnimationClasses(["slide-up", "slide-up", "slide-up"]);
      }, 1000); // Match the animation duration
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section className="LPFive-Section">
        <section className="LPFive-SliderBackground">
          <div className="LPF-SliderDiv">
            <div className="LPF-SliderDivText">
              <h1>
                Check how your team portfolio is performing against the market
              </h1>
              <p>
                Depending on the metric, you can make a decision to diversify
                more, check how you stand in terms of volatility, and make
                changes to enhance performance in the market.
              </p>
            </div>

            <div className="LPF-SliderDivImg">
              <div className={`LPF-SliderDivImage ${animationClasses[0]}`}>
                <div className="SliderDivImage-Behind">
                  <div style={{ display: "flex" }}>
                    <img
                      style={{ borderRadius: "50px" }}
                      width="50px"
                      height="50px"
                      src={items[currentIndexes[0]].img}
                      alt=""
                    />
                    &nbsp;
                    <p
                      style={{
                        marginTop: "20px",
                        fontWeight: "600",
                      }}
                    >
                      {items[currentIndexes[0]].name}
                    </p>
                  </div>
                  <div>
                    <p>Wallet: {items[currentIndexes[0]].wallet}</p>
                    <div style={{ display: "flex" }}>
                      <p style={{ marginTop: "10px" }}>
                        Amount sent: {items[currentIndexes[0]].amount}
                      </p>
                      &nbsp;
                      <img
                        width="25px"
                        style={{ borderRadius: "50px", marginTop: "7px" }}
                        src={items[currentIndexes[0]].coinImg}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className={`LPF-SliderDivImage2 ${animationClasses[1]}`}>
                <div className="SliderDivImage-InFront">
                  <div style={{ display: "flex" }}>
                    <img
                      style={{ borderRadius: "50px" }}
                      width="50px"
                      height="50px"
                      src={items[currentIndexes[1]].img}
                      alt=""
                    />
                    &nbsp;
                    <p style={{ marginTop: "20px", fontWeight: "600" }}>
                      {items[currentIndexes[1]].name}
                    </p>
                  </div>
                  <div>
                    <p>Wallet: {items[currentIndexes[1]].wallet}</p>
                    <div style={{ display: "flex" }}>
                      <p style={{ marginTop: "10px" }}>
                        Amount sent: {items[currentIndexes[1]].amount}
                      </p>
                      &nbsp;
                      <img
                        width="30px"
                        style={{ borderRadius: "50px", marginTop: "7px" }}
                        src={items[currentIndexes[1]].coinImg}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className={`LPF-SliderDivImage ${animationClasses[2]}`}>
                <div className="SliderDivImage-Behind">
                  <div style={{ display: "flex" }}>
                    <img
                      style={{ borderRadius: "50px" }}
                      width="50px"
                      height="50px"
                      src={items[currentIndexes[2]].img}
                      alt=""
                    />
                    &nbsp;
                    <p style={{ marginTop: "20px", fontWeight: "600" }}>
                      {items[currentIndexes[2]].name}
                    </p>
                  </div>
                  <div>
                    <p>Wallet: {items[currentIndexes[2]].wallet}</p>
                    <div style={{ display: "flex" }}>
                      <p style={{ marginTop: "10px" }}>
                        Amount sent: {items[currentIndexes[2]].amount}
                      </p>
                      &nbsp;
                      <img
                        style={{ borderRadius: "50px", marginTop: "7px" }}
                        width="25px"
                        src={items[currentIndexes[2]].coinImg}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default LandingPageFive;
