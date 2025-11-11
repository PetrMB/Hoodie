import React from 'react';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo-section">
            <div className="skoda-logo">ŠKODA</div>
            <div className="brand-divider"></div>
            <h1 className="app-title">SAP GCC Hoodie Photo Booth</h1>
          </div>
          <p className="app-subtitle">
            Professional LinkedIn Portrait Generator
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
