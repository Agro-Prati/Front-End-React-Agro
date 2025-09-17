import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import ThemeToggle from './ThemeToggle';

describe('ThemeToggle', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('toggles theme attribute on html', () => {
    render(<ThemeToggle />);
    const btn = screen.getByRole('button');
    expect(document.documentElement.getAttribute('data-theme')).toBeNull();
    fireEvent.click(btn);
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    fireEvent.click(btn);
    expect(document.documentElement.getAttribute('data-theme')).toBeNull();
  });

  it('applies initial theme from localStorage', () => {
    localStorage.setItem('theme', 'dark');
    render(<ThemeToggle />);
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });
});
