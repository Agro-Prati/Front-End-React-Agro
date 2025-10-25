/**
 * Componente de métricas do perfil
 * Exibe cards com estatísticas importantes (produtividade, economia, etc)
 */
const ProfileStats = ({ metricas }) => {
  const stats = [
    {
      icon: '📊',
      value: `${metricas.produtividadeAtual}%`,
      label: 'Produtividade Atual',
      color: 'var(--primary-light)',
    },
    {
      icon: '💧',
      value: `${metricas.economiaAgua}%`,
      label: 'Economia de Água',
      color: 'var(--success-color)',
    },
    {
      icon: '🌱',
      value: `${metricas.reducaoAgrotoxicos}%`,
      label: 'Redução Agroquímicos',
      color: 'var(--warning-color)',
    },
    {
      icon: '🏆',
      value: metricas.certificacoesObtidas,
      label: 'Certificações Obtidas',
      color: 'var(--info-color)',
    },
  ];

  return (
    <div className="profile-stats-grid">
      {stats.map((stat, index) => (
        <div key={index} className="profile-stat-card">
          <div className="profile-stat-icon" style={{ background: stat.color }}>
            {stat.icon}
          </div>
          <h3 className="profile-stat-value">{stat.value}</h3>
          <p className="profile-stat-label">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default ProfileStats;
