import '../App.css';
import Header from '../components/Header/Header';
import Hero from '../components/Hero/Hero';
import Sobre from '../components/Sobre/Sobre';
import Solucoes from '../components/Solucoes/Solucoes';
import Parceiros from '../components/Parceiros/Parceiros';
import ContactForm from '../components/ContactForm/ContactForm';
import Footer from '../components/Footer/Footer';
import Chatbot from '../components/Chatbot/Chatbot';

function Home() {
  const handleOpenChat = () => {
    // Abre o chatbot clicando no botão toggle
    const toggleButton = document.querySelector('.chatbot-toggle');
    if (toggleButton) {
      // Verifica se o chatbot já está aberto
      const chatbotWidget = document.querySelector('.chatbot-widget');
      const isAlreadyOpen = chatbotWidget?.classList.contains('open');
      
      // Só clica se não estiver aberto
      if (!isAlreadyOpen) {
        toggleButton.click();
      }
    }
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

      <Chatbot initialOpen={false} />
    </>
  );
}

export default Home;