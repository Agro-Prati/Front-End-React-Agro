import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Chatbot from '../components/Chatbot/Chatbot';
import { useAuth } from '../contexts/useAuth';
import authService from '../services/authService';
import folha from '../assets/folha.png';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    senha: '',
    lembrar: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Limpa erro quando usuário começa a digitar
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const result = await login(formData);

      if (result.success) {
        setSuccessMessage('Login realizado com sucesso! Redirecionando...');
        // Pequeno delay para mostrar a mensagem e garantir que o estado foi atualizado
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 800);
      } else {
        setError(result.error || 'Erro ao fazer login. Tente novamente.');
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
    setSuccessMessage('');

    try {
      console.log('🔐 Iniciando login com Google...');
      const response = await authService.loginWithGoogle(credentialResponse.credential);
      
      console.log('✓ Resposta do backend recebida:', response);

      const token = response.accessToken || response.token;
      const user = response.user;

      if (!token || !user) {
        console.error('❌ Resposta inválida:', { token: !!token, user: !!user });
        setError('Resposta inválida do servidor');
        return;
      }

      console.log('✓ Token e usuário válidos, atualizando contexto...');
      
      // Atualizar o contexto de autenticação
      const result = await login({ token, user });

      if (result.success) {
        console.log('✓ Contexto atualizado com sucesso!');
        setSuccessMessage('Login com Google realizado com sucesso! Redirecionando...');
        
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 800);
      } else {
        setError(result.error || 'Erro ao atualizar contexto de autenticação');
      }
    } catch (err) {
      console.error('❌ Erro ao fazer login com Google:', err);
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
      <main className="auth-page">
        <div className="auth-card">
          <div className="auth-header">
            <img
              src={folha}
              alt="Agro+Prati Logo"
              className="auth-logo"
            />
            <h1 className="auth-title">Entrar na sua conta</h1>
            <p className="auth-subtitle">
              Acesse sua conta Agro+Prati
            </p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="seu@email.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="senha" className="form-label">
                Senha
              </label>
              <input
                type="password"
                id="senha"
                name="senha"
                value={formData.senha}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="Sua senha"
              />
            </div>

            <div className="form-checkbox-row">
              <label className="form-checkbox-label">
                <input
                  type="checkbox"
                  name="lembrar"
                  checked={formData.lembrar}
                  onChange={handleChange}
                  className="form-checkbox"
                />
                Lembrar-me
              </label>
              <Link to="/recuperar-senha" className="login-forgot-link">
                Esqueceu a senha?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="auth-submit-btn"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>

            {successMessage && (
              <div className="auth-alert auth-alert-success">
                {successMessage}
              </div>
            )}

            {error && (
              <div className="auth-alert auth-alert-error">
                {error}
              </div>
            )}
          </form>

          <div className="auth-divider">ou</div>

          <div className="auth-google-wrapper">
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

          <div className="auth-footer">
            <p>Não tem uma conta?</p>
            <Link to="/cadastro" className="auth-footer-link">
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
