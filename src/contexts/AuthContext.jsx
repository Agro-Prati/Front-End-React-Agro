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
    // Limpa dados inválidos primeiro
    cleanInvalidData();
    
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser && isValidToken()) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Erro ao carregar dados do localStorage:', error);
        // Limpa dados inválidos
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
      
      console.log('Resposta do backend (registro):', JSON.stringify(response, null, 2)); // Debug
      
      // A resposta do axios vem em response.data
      const { token, user } = response.data || response;
      
      if (!token || !user) {
        console.error('Token ou usuário não encontrado na resposta do registro!');
        return { success: false, error: 'Resposta inválida do servidor' };
      }
      
      // Salva o token e dados do usuário
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      setToken(token);
      setUser(user);
      
      return { success: true, data: { token, user } };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error ||
                          'Erro ao criar conta. Tente novamente.';
      return { success: false, error: errorMessage };
    }
  };

  /**
   * Realiza o login do usuário com credentials ou dados diretos (OAuth2)
   * @param {Object} credentialsOrData - Pode ser {email, password} ou userData direto
   */
  const login = async (credentialsOrData) => {
    try {
      // Se tem userData direto (OAuth2), apenas atualiza o estado
      if (!credentialsOrData.password) {
        console.log('✅ [AuthContext] Login OAuth2 - dados recebidos:', credentialsOrData);
        
        // Salva apenas os dados do usuário (cookie já está definido pelo backend)
        localStorage.setItem('user', JSON.stringify(credentialsOrData));
        setUser(credentialsOrData);
        
        return { success: true, data: { user: credentialsOrData } };
      }

      // Login com credentials (email/password)
      const response = await authService.login(credentialsOrData);
      
      console.log('Resposta do backend (completa):', JSON.stringify(response, null, 2)); // Debug
      
      // O backend retorna accessToken, não token
      const accessToken = response.accessToken || response.token;
      const userData = response.user;
      
      if (!accessToken) {
        console.error('Token não encontrado na resposta!');
        return { success: false, error: 'Token não recebido do servidor' };
      }
      
      // Se não tiver dados do usuário na resposta, extrair do token JWT
      let userInfo = userData;
      if (!userInfo) {
        // Decodifica o JWT para pegar o email (sub)
        try {
          const payload = JSON.parse(atob(accessToken.split('.')[1]));
          userInfo = {
            email: payload.sub,
            name: payload.name || payload.sub.split('@')[0],
          };
          console.log('Usuário extraído do token:', userInfo);
        } catch (e) {
          console.error('Erro ao decodificar token:', e);
          userInfo = { email: credentialsOrData.email };
        }
      }
      
      // Salva o token e dados do usuário
      localStorage.setItem('token', accessToken);
      localStorage.setItem('user', JSON.stringify(userInfo));
      
      console.log('Token salvo:', accessToken); // Debug
      console.log('User salvo:', userInfo); // Debug
      
      setToken(accessToken);
      setUser(userInfo);
      
      console.log('Estado atualizado - token:', accessToken); // Debug
      console.log('Estado atualizado - user:', userInfo); // Debug
      
      return { success: true, data: { token: accessToken, user: userInfo } };
    } catch (error) {
      console.error('Erro no login (AuthContext):', error); // Debug
      const errorMessage = error.response?.data?.message || 
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
