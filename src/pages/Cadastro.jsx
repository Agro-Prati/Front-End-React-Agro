import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Chatbot from '../components/Chatbot/Chatbot';
import { useAuth } from '../contexts/useAuth';

function Cadastro() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
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

      try {
        const result = await register(formData);

        if (result.success) {
          alert('Conta criada com sucesso! Você já está logado.');
          navigate('/'); // Redireciona para a home após cadastro
        } else {
          // Exibe erro do backend
          setErrors({ submit: result.error });
          alert(result.error);
        }
      } catch (error) {
        console.error('Erro ao criar conta:', error);
        setErrors({ submit: 'Erro inesperado ao criar conta. Tente novamente.' });
        alert('Erro inesperado ao criar conta. Tente novamente.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Header />
      <main
        style={{
          minHeight: '70vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          background: 'var(--bg-light)',
        }}
      >
        <div
          style={{
            background: 'var(--bg-white)',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: 'var(--shadow)',
            width: '100%',
            maxWidth: '500px',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <img
              src="/src/assets/folha.png"
              alt="Agro+Prati Logo"
              style={{ height: '48px', width: '48px', marginBottom: '1rem' }}
            />
            <h1 style={{ color: 'var(--text-dark)', margin: '0' }}>Criar sua conta</h1>
            <p style={{ color: 'var(--text-light)', margin: '0.5rem 0 0 0' }}>
              Junte-se à comunidade Agro+Prati
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label
                  htmlFor="nome"
                  style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    color: 'var(--text-dark)',
                    fontWeight: '500',
                  }}
                >
                  Nome Completo *
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: `1px solid ${errors.nome ? '#f44336' : 'var(--border-color)'}`,
                    borderRadius: '6px',
                    fontSize: '1rem',
                    background: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                  }}
                  placeholder="Seu nome completo"
                />
                {errors.nome && (
                  <span
                    style={{
                      color: '#f44336',
                      fontSize: '0.8rem',
                      marginTop: '0.25rem',
                      display: 'block',
                    }}
                  >
                    {errors.nome}
                  </span>
                )}
              </div>

              <div>
                <label
                  htmlFor="telefone"
                  style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    color: 'var(--text-dark)',
                    fontWeight: '500',
                  }}
                >
                  Telefone *
                </label>
                <input
                  type="tel"
                  id="telefone"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: `1px solid ${errors.telefone ? '#f44336' : 'var(--border-color)'}`,
                    borderRadius: '6px',
                    fontSize: '1rem',
                    background: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                  }}
                  placeholder="(11) 99999-9999"
                />
                {errors.telefone && (
                  <span
                    style={{
                      color: '#f44336',
                      fontSize: '0.8rem',
                      marginTop: '0.25rem',
                      display: 'block',
                    }}
                  >
                    {errors.telefone}
                  </span>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: 'var(--text-dark)',
                  fontWeight: '500',
                }}
              >
                Email *
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
                  border: `1px solid ${errors.email ? '#f44336' : 'var(--border-color)'}`,
                  borderRadius: '6px',
                  fontSize: '1rem',
                  background: 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                }}
                placeholder="seu@email.com"
              />
              {errors.email && (
                <span
                  style={{
                    color: '#f44336',
                    fontSize: '0.8rem',
                    marginTop: '0.25rem',
                    display: 'block',
                  }}
                >
                  {errors.email}
                </span>
              )}
            </div>

            <div>
              <label
                htmlFor="tipoUsuario"
                style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: 'var(--text-dark)',
                  fontWeight: '500',
                }}
              >
                Tipo de Usuário
              </label>
              <select
                id="tipoUsuario"
                name="tipoUsuario"
                value={formData.tipoUsuario}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid var(--border-color)',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  background: 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                }}
              >
                <option value="AGRICULTOR">Agricultor</option>
                <option value="AGRONOMO">Agrônomo</option>
                <option value="VETERINARIO">Veterinário</option>
                <option value="ZOOTECNISTA">Zootecnista</option>
                <option value="ESTUDANTE">Estudante</option>
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label
                  htmlFor="senha"
                  style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    color: 'var(--text-dark)',
                    fontWeight: '500',
                  }}
                >
                  Senha *
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
                    border: `1px solid ${errors.senha ? '#f44336' : 'var(--border-color)'}`,
                    borderRadius: '6px',
                    fontSize: '1rem',
                    background: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                  }}
                  placeholder="Mínimo 6 caracteres"
                />
                {errors.senha && (
                  <span
                    style={{
                      color: '#f44336',
                      fontSize: '0.8rem',
                      marginTop: '0.25rem',
                      display: 'block',
                    }}
                  >
                    {errors.senha}
                  </span>
                )}
              </div>

              <div>
                <label
                  htmlFor="confirmarSenha"
                  style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    color: 'var(--text-dark)',
                    fontWeight: '500',
                  }}
                >
                  Confirmar Senha *
                </label>
                <input
                  type="password"
                  id="confirmarSenha"
                  name="confirmarSenha"
                  value={formData.confirmarSenha}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: `1px solid ${errors.confirmarSenha ? '#f44336' : 'var(--border-color)'}`,
                    borderRadius: '6px',
                    fontSize: '1rem',
                    background: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                  }}
                  placeholder="Repita a senha"
                />
                {errors.confirmarSenha && (
                  <span
                    style={{
                      color: '#f44336',
                      fontSize: '0.8rem',
                      marginTop: '0.25rem',
                      display: 'block',
                    }}
                  >
                    {errors.confirmarSenha}
                  </span>
                )}
              </div>
            </div>

            <div style={{ marginTop: '1rem' }}>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.5rem',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                }}
              >
                <input
                  type="checkbox"
                  name="termos"
                  checked={formData.termos}
                  onChange={handleChange}
                  style={{ margin: '0.25rem 0 0 0', flexShrink: 0 }}
                />
                <span>
                  Aceito os{' '}
                  <Link
                    to="/termos"
                    style={{ color: 'var(--primary-color)', textDecoration: 'none' }}
                  >
                    Termos de Uso
                  </Link>{' '}
                  e
                  <Link
                    to="/privacidade"
                    style={{
                      color: 'var(--primary-color)',
                      textDecoration: 'none',
                      marginLeft: '0.25rem',
                    }}
                  >
                    Política de Privacidade
                  </Link>
                </span>
              </label>
              {errors.termos && (
                <span
                  style={{
                    color: '#f44336',
                    fontSize: '0.8rem',
                    marginTop: '0.25rem',
                    display: 'block',
                  }}
                >
                  {errors.termos}
                </span>
              )}
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
                transition: 'background 0.3s ease',
                marginTop: '1rem',
              }}
              onMouseOver={(e) => !loading && (e.target.style.background = 'var(--primary-dark)')}
              onMouseOut={(e) => !loading && (e.target.style.background = 'var(--primary-color)')}
            >
              {loading ? 'Criando conta...' : 'Criar Conta'}
            </button>

            {errors.submit && (
              <div
                style={{
                  padding: '0.75rem',
                  background: '#ffebee',
                  color: '#c62828',
                  borderRadius: '6px',
                  fontSize: '0.9rem',
                }}
              >
                {errors.submit}
              </div>
            )}
          </form>

          <div
            style={{
              textAlign: 'center',
              marginTop: '1.5rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid var(--border-color)',
            }}
          >
            <p style={{ color: 'var(--text-light)', margin: '0 0 1rem 0' }}>Já tem uma conta?</p>
            <Link
              to="/login"
              style={{
                display: 'inline-block',
                padding: '0.75rem 1.5rem',
                background: 'transparent',
                color: 'var(--primary-color)',
                border: '2px solid var(--primary-color)',
                borderRadius: '6px',
                textDecoration: 'none',
                fontWeight: '600',
                transition: 'all 0.3s ease',
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
