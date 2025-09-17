import { render, screen, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import Header from './Header';

describe('Header', () => {
  it('renders brand', () => {
    render(<Header />);
    expect(screen.getByText(/Agro\+Prati/i)).toBeInTheDocument();
  });

  it('adds scrolled class on scroll', () => {
    render(<Header />);
    const headerEl = document.querySelector('.header');
    expect(headerEl).not.toHaveClass('header-scrolled');
    Object.defineProperty(window, 'scrollY', { value: 200, writable: true });
    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });
    expect(headerEl).toHaveClass('header-scrolled');
  });
});
