import { useState } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Chatbot from '../components/Chatbot/Chatbot';
import { useAuth } from '../contexts/useAuth';

function Profile() {
  const { user } = useAuth();
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    city: user?.city || '',
    state: user?.state || '',
    description: user?.description || ''
  });

  // Mapear tipo de usuário para texto amigável
  const getTipoUsuarioText = (tipo) => {
    const tipos = {
      'AGRICULTOR': 'Agricultor',
      'AGRONOMO': 'Agrônomo',
      'VETERINARIO': 'Veterinário',
      'ZOOTECNISTA': 'Zootecnista',
      'ESTUDANTE': 'Estudante'
    };
    return tipos[tipo] || tipo;
  };

  // Formatar localização (cidade, estado)
  const getLocalizacao = () => {
    if (user?.city && user?.state) {
      return `${user.city}, ${user.state}`;
    }
    if (user?.city) return user.city;
    if (user?.state) return user.state;
    return 'Não informado';
  };

  const handleEditClick = () => {
    setEditFormData({
      name: user?.name || '',
      phone: user?.phone || '',
      city: user?.city || '',
      state: user?.state || '',
      description: user?.description || ''
    });
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    // TODO: Implementar atualização no backend
    console.log('Dados atualizados:', editFormData);
    alert('Funcionalidade de atualização será implementada em breve!');
    setShowEditModal(false);
  };

  const [metricas] = useState({
    produtividadeAtual: 85,
    areaUtilizada: 120,
    economiaAgua: 25,
    reducaoAgrotoxicos: 40,
    certificacoesObtidas: 3
  });

  const [atividadesRecentes] = useState([
    { id: 1, tipo: 'Plantio', cultura: 'Soja', data: '2024-09-15', status: 'Concluído' },
    { id: 2, tipo: 'Consultoria', titulo: 'Análise de Solo', data: '2024-09-12', status: 'Em Andamento' },
    { id: 3, tipo: 'Curso', titulo: 'Técnicas de Irrigação', data: '2024-09-10', status: 'Concluído' },
    { id: 4, tipo: 'Monitoramento', titulo: 'Clima e Previsões', data: '2024-09-08', status: 'Ativo' }
  ]);

  const [recomendacoes] = useState([
    {
      id: 1,
      titulo: 'Otimização de Irrigação',
      descricao: 'Baseado na sua localização, recomendamos implementar sistema de irrigação por gotejamento.',
      prioridade: 'Alta',
      economiaPotencial: 'R$ 15.000/ano'
    },
    {
      id: 2,
      titulo: 'Rotação de Culturas',
      descricao: 'Implementar rotação soja-milho pode aumentar a produtividade em até 20%.',
      prioridade: 'Média',
      economiaPotencial: 'R$ 8.000/ano'
    },
    {
      id: 3,
      titulo: 'Certificação Orgânica',
      descricao: 'Seu perfil se qualifica para certificação orgânica. Aumento no preço de venda.',
      prioridade: 'Baixa',
      economiaPotencial: 'R$ 25.000/ano'
    }
  ]);

  const [alertas] = useState([
    {
      id: 1,
      tipo: 'Clima',
      titulo: 'Previsão de Chuva Intensa',
      mensagem: 'Chuva intensa prevista para os próximos 3 dias. Considere adiar pulverização.',
      prioridade: 'Alta',
      data: '2024-09-17'
    },
    {
      id: 2,
      tipo: 'Praga',
      titulo: 'Monitoramento de Lagarta',
      mensagem: 'Aumento na população de lagarta-do-cartucho na região.',
      prioridade: 'Média',
      data: '2024-09-16'
    }
  ]);

  const getPrioridadeColor = (prioridade) => {
    switch (prioridade) {
      case 'Alta': return '#f44336';
      case 'Média': return '#ff9800';
      case 'Baixa': return '#4caf50';
      default: return '#666';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Concluído': return '#4caf50';
      case 'Em Andamento': return '#2196f3';
      case 'Ativo': return '#ff9800';
      default: return '#666';
    }
  };

  return (
    <>
      <Header />
      <main className="page-main-no-center">
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>

          {/* Header do Perfil */}
          <div style={{
            background: 'var(--bg-white)',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: 'var(--shadow)',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
            flexWrap: 'wrap'
          }}>
            <div style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: 'var(--primary-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '3rem',
              fontWeight: 'bold'
            }}>
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>

            <div style={{ flex: 1 }}>
              <h1 style={{ color: 'var(--text-dark)', margin: '0 0 0.5rem 0', fontSize: '2rem' }}>
                {user?.name || 'Usuário'}
              </h1>
              <p style={{ color: 'var(--primary-color)', fontWeight: '600', margin: '0 0 1rem 0', fontSize: '1.1rem' }}>
                {getTipoUsuarioText(user?.type)}
              </p>
              
              {/* Descrição/Bio do usuário */}
              {user?.description && (
                <p style={{ color: 'var(--text-dark)', margin: '0 0 1rem 0', fontSize: '0.95rem', fontStyle: 'italic' }}>
                  "{user.description}"
                </p>
              )}

              <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                <div>
                  <span style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>Email</span>
                  <p style={{ color: 'var(--text-dark)', margin: '0.25rem 0', fontWeight: '500' }}>
                    {user?.email || 'Não informado'}
                  </p>
                </div>
                {user?.phone && (
                  <div>
                    <span style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>Telefone</span>
                    <p style={{ color: 'var(--text-dark)', margin: '0.25rem 0', fontWeight: '500' }}>
                      {user.phone}
                    </p>
                  </div>
                )}
                {(user?.city || user?.state) && (
                  <div>
                    <span style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>Localização</span>
                    <p style={{ color: 'var(--text-dark)', margin: '0.25rem 0', fontWeight: '500' }}>
                      {getLocalizacao()}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={handleEditClick}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: 'transparent',
                  border: '2px solid var(--primary-color)',
                  color: 'var(--primary-color)',
                  borderRadius: '6px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.background = 'var(--primary-color)';
                  e.target.style.color = 'white';
                }}
                onMouseOut={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = 'var(--primary-color)';
                }}
              >
                Editar Perfil
              </button>
            </div>
          </div>

          {/* Grid de Métricas */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            <div style={{
              background: 'var(--bg-white)',
              padding: '1.5rem',
              borderRadius: '12px',
              boxShadow: 'var(--shadow)',
              textAlign: 'center'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'var(--primary-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                fontSize: '1.5rem'
              }}>
                📊
              </div>
              <h3 style={{ color: 'var(--text-dark)', margin: '0 0 0.5rem 0', fontSize: '1.8rem' }}>
                {metricas.produtividadeAtual}%
              </h3>
              <p style={{ color: 'var(--text-light)', margin: '0', fontSize: '0.9rem' }}>
                Produtividade Atual
              </p>
            </div>

            <div style={{
              background: 'var(--bg-white)',
              padding: '1.5rem',
              borderRadius: '12px',
              boxShadow: 'var(--shadow)',
              textAlign: 'center'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'var(--success-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                fontSize: '1.5rem'
              }}>
                💧
              </div>
              <h3 style={{ color: 'var(--text-dark)', margin: '0 0 0.5rem 0', fontSize: '1.8rem' }}>
                {metricas.economiaAgua}%
              </h3>
              <p style={{ color: 'var(--text-light)', margin: '0', fontSize: '0.9rem' }}>
                Economia de Água
              </p>
            </div>

            <div style={{
              background: 'var(--bg-white)',
              padding: '1.5rem',
              borderRadius: '12px',
              boxShadow: 'var(--shadow)',
              textAlign: 'center'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'var(--warning-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                fontSize: '1.5rem'
              }}>
                🌱
              </div>
              <h3 style={{ color: 'var(--text-dark)', margin: '0 0 0.5rem 0', fontSize: '1.8rem' }}>
                {metricas.reducaoAgrotoxicos}%
              </h3>
              <p style={{ color: 'var(--text-light)', margin: '0', fontSize: '0.9rem' }}>
                Redução Agroquímicos
              </p>
            </div>

            <div style={{
              background: 'var(--bg-white)',
              padding: '1.5rem',
              borderRadius: '12px',
              boxShadow: 'var(--shadow)',
              textAlign: 'center'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'var(--info-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                fontSize: '1.5rem'
              }}>
                🏆
              </div>
              <h3 style={{ color: 'var(--text-dark)', margin: '0 0 0.5rem 0', fontSize: '1.8rem' }}>
                {metricas.certificacoesObtidas}
              </h3>
              <p style={{ color: 'var(--text-light)', margin: '0', fontSize: '0.9rem' }}>
                Certificações Obtidas
              </p>
            </div>
          </div>

          {/* Grid de Conteúdo Principal */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: '2rem',
            marginBottom: '2rem'
          }}>

            {/* Atividades Recentes */}
            <div style={{
              background: 'var(--bg-white)',
              padding: '1.5rem',
              borderRadius: '12px',
              boxShadow: 'var(--shadow)'
            }}>
              <h2 style={{ color: 'var(--text-dark)', margin: '0 0 1.5rem 0', fontSize: '1.5rem' }}>
                Atividades Recentes
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {atividadesRecentes.map(atividade => (
                  <div key={atividade.id} style={{
                    padding: '1rem',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <h4 style={{ color: 'var(--text-dark)', margin: '0 0 0.25rem 0', fontSize: '1rem' }}>
                        {atividade.tipo}: {atividade.titulo}
                      </h4>
                      <p style={{ color: 'var(--text-light)', margin: '0', fontSize: '0.9rem' }}>
                        {atividade.cultura && `Cultura: ${atividade.cultura} • `}Data: {new Date(atividade.data).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      background: getStatusColor(atividade.status) + '20',
                      color: getStatusColor(atividade.status)
                    }}>
                      {atividade.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Alertas e Recomendações */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

              {/* Alertas */}
              <div style={{
                background: 'var(--bg-white)',
                padding: '1.5rem',
                borderRadius: '12px',
                boxShadow: 'var(--shadow)'
              }}>
                <h3 style={{ color: 'var(--text-dark)', margin: '0 0 1rem 0', fontSize: '1.2rem' }}>
                  🔔 Alertas
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {alertas.map(alerta => (
                    <div key={alerta.id} style={{
                      padding: '1rem',
                      borderLeft: `4px solid ${getPrioridadeColor(alerta.prioridade)}`,
                      background: 'var(--bg-light)',
                      borderRadius: '0 8px 8px 0'
                    }}>
                      <h4 style={{ color: 'var(--text-dark)', margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>
                        {alerta.titulo}
                      </h4>
                      <p style={{ color: 'var(--text-light)', margin: '0', fontSize: '0.8rem' }}>
                        {alerta.mensagem}
                      </p>
                      <span style={{
                        display: 'inline-block',
                        marginTop: '0.5rem',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '12px',
                        fontSize: '0.7rem',
                        fontWeight: '600',
                        background: getPrioridadeColor(alerta.prioridade) + '20',
                        color: getPrioridadeColor(alerta.prioridade)
                      }}>
                        {alerta.prioridade}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recomendações */}
              <div style={{
                background: 'var(--bg-white)',
                padding: '1.5rem',
                borderRadius: '12px',
                boxShadow: 'var(--shadow)'
              }}>
                <h3 style={{ color: 'var(--text-dark)', margin: '0 0 1rem 0', fontSize: '1.2rem' }}>
                  💡 Recomendações
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {recomendacoes.slice(0, 2).map(recomendacao => (
                    <div key={recomendacao.id} style={{
                      padding: '1rem',
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px'
                    }}>
                      <h4 style={{ color: 'var(--text-dark)', margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>
                        {recomendacao.titulo}
                      </h4>
                      <p style={{ color: 'var(--text-light)', margin: '0 0 0.5rem 0', fontSize: '0.8rem' }}>
                        {recomendacao.descricao}
                      </p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{
                          padding: '0.2rem 0.5rem',
                          borderRadius: '12px',
                          fontSize: '0.7rem',
                          fontWeight: '600',
                          background: getPrioridadeColor(recomendacao.prioridade) + '20',
                          color: getPrioridadeColor(recomendacao.prioridade)
                        }}>
                          {recomendacao.prioridade}
                        </span>
                        <span style={{ color: 'var(--success-color)', fontSize: '0.8rem', fontWeight: '600' }}>
                          {recomendacao.economiaPotencial}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Modal de Edição */}
      {showEditModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}
        onClick={() => setShowEditModal(false)}
        >
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '12px',
            maxWidth: '500px',
            width: '90%',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}
          onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ color: 'var(--text-dark)', margin: '0 0 1.5rem 0' }}>
              Editar Perfil
            </h2>

            <form onSubmit={handleEditSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-dark)', fontWeight: '500' }}>
                  Nome
                </label>
                <input
                  type="text"
                  name="name"
                  value={editFormData.name}
                  onChange={handleEditChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid var(--border-color)',
                    borderRadius: '6px',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-dark)', fontWeight: '500' }}>
                  Telefone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={editFormData.phone}
                  onChange={handleEditChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid var(--border-color)',
                    borderRadius: '6px',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-dark)', fontWeight: '500' }}>
                  Cidade
                </label>
                <input
                  type="text"
                  name="city"
                  value={editFormData.city}
                  onChange={handleEditChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid var(--border-color)',
                    borderRadius: '6px',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-dark)', fontWeight: '500' }}>
                  Estado (UF)
                </label>
                <input
                  type="text"
                  name="state"
                  value={editFormData.state}
                  onChange={handleEditChange}
                  maxLength="2"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid var(--border-color)',
                    borderRadius: '6px',
                    fontSize: '1rem',
                    textTransform: 'uppercase'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-dark)', fontWeight: '500' }}>
                  Descrição/Bio
                </label>
                <textarea
                  name="description"
                  value={editFormData.description}
                  onChange={handleEditChange}
                  rows="4"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid var(--border-color)',
                    borderRadius: '6px',
                    fontSize: '1rem',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    background: 'var(--primary-color)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Salvar
                </button>
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    background: 'transparent',
                    color: 'var(--text-light)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '6px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
      <Chatbot />
    </>
  );
}

export default Profile;