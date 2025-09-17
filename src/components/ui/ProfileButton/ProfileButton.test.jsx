import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import ProfileButton from './ProfileButton';

describe('ProfileButton', () => {
  it('renders and fires click', () => {
    const fn = vi.fn();
    render(
      <MemoryRouter>
        <ProfileButton onClick={fn} label="Perfil" />
      </MemoryRouter>
    );
    const btn = screen.getByRole('button', { name: /Perfil/i });
    expect(btn).toBeInTheDocument();
    fireEvent.click(btn);
    expect(fn).toHaveBeenCalled();
  });
});