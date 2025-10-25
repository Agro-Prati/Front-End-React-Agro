import axios from 'axios';

// Cria uma instância do axios com configurações padrão
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 segundos
  withCredentials: true, // 🔐 Envia cookies HTTP-only automaticamente
});

// Interceptor para adicionar o token JWT em todas as requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    // Só adiciona o token se ele existir e não for "undefined"
    // Para OAuth2, o cookie JWT_TOKEN será enviado automaticamente
    if (token && token !== 'undefined' && token !== 'null') {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar respostas e erros
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Se receber 401 (não autorizado), limpa o token e redireciona para login
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
