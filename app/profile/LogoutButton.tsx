'use client';

import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
  }

  return (
    <button
      onClick={handleLogout}
      className="w-full py-4 border-2 border-brand-red text-brand-red font-black text-lg rounded-2xl hover:bg-red-50 transition-colors"
    >
      Abmelden 👋
    </button>
  );
}
