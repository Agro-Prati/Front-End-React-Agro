import React from 'react';
import './Parceiros.css';

const Parceiros = () => {
  return (
    <section id="parceiros" className="parceiros">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Nossos Parceiros</h2>
          <p className="section-subtitle">Trabalhamos com os melhores do mercado</p>
        </div>
        <div className="parceiros-content">
          <div className="parceiro-categoria">
            <h3>
              <i className="fas fa-flask"></i> Fornecedores de Insumos
            </h3>
            <p>Empresas especializadas em defensivos, fertilizantes e sementes certificadas.</p>
          </div>
          <div className="parceiro-categoria">
            <h3>
              <i className="fas fa-tools"></i> Equipamentos Agrícolas
            </h3>
            <p>Distribuidores de máquinas, implementos e tecnologias para o campo.</p>
          </div>
          <div className="parceiro-categoria">
            <h3>
              <i className="fas fa-graduation-cap"></i> Profissionais Técnicos
            </h3>
            <p>Rede qualificada de agrônomos, técnicos e consultores especializados.</p>
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
