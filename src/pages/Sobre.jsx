import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Chatbot from '../components/Chatbot/Chatbot';

function SobrePage() {
  return (
    <>
      <Header />
      <main className="page-main">
        <h1>Sobre Nós</h1>
        <p>Revolucionando o agronegócio com inteligência artificial e tecnologia de ponta.</p>
        <div style={{ maxWidth: '800px', margin: '2rem auto', textAlign: 'left' }}>
          <h2>Nossa Missão</h2>
          <p>
            A Agro+Prati tem como objetivo transformar o setor agrícola através da integração
            de tecnologias avançadas, proporcionando aos produtores rurais ferramentas
            inovadoras para aumentar a produtividade e sustentabilidade.
          </p>

          <h2>Nossa Visão</h2>
          <p>
            Ser referência nacional em soluções tecnológicas para o agronegócio,
            contribuindo para um futuro mais sustentável e produtivo.
          </p>

          <h2>Nossos Valores</h2>
          <ul>
            <li>Inovação tecnológica</li>
            <li>Sustentabilidade ambiental</li>
            <li>Compromisso com o produtor rural</li>
            <li>Excelência em atendimento</li>
          </ul>
        </div>
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}

export default SobrePage;