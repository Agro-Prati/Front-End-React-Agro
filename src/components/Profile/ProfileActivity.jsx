/**
 * Componente de atividades recentes do usuário
 * Exibe lista de ações realizadas recentemente
 */
const ProfileActivity = ({ atividadesRecentes, getStatusColor }) => {
  return (
    <div className="profile-activity-card">
      <h2 className="profile-section-title">
        Atividades Recentes
      </h2>

      <div className="profile-activity-list">
        {atividadesRecentes.map(atividade => (
          <div key={atividade.id} className="profile-activity-item">
            <div className="profile-activity-info">
              <h4 className="profile-activity-title">
                {atividade.tipo}: {atividade.titulo || atividade.cultura}
              </h4>
              <p className="profile-activity-meta">
                {atividade.cultura && `Cultura: ${atividade.cultura} • `}
                Data: {new Date(atividade.data).toLocaleDateString('pt-BR')}
              </p>
            </div>
            <span
              className="profile-activity-status"
              style={{
                background: getStatusColor(atividade.status) + '20',
                color: getStatusColor(atividade.status)
              }}
            >
              {atividade.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileActivity;
