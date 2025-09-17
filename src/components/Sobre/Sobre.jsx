import React from 'react';
import './Sobre.css';

const Sobre = () => {
  return (
    <section id="sobre" className="sobre">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Sobre a Agro+Prati</h2>
          <p className="section-subtitle">Revolucionando o agronegócio com tecnologia de ponta</p>
        </div>
        <div className="sobre-content">
          <div className="sobre-text">
            <h3>Nossa Missão</h3>
            <p>
              Democratizar o acesso ao conhecimento agrícola através da inteligência artificial,
              conectando produtores rurais a soluções eficientes e parceiros qualificados.
            </p>
            <h3>Nossa Visão</h3>
            <p>
              Ser a principal plataforma de soluções inteligentes para o agronegócio,
              transformando a agricultura através da tecnologia.
            </p>
            <div className="stats">
              <div className="stat-item">
                <h4>1000+</h4>
                <span>Agricultores Atendidos</span>
              </div>
              <div className="stat-item">
                <h4>50+</h4>
                <span>Parceiros Cadastrados</span>
              </div>
              <div className="stat-item">
                <h4>24/7</h4>
                <span>Suporte Disponível</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sobre;