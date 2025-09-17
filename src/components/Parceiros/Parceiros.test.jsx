import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import Parceiros from './Parceiros';

describe('Parceiros', () => {
  it('renders title and subtitle', () => {
    render(<Parceiros />);
    expect(screen.getByText('Nossos Parceiros')).toBeInTheDocument();
    expect(screen.getByText('Trabalhamos com os melhores do mercado')).toBeInTheDocument();
  });

  it('renders partner categories', () => {
    render(<Parceiros />);
    expect(screen.getByText('Fornecedores de Insumos')).toBeInTheDocument();
    expect(screen.getByText('Equipamentos Agrícolas')).toBeInTheDocument();
    expect(screen.getByText('Profissionais Técnicos')).toBeInTheDocument();
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
