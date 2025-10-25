/**
 * Modal de edição do perfil do usuário
 * Permite editar nome, telefone, cidade, estado e descrição
 */
const ProfileEditModal = ({ show, onClose, formData, onChange, onSubmit }) => {
  if (!show) return null;

  return (
    <div className="profile-modal-overlay" onClick={onClose}>
      <div className="profile-modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="profile-modal-title">Editar Perfil</h2>

        <form onSubmit={onSubmit} className="profile-modal-form">
          <div className="profile-form-group">
            <label htmlFor="name" className="profile-form-label">
              Nome
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={onChange}
              required
              className="profile-form-input"
            />
          </div>

          <div className="profile-form-group">
            <label htmlFor="phone" className="profile-form-label">
              Telefone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={onChange}
              className="profile-form-input"
            />
          </div>

          <div className="profile-form-group">
            <label htmlFor="city" className="profile-form-label">
              Cidade
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={onChange}
              className="profile-form-input"
            />
          </div>

          <div className="profile-form-group">
            <label htmlFor="state" className="profile-form-label">
              Estado (UF)
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={onChange}
              maxLength="2"
              className="profile-form-input"
              style={{ textTransform: 'uppercase' }}
            />
          </div>

          <div className="profile-form-group">
            <label htmlFor="description" className="profile-form-label">
              Descrição/Bio
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={onChange}
              rows="4"
              className="profile-form-textarea"
            />
          </div>

          <div className="profile-modal-buttons">
            <button type="submit" className="profile-modal-submit">
              Salvar
            </button>
            <button type="button" onClick={onClose} className="profile-modal-cancel">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEditModal;
