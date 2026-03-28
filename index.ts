import { useState, type ReactNode, type FormEvent } from 'react';

const CORRECT_PASSWORD = 'HLCebu@2025';

interface PasswordGateProps {
  children: ReactNode;
}

export default function PasswordGate({ children }: PasswordGateProps) {
  const [unlocked, setUnlocked] = useState(false);
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (input === CORRECT_PASSWORD) {
      setSuccess(true);
      setError(false);
      setTimeout(() => setUnlocked(true), 700);
    } else {
      setError(true);
      setShaking(true);
      setInput('');
      setTimeout(() => setShaking(false), 600);
      setTimeout(() => setError(false), 2500);
    }
  };

  if (unlocked) return <>{children}</>;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: '#1e201e' }}
    >
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          15% { transform: translateX(-10px); }
          30% { transform: translateX(10px); }
          45% { transform: translateX(-8px); }
          60% { transform: translateX(8px); }
          75% { transform: translateX(-4px); }
          90% { transform: translateX(4px); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes unlock-pulse {
          0% { box-shadow: 0 0 0 0 rgba(177,141,117,0.6); }
          70% { box-shadow: 0 0 0 20px rgba(177,141,117,0); }
          100% { box-shadow: 0 0 0 0 rgba(177,141,117,0); }
        }
        .gate-card {
          animation: fadeInUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .shake-input {
          animation: shake 0.55s cubic-bezier(0.36, 0.07, 0.19, 0.97) forwards;
        }
        .unlock-btn-success {
          animation: unlock-pulse 0.7s ease forwards;
        }
      `}</style>

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(177,141,117,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="gate-card relative w-full max-w-sm px-4">

        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <p
            className="tracking-[0.35em] uppercase mb-2"
            style={{ fontSize: '10px', color: 'rgba(177,141,117,0.5)' }}
          >
            Private Preview
          </p>
          <h1
            className="font-serif font-light"
            style={{ fontSize: '2rem', color: 'rgba(245,244,240,0.92)', letterSpacing: '0.04em' }}
          >
            Hulma Cebu
          </h1>
          <div
            className="mx-auto mt-3"
            style={{ width: '32px', height: '1px', background: 'rgba(177,141,117,0.4)' }}
          />
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-5"
          style={{
            background: 'rgba(245,244,240,0.04)',
            border: '1px solid rgba(191,184,174,0.12)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
        >
          <p
            className="text-center mb-7"
            style={{ fontSize: '13px', color: 'rgba(191,174,157,0.6)', lineHeight: '1.6' }}
          >
            This site is password protected.<br />Enter your access code to continue.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className={shaking ? 'shake-input' : ''}>
              <div
                className="flex items-center rounded-xl overflow-hidden"
                style={{
                  background: error
                    ? 'rgba(220, 100, 80, 0.08)'
                    : 'rgba(245,244,240,0.06)',
                  border: error
                    ? '1px solid rgba(220, 100, 80, 0.4)'
                    : '1px solid rgba(191,184,174,0.18)',
                  transition: 'all 0.3s ease',
                }}
              >
                <div className="flex items-center justify-center w-11 h-11 flex-shrink-0">
                  <i
                    className="ri-lock-line"
                    style={{
                      fontSize: '14px',
                      color: error ? 'rgba(220,100,80,0.7)' : 'rgba(177,141,117,0.6)',
                    }}
                  />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={input}
                  onChange={(e) => { setInput(e.target.value); setError(false); }}
                  placeholder="Enter password"
                  autoFocus
                  className="flex-1 bg-transparent outline-none py-3 pr-1 text-sm"
                  style={{
                    color: 'rgba(245,244,240,0.9)',
                    caretColor: 'rgba(177,141,117,0.9)',
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="flex items-center justify-center w-11 h-11 flex-shrink-0 cursor-pointer"
                  style={{ color: 'rgba(177,141,117,0.4)' }}
                >
                  <i
                    className={showPassword ? 'ri-eye-off-line' : 'ri-eye-line'}
                    style={{ fontSize: '14px' }}
                  />
                </button>
              </div>

              {error && (
                <p
                  className="text-center mt-2"
                  style={{ fontSize: '11px', color: 'rgba(220,100,80,0.8)' }}
                >
                  Incorrect password. Please try again.
                </p>
              )}
            </div>

            <button
              type="submit"
              className={`w-full py-3.5 rounded-xl font-medium text-sm tracking-wide whitespace-nowrap cursor-pointer ${success ? 'unlock-btn-success' : ''}`}
              style={{
                background: success
                  ? 'rgba(177,141,117,0.55)'
                  : 'rgba(177,141,117,0.28)',
                border: '1px solid rgba(177,141,117,0.45)',
                color: 'rgba(245,244,240,0.95)',
                transition: 'background 0.3s ease, border 0.3s ease',
                letterSpacing: '0.08em',
              }}
              onMouseEnter={(e) => {
                if (!success) {
                  (e.currentTarget as HTMLButtonElement).style.background = 'rgba(177,141,117,0.42)';
                }
              }}
              onMouseLeave={(e) => {
                if (!success) {
                  (e.currentTarget as HTMLButtonElement).style.background = 'rgba(177,141,117,0.28)';
                }
              }}
            >
              {success ? (
                <span className="flex items-center justify-center gap-2">
                  <i className="ri-check-line" style={{ fontSize: '15px' }} />
                  Access Granted
                </span>
              ) : (
                'Enter Site'
              )}
            </button>
          </form>
        </div>

        <p
          className="text-center mt-5"
          style={{ fontSize: '10px', color: 'rgba(177,141,117,0.2)', letterSpacing: '0.15em' }}
        >
          HULMA FIBERGLASS
        </p>

        <p className="text-center mt-3">
          <a
            href="https://hunacreatives.com"
            target="_blank"
            rel="nofollow noreferrer"
            style={{ fontSize: '10px', color: 'rgba(177,141,117,0.25)', letterSpacing: '0.1em', textDecoration: 'none' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(177,141,117,0.55)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(177,141,117,0.25)')}
          >
            Website by Huna Creatives
          </a>
        </p>
      </div>
    </div>
  );
}
