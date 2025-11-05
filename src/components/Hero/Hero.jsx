import React from 'react';
import './Hero.css';
import heroImage from '../../assets/colheitadeiras-campo.jpeg';

const Hero = ({ onOpenChat, onScrollTo }) => {
  const handleOpenChat = () => {
    if (onOpenChat) onOpenChat();
  };

  const handleScrollToSobre = () => {
    if (onScrollTo) onScrollTo('sobre');
  };

  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">
            Transforme sua Agricultura com{' '}
            <span className="highlight">Inteligência Artificial</span>
          </h1>
          <p className="hero-description">
            A Agro+Prati é a primeira plataforma que conecta agricultores a soluções inteligentes
            através de IA. Obtenha orientações especializadas sobre plantio, manejo e conecte-se com
            os melhores parceiros do agronegócio.
          </p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">5.000+</span>
              <span className="stat-label">Agricultores Ativos</span>
            </div>
            <div className="stat">
              <span className="stat-number">200+</span>
              <span className="stat-label">Parceiros Especializados</span>
            </div>
            <div className="stat">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Suporte Disponível</span>
            </div>
          </div>
          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={handleOpenChat}>
              <i className="fas fa-robot"></i>
              Conversar com IA Agrícola
            </button>
            <button className="btn btn-secondary" onClick={handleScrollToSobre}>
              <i className="fas fa-info-circle"></i>
              Saiba Mais
            </button>
          </div>
        </div>
        <div className="hero-image">
          <img src={heroImage} alt="Agricultura moderna" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
