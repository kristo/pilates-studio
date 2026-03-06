# Instrukcja dla Właścicielki Studia

## 👋 Witaj!

Została dodana nowa funkcja na stronie - **Lista Oczekujących**. To narzędzie pomoże Ci maksymalnie wykorzystać dostępne miejsca na zajęciach.

## 🎯 Jak to działa?

### Dla klientów:
1. Klient wchodzi na stronę: https://fitness-total.training
2. Przewija do sekcji "Lista Oczekujących"
3. Wybiera preferowane dni tygodnia (Pn-Nd lub "Dowolny dzień")
4. Wybiera preferowane godziny (7-13 i 16-20)
5. Podaje swoje dane (imię, nazwisko, email)
6. Dostaje potwierdzenie

### Dla Ciebie:
Gdy ktoś odwoła zajęcia w Fitssey:
1. Sprawdzasz listę zapisanych osób
2. Wysyłasz powiadomienie do zainteresowanych
3. Pierwszy kto kliknie - rezerwuje miejsce

## 📋 Codzienne Zarządzanie

### Opcja 1: Prosty sposób (Formspree)

**Dostaniesz email po każdym zapisie:**
```
Od: Formspree
Temat: New submission from waitlist

Imię: Jan
Nazwisko: Kowalski
Email: jan@example.com
Dni: poniedziałek, środa, piątek
Godziny: 09:00, 10:00, 17:00
```

**Co robisz gdy ktoś odwoła w środę o 17:00?**
1. Sprawdzasz swoje emaile z zapisami
2. Szukasz osób, które wybrały:
   - "środa" (lub "dowolny") ORAZ
   - "17:00"
3. Wysyłasz do nich email ręcznie:

```
Temat: Wolne miejsce - piątek 17:00

Cześć Jan!

Zwolniło się miejsce:
📅 Piątek, 10 stycznia
🕐 17:00

Zarezerwuj: app.fitssey.com/total-training

Pozdrawiam,
Gosia
```

### Opcja 2: Panel Admin (Wygodniejsze)

**Otwórz:** https://fitness-total.training/admin.html

**Hasło:** `totaltraining2026` (zmień to!)

**Co możesz zrobić:**
- ✅ Zobacz wszystkie osoby na liście
- ✅ Filtruj po dniu tygodnia ("tylko poniedziałki")
- ✅ Filtruj po godzinie (np. pokaż tylko osoby zainteresowane 17:00)
- ✅ Szukaj po imieniu/emailu
- ✅ Eksportuj do Excel (CSV)
- ✅ Wyślij powiadomienia grupowe
- ✅ Usuń osoby z listy

**Screenshot panelu:**
```
┌─────────────────────────────────────┐
│ Lista Oczekujących - Admin Panel   │
├─────────────────────────────────────┤
│ Łącznie: 15  Nowe: 3  Wysłane: 7   │
├─────────────────────────────────────┤
│ Filtr dzień: [środa ▼] Filtr godz: [17:00 ▼] │
│ Szukaj: [___]                       │
├─────────────────────────────────────┤
│ Jan Kowalski | jan@ex.com | Śr 17:00│
│ Anna Nowak   | anna@ex.com| Śr 17:00│
│ ...                                 │
└─────────────────────────────────────┘
```

## 📱 Przykładowy Przepływ Pracy

### Rano (9:00):
1. Sprawdzasz Fitssey - 3 osoby odwołały na dziś
2. Notujesz: środa 10:00, piątek 17:00, piątek 19:00
3. Otwierasz panel admin
4. Filtrujesz "środa" + "10:00" → 2 osoby zainteresowane
5. Klikasz "Wyślij powiadomienie" dla tych osób
6. Powtarzasz dla piątkowych godzin

### W ciągu dnia:
- Ktoś z listy rezerwuje → dostajesz potwierdzenie z Fitssey
- Miejsce zapełnione ✅

## 💡 Wskazówki

### Jak często sprawdzać?
- **Rano:** Sprawdź odwołania na dziś
- **Wieczorem:** Sprawdź na jutro
- **Po odwołaniu:** Natychmiast wyślij powiadomienie

### Kiedy wysyłać powiadomienia?
- ⚡ Jak najszybciej po odwołaniu
- 📅 Minimum 2h przed zajęciami
- ⏰ Unikaj wysyłania po 21:00

