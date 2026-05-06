import { createClient } from '@/lib/supabase/server';
import { redirect, notFound } from 'next/navigation';
import LearnClient from './LearnClient';

interface Props {
  params: Promise<{ lessonId: string }>;
}

export default async function LearnPage({ params }: Props) {
  const { lessonId } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: lesson } = await supabase
    .from('lessons')
    .select('*, categories(name, icon, language_id, languages(name, flag_emoji))')
    .eq('id', lessonId)
    .single();

  if (!lesson) notFound();

  const { data: vocabulary } = await supabase
    .from('vocabulary')
    .select('*')
    .eq('lesson_id', lessonId);

  const { data: progress } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', user.id)
    .eq('lesson_id', lessonId)
    .single();

  return (
    <LearnClient
      lesson={lesson}
      vocabulary={vocabulary ?? []}
      userId={user.id}
      existingProgress={progress}
    />
  );
}
