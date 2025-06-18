import { useEffect, useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

export default () => {
  const [stage, setStage] = useState('preparing'); // preparing, signing-out, success, error
  const [progress, setProgress] = useState(0);

  const { doRequest, errors } = useRequest({
    url: '/api/auth/users/signout',
    method: 'post',
    body: {},
    onSuccess: () => {
      setStage('success');
      setProgress(100);
      setTimeout(() => {
        Router.push('/');
      }, 2000);
    }
  });

  useEffect(() => {
    // Simulate preparation phase
    const prepTimer = setTimeout(() => {
      setStage('signing-out');
      setProgress(25);
      
      // Start the actual sign out process
      doRequest();
      
      // Simulate progress
      const progressTimer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressTimer);
            return 90;
          }
          return prev + 10;
        });
      }, 150);

      return () => clearInterval(progressTimer);
    }, 500);

    return () => clearTimeout(prepTimer);
  }, []);

  useEffect(() => {
    if (errors) {
      setStage('error');
    }
  }, [errors]);

  const getStageIcon = () => {
    switch (stage) {
      case 'preparing':
        return 'fas fa-cog fa-spin';
      case 'signing-out':
        return 'fas fa-sign-out-alt';
      case 'success':
        return 'fas fa-check-circle';
      case 'error':
        return 'fas fa-exclamation-triangle';
      default:
        return 'fas fa-cog fa-spin';
    }
  };

  const getStageMessage = () => {
    switch (stage) {
      case 'preparing':
        return 'Preparing to sign out...';
      case 'signing-out':
        return 'Signing you out securely...';
      case 'success':
        return 'Successfully signed out!';
      case 'error':
        return 'Sign out failed';
      default:
        return 'Please wait...';
    }
  };

  const getStageDescription = () => {
    switch (stage) {
      case 'preparing':
        return 'Securing your session data';
      case 'signing-out':
        return 'Clearing your session and protecting your data';
      case 'success':
        return 'Redirecting you to the homepage...';
      case 'error':
        return 'Please try again or contact support';
      default:
        return '';
    }
  };

  const getStageColor = () => {
    switch (stage) {
      case 'preparing':
        return '#6366f1';
      case 'signing-out':
        return '#8b5cf6';
      case 'success':
        return '#10b981';
      case 'error':
        return '#ef4444';
      default:
        return '#6366f1';
    }
  };

  return (
    <div className="signout-container">
      {/* Animated Background */}
      <div className="bg-animation">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>
      </div>

      <div className="signout-card">
        {/* Logo Section */}
        <div className="logo-section">
          <div className="logo-icon">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div className="logo-glow"></div>
          </div>
          <h1 className="brand-name">Worksheeter</h1>
        </div>

        {/* Status Section */}
        <div className="status-section">
          <div className={`status-icon ${stage}`} style={{ borderColor: getStageColor() }}>
            <i className={getStageIcon()} style={{ color: getStageColor() }}></i>
            <div className="icon-ring" style={{ borderTopColor: getStageColor() }}></div>
          </div>

          <h2 className="status-message">{getStageMessage()}</h2>
          <p className="status-description">{getStageDescription()}</p>

          {/* Progress Bar */}
          {(stage === 'signing-out' || stage === 'preparing') && (
            <div className="progress-container">
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ 
                    width: `${progress}%`,
                    backgroundColor: getStageColor()
                  }}
                ></div>
              </div>
              <div className="progress-text" style={{ color: getStageColor() }}>
                {progress}%
              </div>
            </div>
          )}

          {/* Success Animation */}
          {stage === 'success' && (
            <div className="success-animation">
              <div className="checkmark-circle" style={{ borderColor: getStageColor() }}>
                <div className="checkmark" style={{ borderColor: getStageColor() }}></div>
              </div>
            </div>
          )}

          {/* Error Actions */}
          {stage === 'error' && (
            <div className="error-actions">
              <button 
                onClick={() => window.location.reload()}
                className="retry-btn"
              >
                <i className="fas fa-redo me-2"></i>
                Try Again
              </button>
              <button 
                onClick={() => Router.push('/')}
                className="home-btn"
              >
                <i className="fas fa-home me-2"></i>
                Go Home
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="signout-footer">
          <div className="security-note">
            <i className="fas fa-shield-check me-2"></i>
            Your session has been securely terminated
          </div>
        </div>
      </div>

      <style jsx>{`
        .signout-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1rem;
          position: relative;
          overflow: hidden;
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
          animation: float 15s infinite ease-in-out;
        }

        .shape-1 {
          width: 100px;
          height: 100px;
          top: 20%;
          left: 15%;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          animation-delay: 0s;
        }

        .shape-2 {
          width: 80px;
          height: 80px;
          top: 70%;
          right: 20%;
          background: linear-gradient(135deg, #06b6d4, #3b82f6);
          animation-delay: 4s;
        }

        .shape-3 {
          width: 60px;
          height: 60px;
          top: 40%;
          right: 60%;
          background: linear-gradient(135deg, #8b5cf6, #d946ef);
          animation-delay: 8s;
        }

        .shape-4 {
          width: 120px;
          height: 120px;
          bottom: 30%;
          left: 30%;
          background: linear-gradient(135deg, #10b981, #06b6d4);
          animation-delay: 12s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px) scale(1); }
          25% { transform: translateY(-15px) translateX(8px) scale(1.05); }
          50% { transform: translateY(15px) translateX(-8px) scale(0.95); }
          75% { transform: translateY(-8px) translateX(12px) scale(1.02); }
        }

        .signout-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(99, 102, 241, 0.1);
          border-radius: 24px;
          padding: 3rem 2.5rem;
          text-align: center;
          position: relative;
          max-width: 500px;
          width: 100%;
          box-shadow: 0 20px 60px rgba(99, 102, 241, 0.1);
          animation: slideIn 0.6s ease;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .signout-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%);
          border-radius: 24px 24px 0 0;
        }

        .logo-section {
          margin-bottom: 3rem;
        }

        .logo-icon {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
          position: relative;
          box-shadow: 0 8px 30px rgba(99, 102, 241, 0.4);
        }

        .logo-icon svg {
          width: 32px;
          height: 32px;
          color: white;
          z-index: 2;
          position: relative;
        }

        .logo-glow {
          position: absolute;
          top: -6px;
          left: -6px;
          right: -6px;
          bottom: -6px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border-radius: 24px;
          opacity: 0.5;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }

        .brand-name {
          font-size: 2rem;
          font-weight: 900;
          color: #1e293b;
          margin: 0;
          background: linear-gradient(135deg, #1e293b, #64748b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .status-section {
          margin-bottom: 3rem;
        }

        .status-icon {
          width: 100px;
          height: 100px;
          margin: 0 auto 2rem;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: all 0.4s ease;
          background: white;
          border: 2px solid;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
        }

        .status-icon.success {
          animation: successPulse 0.6s ease;
        }

        .status-icon.error {
          animation: shake 0.5s ease;
        }

        @keyframes successPulse {
          0% { transform: scale(0.8); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        .status-icon i {
          font-size: 2.5rem;
          z-index: 2;
          position: relative;
        }

        .icon-ring {
          position: absolute;
          top: -10px;
          left: -10px;
          right: -10px;
          bottom: -10px;
          border: 2px solid transparent;
          border-radius: 50%;
          animation: rotate 3s linear infinite;
        }

        .status-icon.preparing .icon-ring,
        .status-icon.signing-out .icon-ring {
          border-right-color: rgba(99, 102, 241, 0.1);
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .status-message {
          font-size: 1.75rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 0.5rem;
        }

        .status-description {
          color: #64748b;
          font-size: 1rem;
          margin-bottom: 2rem;
        }

        .progress-container {
          margin: 2rem 0;
        }

        .progress-bar {
          width: 100%;
          height: 8px;
          background: #f1f5f9;
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 0.5rem;
          border: 1px solid #e2e8f0;
        }

        .progress-fill {
          height: 100%;
          border-radius: 4px;
          transition: width 0.3s ease;
          position: relative;
        }

        .progress-fill::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          animation: shine 1.5s ease-in-out infinite;
        }

        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .progress-text {
          font-weight: 600;
          font-size: 0.9rem;
        }

        .success-animation {
          margin: 2rem 0;
        }

        .checkmark-circle {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          border: 3px solid;
          margin: 0 auto;
          position: relative;
          animation: scaleIn 0.6s ease;
        }

        @keyframes scaleIn {
          0% { transform: scale(0); }
          100% { transform: scale(1); }
        }

        .checkmark {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -60%) rotate(45deg);
          width: 25px;
          height: 15px;
          border-bottom: 3px solid;
          border-right: 3px solid;
          animation: drawCheckmark 0.5s ease 0.3s both;
        }

        @keyframes drawCheckmark {
          0% { 
            width: 0;
            height: 0;
          }
          50% { 
            width: 25px;
            height: 0;
          }
          100% { 
            width: 25px;
            height: 15px;
          }
        }

        .error-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-top: 2rem;
        }

        .retry-btn,
        .home-btn {
          padding: 0.75rem 1.5rem;
          border-radius: 12px;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .retry-btn {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
        }

        .retry-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(99, 102, 241, 0.4);
        }

        .home-btn {
          background: white;
          color: #64748b;
          border: 1px solid #e2e8f0;
        }

        .home-btn:hover {
          background: #f8fafc;
          color: #475569;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        .signout-footer {
          margin-top: 2rem;
        }

        .security-note {
          display: inline-flex;
          align-items: center;
          background: rgba(16, 185, 129, 0.05);
          color: #10b981;
          padding: 0.75rem 1rem;
          border-radius: 50px;
          font-size: 0.85rem;
          font-weight: 600;
          border: 1px solid rgba(16, 185, 129, 0.2);
        }

        @media (max-width: 768px) {
          .signout-card {
            padding: 2rem 1.5rem;
            margin: 1rem;
          }

          .brand-name {
            font-size: 1.75rem;
          }

          .status-message {
            font-size: 1.5rem;
          }

          .status-icon {
            width: 80px;
            height: 80px;
          }

          .status-icon i {
            font-size: 2rem;
          }

          .error-actions {
            flex-direction: column;
          }

          .retry-btn,
          .home-btn {
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .signout-card {
            padding: 1.5rem 1rem;
          }

          .logo-icon {
            width: 60px;
            height: 60px;
          }

          .logo-icon svg {
            width: 24px;
            height: 24px;
          }

          .status-icon {
            width: 70px;
            height: 70px;
          }

          .status-icon i {
            font-size: 1.8rem;
          }

          .checkmark-circle {
            width: 60px;
            height: 60px;
          }

          .security-note {
            font-size: 0.8rem;
            padding: 0.6rem 0.8rem;
          }
        }
      `}</style>
    </div>
  );
};