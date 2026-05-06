'use client';

interface ProgressBarProps {
  value: number; // 0-100
  color?: string;
  height?: string;
  showLabel?: boolean;
}

export default function ProgressBar({
  value,
  color = 'bg-brand-green',
  height = 'h-3',
  showLabel = false,
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className="w-full">
      <div className={`w-full ${height} bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden`}>
        <div
          className={`${height} ${color} rounded-full transition-all duration-700 ease-out`}
          style={{ width: `${clamped}%` }}
        />
      </div>
      {showLabel && (
        <p className="text-xs text-gray-500 mt-1 text-right">{clamped}%</p>
      )}
    </div>
  );
}
