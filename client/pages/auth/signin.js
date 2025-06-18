import { useState, useEffect } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import useRequest from '../../hooks/use-request';

export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const { doRequest, errors } = useRequest({
    url: '/api/auth/users/signin',
    method: 'post',
    body: {
      email,
      password
    },
    onSuccess: () => Router.push('/')
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const onSubmit = async event => {
    event.preventDefault();
    setIsLoading(true);
    await doRequest();
    setIsLoading(false);
  };

  const isFormValid = email && password;

  return (
    <div className="modern-auth-container">
      {/* Animated Background */}
      <div className="bg-animation">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>
      </div>

      <div className="auth-wrapper">
        <div className={`auth-card-modern ${isVisible ? 'visible' : ''}`}>

          {/* Header */}
          <div className="auth-header">
            <div className="auth-icon-modern">
              <i className="fas fa-sign-in-alt"></i>
              <div className="icon-glow"></div>
            </div>
            <h1 className="auth-title-modern">Welcome Back</h1>
            <p className="auth-subtitle">Sign in to continue your learning journey</p>
            
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="auth-form">
            {/* Email Field */}
            <div className="input-group-modern">
              <div className={`input-wrapper ${emailFocused || email ? 'focused' : ''}`}>
                <i className="fas fa-envelope input-icon"></i>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  className="input-modern"
                  placeholder="Enter your email address"
                  required
                />
                <label className="label-modern">Email Address</label>
                <div className="input-highlight"></div>
              </div>
            </div>

            {/* Password Field */}
            <div className="input-group-modern">
              <div className={`input-wrapper ${passwordFocused || password ? 'focused' : ''}`}>
                <i className="fas fa-lock input-icon"></i>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  className="input-modern"
                  placeholder="Enter your password"
                  required
                />
                <label className="label-modern">Password</label>
                <button
                  type="button"
                  className="password-toggle-modern"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
                <div className="input-highlight"></div>
              </div>
            </div>

            {/* Error Display */}
            {errors && (
              <div className="alert-modern error">
                <div className="alert-icon">
                  <i className="fas fa-exclamation-triangle"></i>
                </div>
                <div className="alert-content">
                  <div className="alert-title">Authentication Failed</div>
                  <div className="alert-message">{errors}</div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button 
              type="submit" 
              className={`btn-submit-modern ${!isFormValid ? 'disabled' : ''}`}
              disabled={isLoading || !isFormValid}
            >
              <div className="btn-content">
                {isLoading ? (
                  <>
                    <div className="loading-spinner"></div>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <i className="fas fa-sign-in-alt btn-icon"></i>
                    <span>Sign In</span>
                    <i className="fas fa-arrow-right btn-arrow"></i>
                  </>
                )}
              </div>
              <div className="btn-shine"></div>
            </button>

            {/* Sign Up Link */}
            <div className="auth-switch">
              <p>
                Don't have an account?{' '}
                <Link href="/auth/signup" className="switch-link">
                  Create one here
                  <i className="fas fa-arrow-right ms-1"></i>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      <style jsx>{`
        .modern-auth-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%);
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1rem;
        }

        .bg-animation {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
        }

        .floating-shapes {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .shape {
          position: absolute;
          border-radius: 50%;
          opacity: 0.1;
          animation: float 20s infinite ease-in-out;
        }

        .shape-1 {
          width: 80px;
          height: 80px;
          top: 20%;
          left: 10%;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          animation-delay: 0s;
        }

        .shape-2 {
          width: 120px;
          height: 120px;
          top: 60%;
          right: 15%;
          background: linear-gradient(135deg, #06b6d4, #3b82f6);
          animation-delay: 5s;
        }

        .shape-3 {
          width: 60px;
          height: 60px;
          top: 40%;
          left: 70%;
          background: linear-gradient(135deg, #8b5cf6, #d946ef);
          animation-delay: 10s;
        }

        .shape-4 {
          width: 100px;
          height: 100px;
          bottom: 20%;
          left: 20%;
          background: linear-gradient(135deg, #10b981, #06b6d4);
          animation-delay: 15s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px) scale(1); }
          25% { transform: translateY(-20px) translateX(10px) scale(1.1); }
          50% { transform: translateY(20px) translateX(-10px) scale(0.9); }
          75% { transform: translateY(-10px) translateX(15px) scale(1.05); }
        }

        .auth-wrapper {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 480px;
        }

        .auth-card-modern {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(99, 102, 241, 0.1);
          border-radius: 24px;
          padding: 3rem 2.5rem;
          position: relative;
          overflow: hidden;
          opacity: 0;
          transform: translateY(30px) scale(0.95);
          transition: all 0.6s ease;
          box-shadow: 0 20px 60px rgba(99, 102, 241, 0.1);
        }

        .auth-card-modern.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .auth-card-modern::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%);
          border-radius: 24px 24px 0 0;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          color: #64748b;
          text-decoration: none;
          font-size: 0.9rem;
          margin-bottom: 2rem;
          transition: all 0.3s ease;
          font-weight: 500;
        }

        .back-link:hover {
          color: #6366f1;
          transform: translateX(-4px);
          text-decoration: none;
        }

        .auth-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .auth-icon-modern {
          width: 100px;
          height: 100px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          position: relative;
          box-shadow: 0 10px 40px rgba(99, 102, 241, 0.4);
          animation: iconPulse 3s ease-in-out infinite;
        }

        @keyframes iconPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .auth-icon-modern i {
          font-size: 2.5rem;
          color: white;
          z-index: 2;
          position: relative;
        }

        .icon-glow {
          position: absolute;
          top: -10px;
          left: -10px;
          right: -10px;
          bottom: -10px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border-radius: 28px;
          opacity: 0.3;
          animation: glow 2s ease-in-out infinite alternate;
        }

        @keyframes glow {
          from { opacity: 0.3; transform: scale(1); }
          to { opacity: 0.6; transform: scale(1.1); }
        }

        .auth-title-modern {
          font-size: 2.5rem;
          font-weight: 900;
          color: #1e293b;
          margin-bottom: 0.5rem;
          background: linear-gradient(135deg, #1e293b, #64748b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .auth-subtitle {
          color: #64748b;
          font-size: 1.1rem;
          margin-bottom: 1.5rem;
        }

        .security-badge {
          display: inline-flex;
          align-items: center;
          background: rgba(99, 102, 241, 0.1);
          color: #6366f1;
          padding: 0.5rem 1rem;
          border-radius: 50px;
          font-size: 0.85rem;
          font-weight: 600;
          border: 1px solid rgba(99, 102, 241, 0.2);
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .input-group-modern {
          position: relative;
        }

        .input-wrapper {
          position: relative;
          background: white;
          border: 2px solid #e2e8f0;
          border-radius: 16px;
          transition: all 0.3s ease;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .input-wrapper.focused {
          border-color: #6366f1;
          background: white;
          box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
        }

        .input-icon {
          position: absolute;
          left: 1.25rem;
          top: 50%;
          transform: translateY(-50%);
          color: #64748b;
          z-index: 2;
          transition: color 0.3s ease;
        }

        .input-wrapper.focused .input-icon {
          color: #6366f1;
        }

        .input-modern {
          width: 100%;
          background: transparent;
          border: none;
          padding: 1.25rem 1.25rem 1.25rem 3.5rem;
          color: #1e293b;
          font-size: 1rem;
          outline: none;
          z-index: 2;
          position: relative;
        }

        .input-modern::placeholder {
          color: #94a3b8;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .input-wrapper.focused .input-modern::placeholder {
          opacity: 1;
        }

        .label-modern {
          position: absolute;
          left: 3.5rem;
          top: 50%;
          transform: translateY(-50%);
          color: #64748b;
          font-size: 1rem;
          font-weight: 500;
          pointer-events: none;
          transition: all 0.3s ease;
          z-index: 2;
        }

        .input-wrapper.focused .label-modern {
          top: 0.75rem;
          font-size: 0.75rem;
          color: #6366f1;
          transform: translateY(0);
        }

        .password-toggle-modern {
          position: absolute;
          right: 1.25rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #64748b;
          cursor: pointer;
          z-index: 3;
          padding: 0.5rem;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .password-toggle-modern:hover {
          color: #6366f1;
          background: rgba(99, 102, 241, 0.1);
        }

        .input-highlight {
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #6366f1, #8b5cf6);
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }

        .input-wrapper.focused .input-highlight {
          width: 100%;
        }

        .form-options {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: -0.5rem 0 0.5rem 0;
        }

        .remember-checkbox {
          display: flex;
          align-items: center;
          cursor: pointer;
          font-size: 0.9rem;
          color: #64748b;
        }

        .remember-checkbox input {
          display: none;
        }

        .checkmark {
          width: 20px;
          height: 20px;
          background: #f8fafc;
          border: 2px solid #e2e8f0;
          border-radius: 6px;
          margin-right: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .checkmark i {
          opacity: 0;
          color: white;
          font-size: 0.7rem;
          transition: all 0.3s ease;
        }

        .remember-checkbox input:checked + .checkmark {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border-color: #6366f1;
        }

        .remember-checkbox input:checked + .checkmark i {
          opacity: 1;
        }

        .forgot-link {
          color: #6366f1;
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 600;
          transition: color 0.3s ease;
        }

        .forgot-link:hover {
          color: #5855eb;
          text-decoration: underline;
        }

        .alert-modern {
          background: rgba(239, 68, 68, 0.05);
          border: 1px solid rgba(239, 68, 68, 0.2);
          border-radius: 12px;
          padding: 1rem;
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          animation: slideInDown 0.4s ease;
          box-shadow: 0 2px 8px rgba(239, 68, 68, 0.1);
        }

        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .alert-icon {
          width: 40px;
          height: 40px;
          background: rgba(239, 68, 68, 0.1);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .alert-icon i {
          color: #ef4444;
          font-size: 1.1rem;
        }

        .alert-content {
          flex: 1;
        }

        .alert-title {
          color: #ef4444;
          font-weight: 600;
          font-size: 0.9rem;
          margin-bottom: 0.25rem;
        }

        .alert-message {
          color: #ef4444;
          font-size: 0.85rem;
          opacity: 0.8;
        }

        .btn-submit-modern {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border: none;
          border-radius: 16px;
          padding: 1.25rem 2rem;
          color: white;
          font-weight: 700;
          font-size: 1.1rem;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: all 0.4s ease;
          box-shadow: 0 8px 30px rgba(99, 102, 241, 0.4);
          margin-top: 0.5rem;
        }

        .btn-submit-modern:hover:not(.disabled) {
          transform: translateY(-3px);
          box-shadow: 0 15px 50px rgba(99, 102, 241, 0.6);
        }

        .btn-submit-modern.disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none !important;
        }

        .btn-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          position: relative;
          z-index: 2;
        }

        .btn-icon {
          font-size: 1.1rem;
        }

        .btn-arrow {
          font-size: 0.9rem;
          transition: transform 0.3s ease;
        }

        .btn-submit-modern:hover:not(.disabled) .btn-arrow {
          transform: translateX(4px);
        }

        .loading-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .btn-shine {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.6s ease;
        }

        .btn-submit-modern:hover:not(.disabled) .btn-shine {
          left: 100%;
        }

        .divider-modern {
          position: relative;
          text-align: center;
          margin: 2rem 0 1.5rem;
        }

        .divider-modern::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #e2e8f0, transparent);
        }

        .divider-modern span {
          background: white;
          padding: 0 1.5rem;
          color: #64748b;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .social-login {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .social-btn {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 1rem;
          color: #64748b;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-weight: 600;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .social-btn:hover {
          background: #f8fafc;
          border-color: #cbd5e1;
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
        }

        .social-btn.google:hover {
          border-color: #ea4335;
          color: #ea4335;
        }

        .social-btn.github:hover {
          border-color: #1f2937;
          color: #1f2937;
        }

        .auth-switch {
          text-align: center;
          margin-top: 1rem;
        }

        .auth-switch p {
          color: #64748b;
          margin: 0;
        }

        .switch-link {
          color: #6366f1;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
        }

        .switch-link:hover {
          color: #5855eb;
          text-decoration: none;
          transform: translateX(4px);
        }

        @media (max-width: 768px) {
          .modern-auth-container {
            padding: 1rem;
          }

          .auth-card-modern {
            padding: 2rem 1.5rem;
          }

          .auth-title-modern {
            font-size: 2rem;
          }

          .social-login {
            grid-template-columns: 1fr;
          }

          .form-options {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }
        }

        @media (max-width: 480px) {
          .auth-header {
            margin-bottom: 2rem;
          }

          .auth-icon-modern {
            width: 80px;
            height: 80px;
          }

          .auth-icon-modern i {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
};