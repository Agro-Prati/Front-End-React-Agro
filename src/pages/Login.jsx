import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Chatbot from '../components/Chatbot/Chatbot';
import { useAuth } from '../contexts/useAuth';
import authService from '../services/authService';


function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    senha: '',
    lembrar: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Limpa erro quando usuário começa a digitar
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await login(formData);

      if (result.success) {
        alert('Login realizado com sucesso!');
        navigate('/');
      } else {
        setError(result.error);
      }
    } catch (err) {
      console.error('Erro ao fazer login:', err);
      setError('Erro inesperado ao fazer login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    setLoading(true);
    setError('');

    try {
      const response = await authService.loginWithGoogle(credentialResponse.credential);

      const token = response.accessToken || response.token;
      const user = response.user;

      if (token && user) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        alert('Login com Google realizado com sucesso!');
        window.location.href = '/';
      } else {
        setError('Resposta inválida do servidor');
      }
    } catch (err) {
      console.error('Erro ao fazer login com Google:', err);
      setError(err.response?.data?.message || 'Erro ao fazer login com Google. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLoginError = () => {
    setError('Erro ao fazer login com Google. Tente novamente.');
  };

  return (
    <>
      <Header />
      <main style={{
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        background: 'var(--bg-light)'
      }}>
        <div style={{
          background: 'var(--bg-white)',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: 'var(--shadow)',
          width: '100%',
          maxWidth: '400px'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <img
              src="/src/assets/folha.png"
              alt="Agro+Prati Logo"
              style={{ height: '48px', width: '48px', marginBottom: '1rem' }}
            />
            <h1 style={{ color: 'var(--text-dark)', margin: '0' }}>Entrar na sua conta</h1>
            <p style={{ color: 'var(--text-light)', margin: '0.5rem 0 0 0' }}>
              Acesse sua conta Agro+Prati
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label
                htmlFor="email"
                style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: 'var(--text-dark)',
                  fontWeight: '500'
                }}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid var(--border-color)',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  background: 'var(--bg-primary)',
                  color: 'var(--text-primary)'
                }}
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label
                htmlFor="senha"
                style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: 'var(--text-dark)',
                  fontWeight: '500'
                }}
              >
                Senha
              </label>
              <input
                type="password"
                id="senha"
                name="senha"
                value={formData.senha}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid var(--border-color)',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  background: 'var(--bg-primary)',
                  color: 'var(--text-primary)'
                }}
                placeholder="Sua senha"
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                <input
                  type="checkbox"
                  name="lembrar"
                  checked={formData.lembrar}
                  onChange={handleChange}
                  style={{ margin: 0 }}
                />
                Lembrar-me
              </label>
              <Link
                to="/recuperar-senha"
                style={{
                  color: 'var(--primary-color)',
                  textDecoration: 'none',
                  fontSize: '0.9rem'
                }}
              >
                Esqueceu a senha?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '0.75rem',
                background: loading ? '#ccc' : 'var(--primary-color)',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'background 0.3s ease'
              }}
              onMouseOver={(e) => !loading && (e.target.style.background = 'var(--primary-dark)')}
              onMouseOut={(e) => !loading && (e.target.style.background = 'var(--primary-color)')}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>

            {error && (
              <div style={{ 
                padding: '0.75rem', 
                background: '#ffebee', 
                color: '#c62828', 
                borderRadius: '6px',
                fontSize: '0.9rem',
                marginTop: '0.5rem'
              }}>
                {error}
              </div>
            )}
          </form>

          <div style={{ textAlign: 'center', margin: '1.5rem 0', color: 'var(--text-light)' }}>
            <span style={{ background: 'var(--bg-white)', padding: '0 1rem', position: 'relative', zIndex: 1 }}>
              ou
            </span>
            <div style={{ height: '1px', background: 'var(--border-color)', marginTop: '-0.7rem', position: 'relative', zIndex: 0 }}></div>
          </div>

          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            padding: '0.5rem'
          }}>
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginError}
              useOneTap
              text="continue_with"
              shape="rectangular"
              size="large"
              width="100%"
            />
          </div>

          <div style={{ textAlign: 'center', marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
            <p style={{ color: 'var(--text-light)', margin: '0 0 1rem 0' }}>
              Não tem uma conta?
            </p>
            <Link
              to="/cadastro"
              style={{
                display: 'inline-block',
                padding: '0.75rem 1.5rem',
                background: 'transparent',
                color: 'var(--primary-color)',
                border: '2px solid var(--primary-color)',
                borderRadius: '6px',
                textDecoration: 'none',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.background = 'var(--primary-color)';
                e.target.style.color = 'white';
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.color = 'var(--primary-color)';
              }}
            >
              Criar conta
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}

export default Login;