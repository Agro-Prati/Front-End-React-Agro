import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ProfileButton.css';
import { useAuth } from '../../../contexts/useAuth';

export default function ProfileButton({ onClick = () => {} }) {
  const { user, isAuthenticated, logout, token } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  console.log('ProfileButton - isAuthenticated:', isAuthenticated()); // Debug
  console.log('ProfileButton - user:', user); // Debug
  console.log('ProfileButton - token:', token); // Debug

  // Se o usuário não estiver autenticado, não mostra o botão
  if (!isAuthenticated()) {
    return null;
  }

  const handleLogout = () => {
    setShowMenu(false);
    logout();
  };

  return (
    <div style={{ position: 'relative' }}>
      <button 
        className="profile-btn" 
        onClick={() => setShowMenu(!showMenu)} 
        aria-label="Menu do perfil"
      >
        👤 {user?.name || 'Perfil'}
      </button>
      
      {showMenu && (
        <>
          <div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 998
            }}
            onClick={() => setShowMenu(false)}
          />
          <div style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            marginTop: '8px',
            background: 'var(--bg-white)',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            minWidth: '200px',
            zIndex: 999,
            overflow: 'hidden'
          }}>
            <div style={{
              padding: '12px 16px',
              borderBottom: '1px solid var(--border-color)',
              fontSize: '0.9rem',
              color: 'var(--text-light)'
            }}>
              <div style={{ fontWeight: '600', color: 'var(--text-dark)', marginBottom: '4px' }}>
                {user?.name}
              </div>
              <div style={{ fontSize: '0.85rem' }}>
                {user?.email}
              </div>
            </div>
            
            <Link 
              to="/profile" 
              style={{
                display: 'block',
                padding: '12px 16px',
                color: 'var(--text-dark)',
                textDecoration: 'none',
                transition: 'background 0.2s'
              }}
              onClick={() => {
                setShowMenu(false);
                onClick();
              }}
              onMouseOver={(e) => e.target.style.background = 'var(--bg-light)'}
              onMouseOut={(e) => e.target.style.background = 'transparent'}
            >
              👤 Meu Perfil
            </Link>
            
            <button
              onClick={handleLogout}
              style={{
                display: 'block',
                width: '100%',
                padding: '12px 16px',
                textAlign: 'left',
                background: 'transparent',
                border: 'none',
                borderTop: '1px solid var(--border-color)',
                color: '#d32f2f',
                cursor: 'pointer',
                fontSize: '1rem',
                transition: 'background 0.2s'
              }}
              onMouseOver={(e) => e.target.style.background = '#ffebee'}
              onMouseOut={(e) => e.target.style.background = 'transparent'}
            >
              🚪 Sair
            </button>
          </div>
        </>
      )}
    </div>
  );
}