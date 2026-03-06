# Pure Shape Studio - Fitness & Pilates Studio

Strona internetowa dla Pure Shape Studio - studia fitness i pilates w Zielonkach.

## 🌐 Live
https://fitness-total.training

## ✨ Funkcjonalności

- 📱 Responsywny design (mobile-first)
- 🎨 Nowoczesny wygląd z Tailwind CSS
- 🏋️ Prezentacja rodzajów zajęć
- 👥 Profil instruktorów
- 📍 Lokalizacja z mapą Google
- 📧 **Lista oczekujących** - nowa funkcja!

### 🆕 Lista Oczekujących

Użytkownicy mogą zapisać się na powiadomienia o wolnych miejscach:
- Wybór preferowanych godzin (7-13 i 16-20)
- Automatyczne powiadomienia email gdy ktoś odwoła
- Integracja z systemem Fitssey

**[📖 Szczegółowa dokumentacja](QUICKSTART.md)**

## 🛠️ Technologie

- **Hugo** - Static Site Generator
- **Tailwind CSS** - Styling
- **JavaScript** - Interaktywność
- **Fitssey** - System rezerwacji

## 🚀 Instalacja

### Wymagania
- Hugo Extended (v0.100+)
- Node.js (v16+)
- npm

### Kroki

1. Sklonuj repozytorium
```bash
git clone [repo-url]
cd pilates-studio
```

2. Zainstaluj zależności
```bash
npm install
```

3. Uruchom serwer deweloperski
```bash
hugo server
```

4. Otwórz w przeglądarce
```
http://localhost:1313
```

## 📦 Deployment

### GitHub Pages

```bash
npm run deploy
```

### Ręcznie

```bash
hugo
# Pliki w folderze /public gotowe do wgrania
```

## 📂 Struktura

```
pilates-studio/
├── assets/css/          # Style Tailwind
├── content/             # Treść strony (Markdown)
├── layouts/             # Szablony HTML
│   ├── index.html       # Strona główna
│   └── _default/
│       └── baseof.html  # Layout bazowy
├── static/              # Pliki statyczne
│   ├── images/          # Zdjęcia
│   ├── js/              # JavaScript
│   │   └── waitlist.js  # Lista oczekujących
│   └── CNAME            # Custom domain
├── hugo.toml            # Konfiguracja Hugo
├── tailwind.config.js   # Konfiguracja Tailwind
└── package.json         # Zależności npm
```

## 🎨 Customizacja

### Kolory

Edytuj `tailwind.config.js`:

```javascript
colors: {
  primary: '#2c3e50',    // Ciemny granat
  accent: '#ff6b6b',     // Pomarańczowy/czerwony
  softGray: '#f8f9fa',   // Jasny szary
  lightPink: '#fff5f5'   // Jasny różowy
}
```

### Treść

Edytuj `layouts/index.html` lub dodaj pliki Markdown w `content/`

## 📧 Konfiguracja Listy Oczekujących

### Opcja 1: Formspree (Najprostsza)

1. Zarejestruj się: https://formspree.io
2. Uzyskaj Form ID
3. W `static/js/waitlist.js` zamień `YOUR_FORM_ID`
4. Gotowe! ✅

**[📖 Pełna instrukcja](QUICKSTART.md)**

### Opcja 2: Własny Backend

1. Skonfiguruj serwer Node.js
2. Zobacz `backend-example.js`
3. Wypełnij `.env` (patrz `.env.example`)

**[📖 Dokumentacja backendu](WAITLIST_README.md)**

## 📝 Zarządzanie Treścią

### Dodawanie zdjęć
1. Dodaj do `static/images/`
2. Użyj w HTML: `{{ "images/nazwa.jpg" | relURL }}`

### Zmiana linków Fitssey
Szukaj: `https://app.fitssey.com/total-training` i zamień na nowy link

### Zmiana danych kontaktowych
Edytuj sekcję "LOCATION" w `layouts/index.html`

## 🧪 Testowanie

### Testowanie emaili
```bash
node test-email.js confirmation
node test-email.js slotAvailable
```

### Build test
```bash
hugo --minify
```

## 📈 Analytics

Dodaj Google Analytics w `layouts/_default/baseof.html`:

```html
<head>
  <!-- ... -->
  <!-- Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');
  </script>
</head>
```

## 🐛 Troubleshooting

### Strona nie buduje się
```bash
# Sprawdź wersję Hugo
hugo version

# Musi być Extended version
# Zainstaluj: brew install hugo
```

### Tailwind nie działa
```bash
# Przebuduj CSS
npm run build:css

# Lub uruchom watch mode
npm run watch:css
```

### Formularz nie wysyła
- Otwórz Console (F12)
- Sprawdź `static/js/waitlist.js`
- Zweryfikuj Form ID

## 📚 Dodatkowe Zasoby

- [📖 QUICKSTART.md](QUICKSTART.md) - Szybki start
- [📖 WAITLIST_README.md](WAITLIST_README.md) - Pełna dokumentacja listy oczekujących
- [📧 EMAIL_TEMPLATES.md](EMAIL_TEMPLATES.md) - Szablony emaili
- [💻 backend-example.js](backend-example.js) - Przykładowy backend

## 🤝 Contributing

1. Fork projektu
2. Stwórz branch (`git checkout -b feature/AmazingFeature`)
3. Commit zmian (`git commit -m 'Add AmazingFeature'`)
4. Push do brancha (`git push origin feature/AmazingFeature`)
5. Otwórz Pull Request

## 📄 License

Ten projekt jest prywatny i należy do Pure Shape Studio.

## 📞 Kontakt

**Pure Shape Studio**
- 📍 ul. Kościuszki 11A, Bibice
- 📱 698 190 880
- 📧 [kontakt@fitness-total.training]
- 📸 [@gosia.pilinska](https://instagram.com/gosia.pilinska)

---

Stworzone z ❤️ dla Pure Shape Studio
