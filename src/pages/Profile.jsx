import { useState } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Chatbot from '../components/Chatbot/Chatbot';
import { useAuth } from '../contexts/useAuth';
import {
  ProfileHeader,
  ProfileStats,
  ProfileActivity,
  ProfileSidebar,
  ProfileEditModal,
} from '../components/Profile';
import '../components/Profile/Profile.css';

function Profile() {
  const { user, updateProfile } = useAuth();
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState({
    type: user?.type || '',
    phone: user?.phone || '',
    city: user?.city || '',
    state: user?.state || '',
    description: user?.description || '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mapear tipo de usuário para texto amigável
  const getTipoUsuarioText = (tipo) => {
    const tipos = {
      AGRICULTOR: 'Agricultor',
      AGRONOMO: 'Agrônomo',
      VETERINARIO: 'Veterinário',
      ZOOTECNISTA: 'Zootecnista',
      ESTUDANTE: 'Estudante',
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
      type: user?.type || '',
      phone: user?.phone || '',
      city: user?.city || '',
      state: user?.state || '',
      description: user?.description || '',
    });
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    // Converte estado para maiúsculas automaticamente
    const finalValue = name === 'state' ? value.toUpperCase() : value;
    setEditFormData((prev) => ({
      ...prev,
      [name]: finalValue,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    
    // Validação do estado (deve ser 2 caracteres maiúsculos)
    if (editFormData.state && !/^[A-Z]{2}$/.test(editFormData.state)) {
      alert('O estado deve conter exatamente 2 letras maiúsculas (ex: PR, RJ, SP)');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Envia apenas os campos editáveis
      const profileData = {
        type: editFormData.type,
        phone: editFormData.phone,
        city: editFormData.city,
        state: editFormData.state,
        description: editFormData.description,
      };

      const result = await updateProfile(profileData);
      
      if (result.success) {
        alert('Perfil atualizado com sucesso!');
        setShowEditModal(false);
      } else {
        alert(result.error || 'Erro ao atualizar perfil. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      alert('Erro ao atualizar perfil. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const [metricas] = useState({
    produtividadeAtual: 85,
    areaUtilizada: 120,
    economiaAgua: 25,
    reducaoAgrotoxicos: 40,
    certificacoesObtidas: 3,
  });

  const [atividadesRecentes] = useState([
    { id: 1, tipo: 'Plantio', cultura: 'Soja', data: '2024-09-15', status: 'Concluído' },
    {
      id: 2,
      tipo: 'Consultoria',
      titulo: 'Análise de Solo',
      data: '2024-09-12',
      status: 'Em Andamento',
    },
    {
      id: 3,
      tipo: 'Curso',
      titulo: 'Técnicas de Irrigação',
      data: '2024-09-10',
      status: 'Concluído',
    },
    {
      id: 4,
      tipo: 'Monitoramento',
      titulo: 'Clima e Previsões',
      data: '2024-09-08',
      status: 'Ativo',
    },
  ]);

  const [recomendacoes] = useState([
    {
      id: 1,
      titulo: 'Otimização de Irrigação',
      descricao:
        'Baseado na sua localização, recomendamos implementar sistema de irrigação por gotejamento.',
      prioridade: 'Alta',
      economiaPotencial: 'R$ 15.000/ano',
    },
    {
      id: 2,
      titulo: 'Rotação de Culturas',
      descricao: 'Implementar rotação soja-milho pode aumentar a produtividade em até 20%.',
      prioridade: 'Média',
      economiaPotencial: 'R$ 8.000/ano',
    },
    {
      id: 3,
      titulo: 'Certificação Orgânica',
      descricao: 'Seu perfil se qualifica para certificação orgânica. Aumento no preço de venda.',
      prioridade: 'Baixa',
      economiaPotencial: 'R$ 25.000/ano',
    },
  ]);

  const [alertas] = useState([
    {
      id: 1,
      tipo: 'Clima',
      titulo: 'Previsão de Chuva Intensa',
      mensagem: 'Chuva intensa prevista para os próximos 3 dias. Considere adiar pulverização.',
      prioridade: 'Alta',
      data: '2024-09-17',
    },
    {
      id: 2,
      tipo: 'Praga',
      titulo: 'Monitoramento de Lagarta',
      mensagem: 'Aumento na população de lagarta-do-cartucho na região.',
      prioridade: 'Média',
      data: '2024-09-16',
    },
  ]);

  const getPrioridadeColor = (prioridade) => {
    switch (prioridade) {
      case 'Alta':
        return '#f44336';
      case 'Média':
        return '#ff9800';
      case 'Baixa':
        return '#4caf50';
      default:
        return '#666';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Concluído':
        return '#4caf50';
      case 'Em Andamento':
        return '#2196f3';
      case 'Ativo':
        return '#ff9800';
      default:
        return '#666';
    }
  };

  return (
    <>
      <Header />
      <main className="page-main-no-center">
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          {/* Header do Perfil */}
          <ProfileHeader
            user={user}
            onEditClick={handleEditClick}
            getTipoUsuarioText={getTipoUsuarioText}
            getLocalizacao={getLocalizacao}
          />

          {/* Grid de Métricas */}
          <ProfileStats metricas={metricas} />

          {/* Grid de Conteúdo Principal */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr',
              gap: '2rem',
              marginBottom: '2rem',
            }}
          >
            {/* Atividades Recentes */}
            <ProfileActivity
              atividadesRecentes={atividadesRecentes}
              getStatusColor={getStatusColor}
            />

            {/* Alertas e Recomendações */}
            <ProfileSidebar
              alertas={alertas}
              recomendacoes={recomendacoes}
              getPrioridadeColor={getPrioridadeColor}
            />
          </div>
        </div>
      </main>

      {/* Modal de Edição */}
      <ProfileEditModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        formData={editFormData}
        onChange={handleEditChange}
        onSubmit={handleEditSubmit}
        isSubmitting={isSubmitting}
      />

      <Footer />
      <Chatbot />
    </>
  );
}

export default Profile;
