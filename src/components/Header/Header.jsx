import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import ThemeToggle from '../../components/ui/ThemeToggle/ThemeToggle';
import LoginButton from '../../components/ui/LoginButton/LoginButton';
import Nav from '../Nav/Nav';
import folha from '../../assets/folha.png';

const defaultMenu = [
  { label: 'Início', href: '/' },
  { label: 'Soluções', href: '/solucoes' },
  { label: 'Plano de Safra', href: '/plano-safra' },
  { label: 'Aposentadoria', href: '/aposentadoria' },
  { label: 'Parceiros', href: '/parceiros' },
];

export default function Header({ menuItems = defaultMenu }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 100);
    }
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Theme logic moved into ThemeToggle component

  // Nav controla seu próprio estado (mobile open/close)

  function handleNavClick(href) {
    // Para rotas, não precisamos fazer scroll, apenas navegação
    // Se for uma âncora (#), pode ser uma seção na página atual
    if (href.startsWith('#')) {
      const id = href.replace('#', '');
      const el = document.getElementById(id);
      const header = document.querySelector('.header');
      const headerHeight = header ? header.offsetHeight : 80;
      if (el) {
        const top = el.offsetTop - headerHeight - 20;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  }

  return (
    <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
      <nav className="navbar">
        <div className="container">
          <Link to="/" className="nav-logo-link">
            <div className="nav-logo">
              <img
                src={folha}
                alt="Agro+Prati Logo"
                style={{ height: '32px', width: '32px' }}
              />
              <span className="nav-logo-text">Agro+Prati</span>
            </div>
          </Link>

          <Nav menuItems={menuItems} onNavigate={(href) => handleNavClick(href)} />
          <div className="header-actions">
            <ThemeToggle />
            <LoginButton />
          </div>
        </div>
      </nav>
    </header>
  );
}
