import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import ContactForm from './ContactForm';

describe('ContactForm', () => {
  it('renders title and subtitle', () => {
    render(<ContactForm />);
    expect(screen.getByText('Entre em Contato')).toBeInTheDocument();
    expect(screen.getByText('Estamos aqui para ajudar você')).toBeInTheDocument();
  });

  it('renders contact info', () => {
    render(<ContactForm />);
    expect(screen.getByText('Informações de Contato')).toBeInTheDocument();
    expect(screen.getByText('Telefone')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Endereço')).toBeInTheDocument();
  });

  it('renders form fields', () => {
    render(<ContactForm />);
    expect(screen.getByPlaceholderText('Seu nome')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Seu email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Seu telefone')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Sua mensagem')).toBeInTheDocument();
  });

  it('submits form with data', () => {
    const mockOnSubmit = vi.fn();
    render(<ContactForm onSubmit={mockOnSubmit} />);

    fireEvent.change(screen.getByPlaceholderText('Seu nome'), { target: { value: 'João' } });
    fireEvent.change(screen.getByPlaceholderText('Seu email'), {
      target: { value: 'joao@email.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Sua mensagem'), { target: { value: 'Olá!' } });

    fireEvent.click(screen.getByRole('button', { name: 'Enviar Mensagem' }));

    expect(mockOnSubmit).toHaveBeenCalledWith({
      name: 'João',
      email: 'joao@email.com',
      phone: '',
      message: 'Olá!',
    });
  });
});
