import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import BottomNav from '@/components/BottomNav';
import StreakBadge from '@/components/StreakBadge';
import ProgressBar from '@/components/ProgressBar';
import Link from 'next/link';
import type { Language, UserStreak, UserProfile } from '@/lib/types';

export default async function HomePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const [profileRes, streakRes, languagesRes, progressCountRes] = await Promise.all([
    supabase.from('user_profiles').select('*').eq('id', user.id).single(),
    supabase.from('user_streaks').select('*').eq('user_id', user.id).single(),
    supabase.from('languages').select('*').order('name'),
    supabase
      .from('user_progress')
      .select('lesson_id', { count: 'exact' })
      .eq('user_id', user.id)
      .eq('completed', true),
  ]);

  const profile: UserProfile | null = profileRes.data;
  const streak: UserStreak | null = streakRes.data;
  const languages: Language[] = languagesRes.data ?? [];
  const completedCount = progressCountRes.count ?? 0;

  const totalLessons = languages.length * 18; // 18 lessons per language (6 categories × 3)
  const overallProgress = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  const level = Math.floor((profile?.total_xp ?? 0) / 100) + 1;
  const xpInLevel = (profile?.total_xp ?? 0) % 100;

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Guten Morgen' : hour < 18 ? 'Guten Tag' : 'Guten Abend';

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="bg-gradient-to-b from-brand-green to-green-500 px-5 pt-12 pb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-white/80 font-semibold text-sm">{greeting},</p>
            <h1 className="text-white font-black text-2xl">
              {profile?.name ?? user.email?.split('@')[0]} 👋
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <StreakBadge streak={streak?.current_streak ?? 0} size="md" />
          </div>
        </div>

        {/* XP Level bar */}
        <div className="bg-white/20 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-black text-sm">Level {level}</span>
            <span className="text-white/80 font-semibold text-sm">{profile?.total_xp ?? 0} XP gesamt</span>
          </div>
          <ProgressBar value={xpInLevel} color="bg-yellow-300" height="h-3" />
          <p className="text-white/70 text-xs mt-1">{xpInLevel}/100 XP bis Level {level + 1}</p>
        </div>
      </div>

      <div className="px-5 py-6 space-y-6">
        {/* Daily goal */}
        <div className="bg-blue-50 dark:bg-blue-900/30 border-2 border-brand-blue rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🎯</span>
            <div className="flex-1">
              <p className="font-black text-gray-800 dark:text-gray-100">Tagesziel</p>
              <p className="text-sm text-gray-500">5–10 Minuten täglich lernen</p>
            </div>
            <Link
              href="/languages"
              className="bg-brand-blue text-white font-bold text-sm px-4 py-2 rounded-xl"
            >
              Starten!
            </Link>
          </div>
        </div>

        {/* Languages quick access */}
        <div>
          <h2 className="font-black text-lg text-gray-800 dark:text-gray-100 mb-3">Deine Sprachen</h2>
          <div className="space-y-3">
            {languages.map(lang => (
              <Link
                key={lang.id}
                href={`/languages/${lang.id}`}
                className="flex items-center gap-4 bg-white dark:bg-gray-800 rounded-2xl p-4 card-shadow border border-gray-100 dark:border-gray-700 btn-press"
              >
                <span className="text-4xl">{lang.flag_emoji}</span>
                <div className="flex-1">
                  <p className="font-black text-gray-800 dark:text-gray-100">{lang.name}</p>
                  <ProgressBar value={overallProgress} color="bg-brand-green" height="h-2" />
                </div>
                <span className="text-gray-400 text-xl">›</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-2xl p-4 text-center">
            <div className="text-2xl font-black text-yellow-600">{profile?.total_xp ?? 0}</div>
            <div className="text-xs font-semibold text-gray-500 mt-1">Total XP</div>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-2xl p-4 text-center">
            <div className="text-2xl font-black text-orange-600">{streak?.current_streak ?? 0}</div>
            <div className="text-xs font-semibold text-gray-500 mt-1">🔥 Streak</div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-4 text-center">
            <div className="text-2xl font-black text-brand-green">{completedCount}</div>
            <div className="text-xs font-semibold text-gray-500 mt-1">Lektionen ✅</div>
          </div>
        </div>

        {/* Motivational tip */}
        <div className="bg-purple-50 dark:bg-purple-900/20 border-l-4 border-brand-purple rounded-xl p-4">
          <p className="text-sm font-bold text-purple-800 dark:text-purple-300">💡 Tipp des Tages</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Wiederhole jeden Tag 5 Minuten Vokabeln – das reicht schon aus, um in 3 Monaten reisefertig zu sein!
          </p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
