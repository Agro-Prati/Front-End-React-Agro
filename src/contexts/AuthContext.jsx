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
   * @param {Object} credentialsOrData - Pode ser {email, senha} ou userData direto
   */
  const login = async (credentialsOrData) => {
    try {
      // Se não tem email nem senha, é um objeto de usuário direto (OAuth2)
      if (!credentialsOrData.email || (!credentialsOrData.senha && !credentialsOrData.password)) {
        const userInfo = credentialsOrData;
        localStorage.setItem('user', JSON.stringify(userInfo));
        setUser(userInfo);
        return { success: true, data: { user: userInfo } };
      }

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

  const value = {
    user,
    token,
    loading,
    register,
    login,
    logout,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
