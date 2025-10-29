import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { cleanInvalidData, isValidToken } from '../utils/storage';

// Cria o contexto de autenticação
const AuthContext = createContext();

/**
 * Provider de autenticação que gerencia o estado do usuário logado
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Carrega o usuário e token do localStorage ao inicializar
  useEffect(() => {
    cleanInvalidData();

    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser && isValidToken()) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setToken(storedToken);
        setUser(parsedUser);
      } catch (error) {
        console.error('Erro ao carregar dados do localStorage:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  /**
   * Realiza o registro de um novo usuário
   */
  const register = async (userData) => {
    try {
      const response = await authService.register(userData);

      const { accessToken, user } = response.data || response;

      if (!accessToken || !user) {
        return { success: false, error: 'Resposta inválida do servidor' };
      }

      localStorage.setItem('token', accessToken);
      localStorage.setItem('user', JSON.stringify(user));

      setToken(accessToken);
      setUser(user);

      return { success: true, data: { token: accessToken, user } };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        'Erro ao criar conta. Tente novamente.';
      return { success: false, error: errorMessage };
    }
  };

  /**
   * Realiza o login do usuário com credentials ou dados diretos (OAuth2)
   * @param {Object} credentialsOrData - Pode ser:
   *   - {email, senha} - Login tradicional
   *   - {token, user} - Login com Google (dados já validados)
   *   - userData direto - OAuth2 flow
   */
  const login = async (credentialsOrData) => {
    try {
      // Se já tem token e user, é login do Google (dados já validados pelo backend)
      if (credentialsOrData.token && credentialsOrData.user) {
        const { token: accessToken, user: userInfo } = credentialsOrData;
        
        console.log('🔐 AuthContext: Login com dados pré-validados (Google)');
        
        // Salvar no localStorage de forma síncrona
        localStorage.setItem('token', accessToken);
        localStorage.setItem('user', JSON.stringify(userInfo));

        // Atualizar estado imediatamente
        setToken(accessToken);
        setUser(userInfo);

        console.log('✓ AuthContext: Estado atualizado com sucesso!');
        return { success: true, data: { token: accessToken, user: userInfo } };
      }

      // Se não tem email nem senha, é um objeto de usuário direto (OAuth2)
      if (!credentialsOrData.email || (!credentialsOrData.senha && !credentialsOrData.password)) {
        const userInfo = credentialsOrData;
        localStorage.setItem('user', JSON.stringify(userInfo));
        setUser(userInfo);
        return { success: true, data: { user: userInfo } };
      }

      // Login tradicional com email e senha
      console.log('🔐 AuthContext: Login tradicional (email/senha)');
      const response = await authService.login(credentialsOrData);

      const accessToken = response.accessToken || response.token;
      const userData = response.user;

      if (!accessToken) {
        return { success: false, error: 'Token não recebido do servidor' };
      }

      let userInfo = userData;
      if (!userInfo) {
        try {
          const payload = JSON.parse(atob(accessToken.split('.')[1]));
          userInfo = {
            email: payload.sub,
            name: payload.name || payload.sub.split('@')[0],
          };
        } catch (e) {
          console.error('Erro ao decodificar token:', e);
          userInfo = { email: credentialsOrData.email };
        }
      }

      // Salvar no localStorage de forma síncrona
      localStorage.setItem('token', accessToken);
      localStorage.setItem('user', JSON.stringify(userInfo));

      // Atualizar estado imediatamente
      setToken(accessToken);
      setUser(userInfo);

      return { success: true, data: { token: accessToken, user: userInfo } };
    } catch (error) {
      console.error('Erro no login:', error);
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        'Email ou senha incorretos.';
      return { success: false, error: errorMessage };
    }
  };

  /**
   * Realiza o logout do usuário
   */
  const logout = () => {
    authService.logout();
    setToken(null);
    setUser(null);
    navigate('/login');
  };

  /**
   * Verifica se o usuário está autenticado
   */
  const isAuthenticated = () => {
    return !!token && !!user;
  };

  /**
   * Atualiza o perfil do usuário
   * @param {Object} profileData - Dados do perfil a atualizar
   * @returns {Promise<Object>} Resultado da atualização
   */
  const updateProfile = async (profileData) => {
    try {
      const response = await authService.updateProfile(profileData);
      
      // Atualiza o usuário no estado e localStorage
      const updatedUser = { ...user, ...response };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      return { success: true, data: updatedUser };
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        'Erro ao atualizar perfil. Tente novamente.';
      return { success: false, error: errorMessage };
    }
  };

  const value = {
    user,
    token,
    loading,
    register,
    login,
    logout,
    isAuthenticated,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
