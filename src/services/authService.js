import api from './api';

/**
 * Serviço de autenticação
 */
export const authService = {
  /**
   * Registra um novo usuário
   * @param {Object} userData - Dados do usuário (name, email, password, phone, type)
   * @returns {Promise<Object>} Token e dados do usuário
   */
  register: async (userData) => {
    const response = await api.post('/api/auth/register', {
      name: userData.nome,
      email: userData.email,
      password: userData.senha,
      phone: userData.telefone,
      type: userData.tipoUsuario,
    });
    return response.data;
  },

  /**
   * Realiza login com email e senha
   * @param {Object} credentials - Credenciais (email, password)
   * @returns {Promise<Object>} Token e dados do usuário
   */
  login: async (credentials) => {
    const response = await api.post('/api/auth/login', {
      email: credentials.email,
      password: credentials.senha,
    });
    return response.data;
  },

  /**
   * Login com Google Sign-In (ID Token)
   * @param {string} credential - ID Token do Google
   * @returns {Promise<Object>} Token JWT e dados do usuário
   */
  loginWithGoogle: async (credential) => {
    const response = await api.post('/api/auth/google', {
      credential: credential,
    });
    return response.data;
  },

  /**
   * Logout - Remove o token e dados do usuário
   */
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  /**
   * Atualiza o perfil do usuário
   * @param {Object} profileData - Dados do perfil a atualizar (type, phone, city, state, description)
   * @returns {Promise<Object>} Dados do usuário atualizado
   */
  updateProfile: async (profileData) => {
    const response = await api.patch('/api/profile', profileData);
    return response.data;
  },
};

export default authService;
