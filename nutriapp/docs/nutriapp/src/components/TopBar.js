import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import "../styles/TopBar.css";

function TopBar() {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const renderMenuLinks = () => {
    return (
      <nav className="TopBar-menu">
        <Link to="/equipo" className="TopBar-menu-link" onClick={closeMenu}>
          Inicio
        </Link>
        <Link to="/servicios" className="TopBar-menu-link" onClick={closeMenu}>
          Presentacion
        </Link>
        <Link to="/contacto" className="TopBar-link">
          Contacto
        </Link>
        <Link
          to="/acceso-registro"
          className="TopBar-menu-button"
          onClick={closeMenu}
        >
          Acceso / Registro
        </Link>
      </nav>
    );
  };

  return (
    <div className="TopBar">
      <div className="TopBar-left">
        <Link to="/" className="TopBar-logo-link">
          <img
            className="TopBar-logo"
            src="https://user-images.githubusercontent.com/78279221/228049695-35250b6d-536d-4101-aa97-11fc30802a9d.png"
            alt="NutriApp Logo"
          />
        </Link>
        {!isMobile && (
          <nav className="TopBar-links">
            <Link to="/equipo" className="TopBar-link">
              Inicio
            </Link>
            <Link to="/servicios" className="TopBar-link">
              Presentacion
            </Link>
            <Link to="/contacto" className="TopBar-link">
              Contacto
            </Link>
          </nav>
        )}
      </div>
      {isMobile && (
        <div className="TopBar-menu-icon" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      )}
      {isMobile && menuOpen && renderMenuLinks()}
      {!isMobile && (
        <div className="TopBar-right">
          <Link to="/acceso-registro" className="TopBar-button">
            Acceso / Registro
          </Link>
        </div>
      )}
    </div>
  );
}

export default TopBar;
