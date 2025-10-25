import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Chatbot from '../components/Chatbot/Chatbot';

function ContatoPage() {
  return (
    <>
      <Header />
      <main className="page-main">
        <h1>Entre em Contato</h1>
        <p>Estamos aqui para ajudar. Fale conosco!</p>

        <div
          style={{
            maxWidth: '800px',
            margin: '2rem auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2rem',
          }}
        >
          <div style={{ textAlign: 'left' }}>
            <h3>Informações de Contato</h3>

            <div style={{ marginBottom: '1rem' }}>
              <h4>📧 Email</h4>
              <p>contato@agroprati.com.br</p>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <h4>📞 Telefone</h4>
              <p>(11) 9999-9999</p>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <h4>🏢 Endereço</h4>
              <p>
                Rua das Plantas, 123
                <br />
                São Paulo - SP
                <br />
                CEP: 01234-567
              </p>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <h4>🕒 Horário de Atendimento</h4>
              <p>
                Segunda a Sexta: 8h às 18h
                <br />
                Sábado: 8h às 12h
              </p>
            </div>
          </div>

          <div style={{ textAlign: 'left' }}>
            <h3>Envie sua Mensagem</h3>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label htmlFor="nome" style={{ display: 'block', marginBottom: '0.5rem' }}>
                  Nome:
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e0e0e0',
                    borderRadius: '4px',
                    fontSize: '1rem',
                  }}
                  placeholder="Seu nome completo"
                />
              </div>

              <div>
                <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem' }}>
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e0e0e0',
                    borderRadius: '4px',
                    fontSize: '1rem',
                  }}
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label htmlFor="mensagem" style={{ display: 'block', marginBottom: '0.5rem' }}>
                  Mensagem:
                </label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  rows="5"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e0e0e0',
                    borderRadius: '4px',
                    fontSize: '1rem',
                    resize: 'vertical',
                  }}
                  placeholder="Digite sua mensagem aqui..."
                ></textarea>
              </div>

              <button
                type="submit"
                style={{
                  padding: '0.75rem 1.5rem',
                  background: '#2e7d32',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                Enviar Mensagem
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}

export default ContatoPage;
