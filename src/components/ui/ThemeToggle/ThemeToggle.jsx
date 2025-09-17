import React, { useEffect, useState } from 'react';
import './ThemeToggle.css';

export default function ThemeToggle({ initial = undefined }) {
  const [theme, setTheme] = useState(() => {
    if (initial) return initial;
    try {
      return localStorage.getItem('theme') || 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    try {
      localStorage.setItem('theme', theme);
    } catch {
      // ignore storage errors (private mode, quota, etc.)
    }
  }, [theme]);

  function toggle() {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  }

  return (
    <button className="theme-toggle-btn" onClick={toggle} aria-label="Alternar tema">
      {theme === 'dark' ? '🌙' : '☀️'}
    </button>
  );
}
