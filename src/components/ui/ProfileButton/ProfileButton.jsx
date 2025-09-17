import React from 'react';
import { Link } from 'react-router-dom';
import './ProfileButton.css';

export default function ProfileButton({ onClick = () => {}, label = 'Perfil' }) {
  return (
    <Link to="/profile" className="profile-btn-link">
      <button className="profile-btn" onClick={onClick} aria-label={label}>
        👤 {label}
      </button>
    </Link>
  );
}