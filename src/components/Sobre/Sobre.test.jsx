import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import '@testing-library/jest-dom'
import Sobre from './Sobre'

describe('Sobre', () => {
  it('renders title and subtitle', () => {
    render(<Sobre />)
    expect(screen.getByText('Sobre a Agro+Prati')).toBeInTheDocument()
    expect(screen.getByText('Revolucionando o agronegócio com tecnologia de ponta')).toBeInTheDocument()
  })

  it('renders mission and vision', () => {
    render(<Sobre />)
    expect(screen.getByText('Nossa Missão')).toBeInTheDocument()
    expect(screen.getByText('Nossa Visão')).toBeInTheDocument()
    expect(screen.getByText(/Democratizar o acesso ao conhecimento agrícola/)).toBeInTheDocument()
    expect(screen.getByText(/Ser a principal plataforma de soluções inteligentes/)).toBeInTheDocument()
  })

  it('renders stats', () => {
    render(<Sobre />)
    expect(screen.getByText('1000+')).toBeInTheDocument()
    expect(screen.getByText('50+')).toBeInTheDocument()
    expect(screen.getByText('24/7')).toBeInTheDocument()
    expect(screen.getByText('Agricultores Atendidos')).toBeInTheDocument()
    expect(screen.getByText('Parceiros Cadastrados')).toBeInTheDocument()
    expect(screen.getByText('Suporte Disponível')).toBeInTheDocument()
  })
})