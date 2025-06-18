import Link from 'next/link';
import { useState, useEffect } from 'react';

export default ({ currentUser }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationLinks = [
    { label: 'About', href: '/about', icon: 'fas fa-info-circle' },
    ...(currentUser ? [
      { label: 'My Worksheets', href: '/worksheets', icon: 'fas fa-file-alt' },
      { label: 'Quizzes', href: '/quizzes', icon: 'fas fa-brain' },
      { label: 'New Worksheet', href: '/worksheets/new', icon: 'fas fa-plus-circle' },
    ] : [])
  ];

  const authLinks = [
    !currentUser && { 
      label: 'Sign In', 
      href: '/auth/signin', 
      icon: 'fas fa-sign-in-alt',
      variant: 'ghost'
    },
    !currentUser && { 
      label: 'Sign Up', 
      href: '/auth/signup', 
      icon: 'fas fa-user-plus',
      variant: 'primary'
    },
    currentUser && { 
      label: 'Sign Out', 
      href: '/auth/signout', 
      icon: 'fas fa-sign-out-alt',
      variant: 'ghost'
    },
  ].filter(Boolean);

  return (
    <>
      <header className={`modern-header ${isScrolled ? 'scrolled' : ''}`}>
        <nav className="nav-container">
          {/* Logo */}
          <Link href="/" className="logo">
            <span className="logo-text">Worksheeter</span>
          </Link>
          {/* Desktop Navigation */}
          <div className="desktop-nav">
            {/* Main Navigation */}
            <div className="nav-links">
              {navigationLinks.map((link) => (
                <Link key={link.href} href={link.href} className="nav-link">
                  <i className={`${link.icon} nav-icon`}></i>
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Auth Section */}
            <div className="auth-section">
              {currentUser && currentUser.email && (
                <div className="user-greeting">
                  <div className="user-avatar">
                    <i className="fas fa-user"></i>
                  </div>
                  <span className="user-name">{currentUser.email.split('@')[0]}</span>
                </div>
              )}
              
              <div className="auth-buttons">
                {authLinks.map((link) => (
                  <Link key={link.href} href={link.href} className={`btn btn-${link.variant}`}>
                    <i className={link.icon}></i>
                    <span>{link.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className={`mobile-toggle ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </nav>

        {/* Mobile Navigation */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
          <div className="mobile-content">
            {currentUser && currentUser.email && (
              <div className="mobile-user">
                <div className="mobile-avatar">
                  <i className="fas fa-user"></i>
                </div>
                <div className="mobile-user-info">
                  <span className="mobile-user-name">{currentUser.email.split('@')[0]}</span>
                  <span className="mobile-user-email">{currentUser.email}</span>
                </div>
              </div>
            )}

            <div className="mobile-links">
              {navigationLinks.map((link) => (
                <Link key={link.href} href={link.href} className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>
                  <i className={link.icon}></i>
                  <span>{link.label}</span>
                </Link>
              ))}
              
              <div className="mobile-divider"></div>
              
              {authLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className={`mobile-link ${link.variant === 'primary' ? 'primary' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <i className={link.icon}></i>
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Backdrop */}
        {isMobileMenuOpen && (
          <div 
            className="mobile-backdrop"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
        )}
      </header>

      {/* Spacer to prevent content from hiding behind fixed header */}
      <div className="header-spacer"></div>

      <style jsx global>{`
        .header-spacer {
          height: 80px;
          width: 100%;
        }

        .modern-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(99, 102, 241, 0.1);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }

        .modern-header.scrolled {
          background: rgba(255, 255, 255, 0.98);
          box-shadow: 0 4px 32px rgba(99, 102, 241, 0.08);
          border-bottom-color: rgba(99, 102, 241, 0.15);
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
          color: #1e293b;
          font-weight: 800;
          font-size: 1.3rem;
          transition: all 0.3s ease;
        }

        .logo:hover {
          text-decoration: none;
          transform: translateY(-2px);
        }

        .logo-text {
          background: linear-gradient(135deg, #1e293b, #64748b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          transition: all 0.3s ease;
        }

        .logo:hover .logo-text {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 3rem;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .nav-link {
          color: #64748b;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.95rem;
          padding: 0.75rem 1rem;
          border-radius: 12px;
          position: relative;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          border: 1px solid transparent;
        }

        .nav-icon {
          font-size: 0.9rem;
          opacity: 0.7;
          transition: all 0.3s ease;
        }

        .nav-link:hover {
          color: #6366f1;
          text-decoration: none;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.08), rgba(139, 92, 246, 0.05));
          border-color: rgba(99, 102, 241, 0.15);
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(99, 102, 241, 0.1);
        }

        .nav-link:hover .nav-icon {
          opacity: 1;
          transform: scale(1.1);
          color: #8b5cf6;
        }

        .auth-section {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .user-greeting {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem 1rem;
          background: linear-gradient(135deg, #f8fafc, #f1f5f9);
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .user-greeting:hover {
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(139, 92, 246, 0.03));
          border-color: rgba(99, 102, 241, 0.15);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.08);
        }

        .user-avatar {
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 0.8rem;
          transition: all 0.3s ease;
        }

        .user-greeting:hover .user-avatar {
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
        }

        .user-name {
          color: #1e293b;
          font-weight: 600;
          font-size: 0.9rem;
          transition: color 0.3s ease;
        }

        .user-greeting:hover .user-name {
          color: #6366f1;
        }

        .auth-buttons {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.625rem 1.25rem;
          border-radius: 12px;
          font-weight: 600;
          font-size: 0.875rem;
          text-decoration: none;
          transition: all 0.3s ease;
          border: 1px solid transparent;
          position: relative;
          overflow: hidden;
        }

        .btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.6s ease;
        }

        .btn:hover::before {
          left: 100%;
        }

        .btn-ghost {
          color: #64748b;
          background: rgba(100, 116, 139, 0.05);
          border-color: rgba(100, 116, 139, 0.1);
        }

        .btn-ghost:hover {
          color: #6366f1;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.08), rgba(139, 92, 246, 0.05));
          border-color: rgba(99, 102, 241, 0.2);
          text-decoration: none;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(99, 102, 241, 0.15);
        }

        .btn-primary {
          color: white;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          box-shadow: 0 2px 8px rgba(99, 102, 241, 0.2);
        }

        .btn-primary:hover {
          color: white;
          background: linear-gradient(135deg, #5855eb, #7c3aed);
          box-shadow: 0 8px 25px rgba(99, 102, 241, 0.35);
          text-decoration: none;
          transform: translateY(-2px);
        }

        .btn i {
          font-size: 0.875rem;
          transition: transform 0.3s ease;
        }

        .btn:hover i {
          transform: scale(1.1);
        }

        .mobile-toggle {
          display: none;
          flex-direction: column;
          gap: 3px;
          background: none;
          border: none;
          padding: 0.5rem;
          cursor: pointer;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .mobile-toggle:hover {
          background: rgba(99, 102, 241, 0.05);
        }

        .mobile-toggle span {
          width: 20px;
          height: 2px;
          background: #64748b;
          border-radius: 1px;
          transition: all 0.3s ease;
        }

        .mobile-toggle:hover span {
          background: #6366f1;
        }

        .mobile-toggle.active span:nth-child(1) {
          transform: rotate(45deg) translate(4px, 4px);
        }

        .mobile-toggle.active span:nth-child(2) {
          opacity: 0;
        }

        .mobile-toggle.active span:nth-child(3) {
          transform: rotate(-45deg) translate(5px, -5px);
        }

        .mobile-menu {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(99, 102, 241, 0.1);
          transform: translateY(-100%);
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 32px rgba(99, 102, 241, 0.08);
        }

        .mobile-menu.open {
          transform: translateY(0);
          opacity: 1;
          visibility: visible;
        }

        .mobile-content {
          padding: 2rem;
        }

        .mobile-user {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.5rem;
          background: linear-gradient(135deg, #f8fafc, #f1f5f9);
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          margin-bottom: 2rem;
          transition: all 0.3s ease;
        }

        .mobile-user:hover {
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(139, 92, 246, 0.03));
          border-color: rgba(99, 102, 241, 0.15);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(99, 102, 241, 0.1);
        }

        .mobile-avatar {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          transition: all 0.3s ease;
        }

        .mobile-user:hover .mobile-avatar {
          transform: scale(1.05);
          box-shadow: 0 8px 20px rgba(99, 102, 241, 0.2);
        }

        .mobile-user-info {
          display: flex;
          flex-direction: column;
        }

        .mobile-user-name {
          color: #1e293b;
          font-weight: 600;
          font-size: 1rem;
          transition: color 0.3s ease;
        }

        .mobile-user:hover .mobile-user-name {
          color: #6366f1;
        }

        .mobile-user-email {
          color: #64748b;
          font-size: 0.875rem;
          transition: color 0.3s ease;
        }

        .mobile-user:hover .mobile-user-email {
          color: #8b5cf6;
        }

        .mobile-links {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .mobile-link {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.5rem;
          color: #64748b;
          text-decoration: none;
          border-radius: 12px;
          transition: all 0.3s ease;
          font-weight: 500;
          border: 1px solid transparent;
          position: relative;
          overflow: hidden;
        }

        .mobile-link::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.1), transparent);
          transition: left 0.6s ease;
        }

        .mobile-link:hover::before {
          left: 100%;
        }

        .mobile-link:hover {
          color: #6366f1;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.08), rgba(139, 92, 246, 0.05));
          border-color: rgba(99, 102, 241, 0.15);
          text-decoration: none;
          transform: translateX(8px);
          box-shadow: 0 4px 16px rgba(99, 102, 241, 0.1);
        }

        .mobile-link.primary {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
          border-color: transparent;
        }

        .mobile-link.primary::before {
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        }

        .mobile-link.primary:hover {
          background: linear-gradient(135deg, #5855eb, #7c3aed);
          color: white;
          transform: translateX(8px);
          box-shadow: 0 8px 25px rgba(99, 102, 241, 0.3);
        }

        .mobile-link i {
          width: 20px;
          text-align: center;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .mobile-link:hover i {
          transform: scale(1.1);
          color: #8b5cf6;
        }

        .mobile-link.primary:hover i {
          color: white;
        }

        .mobile-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, #e2e8f0, transparent);
          margin: 1rem 0;
        }

        .mobile-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.1);
          z-index: -1;
        }

        @media (max-width: 768px) {
          .header-spacer {
            height: 72px;
          }

          .desktop-nav {
            display: none;
          }

          .mobile-toggle {
            display: flex;
          }

          .nav-container {
            padding: 0 1rem;
            height: 72px;
          }

          .logo {
            font-size: 1.2rem;
          }

          .logo-mark {
            width: 36px;
            height: 36px;
          }

          .logo-mark svg {
            width: 18px;
            height: 18px;
          }
        }

        @media (max-width: 480px) {
          .mobile-content {
            padding: 1.5rem;
          }

          .nav-container {
            padding: 0 1rem;
          }

          .logo {
            font-size: 1.1rem;
          }

          .mobile-user {
            padding: 1rem;
          }
        }
      `}</style>
    </>
  );
};