'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import VocabCard from '@/components/VocabCard';
import LessonCompleteModal from '@/components/LessonCompleteModal';
import ProgressBar from '@/components/ProgressBar';
import type { Vocabulary } from '@/lib/types';

interface Props {
  lesson: {
    id: string;
    title: string;
    type: string;
    xp_reward: number;
    categories: {
      name: string;
      icon: string;
      language_id: string;
      languages: { name: string; flag_emoji: string };
    };
  };
  vocabulary: Vocabulary[];
  userId: string;
  existingProgress: { completed: boolean; xp_earned: number } | null;
}

export default function LearnClient({ lesson, vocabulary, userId, existingProgress }: Props) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [showComplete, setShowComplete] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);
  const [sessionDone, setSessionDone] = useState(false);

  const total = vocabulary.length;
  const progress = total > 0 ? Math.round((currentIndex / total) * 100) : 0;

  const handleCorrect = useCallback(() => {
    setCorrect(c => c + 1);
    if (currentIndex + 1 >= total) {
      finishLesson(correct + 1, wrong);
    } else {
      setCurrentIndex(i => i + 1);
    }
  }, [currentIndex, total, correct, wrong]);

  const handleWrong = useCallback(() => {
    setWrong(w => w + 1);
    if (currentIndex + 1 >= total) {
      finishLesson(correct, wrong + 1);
    } else {
      setCurrentIndex(i => i + 1);
    }
  }, [currentIndex, total, correct, wrong]);

  async function finishLesson(finalCorrect: number, finalWrong: number) {
    const score = total > 0 ? finalCorrect / total : 0;
    const earned = Math.round(lesson.xp_reward * score);
    setXpEarned(earned);

    await fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lessonId: lesson.id,
        xpEarned: earned,
        completed: score >= 0.5,
      }),
    });

    setSessionDone(true);
    setShowComplete(true);
  }

  const cat = lesson.categories;
  const lang = cat.languages;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Top bar */}
      <div className="bg-white dark:bg-gray-800 px-4 pt-12 pb-4 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={() => router.back()} className="text-gray-400 text-2xl">✕</button>
          <div className="flex-1">
            <ProgressBar value={progress} color="bg-brand-green" height="h-3" />
          </div>
          <span className="text-sm font-bold text-gray-500">{currentIndex}/{total}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg">{lang.flag_emoji}</span>
          <span className="text-sm font-bold text-gray-600 dark:text-gray-300">{cat.icon} {cat.name}</span>
        </div>
        <h1 className="font-black text-gray-800 dark:text-gray-100 text-lg mt-1">{lesson.title}</h1>
      </div>

      {/* Card area */}
      <div className="flex-1 flex flex-col items-center justify-center py-8">
        {!sessionDone && currentIndex < total ? (
          <VocabCard
            vocab={vocabulary[currentIndex]}
            onCorrect={handleCorrect}
            onWrong={handleWrong}
          />
        ) : !showComplete ? (
          <div className="text-center text-gray-500">
            <div className="text-6xl mb-4">🎉</div>
            <p className="font-bold">Alle Karten gesehen!</p>
          </div>
        ) : null}
      </div>

      {/* Score bar */}
      <div className="bg-white dark:bg-gray-800 px-6 py-4 flex justify-around border-t border-gray-100 dark:border-gray-700">
        <div className="text-center">
          <div className="text-2xl font-black text-brand-green">{correct}</div>
          <div className="text-xs text-gray-500">Richtig ✓</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-black text-brand-red">{wrong}</div>
          <div className="text-xs text-gray-500">Falsch ✗</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-black text-brand-yellow">+{lesson.xp_reward} XP</div>
          <div className="text-xs text-gray-500">Belohnung</div>
        </div>
      </div>

      {showComplete && (
        <LessonCompleteModal
          xpEarned={xpEarned}
          correctCount={correct}
          totalCount={total}
          onClose={() => router.back()}
        />
      )}
    </div>
  );
}
