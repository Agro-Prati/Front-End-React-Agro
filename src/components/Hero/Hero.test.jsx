import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import Hero from './Hero';

describe('Hero', () => {
  it('renders title and description', () => {
    render(<Hero />);
    expect(screen.getByText(/Transforme sua Agricultura/i)).toBeInTheDocument();
    expect(screen.getByText(/Agro\+Prati é a primeira plataforma/i)).toBeInTheDocument();
  });

  it('renders stats', () => {
    render(<Hero />);
    expect(screen.getByText('5.000+')).toBeInTheDocument();
    expect(screen.getByText('200+')).toBeInTheDocument();
    expect(screen.getByText('24/7')).toBeInTheDocument();
  });

  it('calls onOpenChat when primary button is clicked', () => {
    const mockOnOpenChat = vi.fn();
    render(<Hero onOpenChat={mockOnOpenChat} />);
    const button = screen.getByText(/Conversar com IA Agrícola/i);
    fireEvent.click(button);
    expect(mockOnOpenChat).toHaveBeenCalledTimes(1);
  });

  it('calls onScrollTo with "sobre" when secondary button is clicked', () => {
    const mockOnScrollTo = vi.fn();
    render(<Hero onScrollTo={mockOnScrollTo} />);
    const button = screen.getByText(/Saiba Mais/i);
    fireEvent.click(button);
    expect(mockOnScrollTo).toHaveBeenCalledWith('sobre');
  });

  it('renders image', () => {
    render(<Hero />);
    const img = screen.getByAltText('Agricultura moderna');
    expect(img).toBeInTheDocument();
    expect(img.src).toContain('colheitadeiras-campo.jpeg');
  });
});
