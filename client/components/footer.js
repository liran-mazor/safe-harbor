
export default () => {
  return (
    <footer className="modern-footer">
      <div className="container">
        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-left">
            <div className="copyright">
              <p>&copy; 2024 Worksheeter. All rights reserved.</p>
              <p className="tagline">Making every study session count.</p>
            </div>
          </div>
          
          <div className="social-links">
              <a href="https://www.linkedin.com/in/liran-mazor/" target="_blank" rel="noopener noreferrer" className="social-link">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="https://github.com/worksheeter" target="_blank" rel="noopener noreferrer" className="social-link">
                <i className="fab fa-github"></i>
              </a>
            </div>

          <div className="footer-right">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="back-to-top"
            >
              <i className="fas fa-arrow-up"></i>
              <span>Back to Top</span>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .modern-footer {
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          border-top: 1px solid rgba(99, 102, 241, 0.1);
          color: #64748b;
          margin-top: auto;
          position: relative;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 4rem 2rem 2rem;
        }

        .footer-content {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 4rem;
          margin-bottom: 3rem;
        }

        .footer-brand {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .brand-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .logo-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 4px 16px rgba(99, 102, 241, 0.2);
        }

        .logo-icon svg {
          width: 20px;
          height: 20px;
        }

        .brand-name {
          font-size: 1.5rem;
          font-weight: 800;
          color: #1e293b;
        }

        .brand-description {
          color: #64748b;
          line-height: 1.6;
          max-width: 320px;
          margin: 0;
        }

        .social-links {
          display: flex;
          gap: 1rem;
        }

        .social-link {
          width: 44px;
          height: 44px;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #64748b;
          text-decoration: none;
          transition: all 0.3s ease;
          font-size: 1.1rem;
        }

        .social-link:hover {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
          border-color: transparent;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(99, 102, 241, 0.3);
          text-decoration: none;
        }

        .footer-links {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
        }

        .link-group h4 {
          color: #1e293b;
          font-size: 0.95rem;
          font-weight: 700;
          margin-bottom: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .link-group a {
          display: block;
          color: #64748b;
          text-decoration: none;
          padding: 0.375rem 0;
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.2s ease;
          border-radius: 4px;
        }

        .link-group a:hover {
          color: #6366f1;
          text-decoration: none;
          transform: translateX(4px);
        }

        .footer-bottom {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 2rem;
          padding-top: 2rem;
          border-top: 1px solid #e2e8f0;
        }

        .footer-left {
          justify-self: start;
        }

        .footer-center {
          justify-self: center;
        }

        .footer-right {
          justify-self: end;
        }

        .copyright {
          color: #64748b;
          font-size: 0.85rem;
        }

        .copyright p {
          margin: 0;
          line-height: 1.4;
        }

        .tagline {
          color: #6366f1;
          font-weight: 600;
          font-size: 0.8rem;
        }

        .trust-badges {
          display: flex;
          gap: 1.5rem;
          align-items: center;
        }

        .trust-badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 600;
          color: #64748b;
        }

        .trust-badge i {
          color: #6366f1;
          font-size: 0.9rem;
        }

        .back-to-top {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border: none;
          color: white;
          cursor: pointer;
          font-size: 0.85rem;
          font-weight: 600;
          padding: 0.75rem 1.5rem;
          border-radius: 12px;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          box-shadow: 0 4px 16px rgba(99, 102, 241, 0.2);
        }

        .back-to-top:hover {
          background: linear-gradient(135deg, #5855eb, #7c3aed);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(99, 102, 241, 0.3);
        }

        .back-to-top i {
          font-size: 0.8rem;
          transition: transform 0.3s ease;
        }

        .back-to-top:hover i {
          transform: translateY(-2px);
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .footer-content {
            grid-template-columns: 1fr;
            gap: 3rem;
          }

          .footer-links {
            grid-template-columns: repeat(2, 1fr);
          }

          .footer-bottom {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 1.5rem;
          }

          .footer-left,
          .footer-center,
          .footer-right {
            justify-self: center;
          }

          .trust-badges {
            justify-content: center;
          }
        }

        @media (max-width: 768px) {
          .container {
            padding: 3rem 1.5rem 1.5rem;
          }

          .footer-links {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .footer-bottom {
            gap: 1rem;
          }

          .trust-badges {
            flex-direction: column;
            gap: 1rem;
          }

          .back-to-top {
            font-size: 0.8rem;
            padding: 0.6rem 1.2rem;
          }
        }

        @media (max-width: 480px) {
          .container {
            padding: 2rem 1rem 1rem;
          }

          .footer-content {
            gap: 2rem;
          }

          .social-links {
            gap: 0.75rem;
          }

          .social-link {
            width: 40px;
            height: 40px;
            font-size: 1rem;
          }

          .trust-badge {
            font-size: 0.75rem;
            padding: 0.4rem 0.8rem;
          }

          .back-to-top span {
            display: none;
          }

          .back-to-top {
            padding: 0.75rem;
            border-radius: 50%;
            width: 48px;
            height: 48px;
          }
        }
      `}</style>
    </footer>
  );
};