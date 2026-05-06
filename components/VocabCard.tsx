'use client';

import { useState } from 'react';
import type { Vocabulary } from '@/lib/types';

interface VocabCardProps {
  vocab: Vocabulary;
  onCorrect: () => void;
  onWrong: () => void;
}

export default function VocabCard({ vocab, onCorrect, onWrong }: VocabCardProps) {
  const [flipped, setFlipped] = useState(false);
  const [answered, setAnswered] = useState<'correct' | 'wrong' | null>(null);

  function speak() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(vocab.word_target);
      // pick language based on pronunciation hint or default
      const voices = window.speechSynthesis.getVoices();
      const preferred = voices.find(v => v.lang.startsWith('es') || v.lang.startsWith('it') || v.lang.startsWith('fr'));
      if (preferred) utter.voice = preferred;
      utter.rate = 0.85;
      window.speechSynthesis.speak(utter);
    }
  }

  function handleAnswer(correct: boolean) {
    setAnswered(correct ? 'correct' : 'wrong');
    setTimeout(() => {
      setAnswered(null);
      setFlipped(false);
      if (correct) onCorrect();
      else onWrong();
    }, 800);
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full px-4">
      {/* Card */}
      <div
        className={`w-full rounded-2xl p-6 cursor-pointer transition-all duration-300 card-shadow select-none ${
          answered === 'correct'
            ? 'bg-green-100 border-2 border-brand-green'
            : answered === 'wrong'
            ? 'bg-red-100 border-2 border-brand-red'
            : 'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600'
        }`}
        onClick={() => !answered && setFlipped(!flipped)}
      >
        {!flipped ? (
          <div className="text-center">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Deutsch</p>
            <p className="text-3xl font-black text-gray-800 dark:text-gray-100">{vocab.word_de}</p>
            <p className="text-sm text-gray-400 mt-4">Tippen zum Umdrehen 👆</p>
          </div>
        ) : (
          <div className="text-center animate-slide-up">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Zielsprache</p>
            <div className="flex items-center justify-center gap-2">
              <p className="text-3xl font-black text-gray-800 dark:text-gray-100">{vocab.word_target}</p>
              <button
                onClick={(e) => { e.stopPropagation(); speak(); }}
                className="text-2xl hover:scale-110 transition-transform"
                aria-label="Aussprechen"
              >
                🔊
              </button>
            </div>
            {vocab.pronunciation && (
              <p className="text-sm text-gray-500 italic mt-1">[{vocab.pronunciation}]</p>
            )}
            {vocab.example_sentence && (
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl text-left">
                <p className="text-sm font-semibold text-blue-700 dark:text-blue-300">{vocab.example_sentence}</p>
                <p className="text-xs text-gray-500 mt-1">{vocab.example_sentence_de}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Answer buttons (only show when flipped) */}
      {flipped && !answered && (
        <div className="flex gap-4 w-full animate-slide-up">
          <button
            onClick={() => handleAnswer(false)}
            className="flex-1 py-4 rounded-2xl bg-red-100 border-2 border-brand-red text-brand-red font-bold text-lg btn-press card-shadow"
            style={{ boxShadow: '0 4px 0 #cc3b3b' }}
          >
            ✗ Nochmal
          </button>
          <button
            onClick={() => handleAnswer(true)}
            className="flex-1 py-4 rounded-2xl bg-green-100 border-2 border-brand-green text-brand-green font-bold text-lg btn-press card-shadow-green"
          >
            ✓ Kannte ich!
          </button>
        </div>
      )}

      {answered && (
        <div className={`text-4xl animate-bounce ${answered === 'correct' ? 'text-brand-green' : 'text-brand-red'}`}>
          {answered === 'correct' ? '🎉' : '💪'}
        </div>
      )}
    </div>
  );
}
