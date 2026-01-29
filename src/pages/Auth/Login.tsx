import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { AiOutlineLock, AiOutlineMail } from 'react-icons/ai';

import AuthBackground from '../../components/auth/AuthBackground';
import AuthLogo from '../../components/auth/AuthLogo';
import AuthCard from '../../components/auth/AuthCard';
import AuthFooter from '../../components/auth/AuthFooter';
import FormInput from '../../components/auth/FormInput';
import { authTexts } from '../../constants/authTexts';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await api.post('/login', { ...form, rememberMe });
      localStorage.setItem('token', res.data.token);
      navigate('/', { replace: true });
    } catch (err: any) {
        console.log(err?.response);
      setError(err?.response?.data?.errors || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-950">
      <AuthBackground />

      {/* Main content wrapper – better mobile padding + max width control */}
      <div className="relative z-10 w-full max-w-md xs:max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl px-5 xs:px-6 sm:px-8 md:px-10 py-8 sm:py-10 md:py-12 lg:py-14">
        <AuthLogo />

        <AuthCard>
          <div className="text-center mb-7 sm:mb-8 md:mb-9">
            <h1 className="text-3xl sm:text-3.5xl md:text-4xl font-bold text-white tracking-tight">
              {authTexts.login.title}
            </h1>
            <p className="text-gray-400 mt-2.5 text-base sm:text-lg">
              {authTexts.login.subtitle}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3.5 bg-red-950/60 border border-red-700/50 rounded-xl text-red-300 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-7">
            <FormInput
              id="email"
              label={authTexts.login.emailLabel}
              type="email"
              icon={AiOutlineMail}
              autoComplete="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder={authTexts.login.emailPlaceholder}
              required
            />

            <div>
              <div className="flex items-center justify-between mb-2.5">
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                  {authTexts.login.passwordLabel}
                </label>
                <a
                  href="/forgot-password"
                  className="text-sm text-pink-400 hover:text-pink-300 hover:underline transition"
                >
                  {authTexts.login.forgotPassword}
                </a>
              </div>

              <FormInput
                id="password"
                label=""
                type={showPassword ? 'text' : 'password'}
                icon={AiOutlineLock}
                autoComplete="current-password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder={authTexts.login.passwordPlaceholder || "••••••••"}
                required
                togglePassword={{
                  show: showPassword,
                  onToggle: () => setShowPassword(!showPassword),
                }}
              />
            </div>

            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-5 w-5 rounded border-gray-600 bg-gray-800 text-pink-600 focus:ring-pink-500 focus:ring-offset-gray-950"
              />
              <label htmlFor="remember" className="ml-3 block text-sm text-gray-300 select-none">
                {authTexts.login.rememberMe}
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`
                w-full py-3.5 sm:py-4 rounded-xl 
                bg-pink-600 text-white font-semibold 
                text-base sm:text-lg 
                hover:bg-pink-500 active:bg-pink-700 active:scale-[0.98] 
                transition-all duration-200 
                disabled:opacity-60 disabled:cursor-not-allowed 
                shadow-lg shadow-pink-900/40
                min-h-[48px] touch-manipulation
              `}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-3">
                  <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  {authTexts.login.loadingText}
                </div>
              ) : (
                authTexts.login.submitButton
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm sm:text-base text-gray-400">
            {authTexts.login.noAccount}{' '}
            <a
              href="/register"
              className="text-pink-400 hover:text-pink-300 hover:underline font-medium transition"
            >
              {authTexts.login.createAccountLink}
            </a>
          </p>
        </AuthCard>

        <AuthFooter />
      </div>
    </div>
  );
};

export default Login;