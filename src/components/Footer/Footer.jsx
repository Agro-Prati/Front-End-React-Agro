import React from 'react';
import './Footer.css';
import folha from '../../assets/folha.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <img
                src={folha}
                alt="Agro+Prati Logo"
                style={{ height: '32px', width: '32px' }}
              />
              <span>Agro+Prati</span>
            </div>
            <p>Revolucionando o agronegócio com inteligência artificial e tecnologia de ponta.</p>
            <div className="social-links">
              <a href="#" aria-label="Facebook">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" aria-label="LinkedIn">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#" aria-label="YouTube">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
          <div className="footer-section">
            <h4>Links Úteis</h4>
            <ul>
              <li>
                <a href="#home">Início</a>
              </li>
              <li>
                <a href="#sobre">Sobre</a>
              </li>
              <li>
                <a href="#solucoes">Soluções</a>
              </li>
              <li>
                <a href="#parceiros">Parceiros</a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Suporte</h4>
            <ul>
              <li>
                <a href="#contato">Contato</a>
              </li>
              <li>
                <a href="#">FAQ</a>
              </li>
              <li>
                <a href="#">Documentação</a>
              </li>
              <li>
                <a href="#">Tutoriais</a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Newsletter</h4>
            <p>Receba novidades e dicas agrícolas</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Seu email" />
              <button type="submit" aria-label="Enviar newsletter">
                <i className="fas fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Agro+Prati. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
