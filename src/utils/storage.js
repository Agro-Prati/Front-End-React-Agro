/**
 * Utilitários para gerenciamento de localStorage
 */

/**
 * Limpa todos os dados de autenticação do localStorage
 */
export const clearAuthData = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

/**
 * Valida se o token no localStorage é válido
 * @returns {boolean} true se o token é válido, false caso contrário
 */
export const isValidToken = () => {
  const token = localStorage.getItem('token');
  if (!token || token === 'undefined' || token === 'null') {
    return false;
  }

  // Verifica se o token tem o formato JWT (3 partes separadas por ponto)
  const parts = token.split('.');
  return parts.length === 3;
};

/**
 * Limpa dados inválidos do localStorage
 */
export const cleanInvalidData = () => {
  if (!isValidToken()) {
    clearAuthData();
  }

  const storedUser = localStorage.getItem('user');
  if (storedUser === 'undefined' || storedUser === 'null') {
    localStorage.removeItem('user');
  }
};
