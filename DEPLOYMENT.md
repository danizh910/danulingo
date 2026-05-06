# 🚀 Danulingo - Vercel Deployment Anleitung

## Schritt 1: GitHub Push ✅
Code wurde bereits zu GitHub gepusht:
- **Branch**: `claude/build-danulingo-app-Btxra`
- **URL**: https://github.com/danizh910/danulingo

## Schritt 2: Vercel Deployment (MANUELL)

### 2.1 Vercel Project erstellen
1. Gehe zu https://vercel.com/dashboard
2. Klicke **"Add New Project"**
3. Wähle **"Import Git Repository"**
4. Verbinde: `https://github.com/danizh910/danulingo`
5. Wähle Root Directory: `.` (root)

### 2.2 Environment Variables in Vercel setzen
Gehe zu **Settings > Environment Variables** und füge hinzu:

| Variable | Wert |
|----------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://qzbiozwsgxrrlmudxjnc.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6YmlvendzZ3hycmxtdWR4am5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwNzA5NjUsImV4cCI6MjA5MzY0Njk2NX0.6IZFWWp_Dh1tlmsrNKqbbalrftkmi5nNEodWM1uJN2M` |
| `ANTHROPIC_API_KEY` | (Optional - für Claude API) |
| `OLLAMA_API_URL` | (Optional - wird später gesetzt) |
| `OLLAMA_MODEL` | `gemma3` |

### 2.3 Deploy starten
1. Klicke **"Deploy"**
2. Warte auf den Build (ca. 3-5 Minuten)
3. Notiere die Vercel URL: `https://danulingo-XXXXX.vercel.app`

## Schritt 3: Supabase Auth URLs aktualisieren

Nach Vercel Deployment:

1. Gehe zu Supabase Dashboard: https://app.supabase.com
2. Wähle Projekt: **qzbiozwsgxrrlmudxjnc**
3. Gehe zu **Authentication > URL Configuration**
4. Aktualisiere:
   - **Site URL**: `https://danulingo-XXXXX.vercel.app` (deine Vercel URL)
   - **Redirect URLs**: `https://danulingo-XXXXX.vercel.app/auth/callback`
5. Speichern

## Schritt 4: GitHub PR (Optional)
Pull Request bereits bereit unter:
- https://github.com/danizh910/danulingo/pull/new/claude/build-danulingo-app-Btxra

---

## 📝 App Features
✅ Next.js 14 mit TypeScript  
✅ Supabase Auth (Magic Link)  
✅ 3 Sprachen: Spanisch, Italienisch, Französisch  
✅ Vokabelkarten mit TTS  
✅ AI Chat (Claude API + Ollama/Gemma)  
✅ Gamification (XP, Badges, Streaks)  
✅ Progressive Web App (PWA)  
✅ Mobile-First Responsive Design  

---

**Fertig!** 🎉
