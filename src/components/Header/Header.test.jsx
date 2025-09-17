import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import '@testing-library/jest-dom'
import Header from './Header'

describe('Header', () => {
  it('renders brand', () => {
    render(<Header />)
    expect(screen.getByText(/Agro\+Prati/i)).toBeInTheDocument()
  })
})
