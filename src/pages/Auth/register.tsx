// src/pages/auth/Register.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { AiOutlineLock, AiOutlineMail, AiOutlineUser } from 'react-icons/ai';

import AuthBackground from '../../components/auth/AuthBackground';
import AuthLogo from '../../components/auth/AuthLogo';
import AuthCard from '../../components/auth/AuthCard';
import AuthFooter from '../../components/auth/AuthFooter';
import FormInput from '../../components/auth/FormInput';
import { authTexts } from '../../constants/authTexts';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Client-side validation
    if (form.password !== form.confirmPassword) {
      setError(authTexts.register.passwordsDontMatch || 'Passwords do not match');
      return;
    }

    if (!form.name.trim()) {
      setError('Please enter your full name');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
        password_confirmation: form.confirmPassword, // Laravel expects this field
      };

      // Optional: log payload in development only
      if (import.meta.env.DEV) {
        console.log('Registration payload:', payload);
      }

      const response = await api.post('/register', payload);
      console.log('Response', response)
      navigate('/login', { replace: true });
    } catch (err: any) {
      console.error('Registration failed:', err);

      let errorMessage: string = authTexts.register.errorDefault || 'Registration failed. Please try again.';

      // ── Most common Laravel validation error shape ──
      if (err.response?.status === 422) {
        const errors = err.response.data.errors;

        if (errors) {
          // Flatten first error message of each field
          const firstError = Object.values(errors).flat()[0];
          if (typeof firstError === 'string') {
            errorMessage = firstError;
          } else if (Array.isArray(firstError)) {
            errorMessage = firstError[0];
          }
        }
      }

      // Fallbacks for other common shapes
      else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
      } else if (err.message) {
        errorMessage = err.message;
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-950">
      <AuthBackground />

      <div className="relative z-10 w-full max-w-md xs:max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl px-5 xs:px-6 sm:px-8 md:px-10 py-8 sm:py-10 md:py-12 lg:py-14">
        <AuthLogo />

        <AuthCard>
          <div className="text-center mb-7 sm:mb-8 md:mb-9">
            <h1 className="text-3xl sm:text-3.5xl md:text-4xl font-bold text-white tracking-tight">
              {authTexts.register.title}
            </h1>
            <p className="text-gray-400 mt-2.5 text-base sm:text-lg">
              {authTexts.register.subtitle}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-950/70 border border-red-600/50 rounded-xl text-red-200 text-sm text-center shadow-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              <FormInput
                id="name"
                label={authTexts.register.fullNameLabel || 'Full Name'}
                type="text"
                icon={AiOutlineUser}
                autoComplete="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder={authTexts.register.fullNamePlaceholder}
                required
              />

              <FormInput
                id="email"
                label={authTexts.register.emailLabel}
                type="email"
                icon={AiOutlineMail}
                autoComplete="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder={authTexts.register.emailPlaceholder}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              <FormInput
                id="password"
                label={authTexts.register.passwordLabel}
                type={showPassword ? 'text' : 'password'}
                icon={AiOutlineLock}
                autoComplete="new-password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder={authTexts.register.passwordPlaceholder}
                required
                togglePassword={{
                  show: showPassword,
                  onToggle: () => setShowPassword(!showPassword),
                }}
              />

              <FormInput
                id="confirmPassword"
                label={authTexts.register.confirmPasswordLabel}
                type={showConfirmPassword ? 'text' : 'password'}
                icon={AiOutlineLock}
                autoComplete="new-password"
                value={form.confirmPassword}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                placeholder={authTexts.register.confirmPasswordPlaceholder}
                required
                togglePassword={{
                  show: showConfirmPassword,
                  onToggle: () => setShowConfirmPassword(!showConfirmPassword),
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`
                w-full py-3.5 sm:py-4 rounded-xl 
                bg-gradient-to-r from-pink-600 to-pink-500
                text-white font-semibold text-base sm:text-lg
                hover:from-pink-500 hover:to-pink-400
                active:from-pink-700 active:to-pink-600 active:scale-[0.98]
                transition-all duration-200
                disabled:opacity-50 disabled:cursor-not-allowed
                shadow-lg shadow-pink-900/50
                min-h-[48px] touch-manipulation
              `}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-3">
                  <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  {authTexts.register.loadingText || 'Creating account...'}
                </div>
              ) : (
                authTexts.register.submitButton || 'Create Account'
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm sm:text-base text-gray-400">
            {authTexts.register.alreadyHaveAccount || 'Already have an account?'}{' '}
            <a
              href="/login"
              className="text-pink-400 hover:text-pink-300 hover:underline font-medium transition"
            >
              {authTexts.register.signInLink || 'Sign in'}
            </a>
          </p>
        </AuthCard>

        <AuthFooter />
      </div>
    </div>
  );
};

export default Register;