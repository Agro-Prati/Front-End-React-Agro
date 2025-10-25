import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Chatbot from '../components/Chatbot/Chatbot';

function SolucoesPage() {
  return (
    <>
      <Header />
      <main className="page-main">
        <h1>Nossas Soluções</h1>
        <p>Descubra como nossas tecnologias podem revolucionar seu negócio agrícola.</p>

        <div
          style={{
            maxWidth: '1200px',
            margin: '2rem auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            textAlign: 'left',
          }}
        >
          <div style={{ padding: '1.5rem', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
            <h3>🤖 Chatbot IA Agrícola</h3>
            <p>
              Assistente virtual inteligente para tirar dúvidas sobre plantio, pragas e
              fertilização.
            </p>
          </div>

          <div style={{ padding: '1.5rem', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
            <h3>📊 Análise de Dados</h3>
            <p>
              Processamento inteligente de dados agrícolas para otimizar decisões de plantio e
              colheita.
            </p>
          </div>

          <div style={{ padding: '1.5rem', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
            <h3>🌱 Monitoramento de Culturas</h3>
            <p>Acompanhamento em tempo real do desenvolvimento das plantas via sensores IoT.</p>
          </div>

          <div style={{ padding: '1.5rem', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
            <h3>💧 Irrigação Inteligente</h3>
            <p>
              Sistema automatizado de irrigação baseado em dados meteorológicos e umidade do solo.
            </p>
          </div>

          <div style={{ padding: '1.5rem', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
            <h3>🐛 Controle de Pragas</h3>
            <p>
              Detecção precoce e recomendações personalizadas para controle integrado de pragas.
            </p>
          </div>

          <div style={{ padding: '1.5rem', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
            <h3>📈 Previsão de Safra</h3>
            <p>Análises preditivas para estimar produtividade e planejar comercialização.</p>
          </div>
        </div>
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}

export default SolucoesPage;
