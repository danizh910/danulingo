import { createClient } from '@/lib/supabase/server';
import { NextResponse, type NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { lessonId, xpEarned, completed } = await request.json();

  // Upsert progress
  await supabase.from('user_progress').upsert({
    user_id: user.id,
    lesson_id: lessonId,
    completed,
    xp_earned: xpEarned,
    completed_at: completed ? new Date().toISOString() : null,
    attempts: 1,
  }, { onConflict: 'user_id,lesson_id' });

  // Update XP on profile
  if (xpEarned > 0) {
    await supabase.rpc('increment_xp', { user_id_param: user.id, xp_amount: xpEarned })
      .then(async ({ error }) => {
        if (error) {
          // Fallback manual update
          const { data: profile } = await supabase
            .from('user_profiles')
            .select('total_xp')
            .eq('id', user.id)
            .single();
          if (profile) {
            await supabase
              .from('user_profiles')
              .update({ total_xp: (profile.total_xp ?? 0) + xpEarned })
              .eq('id', user.id);
          }
        }
      });
  }

  // Update streak
  const today = new Date().toISOString().split('T')[0];
  const { data: streak } = await supabase
    .from('user_streaks')
    .select('*')
    .eq('user_id', user.id)
    .single();

  if (streak) {
    const lastDate = streak.last_active_date;
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    let newStreak = streak.current_streak;

    if (lastDate === today) {
      // same day, no change
    } else if (lastDate === yesterday) {
      newStreak += 1;
    } else {
      newStreak = 1;
    }

    await supabase.from('user_streaks').update({
      last_active_date: today,
      current_streak: newStreak,
      longest_streak: Math.max(streak.longest_streak, newStreak),
    }).eq('user_id', user.id);
  }

  return NextResponse.json({ success: true });
}
