import React from "react";
import Slider from "react-slick";
import img1 from "../assets/img/img1.jpg";
import img2 from "../assets/img/img2.jpg";
import img3 from "../assets/img/img3.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/SlickCarousel.css";

function SlickCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: false,
        },
      },
    ],
  };

  return (
    <div className="slick-container">
      <Slider {...settings}>
        <div>
          <img src={img1} alt="Placeholder 1" className="slick-image" />
        </div>
        <div>
          <img src={img2} alt="Placeholder 2" className="slick-image" />
        </div>
        <div>
          <img src={img3} alt="Placeholder 3" className="slick-image" />
        </div>
      </Slider>
    </div>
  );
}

export default SlickCarousel;
