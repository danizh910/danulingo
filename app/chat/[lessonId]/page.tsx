import { createClient } from '@/lib/supabase/server';
import { redirect, notFound } from 'next/navigation';
import ChatClient from './ChatClient';

interface Props {
  params: Promise<{ lessonId: string }>;
}

export default async function ChatPage({ params }: Props) {
  const { lessonId } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: lesson } = await supabase
    .from('lessons')
    .select('*, categories(name, icon, language_id, languages(name, flag_emoji, code))')
    .eq('id', lessonId)
    .single();

  if (!lesson) notFound();

  return <ChatClient lesson={lesson} userId={user.id} />;
}
