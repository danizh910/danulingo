'use client';

interface StreakBadgeProps {
  streak: number;
  size?: 'sm' | 'md' | 'lg';
}

export default function StreakBadge({ streak, size = 'md' }: StreakBadgeProps) {
  const sizes = {
    sm: 'text-sm px-2 py-0.5',
    md: 'text-base px-3 py-1',
    lg: 'text-xl px-4 py-2',
  };

  return (
    <div className={`inline-flex items-center gap-1 bg-orange-100 dark:bg-orange-900/30 rounded-full font-bold text-orange-600 dark:text-orange-400 ${sizes[size]}`}>
      <span className={`streak-fire ${size === 'lg' ? 'text-2xl' : 'text-lg'}`}>🔥</span>
      <span>{streak}</span>
    </div>
  );
}