### Co jeśli ktoś wybrał "Dowolny dzień"?
- Ta osoba dostanie powiadomienie o każdym odwołaniu
- W wybranej godzinie, niezależnie od dnia tygodnia
- Super opcja dla bardzo elastycznych osób!

### Co jeśli więcej osób chce to samo miejsce?
- Pierwszy kto zarezerwuje w Fitssey - dostaje miejsce
- Pozostałe osoby nadal są na liście na przyszłość

## 🆘 Problemy?

### "Nie dostaję emaili z zapisów"
1. Sprawdź folder SPAM
2. Dodaj formspree@formspree.io do kontaktów
3. Sprawdź ustawienia Formspree: formspree.io

### "Zapomniałam hasła do admin panelu"
1. Otwórz plik: `static/admin.html`
2. Znajdź: `const ADMIN_PASSWORD = '...'`
3. Zmień na nowe hasło
4. Zapisz i przeładuj stronę

### "Chcę zmienić godziny (nie 7-13, 16-20)"
1. Otwórz: `layouts/index.html`
2. Znajdź sekcję "Lista Oczekujących"
3. Dodaj/usuń godziny w checkboxach
4. Zapisz i przebuduj stronę: `hugo`

### "Chcę dodać/usunąć dni tygodnia"
1. Otwórz: `layouts/index.html`
2. Znajdź sekcję z dniami tygodnia
3. Dodaj/usuń checkbox dla dnia (skopiuj format istniejących)
4. Zapisz i przebuduj stronę: `hugo`

## 📊 Statystyki (Co warto śledzić)

### Co tydzień sprawdź:
- Ile osób się zapisało?
- Która kombinacja dni/godzin najpopularniejsza?
- Ile powiadomień wysłałaś?
- Ile osób zarezerwowało po powiadomieniu?

### Co miesiąc:
- Czy lista pomaga zapełnić odwołane miejsca?
- Czy klienci są zadowoleni?
- Może dodać więcej godzin/dni?
- Ile osób wybrało "Dowolny dzień"?

## 🎨 Personalizacja

### Zmiana tekstu na stronie:
Otwórz: `layouts/index.html`
Znajdź sekcję: `<!-- WAITLIST -->`
Zmień tekst według potrzeb

### Zmiana koloru:
Otwórz: `tailwind.config.js`
Zmień `accent: '#ff6b6b'` na inny kolor

## 📞 Pomoc Techniczna

Jeśli coś nie działa:
1. Sprawdź tę instrukcję
2. Zobacz `QUICKSTART.md` - więcej szczegółów
3. Napisz do Krzysia 😊

## ✅ Checklist - Pierwsze kroki

- [ ] Zarejestruj się na Formspree.io
- [ ] Skonfiguruj Form ID w `static/js/waitlist.js`
- [ ] Przetestuj formularz (zapisz się testowo)
- [ ] Sprawdź czy dostałaś email
- [ ] Otwórz panel admin
- [ ] Zmień domyślne hasło
- [ ] Zapisz instrukcję w zakładkach

---

## 📧 Gotowe Szablony Emaili

### Email do klienta (odwołanie):
```
Temat: Wolne miejsce - [DATA] [GODZINA]

Cześć [IMIĘ]! 👋

Mam dobrą wiadomość - zwolniło się miejsce:

📅 [Dzień tygodnia], [Data]
🕐 [Godzina]
🧘 [Typ zajęć - np. Pilates na reformerze]

Zarezerwuj teraz: app.fitssey.com/total-training

Pozdrawiam,
Gosia

PS: Miejsca szybko się zapełniają, nie czekaj! ⚡
```

### Email przypominający (brak aktywności):
```
Temat: Nadal szukasz miejsca? 🤔

Cześć [IMIĘ]!

Jesteś na naszej liście oczekujących już [X] dni.
Niestety nie mieliśmy jeszcze odwołania w Twoich preferowanych godzinach: [LISTA].

Co możesz zrobić:
✅ Sprawdź dostępność: app.fitssey.com/total-training
✅ Dodaj więcej godzin (więcej szans na powiadomienie!)
✅ Zadzwoń: 698 190 880

Dzięki za cierpliwość! 💪

Gosia
```

---

**Powodzenia! 🎉**

Pytania? Zawsze możesz napisać do Krzysia lub sprawdzić pełną dokumentację w QUICKSTART.md
