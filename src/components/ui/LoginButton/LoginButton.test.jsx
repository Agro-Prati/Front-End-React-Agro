import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import LoginButton from './LoginButton';

describe('LoginButton', () => {
  it('renders and fires click', () => {
    const fn = vi.fn();
    render(<LoginButton onClick={fn} label="Entrar" />);
    const btn = screen.getByRole('button', { name: /Entrar/i });
    expect(btn).toBeInTheDocument();
    fireEvent.click(btn);
    expect(fn).toHaveBeenCalled();
  });
});
