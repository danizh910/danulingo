'use client';

import { useRouter } from 'next/navigation';

interface LessonCompleteModalProps {
  xpEarned: number;
  correctCount: number;
  totalCount: number;
  onClose: () => void;
}

const MOTIVATIONS = [
  'Fantastisch! Du bist ein echtes Sprachtalent! 🌟',
  'Großartig! Weiter so, du schaffst das! 💪',
  'Ausgezeichnet! Dein Urlaubsfranzösisch wird immer besser! 🎯',
  'Bravo! Ein weiterer Schritt Richtung Sprachprofi! 🏆',
  'Super! Du lernst jeden Tag dazu! 🚀',
];

export default function LessonCompleteModal({ xpEarned, correctCount, totalCount, onClose }: LessonCompleteModalProps) {
  const router = useRouter();
  const motivation = MOTIVATIONS[Math.floor(Math.random() * MOTIVATIONS.length)];
  const percent = Math.round((correctCount / totalCount) * 100);

  return (
    <div className="fixed inset-0 bg-black/60 flex items-end justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-3xl w-full max-w-md p-8 text-center animate-slide-up">
        {/* Trophy */}
        <div className="text-7xl mb-4 animate-bounce">
          {percent === 100 ? '🏆' : percent >= 70 ? '⭐' : '💪'}
        </div>

        <h2 className="text-3xl font-black text-gray-800 dark:text-gray-100 mb-2">
          Lektion abgeschlossen!
        </h2>

        <p className="text-gray-500 dark:text-gray-400 mb-6">{motivation}</p>

        {/* Stats */}
        <div className="flex justify-around mb-8">
          <div className="text-center">
            <div className="text-3xl font-black text-brand-yellow">+{xpEarned}</div>
            <div className="text-xs text-gray-500 font-semibold">XP verdient</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black text-brand-green">{correctCount}/{totalCount}</div>
            <div className="text-xs text-gray-500 font-semibold">Richtig</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black text-brand-blue">{percent}%</div>
            <div className="text-xs text-gray-500 font-semibold">Score</div>
          </div>
        </div>

        {/* Confetti dots */}
        <div className="flex justify-center gap-2 mb-6">
          {['🟢','🟡','🔵','🟠','🟣'].map((dot, i) => (
            <span key={i} className="text-lg animate-confetti" style={{ animationDelay: `${i * 0.1}s` }}>{dot}</span>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full py-4 bg-brand-green text-white font-black text-xl rounded-2xl card-shadow-green btn-press"
        >
          Weiter lernen 🎯
        </button>
      </div>
    </div>
  );
}
