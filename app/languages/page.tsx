import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import BottomNav from '@/components/BottomNav';
import ProgressBar from '@/components/ProgressBar';
import Link from 'next/link';
import type { Language } from '@/lib/types';

const LANG_COLORS: Record<string, { bg: string; border: string; shadow: string }> = {
  es: { bg: 'bg-red-50 dark:bg-red-900/20',    border: 'border-red-200 dark:border-red-700',    shadow: 'card-shadow' },
  it: { bg: 'bg-green-50 dark:bg-green-900/20', border: 'border-green-200 dark:border-green-700', shadow: 'card-shadow' },
  fr: { bg: 'bg-blue-50 dark:bg-blue-900/20',   border: 'border-blue-200 dark:border-blue-700',   shadow: 'card-shadow' },
};

const LANG_DESCRIPTIONS: Record<string, string> = {
  es: 'Spanisch für Lateinamerika – von Mexiko City bis Buenos Aires',
  it: 'Italienisch für Anfänger – von Null bis Ferienreif',
  fr: 'Französisch aufbauen – auf deinem BMS-Niveau',
};

export default async function LanguagesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: languages } = await supabase.from('languages').select('*').order('name');

  const progressData: Record<string, { completed: number; total: number }> = {};

  if (languages) {
    for (const lang of languages) {
      const { data: lessons } = await supabase
        .from('lessons')
        .select('id, categories!inner(language_id)')
        .eq('categories.language_id', lang.id);

      const lessonIds = lessons?.map(l => l.id) ?? [];

      const { count } = await supabase
        .from('user_progress')
        .select('lesson_id', { count: 'exact' })
        .eq('user_id', user.id)
        .eq('completed', true)
        .in('lesson_id', lessonIds.length > 0 ? lessonIds : ['none']);

      progressData[lang.id] = {
        completed: count ?? 0,
        total: lessonIds.length,
      };
    }
  }

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="bg-gradient-to-b from-brand-blue to-blue-500 px-5 pt-12 pb-8">
        <h1 className="text-white font-black text-3xl">Sprachen 🌍</h1>
        <p className="text-white/80 text-sm mt-1">Wähle eine Sprache um zu lernen</p>
      </div>

      <div className="px-5 py-6 space-y-4">
        {(languages ?? []).map(lang => {
          const progress = progressData[lang.id] ?? { completed: 0, total: 1 };
          const percent = progress.total > 0 ? Math.round((progress.completed / progress.total) * 100) : 0;
          const colors = LANG_COLORS[lang.code] ?? LANG_COLORS.es;

          return (
            <Link
              key={lang.id}
              href={`/languages/${lang.id}`}
              className={`block ${colors.bg} border-2 ${colors.border} rounded-2xl p-5 ${colors.shadow} btn-press transition-transform`}
            >
              <div className="flex items-center gap-4 mb-3">
                <span className="text-5xl">{lang.flag_emoji}</span>
                <div className="flex-1">
                  <h2 className="font-black text-xl text-gray-800 dark:text-gray-100">{lang.name}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{LANG_DESCRIPTIONS[lang.code]}</p>
                </div>
                {percent > 0 && (
                  <div className="text-right">
                    <span className="text-2xl font-black text-brand-green">{percent}%</span>
                  </div>
                )}
              </div>

              <ProgressBar
                value={percent}
                color="bg-brand-green"
                height="h-3"
                showLabel={false}
              />

              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-gray-500 font-semibold">
                  {progress.completed}/{progress.total} Lektionen
                </span>
                <span className="text-xs font-bold text-brand-blue">Jetzt lernen →</span>
              </div>
            </Link>
          );
        })}
      </div>

      <BottomNav />
    </div>
  );
}
