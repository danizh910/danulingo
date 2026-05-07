'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'magic' | 'password'>('magic');
  const [error, setError] = useState('');

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      setError(error.message);
    } else {
      setSent(true);
    }
    setLoading(false);
  }

  async function handleGoogleLogin() {
    setGoogleLoading(true);
    setError('');
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      setError(error.message);
      setGoogleLoading(false);
    }
  }

  async function handlePasswordLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-gradient-to-b from-brand-green to-green-600">
      {/* Logo */}
      <div className="text-center mb-10">
        <div className="text-8xl mb-4">🦜</div>
        <h1 className="text-5xl font-black text-white drop-shadow-lg">Danulingo</h1>
        <p className="text-white/80 font-semibold mt-2">Sprachen lernen für deine Reise</p>
      </div>

      <div className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl">
        {/* Login Method Tabs */}
        <div className="flex rounded-xl bg-gray-100 dark:bg-gray-700 p-1 mb-6">
          <button
            onClick={() => setLoginMethod('magic')}
            className={`flex-1 py-2 px-4 rounded-lg font-semibold text-sm transition-all ${
              loginMethod === 'magic'
                ? 'bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-100 shadow-sm'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            ✉️ Magic Link
          </button>
          <button
            onClick={() => setLoginMethod('password')}
            className={`flex-1 py-2 px-4 rounded-lg font-semibold text-sm transition-all ${
              loginMethod === 'password'
                ? 'bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-100 shadow-sm'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            🔑 Passwort
          </button>
        </div>

        {!sent ? (
          <>
            <h2 className="text-2xl font-black text-center text-gray-800 dark:text-gray-100 mb-2">Willkommen! 👋</h2>
            <p className="text-center text-gray-500 text-sm mb-6">
              {loginMethod === 'magic'
                ? 'Melde dich mit Magic Link an – kein Passwort nötig!'
                : 'Melde dich mit Email und Passwort an'
              }
            </p>

            <form onSubmit={loginMethod === 'magic' ? handleLogin : handlePasswordLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-600 dark:text-gray-300 mb-2">
                  E-Mail-Adresse
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="du@beispiel.ch"
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 font-semibold focus:outline-none focus:border-brand-green transition-colors"
                />
              </div>

              {loginMethod === 'password' && (
                <div>
                  <label className="block text-sm font-bold text-gray-600 dark:text-gray-300 mb-2">
                    Passwort
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 font-semibold focus:outline-none focus:border-brand-green transition-colors"
                  />
                </div>
              )}

              {error && (
                <p className="text-brand-red text-sm font-semibold text-center">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading || !email || (loginMethod === 'password' && !password)}
                className="w-full py-4 bg-brand-green text-white font-black text-lg rounded-2xl card-shadow-green btn-press disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {loading ? '⏳ Melde an...' : loginMethod === 'magic' ? '✉️ Magic Link senden' : '🔑 Anmelden'}
              </button>
            </form>

            <div className="mt-6 flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400 font-semibold">ODER</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <button
              onClick={handleGoogleLogin}
              disabled={googleLoading}
              className="w-full mt-4 py-4 bg-white border-2 border-gray-200 text-gray-700 font-bold text-lg rounded-2xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3"
            >
              {googleLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                  Verbinde mit Google...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Mit Google anmelden
                </>
              )}
            </button>

            <div className="mt-6 flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400 font-semibold">SPRACHEN</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <div className="mt-4 flex justify-center gap-4 text-3xl">
              <span title="Spanisch">🇲🇽</span>
              <span title="Italienisch">🇮🇹</span>
              <span title="Französisch">🇫🇷</span>
            </div>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="text-6xl mb-4">📬</div>
            <h2 className="text-2xl font-black text-gray-800 dark:text-gray-100 mb-2">E-Mail gesendet!</h2>
            <p className="text-gray-500 text-sm mb-6">
              Wir haben einen Magic Link an <strong>{email}</strong> gesendet. Klicke auf den Link um dich einzuloggen.
            </p>
            <button
              onClick={() => setSent(false)}
              className="text-brand-blue font-bold text-sm"
            >
              Andere E-Mail verwenden
            </button>
          </div>
        )}
      </div>

      <p className="text-white/60 text-xs mt-8 text-center">
        Für Reisende aus der Schweiz 🇨🇭
      </p>
    </div>
  );
}
