import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';

/**
 * Componente que protege rotas privadas
 * Redireciona para login se o usuário não estiver autenticado
 */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  // Enquanto está carregando o estado de autenticação, pode mostrar loading
  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          background: 'var(--bg-light)',
        }}
      >
        <div
          style={{
            textAlign: 'center',
            color: 'var(--text-dark)',
          }}
        >
          <div
            style={{
              width: '50px',
              height: '50px',
              border: '4px solid var(--border-color)',
              borderTop: '4px solid var(--primary-color)',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 1rem',
            }}
          ></div>
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  // Se não estiver autenticado, redireciona para login
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  // Se estiver autenticado, renderiza o componente filho
  return children;
};

export default ProtectedRoute;
