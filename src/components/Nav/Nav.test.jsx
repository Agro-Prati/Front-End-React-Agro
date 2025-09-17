import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import '@testing-library/jest-dom'
import Nav from './Nav'

describe('Nav', () => {
  const items = [ { label: 'Home', href: '#home' }, { label: 'Sobre', href: '#sobre' } ]

  it('renders menu items and toggles', () => {
    render(<Nav menuItems={items} />)
    expect(screen.getByText(/Home/i)).toBeInTheDocument()
    const toggle = screen.getByRole('button')
    expect(toggle).toBeInTheDocument()
    fireEvent.click(toggle)
    // after click menu should have class active (rendered)
    const menu = screen.getByRole('navigation').querySelector('.nav-menu')
    expect(menu).toHaveClass('active')
  })

  it('closes menu on link click', () => {
    render(<Nav menuItems={items} />)
    const toggle = screen.getByRole('button')
    fireEvent.click(toggle)
    const link = screen.getByText(/Home/i)
    fireEvent.click(link)
    const menu = screen.getByRole('navigation').querySelector('.nav-menu')
    expect(menu).not.toHaveClass('active')
  })

  it('closes menu on Escape key', () => {
    render(<Nav menuItems={items} />)
    const toggle = screen.getByRole('button')
    fireEvent.click(toggle)
    fireEvent.keyDown(document, { key: 'Escape' })
    const menu = screen.getByRole('navigation').querySelector('.nav-menu')
    expect(menu).not.toHaveClass('active')
  })
})
