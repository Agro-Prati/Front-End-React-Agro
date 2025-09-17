import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import Solucoes from './Solucoes';

describe('Solucoes', () => {
  it('renders title and subtitle', () => {
    render(<Solucoes />);
    expect(screen.getByText('Nossas Soluções')).toBeInTheDocument();
    expect(screen.getByText('Tecnologia a serviço da agricultura inteligente')).toBeInTheDocument();
  });

  it('renders default solutions', () => {
    render(<Solucoes />);
    expect(screen.getByText('Chatbot Inteligente')).toBeInTheDocument();
    expect(screen.getByText('Rede de Profissionais')).toBeInTheDocument();
    expect(screen.getByText('Marketplace Integrado')).toBeInTheDocument();
  });

  it('renders features for each solution', () => {
    render(<Solucoes />);
    expect(screen.getByText('Orientações de cultivo')).toBeInTheDocument();
    expect(screen.getByText('Engenheiros agrônomos')).toBeInTheDocument();
    expect(screen.getByText('Defensivos agrícolas')).toBeInTheDocument();
  });

  it('renders custom items when provided', () => {
    const customItems = [
      {
        icon: 'fas fa-test',
        title: 'Test Solution',
        description: 'Test description',
        features: ['Feature 1', 'Feature 2'],
      },
    ];
    render(<Solucoes items={customItems} />);
    expect(screen.getByText('Test Solution')).toBeInTheDocument();
    expect(screen.getByText('Feature 1')).toBeInTheDocument();
  });
});
