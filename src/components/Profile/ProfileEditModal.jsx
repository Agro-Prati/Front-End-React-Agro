/**
 * Modal de edição do perfil do usuário
 * Permite editar tipo de usuário, telefone, cidade, estado e descrição
 */
const ProfileEditModal = ({ show, onClose, formData, onChange, onSubmit, isSubmitting }) => {
  if (!show) return null;

  const userTypes = [
    { value: 'AGRICULTOR', label: 'Agricultor' },
    { value: 'AGRONOMO', label: 'Agrônomo' },
    { value: 'VETERINARIO', label: 'Veterinário' },
    { value: 'ZOOTECNISTA', label: 'Zootecnista' },
    { value: 'ESTUDANTE', label: 'Estudante' },
  ];

  return (
    <div className="profile-modal-overlay" onClick={onClose}>
      <div className="profile-modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="profile-modal-title">Editar Perfil</h2>

        <form onSubmit={onSubmit} className="profile-modal-form">
          <div className="profile-form-group">
            <label htmlFor="type" className="profile-form-label">
              Tipo de Usuário
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={onChange}
              required
              className="profile-form-input"
              disabled={isSubmitting}
            >
              <option value="">Selecione...</option>
              {userTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
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
              placeholder="(00) 00000-0000"
              className="profile-form-input"
              disabled={isSubmitting}
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
              placeholder="Nome da cidade"
              className="profile-form-input"
              disabled={isSubmitting}
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
              placeholder="PR"
              className="profile-form-input"
              style={{ textTransform: 'uppercase' }}
              disabled={isSubmitting}
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
              placeholder="Ex: Sou filho do mato..."
              className="profile-form-textarea"
              disabled={isSubmitting}
            />
          </div>

          <div className="profile-modal-buttons">
            <button type="submit" className="profile-modal-submit" disabled={isSubmitting}>
              {isSubmitting ? 'Salvando...' : 'Salvar'}
            </button>
            <button 
              type="button" 
              onClick={onClose} 
              className="profile-modal-cancel"
              disabled={isSubmitting}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEditModal;
