import React, { useEffect } from "react";
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./LandingPageFour.css";
import invertcommas from "../images/particles/star1.svg";

import photo1 from "../../assets/humanimages/first.jpg";
import photo2 from "../../assets/humanimages/second.jpeg";
import photo3 from "../../assets/humanimages/third.jpg";
import photo4 from "../../assets/humanimages/fourth.jpg";

const LandingPageFour = () => {
  useEffect(() => {
    new Swiper(".mySwiper", {
      modules: [Navigation, Pagination],
      slidesPerView: 1,
      grabCursor: true,
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }, []);

  return (
    <section className="LandingPage-Section">
      <div className="testimonial mySwiper">
        <h1 className="LandingPage-SectionH1">Testimonials</h1>
        &nbsp;
        <img
          style={{ margin: "auto" }}
          src={invertcommas}
          width="50px"
          alt=""
          className=""
        />
        &nbsp; &nbsp; &nbsp;
        <div
          style={{ height: "450px", marginTop: "20px" }}
          className="testi-content swiper-wrapper "
        >
          <div className="slide swiper-slide">
            <img src={photo1} alt="" className="image" />
            <p className="TextSlides">
              "Using this crypto trading platform has revolutionized my
              investment strategy. The intuitive interface and real-time
              analytics help me make informed decisions quickly. I highly
              recommend it to anyone serious about trading."
            </p>
            <i className="bx bxs-quote-alt-left quote-icon"></i>
            <div className="details">
              <span className="name">Marnie Lotter</span>
              <span className="job">Financial Analyst</span>
            </div>
          </div>
          <div className="slide swiper-slide">
            <img src={photo2} alt="" className="image" />
            <p className="TextSlides">
              "As a seasoned trader, I appreciate the robust security features
              and comprehensive market data this platform provides. It's my
              go-to tool for managing my crypto portfolio."
            </p>
            <i className="bx bxs-quote-alt-left quote-icon"></i>
            <div className="details">
              <span className="name">John Doe</span>
              <span className="job">Professional Trader</span>
            </div>
          </div>
          <div className="slide swiper-slide">
            <img src={photo3} alt="" className="image" />
            <p className="TextSlides">
              "The customer support is phenomenal. Whenever I have a question or
              need assistance, their team is always ready to help. This level of
              service gives me confidence in my trading activities."
            </p>
            <i className="bx bxs-quote-alt-left quote-icon"></i>
            <div className="details">
              <span className="name">Sarah Lee</span>
              <span className="job">Crypto Enthusiast</span>
            </div>
          </div>
          <div className="slide swiper-slide">
            <img src={photo4} alt="" className="image" />
            <p className="TextSlides">
              "I started using this platform as a beginner, and the educational
              resources and easy-to-use interface have been incredibly helpful.
              It's a great platform for both beginners and experienced traders."
            </p>
            <i className="bx bxs-quote-alt-left quote-icon"></i>
            <div className="details">
              <span className="name">Michael Smith</span>
              <span className="job">Blockchain Developer</span>
            </div>
          </div>
        </div>
        <div className="swiper-button-next nav-btn"></div>
        <div className="swiper-button-prev nav-btn"></div>
        <div className="swiper-pagination"></div>
      </div>
    </section>
  );
};

export default LandingPageFour;
