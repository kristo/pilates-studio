# 📧 Jak Wysyłać Powiadomienia Gmail - KROK PO KROKU

## 🎯 Krok 1: Skonfiguruj Gmail App Password

### A. Włącz 2-Step Verification
1. Idź na: https://myaccount.google.com/security
2. Znajdź "2-Step Verification"
3. Włącz jeśli jeszcze nie masz

### B. Wygeneruj App Password
1. Idź na: https://myaccount.google.com/apppasswords
2. W "Select app" wybierz: **Mail**
3. W "Select device" wybierz: **Other (Custom name)**
4. Wpisz: **Pure Shape Studio**
5. Kliknij **Generate**
6. **SKOPIUJ 16-znakowe hasło** (np. `abcd efgh ijkl mnop`)

## 🎯 Krok 2: Skonfiguruj plik .env

1. Otwórz plik `.env` w folderze projektu
2. Zamień na swoje dane:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=twoj-email@gmail.com
SMTP_PASS=abcd efgh ijkl mnop    # <-- Hasło z kroku 1B (bez spacji!)
EMAIL_FROM=twoj-email@gmail.com
TEST_EMAIL=twoj-email@gmail.com
```

**WAŻNE:** Wpisz hasło aplikacji BEZ spacji: `abcdefghijklmnop`

## 🎯 Krok 3: Zainstaluj zależności

```bash
npm install nodemailer dotenv
```

## 🎯 Krok 4: Przetestuj połączenie

```bash
node test-email.js
```

Powinieneś dostać email testowy! ✅

## 🎯 Krok 5: Wyślij prawdziwe powiadomienie

### Scenariusz: Ktoś odwołał zajęcia w Środę o 17:00

1. **Sprawdź Formspree** - zobacz kto wybrał środę i 17:00
   - Idź na: https://formspree.io/forms/[TWOJ_FORM_ID]/submissions

2. **Uruchom skrypt:**
   ```bash
   node send-notification.js
   ```

3. **Odpowiedz na pytania:**
   ```
   Dzień tygodnia: Środa
   Data: 8 stycznia 2026
   Godzina: 17:00
   
   Osoba #1:
     Imię: Jan
     Email: jan@example.com
   
   Dodać kolejną osobę? (t/n): t
   
   Osoba #2:
     Imię: Anna
     Email: anna@example.com
   
   Dodać kolejną osobę? (t/n): n
   
   Wysłać powiadomienia? (t/n): t
   ```

4. **Gotowe!** 🎉 Emaile wysłane

## 📊 Przykładowy Przepływ Pracy

### Rano sprawdzasz Fitssey:
```
09:00 - Sprawdzam Fitssey
        → 2 odwołania: Środa 10:00 i Piątek 17:00

09:05 - Loguję się do Formspree
        → Szukam osób zainteresowanych środą 10:00
        → Znalazłam: Jan Kowalski, Anna Nowak

09:10 - Uruchamiam: node send-notification.js
        → Wpisuję dane: Środa, 10 stycznia, 10:00
        → Dodaję Jana i Annę
        → Wysyłam! ✅

09:15 - Powtarzam dla Piątku 17:00
```

## 🔥 Szybkie Commandy

### Test połączenia:
```bash
node test-email.js
```

### Test z innym emailem:
```bash
TEST_EMAIL=test@example.com node test-email.js
```

### Wyślij powiadomienia:
```bash
node send-notification.js
```

## 🆘 Troubleshooting

### "Invalid login: 535-5.7.8 Username and Password not accepted"
❌ **Problem:** Złe hasło
✅ **Rozwiązanie:** 
   1. Sprawdź czy używasz App Password (nie zwykłego hasła!)
   2. Wpisz hasło bez spacji: `abcdefghijklmnop`
   3. Sprawdź czy 2-Step Verification jest włączone

### "Connection timeout"
❌ **Problem:** Blokada firewalla/sieci
✅ **Rozwiązanie:**
   - Sprawdź połączenie internetowe
   - Wyłącz VPN
   - Spróbuj z innej sieci

### "Nie dostaję emaila"
❌ **Problem:** Email w SPAM
✅ **Rozwiązanie:**
   - Sprawdź folder SPAM/Spam
   - Dodaj siebie do kontaktów
   - Zaznacz "Not spam"

### "SMTP_USER is not defined"
❌ **Problem:** Plik .env nie jest wczytany
✅ **Rozwiązanie:**
   - Upewnij się że plik nazywa się `.env` (z kropką!)
   - Znajduje się w głównym folderze projektu
   - Uruchamiasz skrypt z tego samego folderu

## 💡 Wskazówki

### Zrób testową grupę:
1. Stwórz testowy email (np. na Gmail)
2. Zapisz się na listę oczekujących z tym emailem
3. Przetestuj wysyłkę na siebie

### Zachowaj historię:
Notuj w kalendarzu/notatniku:
```
05.01.2026 - Wysłano 3 powiadomienia (środa 10:00)
           → Jan, Anna, Maria
           → 2 zarezerwowały, 1 nie odpowiedziała
```

### Ustaw szablon w Gmail:
Stwórz draft w Gmail z tematem i treścią - przyspieszy pracę!

## 📱 Alternatywa: Wysyłka przez Gmail UI

Jeśli skrypt nie działa, możesz wysyłać ręcznie:

1. Otwórz Gmail
2. Nowy email
3. Skopiuj szablon z `EMAIL_TEMPLATES.md`
4. Zmień imię, datę, godzinę
5. Wyślij do osób z listy Formspree

---

## ✅ Checklist - Pierwsze Użycie

- [ ] Włączyłem 2-Step Verification w Gmail
- [ ] Wygenerowałem App Password
- [ ] Skopiowałem hasło (bez spacji!)
- [ ] Wypełniłem plik .env
- [ ] Zainstalowałem: `npm install nodemailer dotenv`
- [ ] Przetestowałem: `node test-email.js`
- [ ] Dostałem testowy email ✅
- [ ] Gotowe do wysyłki powiadomień!

---

**Pytania? Zobacz:**
- `INSTRUKCJA_DLA_GOSI.md` - główna instrukcja
- `EMAIL_TEMPLATES.md` - szablony emaili
- `QUICKSTART.md` - ogólny quickstart
