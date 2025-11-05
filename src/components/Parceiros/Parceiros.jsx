import React from 'react';
import './Parceiros.css';
import sicrediLogo from '../../assets/parceiros/logo-sicredi.png'; 
import bayerLogo from '../../assets/parceiros/logo-bayer.png';
import bancoDoBrasilLogo from '../../assets/parceiros/bb-logo.jpg';
import b3Logo from '../../assets/parceiros/logo-B3.png';
import embrapaLogo from '../../assets/parceiros/logo-embrapa.png';
import ufprLogo from '../../assets/parceiros/logo-ufpr.png';
import utfprLogo from '../../assets/parceiros/logo-utfpr.png';
import pucprLogo from '../../assets/parceiros/pucpr-logo.jpg';
import pucrsLogo from '../../assets/parceiros/pucrs-logo.png';

const Parceiros = () => {
  const parceiros = [
    {
      nome: 'Sicredi',
      tipo: 'Cooperativa Financeira',
      logo: sicrediLogo, 
      descricao: 'Parceria para soluções financeiras agrícolas',
    },
    {
      nome: 'Bayer',
      tipo: 'Agronegócio',
      logo: bayerLogo, 
      descricao: 'Inovação em sementes e proteção de cultivos',
    },
    {
      nome: 'Banco do Brasil',
      tipo: 'Instituição Financeira',
      logo: bancoDoBrasilLogo, 
      descricao: 'Crédito rural e apoio ao agronegócio',
    },
    {
      nome: 'B3',
      tipo: 'Bolsa de Valores',
      logo: b3Logo, 
      descricao: 'Negociação de contratos agrícolas futuros',
    },
    {
      nome: 'Embrapa',
      tipo: 'Pesquisa Agropecuária',
      logo: embrapaLogo, 
      descricao: 'Centro de pesquisa e inovação agrícola',
    },
    {
      nome: 'UFPR',
      tipo: 'Universidade',
      logo: ufprLogo, 
      descricao: 'Pesquisa e formação em agronomia',
    },
    {
      nome: 'UTFPR',
      tipo: 'Universidade',
      logo: utfprLogo, 
      descricao: 'Tecnologia e inovação para o agronegócio',
    },
    {
      nome: 'PUCPR',
      tipo: 'Universidade',
      logo: pucprLogo, 
      descricao: 'Excelência em ensino e pesquisa agropecuária',
    },
    {
      nome: 'PUCRS',
      tipo: 'Universidade',
      logo: pucrsLogo, 
      descricao: 'Pesquisa e desenvolvimento em ciências agrárias',
    },
  ];

  return (
    <section id="parceiros" className="parceiros">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Nossos Parceiros</h2>
          <p className="section-subtitle">Empresas e instituições que confiam em nossas soluções</p>
        </div>

        <div className="parceiros-logos">
          {parceiros.map((parceiro, index) => (
            <div key={index} className="parceiro-logo-item" title={parceiro.descricao}>
              <div className="parceiro-logo">
              <img src={parceiro.logo} alt={`Logo de ${parceiro.nome}`} />
              </div>
              <div className="parceiro-info">
                <h4 className="parceiro-nome">{parceiro.nome}</h4>
                <p className="parceiro-tipo">{parceiro.tipo}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="parceiros-stats">
          <div className="stat-item">
            <div className="stat-number">9+</div>
            <div className="stat-label">Parceiros Estratégicos</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">15+</div>
            <div className="stat-label">Anos de Parceria</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">100%</div>
            <div className="stat-label">Confiança Institucional</div>
          </div>
        </div>

        <div className="cta-parceiro">
          <h3>Seja nosso parceiro</h3>
          <p>Faça parte da maior rede de soluções agrícolas do país</p>
          <button className="btn btn-primary">Cadastre-se como Parceiro</button>
        </div>
      </div>
    </section>
  );
};

export default Parceiros;
