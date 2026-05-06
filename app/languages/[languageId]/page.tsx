import { createClient } from '@/lib/supabase/server';
import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import ProgressBar from '@/components/ProgressBar';
import type { Category, Lesson } from '@/lib/types';

interface Props {
  params: Promise<{ languageId: string }>;
}

const LESSON_TYPE_ICONS: Record<string, string> = {
  vocab:     '📚',
  dialogue:  '💬',
  ai_chat:   '🤖',
};

const LESSON_TYPE_LABELS: Record<string, string> = {
  vocab:     'Vokabeln',
  dialogue:  'Dialog',
  ai_chat:   'KI-Chat',
};

export default async function LanguagePage({ params }: Props) {
  const { languageId } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: language } = await supabase
    .from('languages')
    .select('*')
    .eq('id', languageId)
    .single();

  if (!language) notFound();

  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .eq('language_id', languageId)
    .order('order_index');

  const allLessonIds: string[] = [];
  const categoriesWithLessons: Array<Category & { lessons: Lesson[] }> = [];

  for (const cat of categories ?? []) {
    const { data: lessons } = await supabase
      .from('lessons')
      .select('*')
      .eq('category_id', cat.id)
      .order('order_index');
    const lessonList = lessons ?? [];
    allLessonIds.push(...lessonList.map(l => l.id));
    categoriesWithLessons.push({ ...cat, lessons: lessonList });
  }

  const { data: progressRows } = await supabase
    .from('user_progress')
    .select('lesson_id, completed, xp_earned')
    .eq('user_id', user.id)
    .in('lesson_id', allLessonIds.length > 0 ? allLessonIds : ['none']);

  const progressMap = new Map(progressRows?.map(p => [p.lesson_id, p]) ?? []);
  const completedCount = progressRows?.filter(p => p.completed).length ?? 0;
  const totalLessons = allLessonIds.length;
  const overallPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  return (
    <div className="min-h-screen pb-10">
      {/* Header */}
      <div className="bg-gradient-to-b from-gray-800 to-gray-700 px-5 pt-12 pb-6">
        <Link href="/languages" className="text-white/70 text-sm font-bold mb-4 block">← Zurück</Link>
        <div className="flex items-center gap-4 mb-4">
          <span className="text-6xl">{language.flag_emoji}</span>
          <div>
            <h1 className="text-white font-black text-3xl">{language.name}</h1>
            <p className="text-white/70 text-sm">{completedCount}/{totalLessons} Lektionen abgeschlossen</p>
          </div>
        </div>
        <ProgressBar value={overallPercent} color="bg-brand-green" height="h-3" showLabel />
      </div>

      <div className="px-5 py-6 space-y-6">
        {categoriesWithLessons.map((cat, catIndex) => {
          const catCompleted = cat.lessons.filter(l => progressMap.get(l.id)?.completed).length;
          const catPercent = cat.lessons.length > 0
            ? Math.round((catCompleted / cat.lessons.length) * 100)
            : 0;

          const allPrevCatsComplete = catIndex === 0 || (() => {
            for (let i = 0; i < catIndex; i++) {
              const prev = categoriesWithLessons[i];
              const prevCompleted = prev.lessons.filter(l => progressMap.get(l.id)?.completed).length;
              if (prevCompleted < prev.lessons.length) return false;
            }
            return true;
          })();

          return (
            <div key={cat.id} className={`rounded-2xl border-2 overflow-hidden ${catPercent === 100 ? 'border-brand-green' : 'border-gray-200 dark:border-gray-700'}`}>
              {/* Category header */}
              <div className={`px-4 py-3 flex items-center gap-3 ${catPercent === 100 ? 'bg-green-50 dark:bg-green-900/20' : 'bg-gray-50 dark:bg-gray-800'}`}>
                <span className="text-2xl">{cat.icon}</span>
                <div className="flex-1">
                  <h3 className="font-black text-gray-800 dark:text-gray-100">{cat.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <ProgressBar value={catPercent} color="bg-brand-green" height="h-1.5" />
                    <span className="text-xs text-gray-500 whitespace-nowrap">{catCompleted}/{cat.lessons.length}</span>
                  </div>
                </div>
                {catPercent === 100 && <span className="text-2xl">✅</span>}
              </div>

              {/* Lessons */}
              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                {cat.lessons.map((lesson, lessonIndex) => {
                  const prog = progressMap.get(lesson.id);
                  const isDone = prog?.completed ?? false;
                  const prevLessonDone = lessonIndex === 0
                    ? true
                    : progressMap.get(cat.lessons[lessonIndex - 1].id)?.completed ?? false;
                  const isLocked = !allPrevCatsComplete && catIndex > 0;

                  return (
                    <div key={lesson.id} className="px-4 py-3">
                      {isLocked ? (
                        <div className="flex items-center gap-3 opacity-50">
                          <span className="text-xl">🔒</span>
                          <div className="flex-1">
                            <p className="font-bold text-gray-600 dark:text-gray-400 text-sm">{lesson.title}</p>
                            <p className="text-xs text-gray-400">{LESSON_TYPE_LABELS[lesson.type]}</p>
                          </div>
                        </div>
                      ) : (
                        <Link
                          href={lesson.type === 'ai_chat' ? `/chat/${lesson.id}` : `/learn/${lesson.id}`}
                          className="flex items-center gap-3"
                        >
                          <span className="text-xl">{isDone ? '✅' : LESSON_TYPE_ICONS[lesson.type]}</span>
                          <div className="flex-1">
                            <p className={`font-bold text-sm ${isDone ? 'text-brand-green' : 'text-gray-800 dark:text-gray-100'}`}>
                              {lesson.title}
                            </p>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-400">{LESSON_TYPE_LABELS[lesson.type]}</span>
                              {isDone && prog?.xp_earned && (
                                <span className="text-xs font-bold text-yellow-500">+{prog.xp_earned} XP</span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-xs font-bold text-brand-yellow">+{lesson.xp_reward} XP</span>
                            <span className="text-gray-300 text-lg">›</span>
                          </div>
                        </Link>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
