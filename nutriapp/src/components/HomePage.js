import React from "react";
import TopBar from "./TopBar";
import ContactoForm from "./ContactoForm";
import Footer from "./Footer";
import Wave from "./Wave";
import "../styles/HomePage.css";
//import imagen1 from "../images/imagen1.jpg";
//import imagen2 from "../images/imagen2.jpg";
//import imagen3 from "../images/imagen3.jpg";

function Home() {
  return (
    <div>
      <TopBar></TopBar>
      <div className="home-container">
        <div className="home-left">
          <h1>Bienvenidos a NutriApp</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
            gravida dolor sit amet lacus accumsan et viverra justo commodo.
            Proin sodales pulvinar tempor. Cum sociis natoque penatibus et
            magnis dis parturient montes, nascetur ridiculus mus.
          </p>
          <button className="home-button">Regístrate</button>
        </div>
        <div className="home-right">
          <Wave />
        </div>
      </div>
      <div className="register-container">
        <h2>¿Eres nutricionista?</h2>
        <p>Regístrate para acceder a la zona de nutricionistas registrados</p>
        <button className="home-button">Regístrate</button>
      </div>
      <div>
        <ContactoForm />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
