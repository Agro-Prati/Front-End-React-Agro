import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import Parceiros from './Parceiros';

describe('Parceiros', () => {
  it('renders title and subtitle', () => {
    render(<Parceiros />);
    expect(screen.getByText('Nossos Parceiros')).toBeInTheDocument();
    expect(screen.getByText('Empresas e instituições que confiam em nossas soluções')).toBeInTheDocument();
  });

  it('renders partner logos', () => {
    render(<Parceiros />);
    expect(screen.getByText('Sicredi')).toBeInTheDocument();
    expect(screen.getByText('Bayer')).toBeInTheDocument();
    expect(screen.getByText('Banco do Brasil')).toBeInTheDocument();
    expect(screen.getByText('B3')).toBeInTheDocument();
    expect(screen.getByText('Embrapa')).toBeInTheDocument();
    expect(screen.getByText('UFPR')).toBeInTheDocument();
    expect(screen.getByText('UTFPR')).toBeInTheDocument();
  });

  it('renders statistics section', () => {
    render(<Parceiros />);
    expect(screen.getByText('7+')).toBeInTheDocument();
    expect(screen.getByText('Parceiros Estratégicos')).toBeInTheDocument();
    expect(screen.getByText('15+')).toBeInTheDocument();
    expect(screen.getByText('Anos de Parceria')).toBeInTheDocument();
    expect(screen.getByText('100%')).toBeInTheDocument();
    expect(screen.getByText('Confiança Institucional')).toBeInTheDocument();
  });

  it('renders CTA section', () => {
    render(<Parceiros />);
    expect(screen.getByText('Seja nosso parceiro')).toBeInTheDocument();
    expect(
      screen.getByText('Faça parte da maior rede de soluções agrícolas do país')
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cadastre-se como Parceiro' })).toBeInTheDocument();
  });
});
