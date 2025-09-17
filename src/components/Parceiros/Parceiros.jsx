import React from 'react';
import './Parceiros.css';

const Parceiros = () => {
  const parceiros = [
    {
      nome: 'Sicredi',
      tipo: 'Cooperativa Financeira',
      logo: '🏦', // Placeholder - será substituído por logo real
      descricao: 'Parceria para soluções financeiras agrícolas'
    },
    {
      nome: 'Bayer',
      tipo: 'Agronegócio',
      logo: '🌱', // Placeholder - será substituído por logo real
      descricao: 'Inovação em sementes e proteção de cultivos'
    },
    {
      nome: 'Banco do Brasil',
      tipo: 'Instituição Financeira',
      logo: '🏛️', // Placeholder - será substituído por logo real
      descricao: 'Crédito rural e apoio ao agronegócio'
    },
    {
      nome: 'B3',
      tipo: 'Bolsa de Valores',
      logo: '📈', // Placeholder - será substituído por logo real
      descricao: 'Negociação de contratos agrícolas futuros'
    },
    {
      nome: 'Embrapa',
      tipo: 'Pesquisa Agropecuária',
      logo: '🔬', // Placeholder - será substituído por logo real
      descricao: 'Centro de pesquisa e inovação agrícola'
    },
    {
      nome: 'UFPR',
      tipo: 'Universidade',
      logo: '🎓', // Placeholder - será substituído por logo real
      descricao: 'Pesquisa e formação em agronomia'
    },
    {
      nome: 'UTFPR',
      tipo: 'Universidade',
      logo: '📚', // Placeholder - será substituído por logo real
      descricao: 'Tecnologia e inovação para o agronegócio'
    }
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
                <span className="logo-icon">{parceiro.logo}</span>
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
            <div className="stat-number">7+</div>
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
