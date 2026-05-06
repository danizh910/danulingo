# ✅ VERCEL DEPLOYMENT - SCHRITT FÜR SCHRITT

## Status
- ✅ Next.js 14 App: Gebaut und getestet
- ✅ Code auf GitHub: `https://github.com/danizh910/danulingo` (Branch: `claude/build-danulingo-app-Btxra`)
- ✅ Environment Variables bereit

---

## 🚀 JETZT: Deployment in 5 Minuten

### Schritt 1: Gehe zu Vercel Dashboard
→ https://vercel.com/dashboard

### Schritt 2: Neues Projekt hinzufügen
1. Klick "Add New Project"
2. Klick "Import Git Repository"
3. Suche `danizh910/danulingo`
4. Wähle Project aus

### Schritt 3: Framework und Einstellungen
- Framework: Next.js (auto-erkannt)
- Root Directory: `.` (default)
- Build Command: `npm run build` (auto)
- Output Directory: `.next` (auto)

### Schritt 4: Environment Variables
Gehe zu **Settings > Environment Variables** und füge hinzu:

```
NEXT_PUBLIC_SUPABASE_URL = https://qzbiozwsgxrrlmudxjnc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6YmlvendzZ3hycmxtdWR4am5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwNzA5NjUsImV4cCI6MjA5MzY0Njk2NX0.6IZFWWp_Dh1tlmsrNKqbbalrftkmi5nNEodWM1uJN2M
ANTHROPIC_API_KEY = (optional - später setzen)
```

### Schritt 5: Deploy
Klick "Deploy" und warte 3-5 Minuten auf Completion!

---

## Nach dem Deployment 🎯

Du erhältst eine URL wie: `https://danulingo-XXXXX.vercel.app`

### DANN: Supabase Auth URLs aktualisieren
1. Gehe zu https://app.supabase.com → Projekt: `qzbiozwsgxrrlmudxjnc`
2. Gehe zu **Authentication > URL Configuration**
3. Setze:
   - **Site URL**: `https://danulingo-XXXXX.vercel.app`
   - **Redirect URLs**: `https://danulingo-XXXXX.vercel.app/auth/callback`
4. Speichern!

---

## ✨ Fertig!
Die App läuft jetzt auf Vercel mit:
- ✅ Supabase Auth Integration
- ✅ 3 Sprachen (Spanisch, Italienisch, Französisch)
- ✅ Vokabelkarten mit TTS
- ✅ AI Chat (Claude API + Ollama)
- ✅ Gamification (XP, Badges, Streaks)
- ✅ PWA Support
- ✅ Mobile-responsive Design

**Benutzername zum Testen:**
- Email: `test@danulingo.dev` oder deine eigene Email
- Login per Magic Link ✨

---

**Fragen? Kontakt:** GitHub Issues oder Supabase Console
