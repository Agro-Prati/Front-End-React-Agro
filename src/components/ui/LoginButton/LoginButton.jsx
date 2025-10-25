import React from 'react';
import { Link } from 'react-router-dom';
import './LoginButton.css';
import { useAuth } from '../../../contexts/useAuth';

export default function LoginButton({ onClick = () => {}, label = 'Entrar' }) {
  const { isAuthenticated, user, token } = useAuth();
  
  console.log('LoginButton - isAuthenticated:', isAuthenticated()); // Debug
  console.log('LoginButton - user:', user); // Debug
  console.log('LoginButton - token:', token); // Debug

  // Se o usuário estiver autenticado, não mostra o botão de login
  if (isAuthenticated()) {
    return null;
  }

  return (
    <Link to="/login" className="login-btn-link">
      <button className="login-btn" onClick={onClick} aria-label={label}>
        {label}
      </button>
    </Link>
  );
}
