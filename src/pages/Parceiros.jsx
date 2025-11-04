import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Chatbot from '../components/Chatbot/Chatbot';

const categoriasParceiros = [
  {
    id: 1,
    titulo: "🏢 Empresas de Agronegócio",
    descricao: "Parceria com grandes players do setor para desenvolvimento conjunto de soluções.",
    parceiros: [
      { nome: "Banco do Brasil", logo: "/src/assets/parceiros/logo-banco-do-brasil.png" },
      { nome: "Bayer", logo: "/src/assets/parceiros/logo-bayer.png" },
      { nome: "Sicredi", logo: "/src/assets/parceiros/logo-sicredi.png" }
    ]
  },
  {
    id: 2,
    titulo: "🎓 Universidades",
    descricao: "Colaboração com instituições de ensino para pesquisa e desenvolvimento.",
    parceiros: [
      { nome: "UFPR", logo: "/src/assets/parceiros/logo-ufpr.png" },
      { nome: "UTFPR", logo: "/src/assets/parceiros/logo-utfpr.png" }
      
    ]
  },
  
];

function ParceirosPage() {
  return (
    <>
      <Header />
      <main 
        className="page-main" 
        style={{ 
          padding: '2rem 1rem',
          maxWidth: '1400px',
          margin: '0 auto'
        }}
      >
        {/* Cabeçalho */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '3rem',
          padding: '0 1rem'
        }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            color: '#2e7d32',
            marginBottom: '1rem'
          }}>
            Nossos Parceiros
          </h1>
          <p style={{ 
            fontSize: '1.2rem', 
            color: '#555',
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            Empresas e instituições que confiam em nossas soluções tecnológicas.
          </p>
        </div>

        {/* Seção de Categorias */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          marginBottom: '4rem',
          padding: '0 1rem'
        }}>
          {categoriasParceiros.map((categoria) => (
            <div
              key={categoria.id}
              style={{
                padding: '2rem',
                border: '1px solid #e0e0e0',
                borderRadius: '12px',
                textAlign: 'center',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                backgroundColor: 'white'
              }}
            >
              <h3 style={{ 
                margin: '0 0 1rem 0',
                color: '#2e7d32',
                fontSize: '1.4rem'
              }}>
                {categoria.titulo}
              </h3>
              <p style={{ 
                color: '#666',
                marginBottom: '1.5rem',
                minHeight: '60px'
              }}>
                {categoria.descricao}
              </p>
              
              {/* Logos dos parceiros */}
              <div style={{ 
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '1rem',
                marginTop: '1rem'
              }}>
                {categoria.parceiros.map((parceiro, idx) => (
                  <div 
                    key={idx}
                    style={{
                      width: '80px',
                      height: '60px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '0.5rem',
                      backgroundColor: 'white',
                      borderRadius: '8px',
                      border: '1px solid #eee'
                    }}
                  >
                    <img 
                      src={parceiro.logo} 
                      alt={parceiro.nome}
                      style={{ 
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain'
                      }} 
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Seção CTA */}
        <div
          style={{
            textAlign: 'center',
            padding: '3rem 2rem',
            background: 'linear-gradient(135deg, #2e7d32, #4caf50)',
            color: 'white',
            borderRadius: '12px',
            margin: '0 1rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}
        >
          <h3 style={{ 
            fontSize: '1.8rem', 
            marginBottom: '1rem'
          }}>
            Seja Nosso Parceiro
          </h3>
          <p style={{ 
            fontSize: '1.1rem',
            maxWidth: '700px',
            margin: '0 auto 2rem',
            lineHeight: '1.6'
          }}>
            Junte-se a empresas e instituições inovadoras que estão transformando o agronegócio brasileiro.
          </p>
          <button
            style={{
              padding: '0.9rem 2rem',
              background: 'white',
              color: '#2e7d32',
              border: 'none',
              borderRadius: '50px',
              fontWeight: '600',
              cursor: 'pointer',
              fontSize: '1rem',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            }}
          >
            Fale Conosco
          </button>
        </div>
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}

export default ParceirosPage;