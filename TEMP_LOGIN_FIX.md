# 🚀 Sofort-Lösung: Test-Account für Danulingo

## Problem: Email Rate Limit
Du hast zu viele Magic Links angefordert und Supabase blockiert temporär weitere Emails.

## Lösung: Direkter Datenbank-Login (für Testing)

### Schritt 1: Supabase SQL Editor öffnen
1. Gehe zu https://app.supabase.com/project/qzbiozwsgxrrlmudxjnc/sql
2. Klick "New Query"

### Schritt 2: Test-User erstellen
Füge diesen SQL-Code ein und führe ihn aus:

```sql
-- Erstelle Test-User direkt in der Datenbank
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  invited_at,
  confirmation_token,
  confirmation_sent_at,
  recovery_token,
  recovery_sent_at,
  email_change_token_new,
  email_change,
  email_change_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  created_at,
  updated_at,
  phone,
  phone_confirmed_at,
  phone_change,
  phone_change_token,
  phone_change_sent_at,
  email_change_token_current,
  email_change_confirm_status,
  banned_until,
  reauthentication_token,
  reauthentication_sent_at
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'tukibeats12@gmail.com',
  crypt('testpassword123', gen_salt('bf')),
  NOW(),
  NULL,
  '',
  NULL,
  '',
  NULL,
  '',
  '',
  NULL,
  NOW(),
  '{"provider": "email", "providers": ["email"]}',
  '{"full_name": "Test User"}',
  FALSE,
  NOW(),
  NOW(),
  NULL,
  NULL,
  '',
  '',
  NULL,
  '',
  0,
  NULL,
  '',
  NULL
) ON CONFLICT (email) DO NOTHING;

-- Erstelle User-Profil in der users Tabelle
INSERT INTO users (id, email, xp, level, streak, created_at, updated_at)
SELECT
  id,
  email,
  100, -- Start-XP
  1,   -- Start-Level
  1,   -- Start-Streak
  NOW(),
  NOW()
FROM auth.users
WHERE email = 'tukibeats12@gmail.com'
ON CONFLICT (id) DO NOTHING;
```

### Schritt 3: Passwort-Login aktivieren
Füge diesen SQL-Code ein und führe ihn aus:

```sql
-- Aktiviere Passwort-Authentifizierung für Test-User
UPDATE auth.users
SET encrypted_password = crypt('testpassword123', gen_salt('bf'))
WHERE email = 'tukibeats12@gmail.com';
```

### Schritt 4: Login testen
1. Gehe zu deiner Danulingo App
2. Verwende diese Credentials:
   - **Email**: `tukibeats12@gmail.com`
   - **Passwort**: `testpassword123`

## 🔧 Langfristige Lösung: Google OAuth

Nachdem du dich eingeloggt hast, richte Google OAuth ein:

### Google Cloud Console Setup:
1. Gehe zu https://console.cloud.google.com/
2. Erstelle OAuth 2.0 Credentials
3. Füge Redirect URI hinzu: `https://qzbiozwsgxrrlmudxjnc.supabase.co/auth/v1/callback`

### Supabase OAuth aktivieren:
1. Gehe zu https://app.supabase.com/project/qzbiozwsgxrrlmudxjnc/auth/providers
2. Aktiviere Google Provider
3. Füge Client ID und Secret ein

## 📱 Mobile Testing

Nach erfolgreichem Login:
- Teste alle Features auf dem Handy
- Prüfe PWA-Funktionalität
- Teste Offline-Modus

## 🧹 Cleanup (nach Testing)

Wenn du fertig bist, kannst du den Test-User entfernen:

```sql
-- Test-User entfernen (optional)
DELETE FROM users WHERE email = 'tukibeats12@gmail.com';
DELETE FROM auth.users WHERE email = 'tukibeats12@gmail.com';
```

## ⚠️ Sicherheitshinweis

- **Test-Account nur temporär verwenden**
- **Passwort ändern nach Testing**
- **Google OAuth ist die empfohlene Lösung**

---

**Jetzt kannst du dich sofort einloggen! 🎉**