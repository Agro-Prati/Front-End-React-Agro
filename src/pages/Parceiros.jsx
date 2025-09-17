import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Chatbot from '../components/Chatbot/Chatbot';

function ParceirosPage() {
  return (
    <>
      <Header />
      <main className="page-main">
        <h1>Nossos Parceiros</h1>
        <p>Empresas e instituições que confiam em nossas soluções tecnológicas.</p>

        <div style={{ maxWidth: '1200px', margin: '3rem auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
            <div style={{ padding: '2rem', border: '1px solid #e0e0e0', borderRadius: '8px', textAlign: 'center' }}>
              <h3>🏢 Empresas de Agronegócio</h3>
              <p>Parceria com grandes players do setor para desenvolvimento conjunto de soluções.</p>
            </div>

            <div style={{ padding: '2rem', border: '1px solid #e0e0e0', borderRadius: '8px', textAlign: 'center' }}>
              <h3>🎓 Universidades</h3>
              <p>Colaboração com instituições de ensino para pesquisa e desenvolvimento.</p>
            </div>

            <div style={{ padding: '2rem', border: '1px solid #e0e0e0', borderRadius: '8px', textAlign: 'center' }}>
              <h3>🔬 Centros de Pesquisa</h3>
              <p>Parceria com centros de pesquisa agrícola para validação de tecnologias.</p>
            </div>

            <div style={{ padding: '2rem', border: '1px solid #e0e0e0', borderRadius: '8px', textAlign: 'center' }}>
              <h3>🌱 Cooperativas</h3>
              <p>Apoio a cooperativas agrícolas na adoção de tecnologias modernas.</p>
            </div>
          </div>

          <div style={{ textAlign: 'center', padding: '2rem', background: 'linear-gradient(135deg, #2e7d32, #ff8f00)', color: 'white', borderRadius: '8px' }}>
            <h3>Seja Nosso Parceiro</h3>
            <p>Entre em contato conosco para explorar oportunidades de parceria e colaboração.</p>
            <button style={{
              padding: '0.75rem 1.5rem',
              background: 'white',
              color: '#2e7d32',
              border: 'none',
              borderRadius: '4px',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginTop: '1rem'
            }}>
              Fale Conosco
            </button>
          </div>
        </div>
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}

export default ParceirosPage;