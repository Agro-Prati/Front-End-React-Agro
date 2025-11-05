import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Chatbot from '../components/Chatbot/Chatbot';
import { useAuth } from '../contexts/useAuth';
import folha from '../assets/folha.png';
import './Cadastro.css';

function Cadastro() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    telefone: '',
    tipoUsuario: 'AGRICULTOR',
    termos: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Limpar erro quando usuário começa a digitar
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.senha) {
      newErrors.senha = 'Senha é obrigatória';
    } else if (formData.senha.length < 6) {
      newErrors.senha = 'Senha deve ter pelo menos 6 caracteres';
    }

    if (formData.senha !== formData.confirmarSenha) {
      newErrors.confirmarSenha = 'Senhas não coincidem';
    }

    if (!formData.telefone.trim()) {
      newErrors.telefone = 'Telefone é obrigatório';
    }

    if (!formData.termos) {
      newErrors.termos = 'Você deve aceitar os termos de uso';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true);
      setErrors({});
      setSuccessMessage('');

      try {
        const result = await register(formData);

        if (result.success) {
          setSuccessMessage('Conta criada com sucesso! Redirecionando...');
          setTimeout(() => {
            navigate('/', { replace: true });
          }, 800);
        } else {
          setErrors({ submit: result.error || 'Erro ao criar conta. Tente novamente.' });
        }
      } catch (error) {
        console.error('Erro ao criar conta:', error);
        setErrors({ submit: 'Erro inesperado ao criar conta. Tente novamente.' });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Header />
      <main className="auth-page">
        <div className="auth-card auth-card-wide">
          <div className="auth-header">
            <img src={folha} alt="Agro+Prati Logo" className="auth-logo" />
            <h1 className="auth-title">Criar sua conta</h1>
            <p className="auth-subtitle">Junte-se à comunidade Agro+Prati</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="nome" className="form-label">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                  className={`form-input ${errors.nome ? 'error' : ''}`}
                  placeholder="Seu nome completo"
                />
                {errors.nome && <span className="form-error">{errors.nome}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="telefone" className="form-label">
                  Telefone *
                </label>
                <input
                  type="tel"
                  id="telefone"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  required
                  className={`form-input ${errors.telefone ? 'error' : ''}`}
                  placeholder="(11) 99999-9999"
                />
                {errors.telefone && <span className="form-error">{errors.telefone}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder="seu@email.com"
              />
              {errors.email && <span className="form-error">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="tipoUsuario" className="form-label">
                Tipo de Usuário
              </label>
              <select
                id="tipoUsuario"
                name="tipoUsuario"
                value={formData.tipoUsuario}
                onChange={handleChange}
                className="form-select"
              >
                <option value="AGRICULTOR">Agricultor</option>
                <option value="AGRONOMO">Agrônomo</option>
                <option value="VETERINARIO">Veterinário</option>
                <option value="ZOOTECNISTA">Zootecnista</option>
                <option value="ESTUDANTE">Estudante</option>
              </select>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="senha" className="form-label">
                  Senha *
                </label>
                <input
                  type="password"
                  id="senha"
                  name="senha"
                  value={formData.senha}
                  onChange={handleChange}
                  required
                  className={`form-input ${errors.senha ? 'error' : ''}`}
                  placeholder="Mínimo 6 caracteres"
                />
                {errors.senha && <span className="form-error">{errors.senha}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="confirmarSenha" className="form-label">
                  Confirmar Senha *
                </label>
                <input
                  type="password"
                  id="confirmarSenha"
                  name="confirmarSenha"
                  value={formData.confirmarSenha}
                  onChange={handleChange}
                  required
                  className={`form-input ${errors.confirmarSenha ? 'error' : ''}`}
                  placeholder="Repita a senha"
                />
                {errors.confirmarSenha && <span className="form-error">{errors.confirmarSenha}</span>}
              </div>
            </div>

            <div className="form-checkbox-row">
              <label className="form-checkbox-label">
                <input
                  type="checkbox"
                  name="termos"
                  checked={formData.termos}
                  onChange={handleChange}
                />
                <span>
                  Aceito os{' '}
                  <Link to="/termos" className="auth-footer-link">
                    Termos de Uso
                  </Link>{' '}
                  e{' '}
                  <Link to="/privacidade" className="auth-footer-link">
                    Política de Privacidade
                  </Link>
                </span>
              </label>
              {errors.termos && <span className="form-error">{errors.termos}</span>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="auth-submit-btn"
            >
              {loading ? 'Criando conta...' : 'Criar Conta'}
            </button>

            {successMessage && (
              <div className="auth-alert auth-alert-success">
                {successMessage}
              </div>
            )}

            {errors.submit && (
              <div className="auth-alert auth-alert-error">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="15" y1="9" x2="9" y2="15"></line>
                  <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
                {errors.submit}
              </div>
            )}
          </form>

          <div className="auth-footer">
            <p>Já tem uma conta?</p>
            <Link to="/login" className="auth-footer-link">
              Fazer Login
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}

export default Cadastro;
