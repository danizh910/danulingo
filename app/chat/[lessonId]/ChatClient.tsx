'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface Props {
  lesson: {
    id: string;
    title: string;
    xp_reward: number;
    categories: {
      name: string;
      icon: string;
      languages: { name: string; flag_emoji: string; code: string };
    };
  };
  userId: string;
}

const SCENARIOS: Record<string, string> = {
  'Restaurant': 'Du bist in einem Restaurant und möchtest essen bestellen',
  'Hotel': 'Du checkst in ein Hotel ein und hast Fragen zur Unterkunft',
  'Shopping': 'Du bist auf einem Markt und möchtest Souvenirs kaufen',
  'Transport': 'Du brauchst Hilfe mit dem Transport und der Navigation',
  'Notfall': 'Du hast einen kleinen Notfall und brauchst Hilfe',
  'Smalltalk': 'Du triffst jemanden und möchtest ein Gespräch führen',
};

function getScenario(catName: string): string {
  for (const [key, value] of Object.entries(SCENARIOS)) {
    if (catName.toLowerCase().includes(key.toLowerCase())) return value;
  }
  return 'Du bist auf Reisen und führst ein Gespräch';
}

function speak(text: string, langCode: string) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  const langMap: Record<string, string> = { es: 'es-MX', it: 'it-IT', fr: 'fr-FR' };
  utter.lang = langMap[langCode] ?? 'es-ES';
  utter.rate = 0.85;
  window.speechSynthesis.speak(utter);
}

export default function ChatClient({ lesson, userId }: Props) {
  const router = useRouter();
  const lang = lesson.categories.languages;
  const scenario = getScenario(lesson.categories.name);

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Send initial greeting
    sendMessage(null);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function sendMessage(userText: string | null) {
    if (loading) return;
    setLoading(true);

    const newMessages: Message[] = userText
      ? [...messages, { role: 'user', content: userText }]
      : messages;

    if (userText) {
      setMessages(newMessages);
      setInput('');
      setMessageCount(c => c + 1);
    }

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages,
          language: lang.name,
          langCode: lang.code,
          scenario,
        }),
      });

      const data = await res.json();
      const assistantMsg: Message = { role: 'assistant', content: data.content };
      setMessages(prev => [...prev, assistantMsg]);
      speak(data.content, lang.code);

      if (messageCount >= 7) {
        setFinished(true);
        await fetch('/api/progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ lessonId: lesson.id, xpEarned: lesson.xp_reward, completed: true }),
        });
      }
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '❌ Fehler beim Verbinden. Bitte versuche es erneut.',
      }]);
    }

    setLoading(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (input.trim()) sendMessage(input.trim());
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 px-4 pt-12 pb-4 shadow-sm flex items-center gap-3">
        <button onClick={() => router.back()} className="text-gray-400 text-2xl">✕</button>
        <span className="text-3xl">{lang.flag_emoji}</span>
        <div className="flex-1">
          <h1 className="font-black text-gray-800 dark:text-gray-100">{lesson.title}</h1>
          <p className="text-xs text-gray-500">{lesson.categories.icon} {lesson.categories.name}</p>
        </div>
        <div className="text-xs font-bold text-brand-yellow bg-yellow-50 px-2 py-1 rounded-lg">
          +{lesson.xp_reward} XP
        </div>
      </div>

      {/* Scenario badge */}
      <div className="px-4 py-2 bg-purple-50 dark:bg-purple-900/20 border-b border-purple-100 dark:border-purple-800">
        <p className="text-xs font-semibold text-purple-700 dark:text-purple-300">
          🎭 Szenario: {scenario}
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 no-scrollbar">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-brand-purple flex items-center justify-center text-white text-sm mr-2 flex-shrink-0 mt-1">
                🤖
              </div>
            )}
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
              msg.role === 'user'
                ? 'bg-brand-blue text-white rounded-br-none'
                : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-bl-none shadow-sm'
            }`}>
              <p className="text-sm font-semibold leading-relaxed">{msg.content}</p>
              {msg.role === 'assistant' && (
                <button
                  onClick={() => speak(msg.content, lang.code)}
                  className="text-xs text-gray-400 mt-1 hover:text-gray-600"
                >
                  🔊 Vorlesen
                </button>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="w-8 h-8 rounded-full bg-brand-purple flex items-center justify-center mr-2">🤖</div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm">
              <div className="flex gap-1">
                {[0,1,2].map(i => (
                  <div key={i} className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Finished banner */}
      {finished && (
        <div className="px-4 py-3 bg-green-100 dark:bg-green-900/30 border-t border-brand-green text-center">
          <p className="font-bold text-brand-green">🎉 Gespräch abgeschlossen! +{lesson.xp_reward} XP verdient!</p>
          <button onClick={() => router.back()} className="text-sm text-brand-blue font-bold mt-1">Zurück zur Übersicht</button>
        </div>
      )}

      {/* Input */}
      {!finished && (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 px-4 py-3 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={`Antworte auf ${lang.name}...`}
            className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-xl px-4 py-3 text-sm font-semibold text-gray-800 dark:text-gray-100 outline-none focus:ring-2 focus:ring-brand-blue"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="bg-brand-blue text-white rounded-xl px-4 py-3 font-bold disabled:opacity-50 transition-opacity"
          >
            ➤
          </button>
        </form>
      )}
    </div>
  );
}
