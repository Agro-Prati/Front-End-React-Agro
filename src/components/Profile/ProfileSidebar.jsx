/**
 * Componente de sidebar com Alertas e Recomendações
 * Exibe informações importantes e sugestões personalizadas
 */
const ProfileSidebar = ({ alertas, recomendacoes, getPrioridadeColor }) => {
  return (
    <div className="profile-sidebar">
      {/* Alertas */}
      <div className="profile-sidebar-card">
        <h3 className="profile-sidebar-title">
          🔔 Alertas
        </h3>

        <div className="profile-alerts-list">
          {alertas.map(alerta => (
            <div
              key={alerta.id}
              className="profile-alert-item"
              style={{
                borderLeftColor: getPrioridadeColor(alerta.prioridade)
              }}
            >
              <h4 className="profile-alert-title">
                {alerta.titulo}
              </h4>
              <p className="profile-alert-message">
                {alerta.mensagem}
              </p>
              <span
                className="profile-alert-badge"
                style={{
                  background: getPrioridadeColor(alerta.prioridade) + '20',
                  color: getPrioridadeColor(alerta.prioridade)
                }}
              >
                {alerta.prioridade}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recomendações */}
      <div className="profile-sidebar-card">
        <h3 className="profile-sidebar-title">
          💡 Recomendações
        </h3>

        <div className="profile-recommendations-list">
          {recomendacoes.slice(0, 2).map(recomendacao => (
            <div key={recomendacao.id} className="profile-recommendation-item">
              <h4 className="profile-recommendation-title">
                {recomendacao.titulo}
              </h4>
              <p className="profile-recommendation-desc">
                {recomendacao.descricao}
              </p>
              <div className="profile-recommendation-footer">
                <span
                  className="profile-recommendation-badge"
                  style={{
                    background: getPrioridadeColor(recomendacao.prioridade) + '20',
                    color: getPrioridadeColor(recomendacao.prioridade)
                  }}
                >
                  {recomendacao.prioridade}
                </span>
                <span className="profile-recommendation-value">
                  {recomendacao.economiaPotencial}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
