import React from "react";
import "../styles/HomePage.css";
import TopBar from "./TopBar";
import SlickCarousel from "./SlickCarousel";
import Wave from "./Wave";
import ContactoForm from "./ContactoForm";
import Footer from "./Footer";

function Home() {
  return (
    <div>
      <TopBar />
      <div className="home-container">
        <div className="home-left">
          <h1>Bienvenidos a NutriApp</h1>
          <p>
            Hola, Gracias por pasarte. La idea de esta aplicación es ayudar a
            los nutricionistas para llevar el control de sus pacientes, se
            añadieran más mejoras
          </p>
        </div>
        <div className="home-right">
          <SlickCarousel />
          <Wave />
        </div>
      </div>
      <div className="register-container"></div>
      <div></div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
