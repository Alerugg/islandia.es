// src/js/component/footer.jsx

import React from "react";
import "../../styles/footer.css";

export const Footer = () => {
  return (
    <footer className="pastel-footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>Islandia.es</h4>
          <ul>
            <li><a href="#">Sobre nosotros</a></li>
            <li><a href="#">Términos y condiciones</a></li>
            <li><a href="#">Contacto</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Soporte</h4>
          <ul>
            <li><a href="#">Ayuda</a></li>
            <li><a href="#">Política de Privacidad</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Síguenos</h4>
          <ul>
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Instagram</a></li>
            <li><a href="#">YouTube</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 Islandia.es - Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};
