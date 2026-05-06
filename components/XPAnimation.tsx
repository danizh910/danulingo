'use client';

import { useEffect, useState } from 'react';

interface XPAnimationProps {
  xp: number;
  onDone?: () => void;
}

export default function XPAnimation({ xp, onDone }: XPAnimationProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);
      onDone?.();
    }, 1400);
    return () => clearTimeout(t);
  }, [onDone]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
      <div className="xp-float text-5xl font-black text-brand-yellow drop-shadow-lg select-none">
        +{xp} XP ⭐
      </div>
    </div>
  );
}
