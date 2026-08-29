import { useState, useRef, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, User, KeyRound, AlertTriangle, X, ArrowRight, CheckCircle2, Eye, EyeOff } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AdminLoginModal({ isOpen, onClose, onSuccess }: AdminLoginModalProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorCount, setErrorCount] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const usernameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setUsername('');
      setPassword('');
      setErrorMessage('');
      setIsSuccess(false);
      setIsShaking(false);
      setTimeout(() => {
        usernameInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const trimmedUser = username.trim();
    const trimmedPass = password.trim();

    if (trimmedUser === 'admin' && trimmedPass === 'admin123') {
      // Success!
      setIsSuccess(true);
      setErrorMessage('');
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 600);
    } else {
      // Wrong credentials! Trigger animation
      setIsShaking(true);
      setErrorCount((prev) => prev + 1);
      
      if (!trimmedUser || !trimmedPass) {
        setErrorMessage('Both username and password are required.');
      } else {
        setErrorMessage('Invalid username or password. Access denied.');
      }

      // Reset shaking state after animation finishes so it can be re-triggered
      setTimeout(() => {
        setIsShaking(false);
      }, 600);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-neutral-950/60 backdrop-blur-sm"
          />

          {/* Dialog Container */}
          <motion.div
            id="admin-login-modal"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={
              isShaking
                ? {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    x: [0, -14, 14, -12, 12, -8, 8, -4, 4, 0],
                    transition: { duration: 0.55, ease: 'easeInOut' },
                  }
                : {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    x: 0,
                    transition: { duration: 0.25, ease: 'easeOut' },
                  }
            }
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className={`relative w-full max-w-md bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border ${
              isShaking
                ? 'border-red-500 ring-4 ring-red-500/20'
                : isSuccess
                ? 'border-emerald-500 ring-4 ring-emerald-500/20'
                : 'border-neutral-200 dark:border-neutral-800'
            } p-6 sm:p-8 z-10 transition-colors duration-200 overflow-hidden`}
          >
            {/* Top decorative accent bar */}
            <div
              className={`absolute top-0 left-0 right-0 h-1.5 transition-colors duration-300 ${
                isShaking
                  ? 'bg-red-500'
                  : isSuccess
                  ? 'bg-emerald-500'
                  : 'bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600'
              }`}
            />

            {/* Close Button */}
            <button
              id="close-login-modal-btn"
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-xl text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <motion.div
                animate={
                  isSuccess
                    ? { scale: [1, 1.2, 1], rotate: [0, 10, 0] }
                    : isShaking
                    ? { rotate: [-10, 10, -10, 10, 0] }
                    : {}
                }
                transition={{ duration: 0.4 }}
                className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3 shadow-xs ${
                  isSuccess
                    ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800'
                    : isShaking
                    ? 'bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 border border-red-300 dark:border-red-800'
                    : 'bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-300/60 dark:border-amber-800/60'
                }`}
              >
                {isSuccess ? (
                  <CheckCircle2 className="w-7 h-7" />
                ) : (
                  <Lock className="w-7 h-7" />
                )}
              </motion.div>
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white tracking-tight">
                {isSuccess ? 'Access Granted' : 'Administrator Login'}
              </h2>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                {isSuccess
                  ? 'Welcome back. Loading configuration panel...'
                  : 'Enter credentials to manage site shutdown content & typography'}
              </p>
            </div>

            {/* Error banner with shake */}
            <AnimatePresence>
              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="mb-5 overflow-hidden"
                >
                  <div
                    id="login-error-banner"
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800/80 text-red-700 dark:text-red-300 text-xs font-medium"
                  >
                    <AlertTriangle className="w-4 h-4 shrink-0 text-red-500" />
                    <span>{errorMessage}</span>
                    {errorCount > 1 && (
                      <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-red-200 dark:bg-red-900/80 text-red-800 dark:text-red-200 font-mono">
                        #{errorCount}
                      </span>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="admin-username"
                  className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5 uppercase tracking-wider"
                >
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    ref={usernameInputRef}
                    id="admin-username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="e.g. admin"
                    disabled={isSuccess}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-neutral-50 dark:bg-neutral-800/80 border ${
                      isShaking
                        ? 'border-red-400 dark:border-red-500 focus:ring-red-500/30'
                        : 'border-neutral-200 dark:border-neutral-700 focus:border-amber-500 focus:ring-amber-500/20'
                    } text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-3 transition-all`}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="admin-password"
                  className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5 uppercase tracking-wider"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <input
                    id="admin-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    disabled={isSuccess}
                    className={`w-full pl-10 pr-11 py-2.5 rounded-xl text-sm bg-neutral-50 dark:bg-neutral-800/80 border ${
                      isShaking
                        ? 'border-red-400 dark:border-red-500 focus:ring-red-500/30'
                        : 'border-neutral-200 dark:border-neutral-700 focus:border-amber-500 focus:ring-amber-500/20'
                    } text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-3 transition-all`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                id="submit-admin-login-btn"
                type="submit"
                disabled={isSuccess}
                className={`w-full mt-3 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm shadow-md transition-all duration-200 cursor-pointer ${
                  isSuccess
                    ? 'bg-emerald-600 text-white'
                    : isShaking
                    ? 'bg-red-600 hover:bg-red-700 text-white shadow-red-500/20'
                    : 'bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-amber-500 dark:hover:bg-amber-400 dark:text-neutral-950 shadow-amber-500/10'
                }`}
              >
                {isSuccess ? (
                  <>
                    <span>Authenticated</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    <span>Log In to Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
