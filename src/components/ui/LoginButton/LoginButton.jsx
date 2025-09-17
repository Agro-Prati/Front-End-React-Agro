import React from 'react';
import { Link } from 'react-router-dom';
import './LoginButton.css';

export default function LoginButton({ onClick = () => {}, label = 'Entrar' }) {
  return (
    <Link to="/login" className="login-btn-link">
      <button className="login-btn" onClick={onClick} aria-label={label}>
        {label}
      </button>
    </Link>
  );
}
