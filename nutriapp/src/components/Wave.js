import React from "react";
require("../styles/Wave.css");

function Wave() {
  return (
    <div className="wave-container">
      <svg
        className="wave-svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#f8b24e"
          fillOpacity="1"
          d="M0,192L48,202.7C96,213,192,235,288,213.3C384,192,480,128,576,106.7C672,85,768,107,864,117.3C960,128,1056,128,1152,133.3C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
      <canvas className="wave-canvas"></canvas>
    </div>
  );
}

export default Wave;
