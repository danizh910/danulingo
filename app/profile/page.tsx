import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import BottomNav from '@/components/BottomNav';
import StreakBadge from '@/components/StreakBadge';
import ProgressBar from '@/components/ProgressBar';
import LogoutButton from './LogoutButton';

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const [profileRes, streakRes, badgesRes, progressRes] = await Promise.all([
    supabase.from('user_profiles').select('*').eq('id', user.id).single(),
    supabase.from('user_streaks').select('*').eq('user_id', user.id).single(),
    supabase.from('user_badges').select('*, badges(*)').eq('user_id', user.id),
    supabase.from('user_progress').select('*').eq('user_id', user.id).eq('completed', true),
  ]);

  const profile = profileRes.data;
  const streak = streakRes.data;
  const userBadges = badgesRes.data ?? [];
  const completedLessons = progressRes.data?.length ?? 0;

  const level = Math.floor((profile?.total_xp ?? 0) / 100) + 1;
  const xpInLevel = (profile?.total_xp ?? 0) % 100;

  const allBadgesRes = await supabase.from('badges').select('*');
  const allBadges = allBadgesRes.data ?? [];
  const earnedIds = new Set(userBadges.map((ub: { badge_id: string }) => ub.badge_id));

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="bg-gradient-to-b from-brand-purple to-purple-600 px-5 pt-12 pb-8">
        <div className="text-center">
          <div className="w-24 h-24 rounded-full bg-white/20 mx-auto flex items-center justify-center text-5xl mb-3">
            🦜
          </div>
          <h1 className="text-white font-black text-2xl">
            {profile?.name ?? user.email?.split('@')[0]}
          </h1>
          <p className="text-white/70 text-sm">{user.email}</p>
          <div className="flex items-center justify-center gap-3 mt-3">
            <StreakBadge streak={streak?.current_streak ?? 0} size="md" />
            <div className="bg-white/20 rounded-full px-3 py-1 text-white font-bold text-sm">
              Level {level} 🏆
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 py-6 space-y-6">
        {/* XP progress */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm">
          <h2 className="font-black text-gray-800 dark:text-gray-100 mb-3">⭐ Erfahrung</h2>
          <div className="flex justify-between text-sm font-semibold text-gray-500 mb-2">
            <span>Level {level}</span>
            <span>{xpInLevel}/100 XP</span>
          </div>
          <ProgressBar value={xpInLevel} color="bg-brand-yellow" height="h-4" />
          <p className="text-xs text-gray-400 mt-2">{profile?.total_xp ?? 0} XP total gesammelt</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-2xl p-4 text-center">
            <div className="text-3xl font-black text-orange-500">{streak?.current_streak ?? 0}</div>
            <div className="text-xs font-semibold text-gray-500 mt-1">🔥 Aktueller Streak</div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-2xl p-4 text-center">
            <div className="text-3xl font-black text-purple-600">{streak?.longest_streak ?? 0}</div>
            <div className="text-xs font-semibold text-gray-500 mt-1">👑 Bester Streak</div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-4 text-center">
            <div className="text-3xl font-black text-brand-green">{completedLessons}</div>
            <div className="text-xs font-semibold text-gray-500 mt-1">✅ Lektionen</div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-4 text-center">
            <div className="text-3xl font-black text-brand-blue">{earnedIds.size}</div>
            <div className="text-xs font-semibold text-gray-500 mt-1">🏅 Abzeichen</div>
          </div>
        </div>

        {/* Badges */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm">
          <h2 className="font-black text-gray-800 dark:text-gray-100 mb-4">🏅 Abzeichen</h2>
          <div className="grid grid-cols-3 gap-3">
            {allBadges.map((badge: { id: string; icon: string; name: string; description: string }) => {
              const earned = earnedIds.has(badge.id);
              return (
                <div
                  key={badge.id}
                  className={`rounded-xl p-3 text-center ${earned ? 'bg-yellow-50 dark:bg-yellow-900/20' : 'bg-gray-100 dark:bg-gray-700 opacity-50'}`}
                >
                  <div className="text-3xl mb-1">{badge.icon}</div>
                  <div className="text-xs font-bold text-gray-700 dark:text-gray-300 leading-tight">{badge.name}</div>
                  {earned && <div className="text-xs text-brand-green mt-1">✓ Verdient</div>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Logout */}
        <LogoutButton />
      </div>

      <BottomNav />
    </div>
  );
}
