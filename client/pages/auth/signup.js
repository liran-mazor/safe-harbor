import { useState, useEffect } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import useRequest from '../../hooks/use-request';

export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  
  const { doRequest, errors } = useRequest({
    url: '/api/auth/users/signup',
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

  // Password strength checker
  const checkPasswordStrength = (password) => {
    let strength = 0;
    const checks = [
      password.length >= 8,
      /[A-Z]/.test(password),
      /[a-z]/.test(password),
      /[0-9]/.test(password),
      /[^A-Za-z0-9]/.test(password)
    ];
    return checks.filter(Boolean).length;
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
    setPasswordStrength(checkPasswordStrength(value));
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 2) return '#ef4444';
    if (passwordStrength <= 3) return '#f59e0b';
    return '#10b981';
  };

  const getStrengthText = () => {
    if (passwordStrength <= 2) return 'Weak';
    if (passwordStrength <= 3) return 'Good';
    return 'Strong';
  };

  const getStrengthWidth = () => {
    return Math.max((passwordStrength / 5) * 100, password ? 20 : 0);
  };

  const onSubmit = async event => {
    event.preventDefault();
    
    if (password !== confirmPassword || passwordStrength < 3 || !agreedToTerms) {
      return;
    }
    
    setIsLoading(true);
    await doRequest();
    setIsLoading(false);
  };

  const passwordsMatch = password === confirmPassword || confirmPassword === '';
  const isFormValid = email && password && confirmPassword && passwordsMatch && passwordStrength >= 3 && agreedToTerms;

  const passwordRequirements = [
    { label: 'At least 8 characters', check: password.length >= 8, icon: 'fa-text-width' },
    { label: 'One uppercase letter', check: /[A-Z]/.test(password), icon: 'fa-arrow-up' },
    { label: 'One lowercase letter', check: /[a-z]/.test(password), icon: 'fa-arrow-down' },
    { label: 'One number', check: /[0-9]/.test(password), icon: 'fa-hashtag' },
    { label: 'One special character', check: /[^A-Za-z0-9]/.test(password), icon: 'fa-asterisk' }
  ];

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
          {/* Back to Home Link */}
          <Link href="/" className="back-link">
            <i className="fas fa-arrow-left me-2"></i>
            Back to Home
          </Link>

          {/* Header */}
          <div className="auth-header">
            <div className="auth-icon-modern">
              <i className="fas fa-user-plus"></i>
              <div className="icon-glow"></div>
            </div>
            <h1 className="auth-title-modern">Join Worksheeter</h1>
            <p className="auth-subtitle">Start your AI-powered learning journey today</p>
            
            {/* Security Badge */}
            <div className="security-badge">
              <i className="fas fa-shield-check me-2"></i>
              Secure & Private Learning Platform
            </div>
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
                  onChange={e => handlePasswordChange(e.target.value)}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  className="input-modern"
                  placeholder="Create a strong password"
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

            {/* Password Strength Indicator */}
            {password && (
              <div className="password-strength-container">
                <div className="strength-header">
                  <span className="strength-label">Password Strength</span>
                  <span className="strength-text" style={{ color: getStrengthColor() }}>
                    {getStrengthText()}
                  </span>
                </div>
                <div className="strength-bar-container">
                  <div className="strength-bar">
                    <div 
                      className="strength-fill"
                      style={{ 
                        width: `${getStrengthWidth()}%`,
                        backgroundColor: getStrengthColor()
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            {/* Confirm Password Field */}
            <div className="input-group-modern">
              <div className={`input-wrapper ${confirmPasswordFocused || confirmPassword ? 'focused' : ''} ${!passwordsMatch && confirmPassword ? 'error' : ''}`}>
                <i className="fas fa-lock input-icon"></i>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  onFocus={() => setConfirmPasswordFocused(true)}
                  onBlur={() => setConfirmPasswordFocused(false)}
                  className="input-modern"
                  placeholder="Confirm your password"
                  required
                />
                <label className="label-modern">Confirm Password</label>
                <button
                  type="button"
                  className="password-toggle-modern"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
                <div className="input-highlight"></div>
                {!passwordsMatch && confirmPassword && (
                  <div className="field-error">
                    <i className="fas fa-exclamation-circle me-1"></i>
                    Passwords do not match
                  </div>
                )}
              </div>
            </div>

            {/* Password Requirements */}
            {password && (
              <div className="requirements-container">
                <div className="requirements-header">
                  <i className="fas fa-list-check me-2"></i>
                  Password Requirements
                </div>
                <div className="requirements-grid">
                  {passwordRequirements.map((req, index) => (
                    <div key={index} className={`requirement-item ${req.check ? 'met' : ''}`}>
                      <div className="requirement-icon">
                        <i className={`fas ${req.check ? 'fa-check-circle' : req.icon}`}></i>
                      </div>
                      <span className="requirement-text">{req.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Terms Agreement */}
            <div className="terms-container">
              <label className="terms-checkbox">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={e => setAgreedToTerms(e.target.checked)}
                />
                <span className="checkmark">
                  <i className="fas fa-check"></i>
                </span>
                <span className="terms-text">
                  I agree to the{' '}
                  <Link href="/terms" className="terms-link">Terms of Service</Link>
                  {' '}and{' '}
                  <Link href="/privacy" className="terms-link">Privacy Policy</Link>
                </span>
              </label>
            </div>

            {/* Error Display */}
            {errors && (
              <div className="alert-modern error">
                <div className="alert-icon">
                  <i className="fas fa-exclamation-triangle"></i>
                </div>
                <div className="alert-content">
                  <div className="alert-title">Registration Failed</div>
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
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <i className="fas fa-user-plus btn-icon"></i>
                    <span>Create Account</span>
                    <i className="fas fa-arrow-right btn-arrow"></i>
                  </>
                )}
              </div>
              <div className="btn-shine"></div>
            </button>

            {/* Sign In Link */}
            <div className="auth-switch">
              <p>
                Already have an account?{' '}
                <Link href="/auth/signin" className="switch-link">
                  Sign in here
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
          max-width: 520px;
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

        .input-wrapper.error {
          border-color: #ef4444;
          background: rgba(239, 68, 68, 0.02);
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

        .input-wrapper.error .input-icon {
          color: #ef4444;
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

        .input-wrapper.error.focused .label-modern {
          color: #ef4444;
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

        .input-wrapper.error .input-highlight {
          background: #ef4444;
        }

        .field-error {
          position: absolute;
          bottom: -1.75rem;
          left: 0;
          color: #ef4444;
          font-size: 0.8rem;
          font-weight: 500;
          display: flex;
          align-items: center;
          animation: slideInDown 0.3s ease;
        }

        .password-strength-container {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 1rem;
          margin-top: -0.5rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .strength-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
        }

        .strength-label {
          color: #64748b;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .strength-text {
          font-size: 0.9rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .strength-bar-container {
          position: relative;
        }

        .strength-bar {
          height: 6px;
          background: #f1f5f9;
          border-radius: 3px;
          overflow: hidden;
        }

        .strength-fill {
          height: 100%;
          transition: all 0.4s ease;
          border-radius: 3px;
        }

        .requirements-container {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 1rem;
          margin-top: -0.5rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .requirements-header {
          color: #64748b;
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
          display: flex;
          align-items: center;
        }

        .requirements-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 0.5rem;
        }

        .requirement-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem;
          border-radius: 8px;
          transition: all 0.3s ease;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
        }

        .requirement-item.met {
          background: rgba(16, 185, 129, 0.05);
          border-color: rgba(16, 185, 129, 0.2);
        }

        .requirement-icon {
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: #e2e8f0;
          transition: all 0.3s ease;
        }

        .requirement-item.met .requirement-icon {
          background: #10b981;
          color: white;
        }

        .requirement-icon i {
          font-size: 0.7rem;
          color: #64748b;
        }

        .requirement-item.met .requirement-icon i {
          color: white;
        }

        .requirement-text {
          font-size: 0.85rem;
          color: #64748b;
          font-weight: 500;
        }

        .requirement-item.met .requirement-text {
          color: #10b981;
        }

        .terms-container {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 1rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .terms-checkbox {
          display: flex;
          align-items: flex-start;
          cursor: pointer;
          gap: 0.75rem;
        }

        .terms-checkbox input {
          display: none;
        }

        .checkmark {
          width: 20px;
          height: 20px;
          background: #f8fafc;
          border: 2px solid #e2e8f0;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .checkmark i {
          opacity: 0;
          color: white;
          font-size: 0.7rem;
          transition: all 0.3s ease;
        }

        .terms-checkbox input:checked + .checkmark {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border-color: #6366f1;
        }

        .terms-checkbox input:checked + .checkmark i {
          opacity: 1;
        }

        .terms-text {
          color: #64748b;
          font-size: 0.9rem;
          line-height: 1.5;
        }

        .terms-link {
          color: #6366f1;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.3s ease;
        }

        .terms-link:hover {
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

          .requirements-grid {
            grid-template-columns: 1fr;
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

          .requirements-container,
          .password-strength-container,
          .terms-container {
            margin-left: -0.5rem;
            margin-right: -0.5rem;
          }
        }
      `}</style>
    </div>
  );
};