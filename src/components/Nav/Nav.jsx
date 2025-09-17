import React, { useEffect, useRef, useState } from 'react';
import './Nav.css';

export default function Nav({ menuItems = [], onNavigate = () => {} }) {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);
  const menuRef = useRef(null);

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
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    const header = document.querySelector('.header');
    const headerHeight = header ? header.offsetHeight : 80;
    if (el) {
      const top = el.offsetTop - headerHeight - 20;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    setOpen(false);
    onNavigate(href);
  }

  return (
    <nav role="navigation" aria-label="Main navigation" className="nav-root">
      <ul id="main-navigation" className={`nav-menu ${open ? 'active' : ''}`} ref={menuRef}>
        {menuItems.map((item) => (
          <li key={item.href}>
            <a
              className="nav-link"
              onClick={() => handleNavClick(item.href)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleNavClick(item.href);
                }
              }}
              tabIndex={0}
              aria-current={window.location.hash === item.href ? 'page' : undefined}
            >
              {item.label}
            </a>
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
