/**
 * Componente de cabeçalho do perfil do usuário
 * Exibe avatar, nome, tipo, descrição e informações de contato
 */
const ProfileHeader = ({ user, onEditClick, getTipoUsuarioText, getLocalizacao }) => {
  return (
    <div className="profile-header">
      {/* Avatar */}
      <div className="profile-avatar">{user?.name?.charAt(0).toUpperCase() || 'U'}</div>

      {/* Informações do Usuário */}
      <div className="profile-info">
        <h1 className="profile-name">{user?.name || 'Usuário'}</h1>
        <p className="profile-type">{getTipoUsuarioText(user?.type)}</p>

        {/* Descrição/Bio do usuário */}
        {user?.description && <p className="profile-description">"{user.description}"</p>}

        <div className="profile-details">
          <div className="profile-detail-item">
            <span className="profile-detail-label">Email</span>
            <p className="profile-detail-value">{user?.email || 'Não informado'}</p>
          </div>

          {user?.phone && (
            <div className="profile-detail-item">
              <span className="profile-detail-label">Telefone</span>
              <p className="profile-detail-value">{user.phone}</p>
            </div>
          )}

          {(user?.city || user?.state) && (
            <div className="profile-detail-item">
              <span className="profile-detail-label">Localização</span>
              <p className="profile-detail-value">{getLocalizacao()}</p>
            </div>
          )}
        </div>
      </div>

      {/* Botão de Editar */}
      <div className="profile-actions">
        <button onClick={onEditClick} className="profile-edit-button">
          Editar Perfil
        </button>
      </div>
    </div>
  );
};

export default ProfileHeader;
