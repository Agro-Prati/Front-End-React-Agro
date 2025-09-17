import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css';

const Chatbot = ({ initialOpen = false, onToggle }) => {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const messagesContainerRef = useRef(null);
  const inputRef = useRef(null);

  // Mensagens predefinidas baseadas no protótipo
  const predefinedMessages = {
    saudacao: [
      'Olá! Sou o assistente virtual da AgroPrati. Como posso ajudá-lo hoje?',
      'Oi! Bem-vindo à AgroPrati! Em que posso auxiliá-lo?',
      'Olá, agricultor! Estou aqui para ajudar com suas dúvidas sobre plantio e manejo.',
    ],
    plantio: [
      'Para plantio de milho, recomendo solo bem drenado e pH entre 5,5 e 6,8. Posso conectá-lo com especialistas em sua região.',
      'O melhor período para plantio de soja é entre setembro e dezembro. Quer dicas específicas para sua região?',
      'Para plantio de feijão, considere a época das águas (outubro-janeiro) ou da seca (março-junho).',
    ],
    pragas: [
      'Para controle de pragas, primeiro preciso identificar qual está afetando sua cultura. Pode descrever os sintomas?',
      'Lagarta-do-cartucho no milho? Recomendo monitoramento e controle integrado. Posso conectá-lo com especialistas.',
      'Problemas com pulgões? Existem soluções biológicas e químicas. Precisa de indicação de fornecedores?',
    ],
    fertilizacao: [
      'A fertilização ideal depende da análise do solo. Temos parceiros que fazem análise na sua região.',
      'Para NPK, recomendo análise de solo primeiro. Posso conectá-lo com laboratórios credenciados.',
      'Adubação orgânica é excelente! Quer dicas sobre compostagem ou fornecedores de adubo orgânico?',
    ],
    irrigacao: [
      'Sistema de irrigação por gotejamento é ideal para economizar água. Temos parceiros especializados.',
      'Para irrigação eficiente, considere horários adequados e monitoramento da umidade do solo.',
      'Problemas com irrigação? Posso conectá-lo com técnicos especializados em sua região.',
    ],
    default: [
      'Interessante! Para essa questão específica, recomendo conversar com um especialista. Posso conectá-lo com profissionais qualificados.',
      'Essa é uma ótima pergunta! Temos especialistas que podem ajudar melhor. Quer que eu encontre um em sua região?',
      'Para orientações mais detalhadas, sugiro consultar nossos parceiros especialistas. Posso fazer essa conexão para você.',
    ],
  };

  // Scroll automático para mensagens novas
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Mensagem inicial de boas-vindas
  useEffect(() => {
    const welcomeMessage = {
      id: Date.now(),
      type: 'bot',
      text: 'Olá! Eu sou o AgroBot, seu assistente agrícola inteligente. Como posso ajudá-lo hoje? 🌱',
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  }, []);

  // Gerar resposta baseada na mensagem do usuário
  const generateResponse = (userMessage) => {
    const msg = userMessage.toLowerCase();

    if (msg.includes('plantio') || msg.includes('plantar') || msg.includes('semear')) {
      return getRandomMessage(predefinedMessages.plantio);
    } else if (
      msg.includes('praga') ||
      msg.includes('inseto') ||
      msg.includes('lagarta') ||
      msg.includes('pulgão')
    ) {
      return getRandomMessage(predefinedMessages.pragas);
    } else if (
      msg.includes('adubo') ||
      msg.includes('fertilizante') ||
      msg.includes('npk') ||
      msg.includes('nutrição')
    ) {
      return getRandomMessage(predefinedMessages.fertilizacao);
    } else if (msg.includes('irrigação') || msg.includes('água') || msg.includes('irrigar')) {
      return getRandomMessage(predefinedMessages.irrigacao);
    } else {
      return getRandomMessage(predefinedMessages.default);
    }
  };

  const getRandomMessage = (messagesArray) => {
    return messagesArray[Math.floor(Math.random() * messagesArray.length)];
  };

  // Adicionar mensagem do usuário
  const addUserMessage = (text) => {
    const newMessage = {
      id: Date.now(),
      type: 'user',
      text: text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  // Adicionar mensagem do bot
  const addBotMessage = (text) => {
    const newMessage = {
      id: Date.now() + 1,
      type: 'bot',
      text: text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  // Enviar mensagem
  const handleSendMessage = () => {
    const message = inputValue.trim();
    if (!message) return;

    addUserMessage(message);
    setInputValue('');
    setIsTyping(true);

    // Simular delay de resposta
    setTimeout(() => {
      setIsTyping(false);
      const response = generateResponse(message);
      addBotMessage(response);
    }, 1500);
  };

  // Enviar sugestão
  const handleSendSuggestion = (suggestion) => {
    setInputValue(suggestion);
    handleSendMessage();
  };

  // Toggle chat
  const toggleChat = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    if (onToggle) onToggle(newState);

    // Focus no input quando abrir
    if (newState) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  // Handle key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chatbot Widget */}
      <div className={`chatbot-widget ${isOpen ? 'open' : ''}`}>
        <div className="chatbot-header">
          <div className="chatbot-title">
            <i className="fas fa-robot"></i>
            <span>AgroBot</span>
          </div>
          <button className="chatbot-close" onClick={toggleChat} aria-label="Fechar chat">
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="chatbot-messages" ref={messagesContainerRef} role="log" aria-live="polite">
          {messages.map((message) => (
            <div key={message.id} className={`${message.type}-message`}>
              <div className="message-avatar">
                <i className={message.type === 'bot' ? 'fas fa-robot' : 'fas fa-user'}></i>
              </div>
              <div className="message-content">{message.text}</div>
            </div>
          ))}

          {isTyping && (
            <div className="bot-message typing-indicator">
              <div className="message-avatar">
                <i className="fas fa-robot"></i>
              </div>
              <div className="message-content">
                <span className="typing-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="chatbot-input">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Digite sua pergunta sobre agricultura..."
            aria-label="Digite sua mensagem"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            aria-label="Enviar mensagem"
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>

        <div className="chatbot-suggestions">
          <button
            className="suggestion-btn"
            onClick={() => handleSendSuggestion('Como plantar milho?')}
          >
            Como plantar milho?
          </button>
          <button className="suggestion-btn" onClick={() => handleSendSuggestion('Pragas na soja')}>
            Pragas na soja
          </button>
          <button
            className="suggestion-btn"
            onClick={() => handleSendSuggestion('Irrigação eficiente')}
          >
            Irrigação eficiente
          </button>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        className="chatbot-toggle"
        onClick={toggleChat}
        aria-label={isOpen ? 'Fechar chat' : 'Abrir chat'}
      >
        <i className={isOpen ? 'fas fa-times' : 'fas fa-comments'}></i>
      </button>
    </>
  );
};

export default Chatbot;
