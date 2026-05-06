'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-gradient-to-b from-brand-green to-green-600">
      {/* Logo */}
      <div className="text-center mb-10">
        <div className="text-8xl mb-4">🦜</div>
        <h1 className="text-5xl font-black text-white drop-shadow-lg">Danulingo</h1>
        <p className="text-white/80 font-semibold mt-2">Sprachen lernen für deine Reise</p>
      </div>

      <div className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl">
        {!sent ? (
          <>
            <h2 className="text-2xl font-black text-center text-gray-800 dark:text-gray-100 mb-2">Willkommen! 👋</h2>
            <p className="text-center text-gray-500 text-sm mb-6">Melde dich mit Magic Link an – kein Passwort nötig!</p>

            <form onSubmit={handleLogin} className="space-y-4">
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

              {error && (
                <p className="text-brand-red text-sm font-semibold text-center">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading || !email}
                className="w-full py-4 bg-brand-green text-white font-black text-lg rounded-2xl card-shadow-green btn-press disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {loading ? '⏳ Sende Link...' : '✉️ Magic Link senden'}
              </button>
            </form>

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
