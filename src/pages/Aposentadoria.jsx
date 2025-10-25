import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Chatbot from '../components/Chatbot/Chatbot';
import { calcularAposentadoria, getChatbotInfo } from '../services/chatbotService';
import ReactMarkdown from 'react-markdown';
import { useAuth } from '../contexts/useAuth';
import './Aposentadoria.css';

export default function Aposentadoria() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    idade: '',
    sexo: '',
    tempoTrabalhoRural: '',
    tipoSegurado: '',
  });
  const [resultado, setResultado] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const chatbotInfo = getChatbotInfo();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCalculate = async (e) => {
    e.preventDefault();

    const { idade, sexo, tempoTrabalhoRural, tipoSegurado } = formData;

    if (!idade || !sexo || !tempoTrabalhoRural || !tipoSegurado) {
      alert('Por favor, preencha todos os campos para calcular a aposentadoria.');
      return;
    }

    setIsLoading(true);
    setResultado('');
    setShowLoginPrompt(false);

    try {
      const estimativa = await calcularAposentadoria(formData);
      setResultado(estimativa);

      // Mostrar prompt de cadastro se não estiver logado
      if (!user) {
        setShowLoginPrompt(true);
      }
    } catch (error) {
      console.error('Erro ao calcular aposentadoria:', error);
      setResultado(
        `❌ **Erro ao calcular aposentadoria**\n\n${error.message}\n\nPor favor, tente novamente.`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearForm = () => {
    setFormData({
      idade: '',
      sexo: '',
      tempoTrabalhoRural: '',
      tipoSegurado: '',
    });
    setResultado('');
    setShowLoginPrompt(false);
  };

  return (
    <div className="page-container">
      <Header />

      <main className="aposentadoria-page">
        <section className="aposentadoria-hero">
          <div className="container">
            <h1>📊 Calculadora de Aposentadoria Rural</h1>
            <p className="subtitle">
              Descubra quando você pode se aposentar e planeje seu futuro com segurança
            </p>
            <div className="mode-badge">
              {chatbotInfo.mode === 'real' ? (
                <span className="badge-real">🤖 Powered by Google Gemini AI</span>
              ) : (
                <span className="badge-demo">💬 Modo Demonstração</span>
              )}
            </div>
          </div>
        </section>

        <section className="aposentadoria-content">
          <div className="container">
            <div className="aposentadoria-grid">
              {/* Formulário */}
              <div className="aposentadoria-form-card">
                <h2>Seus Dados</h2>
                <p className="form-description">
                  Preencha as informações abaixo para calcular sua estimativa de aposentadoria rural.
                </p>

                <form onSubmit={handleCalculate}>
                  <div className="form-group">
                    <label htmlFor="idade">
                      <i className="fas fa-birthday-cake"></i> Idade Atual (anos)
                    </label>
                    <input
                      type="number"
                      id="idade"
                      name="idade"
                      value={formData.idade}
                      onChange={handleInputChange}
                      placeholder="Ex: 52"
                      min="0"
                      max="120"
                      disabled={isLoading}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="sexo">
                      <i className="fas fa-venus-mars"></i> Sexo
                    </label>
                    <select
                      id="sexo"
                      name="sexo"
                      value={formData.sexo}
                      onChange={handleInputChange}
                      disabled={isLoading}
                    >
                      <option value="">Selecione...</option>
                      <option value="masculino">Masculino</option>
                      <option value="feminino">Feminino</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="tempoTrabalhoRural">
                      <i className="fas fa-tractor"></i> Tempo de Trabalho Rural (anos)
                    </label>
                    <input
                      type="number"
                      id="tempoTrabalhoRural"
                      name="tempoTrabalhoRural"
                      value={formData.tempoTrabalhoRural}
                      onChange={handleInputChange}
                      placeholder="Ex: 20"
                      min="0"
                      max="80"
                      disabled={isLoading}
                    />
                    <small className="form-hint">
                      💡 Anos comprovados de trabalho no campo
                    </small>
                  </div>

                  <div className="form-group">
                    <label htmlFor="tipoSegurado">
                      <i className="fas fa-id-card"></i> Tipo de Segurado
                    </label>
                    <select
                      id="tipoSegurado"
                      name="tipoSegurado"
                      value={formData.tipoSegurado}
                      onChange={handleInputChange}
                      disabled={isLoading}
                    >
                      <option value="">Selecione...</option>
                      <option value="segurado especial">Segurado Especial</option>
                      <option value="empregado rural">Empregado Rural</option>
                      <option value="contribuinte individual rural">
                        Contribuinte Individual Rural
                      </option>
                      <option value="trabalhador avulso rural">Trabalhador Avulso Rural</option>
                    </select>
                    <small className="form-hint">
                      💡 Não sabe qual é? Consulte o INSS
                    </small>
                  </div>

                  <div className="form-actions">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={
                        isLoading ||
                        !formData.idade ||
                        !formData.sexo ||
                        !formData.tempoTrabalhoRural ||
                        !formData.tipoSegurado
                      }
                    >
                      {isLoading ? (
                        <>
                          <i className="fas fa-spinner fa-spin"></i> Calculando...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-calculator"></i> Calcular Aposentadoria
                        </>
                      )}
                    </button>

                    {resultado && (
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleClearForm}
                        disabled={isLoading}
                      >
                        <i className="fas fa-redo"></i> Novo Cálculo
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* Informações */}
              <div className="aposentadoria-info">
                <h3>Documentos Necessários</h3>
                <div className="info-list">
                  <div className="info-item">
                    <i className="fas fa-file-alt"></i>
                    <div>
                      <h4>Documentos Pessoais</h4>
                      <p>RG, CPF, comprovante de residência</p>
                    </div>
                  </div>
                  <div className="info-item">
                    <i className="fas fa-clipboard-check"></i>
                    <div>
                      <h4>Comprovantes de Trabalho Rural</h4>
                      <p>Notas fiscais, contratos, declarações sindicais</p>
                    </div>
                  </div>
                  <div className="info-item">
                    <i className="fas fa-home"></i>
                    <div>
                      <h4>Documentos da Propriedade</h4>
                      <p>ITR, escritura, contrato de arrendamento</p>
                    </div>
                  </div>
                  <div className="info-item">
                    <i className="fas fa-users"></i>
                    <div>
                      <h4>Testemunhas</h4>
                      <p>3 testemunhas com documentação</p>
                    </div>
                  </div>
                </div>

                <div className="important-note">
                  <i className="fas fa-exclamation-circle"></i>
                  <div>
                    <strong>Importante:</strong>
                    <p>
                      Esta é uma estimativa. Para informações precisas e dar entrada no benefício,
                      procure o INSS ou um advogado previdenciário.
                    </p>
                  </div>
                </div>

                {!user && (
                  <div className="cta-box">
                    <h4>🎯 Quer acompanhar sua previsão?</h4>
                    <p>
                      Crie uma conta e receba lembretes sobre documentação e prazos de
                      aposentadoria!
                    </p>
                    <button className="btn btn-cta" onClick={() => navigate('/cadastro')}>
                      Criar Conta Grátis
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Resultado */}
            {resultado && (
              <div className="aposentadoria-result">
                <div className="result-header">
                  <h2>
                    <i className="fas fa-chart-line"></i> Sua Estimativa de Aposentadoria
                  </h2>
                  {!user && showLoginPrompt && (
                    <div className="login-prompt">
                      <i className="fas fa-star"></i>
                      <span>Gostou? Cadastre-se para acompanhar sua aposentadoria!</span>
                      <button className="btn-link" onClick={() => navigate('/cadastro')}>
                        Criar Conta →
                      </button>
                    </div>
                  )}
                </div>

                <div className="result-content markdown-content">
                  <ReactMarkdown>{resultado}</ReactMarkdown>
                </div>

                <div className="result-actions">
                  <button className="btn btn-outline" onClick={() => window.print()}>
                    <i className="fas fa-print"></i> Imprimir
                  </button>
                  <button
                    className="btn btn-outline"
                    onClick={() => {
                      navigator.clipboard.writeText(resultado);
                      alert('Resultado copiado para a área de transferência!');
                    }}
                  >
                    <i className="fas fa-copy"></i> Copiar
                  </button>
                  {user && (
                    <button className="btn btn-primary">
                      <i className="fas fa-save"></i> Salvar no Perfil
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Seção de conversão de leads */}
        <section className="lead-conversion-section">
          <div className="container">
            <div className="conversion-card">
              <div className="conversion-content">
                <h2>🎯 Planeje seu Futuro com Segurança</h2>
                <p>
                  Gostou da calculadora? Com uma conta na AgroPrati você tem acesso a muito mais!
                </p>
                <ul className="features-list">
                  <li>
                    <i className="fas fa-check"></i> Acompanhamento personalizado da aposentadoria
                  </li>
                  <li>
                    <i className="fas fa-check"></i> Lembretes sobre documentação e prazos
                  </li>
                  <li>
                    <i className="fas fa-check"></i> Consulta com especialistas previdenciários
                  </li>
                  <li>
                    <i className="fas fa-check"></i> Simulações atualizadas conforme mudanças nas
                    leis
                  </li>
                </ul>
              </div>
              <div className="conversion-cta">
                {user ? (
                  <div className="logged-in-message">
                    <i className="fas fa-check-circle"></i>
                    <p>Você já tem acesso a todos esses benefícios!</p>
                  </div>
                ) : (
                  <>
                    <button
                      className="btn btn-large btn-primary"
                      onClick={() => navigate('/cadastro')}
                    >
                      Criar Conta Grátis
                    </button>
                    <p className="login-link">
                      Já tem conta?{' '}
                      <button onClick={() => navigate('/login')} className="btn-text">
                        Fazer Login
                      </button>
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <Chatbot />
    </div>
  );
}
