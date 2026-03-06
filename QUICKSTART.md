# Szybki Start - Lista Oczekujących

## ✅ Co zostało dodane

1. **Nowa sekcja na stronie** - Formularz listy oczekujących z:
   - Wyborem dni tygodnia (Pn-Nd lub "Dowolny dzień")
   - Wyborem godzin 7-13 i 16-20
2. **JavaScript handler** - Obsługa formularza w `static/js/waitlist.js`
3. **Przykładowy backend** - Pełny kod serwera Node.js w `backend-example.js`
4. **Dokumentacja** - Szczegóły w `WAITLIST_README.md`

## 🚀 Jak to uruchomić (3 kroki)

### Krok 1: Wybierz metodę wysyłki formularza

#### Opcja A: Formspree (NAJŁATWIEJSZA - 5 minut)

1. Idź na https://formspree.io i zarejestruj się (darmowe)
2. Utwórz nowy formularz
3. Skopiuj swój Form ID (np. `abc123def`)
4. Otwórz `static/js/waitlist.js` i zamień:
   ```javascript
   const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
   ```
   na:
   ```javascript
   const response = await fetch('https://formspree.io/f/abc123def', {
   ```
5. Gotowe! ✅

**Dostaniesz email za każdym razem jak ktoś się zapisze.**

#### Opcja B: Własny Backend (dla zaawansowanych)

1. Zainstaluj Node.js i MongoDB
2. Skopiuj `backend-package.json` do `package.json`
3. Zainstaluj zależności:
   ```bash
   npm install
   ```
4. Skopiuj `.env.example` do `.env` i wypełnij dane
5. Uruchom:
   ```bash
   npm start
   ```
6. W `static/js/waitlist.js` odkomentuj sekcję "Option 3"

### 💡 Wskazówka: Wybór "Dowolny dzień"

Gdy użytkownik wybierze "Dowolny dzień":
- System automatycznie odznacza wszystkie inne dni
- Użytkownik otrzyma powiadomienia dla każdego dnia tygodnia
- To idealne dla osób z elastycznym harmonogramem

Gdy wybierze konkretne dni:
- "Dowolny dzień" zostaje automatycznie odznaczony
- Powiadomienia tylko dla wybranych dni

### Krok 2: Przetestuj stronę lokalnie

```bash
hugo server
```

Otwórz http://localhost:1313 i przewiń do sekcji "Lista Oczekujących"

### Krok 3: Opublikuj

```bash
npm run deploy
```

## 📧 Jak zarządzać powiadomieniami?

### Wariant prostny (Formspree):

1. Dostajesz email gdy ktoś się zapisze
2. Gdy ktoś odwoła zajęcia w Fitssey:
   - Sprawdź listę zapisanych osób
   - Wyślij email ręcznie do osób z odpowiednią godziną

### Wariant automatyczny (własny backend):

1. Skonfiguruj webhook z Fitssey (jeśli dostępny)
2. Backend automatycznie wysyła powiadomienia

## 🎯 Następne kroki

1. **Teraz:** Skonfiguruj Formspree (5 minut)
2. **Za tydzień:** Sprawdź ile osób się zapisało
3. **Za miesiąc:** Rozważ przejście na własny backend dla automatyzacji

## ❓ Pytania?

- Sprawdź `WAITLIST_README.md` - pełna dokumentacja
- `backend-example.js` - przykładowy kod backendu
- Problem z formularzem? Sprawdź console w przeglądarce (F12)

## 🔧 Konfiguracja SMTP (jeśli własny backend)

### Gmail:
1. Włącz 2-Step Verification
2. Wygeneruj App Password: https://myaccount.google.com/apppasswords
3. Użyj w `.env`:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=twoj@gmail.com
   SMTP_PASS=wygenerowane-haslo-aplikacji
   ```

### SendGrid (polecane dla produkcji):
1. Zarejestruj się na https://sendgrid.com (100 emaili/dzień za darmo)
2. Wygeneruj API Key
3. Użyj biblioteki `@sendgrid/mail` zamiast nodemailer

## 📱 Co zobaczą użytkownicy

1. Formularz z:
   - Pola: Imię, Nazwisko, Email
   - Wybór dni tygodnia: Pn-Nd + opcja "Dowolny dzień"
   - Wybór godzin: 7-13 i 16-20 (checkboxy)
   - Przycisk "Zapisz się"

2. Po wysłaniu:
   - ✅ Zielony komunikat: "Dziękujemy za zapis!"
   - Email potwierdzający (jeśli skonfigurowane)

3. Gdy zwolni się miejsce:
   - 📧 Email z powiadomieniem (tylko dla wybranego dnia i godziny)
   - Link do rezerwacji przez Fitssey

## 🎨 Dostosowania

Kolory i style są w Tailwind CSS:
- `bg-accent` - kolor przycisku (orange)
- `text-primary` - kolor główny (ciemny)
- `bg-softGray` - tło formularza

Zmień w `tailwind.config.js` jeśli chcesz inne kolory.
