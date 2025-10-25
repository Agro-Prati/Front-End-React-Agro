import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';
import api from '../services/api';

/**
 * Página de callback OAuth2 - Autenticação com Cookie HTTP-only
 * Após OAuth2, o backend já definiu o cookie JWT
 * Esta página verifica se o login foi bem-sucedido e busca os dados do usuário
 */
function OAuth2Callback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  const [error, setError] = useState(null);

  useEffect(() => {
    const success = searchParams.get('success');

    if (success === 'true') {
      // Backend já definiu o cookie JWT
      // Agora busca os dados do usuário
      api
        .get('/api/auth/me')
        .then((response) => {
          const userData = response.data;
          console.log('✅ [OAuth2Callback] Usuário autenticado:', userData);

          // Atualiza o contexto com os dados do usuário
          login(userData);

          // Redireciona para home
          navigate('/', { replace: true });
        })
        .catch((err) => {
          console.error('❌ [OAuth2Callback] Erro ao buscar usuário:', err);
          setError('Erro ao completar login com Google');

          // Redireciona para login após 2 segundos
          setTimeout(() => {
            navigate('/login', { replace: true });
          }, 2000);
        });
    } else {
      // Se não tem success=true, login falhou
      console.error('❌ [OAuth2Callback] Login OAuth2 falhou');
      setError('Login com Google falhou');

      setTimeout(() => {
        navigate('/login', { replace: true });
      }, 2000);
    }
  }, [searchParams, login, navigate]);

  return (
    <div
      style={{
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      {error ? (
        <>
          <p style={{ color: 'red' }}>{error}</p>
          <p>Redirecionando para login...</p>
        </>
      ) : (
        <p>Processando login com Google...</p>
      )}
    </div>
  );
}

export default OAuth2Callback;
