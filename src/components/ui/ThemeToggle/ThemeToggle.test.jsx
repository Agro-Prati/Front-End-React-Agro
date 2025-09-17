import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import '@testing-library/jest-dom'
import ThemeToggle from './ThemeToggle'

describe('ThemeToggle', () => {
  it('toggles theme attribute on html', () => {
    render(<ThemeToggle />)
    const btn = screen.getByRole('button')
    expect(document.documentElement.getAttribute('data-theme')).toBeNull()
    fireEvent.click(btn)
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
    fireEvent.click(btn)
    expect(document.documentElement.getAttribute('data-theme')).toBeNull()
  })
})
