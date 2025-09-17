import './App.css';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Sobre from './components/Sobre/Sobre';
import Solucoes from './components/Solucoes/Solucoes';
import Parceiros from './components/Parceiros/Parceiros';
import ContactForm from './components/ContactForm/ContactForm';
import Footer from './components/Footer/Footer';

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

        <Parceiros />

        <ContactForm />
      </main>

      <Footer />
    </>
  );
}

export default App;
