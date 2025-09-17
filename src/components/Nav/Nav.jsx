import React, { useState } from 'react';
import './Nav.css';

export default function Nav({ menuItems = [], onNavigate = () => {} }) {
  const [open, setOpen] = useState(false);

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
    <>
      <ul className={`nav-menu ${open ? 'active' : ''}`}>
        {menuItems.map((item) => (
          <li key={item.href}>
            <a className="nav-link" onClick={() => handleNavClick(item.href)}>{item.label}</a>
          </li>
        ))}
      </ul>

      <div className={`nav-toggle ${open ? 'active' : ''}`} onClick={handleToggle} aria-hidden>
        <span />
        <span />
        <span />
      </div>
    </>
  );
}
