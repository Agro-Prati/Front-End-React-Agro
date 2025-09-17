import './App.css';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Sobre from './components/Sobre/Sobre';
import Solucoes from './components/Solucoes/Solucoes';

function App() {
  const handleOpenChat = () => {
    // Placeholder: abrir chat (futuro componente Chatbot)
    alert('Chat IA Agrícola será aberto em breve!');
  };

  const handleScrollTo = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Header />

      <main>
        <Hero onOpenChat={handleOpenChat} onScrollTo={handleScrollTo} />

        <Sobre />

        <Solucoes />

        <section id="parceiros">
          <div className="container">
            <h2>Parceiros</h2>
          </div>
        </section>

        <section id="contato">
          <div className="container">
            <h2>Contato</h2>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
