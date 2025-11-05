import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginButton.css';
import { useAuth } from '../../../contexts/useAuth';

export default function LoginButton({ onClick = () => {}, label = 'Entrar' }) {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, right: 0 });
  const buttonRef = useRef(null);

  // Função para obter as iniciais do nome
  const getInitials = (name) => {
    if (!name) return 'U';
    const words = name.trim().split(' ');
    if (words.length === 1) return words[0].charAt(0).toUpperCase();
    return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
  };

  const handleLogout = () => {
    setShowMenu(false);
    logout();
    navigate('/');
  };

  const handleProfileClick = () => {
    setShowMenu(false);
    navigate('/profile');
  };

  // Calcular posição do menu quando o botão é clicado
  const handleToggleMenu = () => {
    if (!showMenu && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + 8, // 8px de gap
        right: window.innerWidth - rect.right,
      });
    }
    setShowMenu(!showMenu);
  };

  // Se o usuário está autenticado, mostra o avatar com menu
  if (isAuthenticated() && user) {
    return (
      <div className="login-avatar-container">
        <button 
          ref={buttonRef}
          className="login-avatar-btn" 
          onClick={handleToggleMenu}
          aria-label="Menu do perfil"
          title={user.name || user.email}
        >
          {user.picture || user.avatar ? (
            <img 
              src={user.picture || user.avatar} 
              alt={user.name || 'Avatar'} 
              className="login-avatar-img"
            />
          ) : (
            <div className="login-avatar-initials">
              {getInitials(user.name || user.email)}
            </div>
          )}
        </button>

        {showMenu && (
          <>
            {/* Overlay para fechar o menu ao clicar fora */}
            <div
              className="login-menu-overlay"
              onClick={() => setShowMenu(false)}
            />
            {/* Menu dropdown */}
            <div 
              className="login-menu-dropdown"
              style={{
                top: `${menuPosition.top}px`,
                right: `${menuPosition.right}px`,
              }}
            >
              <div className="login-menu-header">
                <div className="login-menu-name">{user?.name || 'Usuário'}</div>
                <div className="login-menu-email">{user?.email}</div>
              </div>

              <button
                className="login-menu-item"
                onClick={handleProfileClick}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                Meu Perfil
              </button>

              <button
                className="login-menu-item login-menu-logout"
                onClick={handleLogout}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                Sair
              </button>
            </div>
          </>
        )}
      </div>
    );
  }

  // Se não está autenticado, mostra o botão de login
  return (
    <Link to="/login" className="login-btn-link">
      <button className="login-btn" onClick={onClick} aria-label={label}>
        <svg 
          width="18" 
          height="18" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
          <polyline points="10 17 15 12 10 7"></polyline>
          <line x1="15" y1="12" x2="3" y2="12"></line>
        </svg>
        {label}
      </button>
    </Link>
  );
}
