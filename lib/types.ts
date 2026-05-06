export interface Language {
  id: string;
  code: string;
  name: string;
  flag_emoji: string;
  level_unlocked: number;
}

export interface Category {
  id: string;
  language_id: string;
  name: string;
  icon: string;
  order_index: number;
}

export interface Lesson {
  id: string;
  category_id: string;
  title: string;
  type: 'vocab' | 'dialogue' | 'ai_chat';
  order_index: number;
  xp_reward: number;
}

export interface Vocabulary {
  id: string;
  lesson_id: string;
  word_target: string;
  word_de: string;
  pronunciation: string | null;
  audio_hint: string | null;
  example_sentence: string | null;
  example_sentence_de: string | null;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string | null;
  total_xp: number;
  current_level: number;
  created_at: string;
}

export interface UserStreak {
  user_id: string;
  last_active_date: string | null;
  current_streak: number;
  longest_streak: number;
}

export interface UserProgress {
  user_id: string;
  lesson_id: string;
  completed: boolean;
  xp_earned: number;
  completed_at: string | null;
  attempts: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition_type: string;
  condition_value: number;
}

export interface UserBadge {
  badge_id: string;
  earned_at: string;
  badges: Badge;
}

export interface LessonWithProgress extends Lesson {
  completed?: boolean;
  xp_earned?: number;
}

export interface CategoryWithProgress extends Category {
  lessons: LessonWithProgress[];
  completed_count: number;
  total_count: number;
}

export interface LanguageWithProgress extends Language {
  total_xp: number;
  completed_lessons: number;
  total_lessons: number;
  progress_percent: number;
}
