import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import Footer from './Footer';

describe('Footer', () => {
  it('renders footer with logo and description', () => {
    render(<Footer />);
    expect(screen.getByText('Agro+Prati')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Revolucionando o agronegócio com inteligência artificial e tecnologia de ponta.'
      )
    ).toBeInTheDocument();
  });

  it('renders social links', () => {
    render(<Footer />);
    const facebookLink = screen.getByLabelText('Facebook');
    const instagramLink = screen.getByLabelText('Instagram');
    const linkedinLink = screen.getByLabelText('LinkedIn');
    const youtubeLink = screen.getByLabelText('YouTube');

    expect(facebookLink).toBeInTheDocument();
    expect(instagramLink).toBeInTheDocument();
    expect(linkedinLink).toBeInTheDocument();
    expect(youtubeLink).toBeInTheDocument();
  });

  it('renders useful links section', () => {
    render(<Footer />);
    expect(screen.getByText('Links Úteis')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Início' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Sobre' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Soluções' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Parceiros' })).toBeInTheDocument();
  });

  it('renders support section', () => {
    render(<Footer />);
    expect(screen.getByText('Suporte')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Contato' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'FAQ' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Documentação' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Tutoriais' })).toBeInTheDocument();
  });

  it('renders newsletter section', () => {
    render(<Footer />);
    expect(screen.getByText('Newsletter')).toBeInTheDocument();
    expect(screen.getByText('Receba novidades e dicas agrícolas')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Seu email')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Enviar newsletter' })).toBeInTheDocument();
  });

  it('renders copyright', () => {
    render(<Footer />);
    expect(
      screen.getByText('© 2025 Agro+Prati. Todos os direitos reservados.')
    ).toBeInTheDocument();
  });
});
