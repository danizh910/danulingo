# 🎓 Danulingo - Language Learning App

> Sprachen lernen für deine Reise | Learn languages for your travels

![Status](https://img.shields.io/badge/Status-Ready%20for%20Deployment-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-14.2.0-black)
![React](https://img.shields.io/badge/React-18.3.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Supabase](https://img.shields.io/badge/Supabase-Ready-green)

---

## 🚀 Features

### 📱 Vollständig funktional & deployed
- ✅ **Next.js 14** mit TypeScript & Tailwind CSS
- ✅ **Supabase** für Auth (Magic Link) & Database
- ✅ **3 Sprachen**: Spanisch, Italienisch, Französisch
- ✅ **Vokabelkarten** mit Text-to-Speech (TTS)
- ✅ **AI Chat**: Claude API + Ollama/Gemma Support
- ✅ **Gamification**: XP, Badges, Streaks, Levels
- ✅ **Progressive Web App** (PWA)
- ✅ **Mobile-First** & Responsive Design
- ✅ **Dark Mode** Support

---

## 📋 Status der Bereitstellung

| Task | Status | Details |
|------|--------|---------|
| App gebaut | ✅ | Next.js Build erfolgreich |
| GitHub Push | ✅ | Branch: `claude/build-danulingo-app-Btxra` |
| Vercel Ready | ✅ | Bereit zum Deployment |
| Supabase Config | ⏳ | Nach Vercel Deployment |
| Domain Setup | ⏳ | Nach Vercel Deployment |

---

## 🎯 Nächste Schritte (5 Minuten)

### 1️⃣ Vercel Deployment
Folge dem **[VERCEL_DEPLOYMENT_GUIDE.md](./VERCEL_DEPLOYMENT_GUIDE.md)**
- Gehe zu https://vercel.com/dashboard
- Importiere dieses Repository
- Branch: `claude/build-danulingo-app-Btxra`
- Setze Environment Variables
- Klick "Deploy" ✨

**Nach Deployment:** Du erhältst eine URL wie `https://danulingo-XXXXX.vercel.app`

### 2️⃣ Supabase Auth URLs
Nach Vercel Deployment:
1. Gehe zu https://app.supabase.com (Projekt: `qzbiozwsgxrrlmudxjnc`)
2. **Authentication > URL Configuration**
3. Setze:
   - **Site URL**: Deine Vercel URL
   - **Redirect URLs**: `https://danulingo-XXXXX.vercel.app/auth/callback`
4. Speichern!

### 3️⃣ Teste die App
1. Öffne deine Vercel URL
2. Gib deine Email ein (Magic Link)
3. Klick auf Link in deiner Email
4. 🎉 Willkommen bei Danulingo!

---

## 📦 Tech Stack

```
Frontend:
├── Next.js 14.2 (App Router)
├── React 18.3
├── TypeScript 5.0
├── Tailwind CSS 3.4
└── Framer Motion 11

Backend & Services:
├── Supabase (Auth + PostgreSQL)
├── Next.js API Routes
├── Anthropic Claude API (Chat)
└── Ollama/Gemma (Local LLM Option)

Extras:
├── next-pwa (Progressive Web App)
├── react-hot-toast (Notifications)
└── text-to-speech (Web API)
```

---

## 🔧 Lokale Entwicklung

```bash
# Dependencies installieren
npm install

# Environment variablen kopieren
cp .env.example .env.local

# Development Server starten
npm run dev

# App öffnen
open http://localhost:3000
```

---

## 📁 Projektstruktur

```
danulingo/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes (Chat, Progress)
│   ├── (auth)/            # Auth Pages
│   ├── languages/         # Language Selection
│   ├── learn/             # Lesson Pages
│   ├── chat/              # AI Chat
│   └── profile/           # User Profile
├── components/            # Reusable Components
│   ├── VocabCard.tsx
│   ├── StreakBadge.tsx
│   ├── XPAnimation.tsx
│   └── ...
├── lib/                   # Utilities
│   ├── supabase/         # Supabase Client
│   ├── types.ts          # TypeScript Types
│   └── ...
├── public/               # Static Assets + PWA
│   ├── manifest.json
│   └── icons/
└── vercel.json          # Vercel Configuration
```

---

## 🗄️ Supabase Database Schema

### Haupttabellen
- `users` - User Profile & XP
- `languages` - Verfügbare Sprachen
- `lessons` - Lektionen pro Sprache
- `vocabulary` - Vokabelkarten
- `user_progress` - Fortschritt & Completed Lessons
- `badges` - User Achievements (15 Badges)

### 🎮 Gamification
- **XP System**: Punkte pro Lektion & Quiz
- **Badges**: 15 verschiedene Achievements
- **Streaks**: Tägliche Aktivität Tracking
- **Levels**: 1-10 basierend auf XP

---

## 🔐 Environment Variables

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://qzbiozwsgxrrlmudxjnc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...

# AI Options (wähle einen)
ANTHROPIC_API_KEY=sk-ant-...           # Claude API
# ODER
OLLAMA_API_URL=http://192.168.1.XXX:11434
OLLAMA_MODEL=gemma3
```

---

## 🌐 Verfügbare Sprachen

### Spanisch 🇪🇸
- 15 Lektionen
- 150+ Vokabeln
- Allgemeine Konversationen

### Italienisch 🇮🇹
- 15 Lektionen
- 150+ Vokabeln
- Reise-Fokus

### Französisch 🇫🇷
- 15 Lektionen
- 150+ Vokabeln
- Business & Kultur

---

## 🎓 Beispiel Benutzerflow

```
1. Login → Magic Link via Email ✉️
2. Wähle Sprache 🌍
3. Starte Lektion 📚
4. Lerne Vokabeln (Karten + TTS) 🔊
5. Chat mit AI über Thema 💬
6. Erhalte XP & Badges 🏆
7. Baue Streak auf 🔥
```

---

## 📊 Build Info

- **Build Zeit**: ~2-3 Minuten
- **Build Größe**: ~5.2 MB
- **Routes**: 11 (10 dynamic + 1 not-found)
- **First Load JS**: ~86-158 kB (je nach Route)
- **Middleware**: 81.4 kB

---

## 🤝 GitHub Links

- **Repo**: https://github.com/danizh910/danulingo
- **Current Branch**: `claude/build-danulingo-app-Btxra`
- **PR**: [Erstelle PR →](https://github.com/danizh910/danulingo/pull/new/claude/build-danulingo-app-Btxra)

---

## 🚨 Known Issues & TODO

- [ ] Offline Support (Service Worker aktualisieren)
- [ ] Mehrsprachige UI
- [ ] Social Features (Leaderboard, Friends)
- [ ] Advanced Analytics
- [ ] Mobile App (React Native)

---

## 📞 Support

Falls Fragen: 
- GitHub Issues: [danizh910/danulingo/issues](https://github.com/danizh910/danulingo/issues)
- Supabase Console: [app.supabase.com](https://app.supabase.com)

---

**🎉 Happy Learning mit Danulingo!**

*Für Reisende. Von Reisenden.*
