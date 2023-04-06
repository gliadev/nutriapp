import React from "react";
import "../styles/Footer.css";
import logo from "../assets/logos/linkLogo.jpg";

function Footer() {
  return (
    <div className="footer-container">
      <div className="logo-info-container">
        <div className="links-container">
          <a href="#">Inicio</a>
          <a href="#">Nosotros</a>
          <a href="#">Contacto</a>
        </div>
        <div className="designer-logo-container">
          <p>Diseñado por gliaDEV</p>
          <a
            href="https://www.linkedin.com/in/adolfo--gomez/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={logo} alt="Logo" className="logo-image" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
