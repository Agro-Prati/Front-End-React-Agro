import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Nav.css';

export default function Nav({ menuItems = [], onNavigate = () => {} }) {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);
  const menuRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  function handleToggle() {
    setOpen((v) => !v);
  }

  function handleNavClick(href) {
    // Para rotas, apenas fechar o menu mobile
    setOpen(false);
    onNavigate(href);
  }

  return (
    <nav role="navigation" aria-label="Main navigation" className="nav-root">
      <ul id="main-navigation" className={`nav-menu ${open ? 'active' : ''}`} ref={menuRef}>
        {menuItems.map((item) => (
          <li key={item.href}>
            <Link
              className="nav-link"
              to={item.href}
              onClick={() => handleNavClick(item.href)}
              aria-current={location.pathname === item.href ? 'page' : undefined}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <button
        ref={toggleRef}
        className={`nav-toggle ${open ? 'active' : ''}`}
        onClick={handleToggle}
        aria-expanded={open}
        aria-controls="main-navigation"
        aria-label={open ? 'Fechar menu' : 'Abrir menu'}
      >
        <span />
        <span />
        <span />
      </button>
    </nav>
  );
}
