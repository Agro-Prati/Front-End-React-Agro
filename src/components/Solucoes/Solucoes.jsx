import React from 'react';
import './Solucoes.css';

const Solucoes = ({ items }) => {
  const defaultItems = [
    {
      icon: 'fas fa-robot',
      title: 'Chatbot Inteligente',
      description: 'IA especializada que responde dúvidas sobre plantio, manejo, pragas e doenças 24 horas por dia.',
      features: [
        'Orientações de cultivo',
        'Diagnóstico de problemas',
        'Cronogramas de plantio',
        'Dicas de manejo'
      ]
    },
    {
      icon: 'fas fa-users',
      title: 'Rede de Profissionais',
      description: 'Conectamos você aos melhores profissionais do agronegócio na sua região.',
      features: [
        'Engenheiros agrônomos',
        'Técnicos especializados',
        'Consultores agrícolas',
        'Veterinários'
      ]
    },
    {
      icon: 'fas fa-shopping-cart',
      title: 'Marketplace Integrado',
      description: 'Acesso direto a fornecedores confiáveis de insumos, medicamentos e equipamentos.',
      features: [
        'Defensivos agrícolas',
        'Fertilizantes',
        'Sementes certificadas',
        'Equipamentos'
      ]
    }
  ];

  const solutions = items || defaultItems;

  return (
    <section id="solucoes" className="solucoes">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Nossas Soluções</h2>
          <p className="section-subtitle">Tecnologia a serviço da agricultura inteligente</p>
        </div>
        <div className="solucoes-grid">
          {solutions.map((item, index) => (
            <div key={index} className="solucao-card">
              <div className="card-icon">
                <i className={item.icon}></i>
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <ul>
                {item.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solucoes;