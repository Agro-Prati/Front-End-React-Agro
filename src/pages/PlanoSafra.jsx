import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Chatbot from '../components/Chatbot/Chatbot';
import { generatePlanoSafra, getChatbotInfo } from '../services/chatbotService';
import ReactMarkdown from 'react-markdown';
import { useAuth } from '../contexts/useAuth';
import './PlanoSafra.css';

export default function PlanoSafra() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [culturas, setCulturas] = useState('');
  const [plano, setPlano] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const chatbotInfo = getChatbotInfo();

  const handleGeneratePlano = async (e) => {
    e.preventDefault();

    if (!culturas.trim()) {
      alert('Por favor, digite pelo menos uma cultura para gerar o plano de safra.');
      return;
    }

    setIsLoading(true);
    setPlano('');
    setShowLoginPrompt(false);

    try {
      // Divide as culturas por vírgula e remove espaços
      const culturasArray = culturas
        .split(',')
        .map((item) => item.trim())
        .filter((item) => item !== '');

      if (culturasArray.length === 0) {
        alert('Por favor, digite pelo menos uma cultura válida.');
        setIsLoading(false);
        return;
      }

      const resultado = await generatePlanoSafra(culturasArray);
      setPlano(resultado);

      // Mostrar prompt de cadastro se não estiver logado
      if (!user) {
        setShowLoginPrompt(true);
      }
    } catch (error) {
      console.error('Erro ao gerar plano de safra:', error);
      setPlano(`❌ **Erro ao gerar plano de safra**\n\n${error.message}\n\nPor favor, tente novamente.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearPlano = () => {
    setPlano('');
    setCulturas('');
    setShowLoginPrompt(false);
  };

  return (
    <div className="page-container">
      <Header />
      
      <main className="plano-safra-page">
        <section className="plano-safra-hero">
          <div className="container">
            <h1>🌾 Planejador de Safra Inteligente</h1>
            <p className="subtitle">
              Crie um plano de safra personalizado com inteligência artificial para maximizar sua produção
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

        <section className="plano-safra-content">
          <div className="container">
            <div className="plano-safra-grid">
              {/* Formulário */}
              <div className="plano-safra-form-card">
                <h2>Informe suas Culturas</h2>
                <p className="form-description">
                  Digite as culturas que você deseja plantar, separadas por vírgula. 
                  Nossa IA criará um plano completo e personalizado.
                </p>

                <form onSubmit={handleGeneratePlano}>
                  <div className="form-group">
                    <label htmlFor="culturas">
                      <i className="fas fa-seedling"></i> Culturas
                    </label>
                    <textarea
                      id="culturas"
                      value={culturas}
                      onChange={(e) => setCulturas(e.target.value)}
                      placeholder="Ex: milho, soja, feijão"
                      rows="4"
                      disabled={isLoading}
                    />
                    <small className="form-hint">
                      💡 Dica: Separe múltiplas culturas com vírgula
                    </small>
                  </div>

                  <div className="form-actions">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isLoading || !culturas.trim()}
                    >
                      {isLoading ? (
                        <>
                          <i className="fas fa-spinner fa-spin"></i> Gerando Plano...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-magic"></i> Gerar Plano de Safra
                        </>
                      )}
                    </button>

                    {plano && (
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleClearPlano}
                        disabled={isLoading}
                      >
                        <i className="fas fa-redo"></i> Novo Plano
                      </button>
                    )}
                  </div>
                </form>

                {/* Exemplos */}
                <div className="examples-section">
                  <h3>Exemplos de culturas:</h3>
                  <div className="example-chips">
                    <button
                      className="chip"
                      onClick={() => setCulturas('milho, soja, feijão')}
                      disabled={isLoading}
                    >
                      Grãos
                    </button>
                    <button
                      className="chip"
                      onClick={() => setCulturas('tomate, alface, cenoura')}
                      disabled={isLoading}
                    >
                      Hortaliças
                    </button>
                    <button
                      className="chip"
                      onClick={() => setCulturas('laranja, banana, manga')}
                      disabled={isLoading}
                    >
                      Fruticultura
                    </button>
                    <button
                      className="chip"
                      onClick={() => setCulturas('café, cana-de-açúcar')}
                      disabled={isLoading}
                    >
                      Culturas Perenes
                    </button>
                  </div>
                </div>
              </div>

              {/* Benefícios */}
              <div className="plano-safra-benefits">
                <h3>Por que usar nosso planejador?</h3>
                <div className="benefit-list">
                  <div className="benefit-item">
                    <i className="fas fa-calendar-alt"></i>
                    <div>
                      <h4>Cronograma Completo</h4>
                      <p>Datas ideais para plantio, tratos e colheita</p>
                    </div>
                  </div>
                  <div className="benefit-item">
                    <i className="fas fa-leaf"></i>
                    <div>
                      <h4>Rotação de Culturas</h4>
                      <p>Maximize a saúde do solo</p>
                    </div>
                  </div>
                  <div className="benefit-item">
                    <i className="fas fa-tint"></i>
                    <div>
                      <h4>Gestão de Recursos</h4>
                      <p>Otimize água e fertilizantes</p>
                    </div>
                  </div>
                  <div className="benefit-item">
                    <i className="fas fa-bug"></i>
                    <div>
                      <h4>Controle de Pragas</h4>
                      <p>Prevenção e manejo integrado</p>
                    </div>
                  </div>
                </div>

                {!user && (
                  <div className="cta-box">
                    <h4>🎯 Quer salvar seus planos?</h4>
                    <p>Crie uma conta grátis e tenha acesso ao histórico completo dos seus planos de safra!</p>
                    <button
                      className="btn btn-cta"
                      onClick={() => navigate('/cadastro')}
                    >
                      Criar Conta Grátis
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Resultado */}
            {plano && (
              <div className="plano-safra-result">
                <div className="result-header">
                  <h2>
                    <i className="fas fa-file-alt"></i> Seu Plano de Safra Personalizado
                  </h2>
                  {!user && showLoginPrompt && (
                    <div className="login-prompt">
                      <i className="fas fa-star"></i>
                      <span>Gostou? Cadastre-se para salvar este plano!</span>
                      <button
                        className="btn-link"
                        onClick={() => navigate('/cadastro')}
                      >
                        Criar Conta →
                      </button>
                    </div>
                  )}
                </div>
                
                <div className="result-content markdown-content">
                  <ReactMarkdown>{plano}</ReactMarkdown>
                </div>

                <div className="result-actions">
                  <button className="btn btn-outline" onClick={() => window.print()}>
                    <i className="fas fa-print"></i> Imprimir
                  </button>
                  <button
                    className="btn btn-outline"
                    onClick={() => {
                      navigator.clipboard.writeText(plano);
                      alert('Plano copiado para a área de transferência!');
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
                <h2>🚀 Impulsione sua Produção</h2>
                <p>
                  Gostou do planejador? Imagine ter acesso a especialistas, histórico de planos, 
                  alertas climáticos personalizados e muito mais!
                </p>
                <ul className="features-list">
                  <li><i className="fas fa-check"></i> Histórico de todos os planos gerados</li>
                  <li><i className="fas fa-check"></i> Alertas climáticos para sua região</li>
                  <li><i className="fas fa-check"></i> Conexão com especialistas</li>
                  <li><i className="fas fa-check"></i> Dashboard com indicadores de performance</li>
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
