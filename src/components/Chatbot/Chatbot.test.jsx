import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import Chatbot from './Chatbot';

describe('Chatbot', () => {
  it('renders toggle button', () => {
    render(<Chatbot />);
    const toggleButton = screen.getByRole('button', { name: /abrir chat/i });
    expect(toggleButton).toBeInTheDocument();
  });

  it('shows welcome message on mount', async () => {
    render(<Chatbot />);
    await waitFor(() => {
      expect(
        screen.getByText(
          'Olá! Eu sou o AgroBot, seu assistente agrícola inteligente. Como posso ajudá-lo hoje? 🌱'
        )
      ).toBeInTheDocument();
    });
  });

  it('opens chat when toggle is clicked', () => {
    render(<Chatbot />);
    const toggleButton = screen.getByRole('button', { name: /abrir chat/i });
    fireEvent.click(toggleButton);

    const chatWidget = screen.getByText('AgroBot').closest('.chatbot-widget');
    expect(chatWidget).toHaveClass('open');
  });

  it('closes chat when close button is clicked', () => {
    render(<Chatbot initialOpen={true} />);
    const closeButtons = screen.getAllByRole('button', { name: /fechar chat/i });
    fireEvent.click(closeButtons[0]); // Click no botão do header

    const chatWidget = screen.getByText('AgroBot').closest('.chatbot-widget');
    expect(chatWidget).not.toHaveClass('open');
  });

  it('sends user message and receives bot response', async () => {
    render(<Chatbot initialOpen={true} />);

    const input = screen.getByPlaceholderText('Digite sua pergunta sobre agricultura...');
    const sendButton = screen.getByRole('button', { name: /enviar mensagem/i });

    fireEvent.change(input, { target: { value: 'Como plantar milho?' } });
    fireEvent.click(sendButton);

    // Verifica se a mensagem do usuário foi adicionada (dentro de message-content)
    const userMessages = screen.getAllByText('Como plantar milho?');
    expect(userMessages.some((msg) => msg.closest('.user-message'))).toBe(true);

    // Aguarda a resposta do bot
    await waitFor(
      () => {
        const messages = screen.getAllByText(/milho|plantio|drenado|pH/i);
        expect(messages.length).toBeGreaterThan(0);
      },
      { timeout: 3000 }
    );
  });

  it('shows typing indicator while bot is responding', async () => {
    render(<Chatbot initialOpen={true} />);

    const input = screen.getByPlaceholderText('Digite sua pergunta sobre agricultura...');
    const sendButton = screen.getByRole('button', { name: /enviar mensagem/i });

    fireEvent.change(input, { target: { value: 'teste' } });
    fireEvent.click(sendButton);

    // Verifica se o indicador de digitação aparece
    await waitFor(() => {
      const typingIndicator = document.querySelector('.typing-indicator');
      expect(typingIndicator).toBeInTheDocument();
    });

    // Aguarda a resposta e verifica se o indicador desaparece
    await waitFor(
      () => {
        const typingIndicator = document.querySelector('.typing-indicator');
        expect(typingIndicator).not.toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it('sends suggestion when suggestion button is clicked', async () => {
    render(<Chatbot initialOpen={true} />);

    const suggestionButton = screen.getByRole('button', { name: 'Como plantar milho?' });
    fireEvent.click(suggestionButton);

    // Verifica se a sugestão foi enviada
    expect(screen.getByText('Como plantar milho?')).toBeInTheDocument();

    // Aguarda resposta
    await waitFor(
      () => {
        const messages = screen.getAllByText(/milho|plantio/i);
        expect(messages.length).toBeGreaterThan(0);
      },
      { timeout: 3000 }
    );
  });

  it('disables send button when input is empty', () => {
    render(<Chatbot initialOpen={true} />);
    const sendButton = screen.getByRole('button', { name: /enviar mensagem/i });
    expect(sendButton).toBeDisabled();
  });

  it('enables send button when input has text', () => {
    render(<Chatbot initialOpen={true} />);
    const input = screen.getByPlaceholderText('Digite sua pergunta sobre agricultura...');
    const sendButton = screen.getByRole('button', { name: /enviar mensagem/i });

    fireEvent.change(input, { target: { value: 'teste' } });
    expect(sendButton).not.toBeDisabled();
  });

  it('renders all suggestion buttons', () => {
    render(<Chatbot initialOpen={true} />);
    expect(screen.getByRole('button', { name: 'Como plantar milho?' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Pragas na soja' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Irrigação eficiente' })).toBeInTheDocument();
  });
});
