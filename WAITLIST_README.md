# Lista Oczekujących - Dokumentacja

## Przegląd
System listy oczekujących pozwala użytkownikom zapisać się na powiadomienia o wolnych miejscach w wybranych godzinach (7-13 i 16-20).

## Użyte technologie
- Hugo (static site generator)
- Tailwind CSS (styling)
- JavaScript (obsługa formularza)

## Konfiguracja

### Opcja 1: Formspree (Najprostsza - Polecana do startu)

1. Zarejestruj się na https://formspree.io
2. Utwórz nowy formularz
3. Skopiuj Form ID
4. W pliku `static/js/waitlist.js` zastąp `YOUR_FORM_ID` swoim ID:
   ```javascript
   const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
   ```

**Zalety:**
- Bardzo łatwa konfiguracja
- Darmowy plan: 50 zgłoszeń/miesiąc
- Otrzymujesz emaile z zapisami
- Można eksportować dane

**Wady:**
- Brak automatycznych powiadomień o odwołaniach
- Trzeba ręcznie zarządzać listą

### Opcja 2: Netlify Forms (Jeśli hostujesz na Netlify)

1. W pliku `layouts/index.html` dodaj do formularza:
   ```html
   <form id="waitlistForm" name="waitlist" method="POST" data-netlify="true">
   ```

2. W pliku `static/js/waitlist.js` odkomentuj sekcję Netlify

**Zalety:**
- Integracja z Netlify
- Darmowe do 100 zgłoszeń/miesiąc
- Automatyczne spam filtering

### Opcja 3: Własny Backend (Dla zaawansowanych)

Potrzebujesz:
1. Serwer Node.js/Python/PHP
2. Baza danych (MongoDB, PostgreSQL, MySQL)
3. System wysyłania emaili (SendGrid, Mailgun, AWS SES)
4. Integracja z API Fitssey (jeśli dostępne)

Przykładowy backend znajduje się w pliku `backend-example.js`

## Przepływ pracy

### Krok 1: Użytkownik wypełnia formularz
- Imię, nazwisko, email
- Wybiera preferowane dni tygodnia (lub "Dowolny dzień")
- Wybiera preferowane godziny

### Krok 2: Dane są zapisywane
- W systemie Formspree/Netlify lub
- W Twojej bazie danych

### Krok 3: Monitoring odwołań
**Opcje:**
1. **Ręczne:** Ty dostajesz powiadomienie z Fitssey o odwołaniu → sprawdzasz listę → wysyłasz email ręcznie
2. **Półautomatyczne:** Skrypt sprawdza codziennie Fitssey API → wysyła powiadomienia automatycznie
3. **Automatyczne:** Webhook z Fitssey → natychmiastowe powiadomienia

**Logika dopasowania:**
- System sprawdza dzień tygodnia odwołania (np. "piątek")
- Znajduje osoby, które wybrały ten dzień LUB "dowolny"
- Sprawdza czy wybrana godzina się zgadza
- Wysyła powiadomienie tylko do dopasowanych osób

### Krok 4: Powiadomienie użytkownika
Email do osoby z listy:
```
Temat: Wolne miejsce w Pure Shape Studio!

Dzień dobry [Imię],

Mamy dobrą wiadomość! Właśnie zwolniło się miejsce:
- Data: [Data]
- Godzina: [Godzina]

Zarezerwuj teraz: https://app.fitssey.com/total-training

Pozdrawiamy,
Pure Shape Studio Team
```

## Struktura danych

```json
{
  "firstName": "Jan",
  "lastName": "Kowalski",
  "email": "jan@example.com",
  "days": ["poniedziałek", "środa", "piątek"],
  "hours": ["09:00", "10:00", "17:00"],
  "timestamp": "2026-01-05T10:30:00.000Z"
}
```

**Uwaga:** Jeśli użytkownik wybierze "Dowolny dzień", `days` będzie zawierać tylko `["dowolny"]`.

## Integracja z Fitssey

Sprawdź czy Fitssey oferuje:
1. **Webhooks** - najlepsze rozwiązanie, powiadomienie w czasie rzeczywistym
2. **API** - możesz odpytywać o wolne miejsca
3. **Email notifications** - parsowanie emaili (najmniej eleganckie)

Skontaktuj się z supportem Fitssey: support@fitssey.com

## Bezpieczeństwo

1. **Walidacja danych:** Zaimplementowana w JavaScript
2. **GDPR:** Dodaj informację o przetwarzaniu danych:
   ```html
   <p class="text-sm text-gray-500 mt-4">
     Zapisując się, zgadzasz się na przetwarzanie danych osobowych w celu powiadomień o wolnych miejscach.
   </p>
   ```
3. **Rate limiting:** Użyj Cloudflare lub rate limiting w backendzie

## Troubleshooting

### Formularz nie wysyła danych
- Sprawdź console (F12)
- Upewnij się, że Form ID jest prawidłowy
- Sprawdź CORS (jeśli własny backend)

### Nie dostaję emaili
- Sprawdź folder SPAM
- Zweryfikuj konfigurację Formspree/Netlify
- Sprawdź logi serwera (własny backend)

## Przyszłe ulepszenia

1. **Panel administracyjny** - zarządzanie listą
2. **SMS notifications** - oprócz email
3. **Automatyczne rezerwacje** - book najszybszy slot automatycznie
4. **Preferencje dni tygodnia** - np. tylko poniedziałki
5. **Historia powiadomień** - tracking wysłanych alertów

## Kontakt

W razie pytań: krzysztofbabula@example.com
