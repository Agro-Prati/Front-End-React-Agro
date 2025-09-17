import React from 'react';
import './LoginButton.css';

export default function LoginButton({ onClick = () => {}, label = 'Entrar' }) {
  return (
    <button className="login-btn" onClick={onClick} aria-label={label}>
      {label}
    </button>
  );
}
