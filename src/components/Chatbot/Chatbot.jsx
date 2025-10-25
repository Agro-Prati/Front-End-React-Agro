import React, { useState, useEffect, useRef } from 'react';
import { sendChatMessage, getChatbotInfo } from '../../services/chatbotService';
import ReactMarkdown from 'react-markdown';
import './Chatbot.css';

const Chatbot = ({ initialOpen = false, onToggle }) => {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const messagesContainerRef = useRef(null);
  const inputRef = useRef(null);

  // Scroll automático para mensagens novas
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Mensagem inicial de boas-vindas e verificar modo do chatbot
  useEffect(() => {
    const chatbotInfo = getChatbotInfo();
    
    const modeIndicator = chatbotInfo.mode === 'real' 
      ? '🤖 (IA Real - Google Gemini)' 
      : '💬 (Modo Demo)';
    
    const welcomeMessage = {
      id: Date.now(),
      type: 'bot',
      text: `Olá! Eu sou o AgroBot ${modeIndicator}, seu assistente agrícola inteligente. Como posso ajudá-lo hoje? 🌱`,
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  }, []);

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
  const handleSendMessage = async () => {
    const message = inputValue.trim();
    if (!message) return;

    addUserMessage(message);
    setInputValue('');
    setIsTyping(true);

    try {
      // Chamar o serviço do chatbot (API real ou hardcoded)
      const response = await sendChatMessage(message);
      setIsTyping(false);
      addBotMessage(response);
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      setIsTyping(false);
      addBotMessage('Desculpe, ocorreu um erro. Por favor, tente novamente.');
    }
  };

  // Enviar sugestão
  const handleSendSuggestion = async (suggestion) => {
    if (!suggestion.trim()) return;

    addUserMessage(suggestion);
    setIsTyping(true);

    try {
      const response = await sendChatMessage(suggestion);
      setIsTyping(false);
      addBotMessage(response);
    } catch (error) {
      console.error('Erro ao enviar sugestão:', error);
      setIsTyping(false);
      addBotMessage('Desculpe, ocorreu um erro. Por favor, tente novamente.');
    }
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

  // Toggle expand
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
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
      <div className={`chatbot-widget ${isOpen ? 'open' : ''} ${isExpanded ? 'expanded' : ''}`}>
        <div className="chatbot-header">
          <div className="chatbot-title">
            <i className="fas fa-robot"></i>
            <span>AgroBot</span>
          </div>
          <div className="chatbot-actions">
            <button 
              className="chatbot-expand" 
              onClick={toggleExpand} 
              aria-label={isExpanded ? "Minimizar chat" : "Expandir chat"}
              title={isExpanded ? "Minimizar" : "Expandir"}
            >
              <i className={isExpanded ? 'fas fa-compress' : 'fas fa-expand'}></i>
            </button>
            <button className="chatbot-close" onClick={toggleChat} aria-label="Fechar chat">
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>

        <div className="chatbot-messages" ref={messagesContainerRef} role="log" aria-live="polite">
          {messages.map((message) => (
            <div key={message.id} className={`${message.type}-message`}>
              <div className="message-avatar">
                <i className={message.type === 'bot' ? 'fas fa-robot' : 'fas fa-user'}></i>
              </div>
              <div className="message-content">
                {message.type === 'bot' ? (
                  <div className="markdown-response">
                    <ReactMarkdown>{message.text}</ReactMarkdown>
                  </div>
                ) : (
                  <span>{message.text}</span>
                )}
              </div>
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
        className={`chatbot-toggle ${isOpen ? 'hidden' : ''}`}
        onClick={toggleChat}
        aria-label={isOpen ? 'Fechar chat' : 'Abrir chat'}
      >
        <i className={isOpen ? 'fas fa-times' : 'fas fa-comments'}></i>
      </button>
    </>
  );
};

export default Chatbot;
