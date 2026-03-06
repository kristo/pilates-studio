# Changelog

Wszystkie istotne zmiany w projekcie Pure Shape Studio.

## [1.1.1] - 2026-01-05

### ✨ Nowe funkcje
- **Wybór dni tygodnia** w formularzu listy oczekujących
  - Poniedziałek - Niedziela (7 dni)
  - Opcja "Dowolny dzień" dla maksymalnej elastyczności
  - Inteligentne odznaczanie: "Dowolny" wyłącza konkretne dni i vice versa
  
### 🎨 UI/UX
- Ładne checkboxy dla dni tygodnia
- Grid 2x4 na mobile, 4 kolumny na desktop
- Automatyczna walidacja: wymagany przynajmniej 1 dzień i 1 godzina
- Tooltip wyjaśniający działanie "Dowolny dzień"

### 🔧 Backend
- Aktualizacja schematu MongoDB: dodane pole `days`
- Inteligentne dopasowanie: dzień tygodnia + godzina
- Obsługa "dowolny" w zapytaniach bazodanowych ($or query)
- Email potwierdzający pokazuje dni i godziny

### 📚 Dokumentacja
- Zaktualizowane wszystkie pliki instrukcji
- Dodane przykłady z dniami tygodnia
- Wyjaśnienie logiki "Dowolny dzień"

---

## [1.1.0] - 2026-01-05

### ✨ Nowe funkcje
- **Lista Oczekujących** - Główna nowa funkcja
  - Formularz z wyborem godzin 7-13 i 16-20
  - Zbieranie danych kontaktowych (imię, nazwisko, email)
  - Obsługa JavaScript dla submita formularza
  - Walidacja po stronie klienta
  - Komunikaty sukcesu/błędu
  
- **Panel Administracyjny** (`/admin.html`)
  - Przeglądanie wszystkich osób na liście
  - Filtrowanie po godzinie
  - Wyszukiwanie po imieniu/emailu
  - Eksport do CSV
  - Statystyki i dashboard
  - Wysyłanie powiadomień grupowych

### 📚 Dokumentacja
- `QUICKSTART.md` - Szybki start (5 minut)
- `WAITLIST_README.md` - Pełna dokumentacja techniczna
- `INSTRUKCJA_DLA_GOSI.md` - Instrukcja dla właścicielki
- `EMAIL_TEMPLATES.md` - Gotowe szablony emaili
- `README.md` - Główna dokumentacja projektu

### 🛠️ Backend
- `backend-example.js` - Przykładowy serwer Node.js
  - REST API dla listy oczekujących
  - Integracja z MongoDB
  - Wysyłka emaili przez Nodemailer
  - Webhook dla Fitssey
  
- `test-email.js` - Narzędzie do testowania emaili
- `.env.example` - Przykład konfiguracji
- `backend-package.json` - Zależności backendu

### 🎨 UI/UX
- Nowa sekcja na stronie głównej
- Link w nawigacji do listy oczekujących
- Responsywny design
- Ładne checkboxy dla wyboru godzin
- Animacje i efekty hover
- Informacja GDPR

### 🔧 Techniczne
- JavaScript handler w `static/js/waitlist.js`
- Obsługa Formspree (opcja prosta)
- Obsługa własnego backendu (opcja zaawansowana)
- Dodano `.gitignore` dla plików .env

### 📦 Pliki dodane
```
static/js/waitlist.js
static/admin.html
backend-example.js
backend-package.json
test-email.js
.env.example
QUICKSTART.md
WAITLIST_README.md
INSTRUKCJA_DLA_GOSI.md
EMAIL_TEMPLATES.md
README.md
```

### 🔄 Pliki zmodyfikowane
```
layouts/index.html - dodana sekcja listy oczekujących
layouts/_default/baseof.html - dodany skrypt waitlist.js
.gitignore - dodane .env i logi
```

---

## [1.0.0] - 2025-12-XX

### 🎉 Pierwsza wersja
- Strona główna z sekcjami:
  - Header z logo i nawigacją
  - Hero z CTA
  - O studiu
  - Rodzaje zajęć (8 typów)
  - Instruktorzy (Gosia, Anna)
  - Lokalizacja z mapą
  - Kontakt
  - Footer
  
- Design:
  - Tailwind CSS
  - Responsywny (mobile-first)
  - Nowoczesny wygląd
  - Kolory: granat, pomarańczowy, szary
  
- Technologie:
  - Hugo static site generator
  - Tailwind CSS
  - GitHub Pages hosting
  - Custom domain (fitness-total.training)

- Integracje:
  - Fitssey (rezerwacje)
  - Google Maps
  - Instagram (Gosia)

---

## 🔮 Planowane (Future)

### Wersja 1.2.0
- [ ] Blog z artykułami o zdrowiu
- [ ] Galeria zdjęć (Instagram feed)
- [ ] Opinie klientów
- [ ] FAQ
- [ ] Cennik (jeśli publiczny)

### Wersja 1.3.0
- [ ] Automatyzacja powiadomień (webhook Fitssey)
- [ ] SMS notifications
- [ ] PWA (Progressive Web App)
- [ ] Dark mode

### Wersja 2.0.0
- [ ] System rezerwacji zintegrowany
- [ ] Konta użytkowników
- [ ] Historia treningów
- [ ] Osiągnięcia i gamification

---

## 📝 Notatki

### Priorytety na Q1 2026
1. ✅ Uruchomić listę oczekujących
2. Zebrać feedback od klientów
3. Monitorować skuteczność (ile osób rezerwuje?)
4. Rozważyć automatyzację jeśli duże zainteresowanie

### Metryki do śledzenia
- Liczba zapisów na listę / tydzień
- Najpopularniejsze godziny
- Conversion rate (powiadomienie → rezerwacja)
- Czas odpowiedzi na odwołanie

### Znane problemy
- Brak automatycznej integracji z Fitssey (wymaga ręcznego zarządzania)
- Panel admin używa mock data (trzeba podłączyć prawdziwy backend)

---

**Legenda:**
- ✨ Nowe funkcje
- 🐛 Poprawki błędów
- 🔧 Zmiany techniczne
- 📚 Dokumentacja
- 🎨 UI/UX
- 🔒 Bezpieczeństwo
- ⚡ Performance
