import React, { useEffect, useRef } from "react";
import "./Slider.css"; // Import the CSS file for styling

const Slider = ({ items, direction }) => {
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    const sliderItems = Array.from(slider.children);
    const cloneItems = () => {
      sliderItems.forEach((item) => {
        const clone = item.cloneNode(true);
        slider.appendChild(clone);
      });
    };
    cloneItems();

    let speed = 0.5; // Adjust the speed as needed
    let start = null;

    const moveSlider = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;

      if (direction === "right") {
        slider.scrollLeft = (progress / 10) * speed;
        if (slider.scrollLeft >= slider.scrollWidth / 2) {
          slider.scrollLeft = 0;
          start = timestamp; // reset the start time
        }
      } else {
        slider.scrollLeft = slider.scrollWidth / 2 - (progress / 10) * speed;
        if (slider.scrollLeft <= 0) {
          slider.scrollLeft = slider.scrollWidth / 2;
          start = timestamp; // reset the start time
        }
      }

      requestAnimationFrame(moveSlider);
    };

    requestAnimationFrame(moveSlider);
  }, [direction]);

  return (
    <div className="LPThree-SliderWrapper">
      <div className="LPThree-SliderImgDiv" ref={sliderRef}>
        {items?.map((item) => (
          <div key={item.id} className="LPThree-SliderImgBox">
            <img src={item.image} width="40px" alt={item.alt} />
            &nbsp;&nbsp;
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
