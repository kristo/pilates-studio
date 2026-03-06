# Email Templates - Lista Oczekujących

## 1. Email Potwierdzenia Zapisu

**Temat:** Zapisano na listę oczekujących - Pure Shape Studio

**Treść:**
```
Cześć [IMIĘ]!

Dziękujemy za zapisanie się na listę oczekujących Pure Shape Studio.

Twoje preferowane dni:
• [DZIEŃ_1 - np. Poniedziałek]
• [DZIEŃ_2 - np. Środa]
• [DZIEŃ_3 - np. Piątek]

Twoje preferowane godziny:
• [GODZINA_1]
• [GODZINA_2]
• [GODZINA_3]
...

Powiadomimy Cię emailem, gdy zwolni się miejsce w jednym z wybranych dni i godzin.

W międzyczasie możesz:
→ Sprawdzić nasze social media: instagram.com/gosia.pilinska
→ Zobaczyć grafik: app.fitssey.com/total-training

Pozdrawiamy,
Pure Shape Studio Team

---
Pure Shape Studio
ul. Kościuszki 11A, Bibice
Tel: 698 190 880
```

---

## 2. Email z Powiadomieniem o Wolnym Miejscu

**Temat:** 🎉 Wolne miejsce w Pure Shape Studio!

**Treść:**
```
Świetne wiadomości, [IMIĘ]!

Właśnie zwolniło się miejsce na zajęcia:

📅 Data: [DATA - np. Piątek, 10 stycznia 2026]
🕐 Godzina: [GODZINA - np. 17:00]

Nie czekaj - miejsca szybko się zapełniają!

[ZAREZERWUJ TERAZ] → app.fitssey.com/total-training

Zajęcia prowadzi: [INSTRUKTOR]
Typ zajęć: [TYP - np. Pilates na reformerze]

---

Pozdrawiamy,
Pure Shape Studio Team

Pure Shape Studio
ul. Kościuszki 11A, Bibice | Tel: 698 190 880

PS: To powiadomienie zostało wysłane, ponieważ zapisałeś się na listę oczekujących
dla tej godziny. Jeśli nie jesteś już zainteresowany, możesz [wypisać się].
```

---

## 3. Email Przypomnienia (opcjonalny)

**Temat:** Nadal czekasz na miejsce? - Pure Shape Studio

**Treść:**
```
Cześć [IMIĘ]!

Jesteś na naszej liście oczekujących od [LICZBA_DNI] dni i nie wysłaliśmy Ci 
jeszcze żadnego powiadomienia o wolnym miejscu.

Twoje preferowane godziny: [LISTA_GODZIN]

Co możesz zrobić:
• ✅ Sprawdź dostępność na app.fitssey.com/total-training
• ✅ Dodaj więcej godzin do swoich preferencji
• ✅ Skontaktuj się z nami bezpośrednio: 698 190 880

Dziękujemy za cierpliwość!

Pozdrawiamy,
Pure Shape Studio Team
```

---

## 4. Email Cotygodniowy Digest (opcjonalny)

**Temat:** Twoja lista oczekujących - podsumowanie tygodnia

**Treść:**
```
Cześć [IMIĘ]!

Szybkie podsumowanie z ostatniego tygodnia:

🔔 Wysłanych powiadomień: [LICZBA]
📊 Wolnych miejsc w tym tygodniu: [LICZBA]
⏰ Najbardziej popularne godziny: [TOP_3_GODZINY]

Twoje preferencje: [LISTA_GODZIN]

💡 Wskazówka: Więcej godzin = większa szansa na powiadomienie!

[ZAKTUALIZUJ PREFERENCJE]

Pozdrawiamy,
Pure Shape Studio Team
```

---

## 5. Email Rezygnacji z Listy

**Temat:** Potwierdzenie wypisania - Pure Shape Studio

**Treść:**
```
Cześć [IMIĘ],

Potwierdzamy, że zostałeś/aś wypisany/a z listy oczekujących.

Nie będziesz już otrzymywać powiadomień o wolnych miejscach.

Zmiana zdania? Możesz zapisać się ponownie:
→ fitness-total.training/#lista-oczekujacych

Dziękujemy za zainteresowanie naszym studiem!

Pozdrawiamy,
Pure Shape Studio Team
```

---

## Wskazówki do Wysyłania Emaili

### Timing:
- **Powiadomienie o wolnym miejscu:** Natychmiast (do 5 min)
- **Potwierdzenie zapisu:** W ciągu 1-2 minut
- **Przypomnienie:** Co 2 tygodnie (opcjonalnie)
- **Digest:** Każdy poniedziałek rano (opcjonalnie)

### Dobre praktyki:
1. ✅ Personalizuj imię
2. ✅ Używaj emoji (🎉📅🕐) dla lepszej czytelności
3. ✅ Krótkie i zwięzłe wiadomości
4. ✅ Wyraźny Call-to-Action (CTA)
5. ✅ Opcja wypisania się (GDPR)
6. ✅ Mobile-friendly (krótkie paragrafy)

### Częstotliwość:
- Max 1 powiadomienie dziennie na osobę
- Jeśli 3+ wolne miejsca w tym samym czasie → 1 email ze wszystkimi
- Digest nie częściej niż raz w tygodniu

### A/B Testing (zaawansowane):
Test różne warianty:
- Temat z emoji vs bez
- Krótki vs szczegółowy opis
- Różne CTA: "Zarezerwuj teraz" vs "Zobacz dostępność"

---

## Techniczne Szczegóły

### HTML Email Template (dla lepszego wyglądu):

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  
  <!-- Header -->
  <div style="background-color: #2c3e50; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
    <h1 style="color: white; margin: 0;">Pure Shape Studio</h1>
    <p style="color: #ecf0f1; margin: 5px 0; font-style: italic;">fitness&pilates studio</p>
  </div>
  
  <!-- Content -->
  <div style="background-color: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px;">
    <h2 style="color: #ff6b6b;">🎉 Wolne miejsce!</h2>
    
    <p>Świetne wiadomości, <strong>[IMIĘ]</strong>!</p>
    
    <div style="background-color: white; padding: 20px; border-left: 4px solid #ff6b6b; margin: 20px 0; border-radius: 4px;">
      <p style="margin: 5px 0;"><strong>📅 Data:</strong> [DATA]</p>
      <p style="margin: 5px 0;"><strong>🕐 Godzina:</strong> [GODZINA]</p>
    </div>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="https://app.fitssey.com/total-training" 
         style="display: inline-block; background-color: #ff6b6b; color: white; padding: 15px 40px; text-decoration: none; border-radius: 30px; font-weight: bold; font-size: 16px;">
        Zarezerwuj teraz
      </a>
    </div>
    
    <p>Pozdrawiamy,<br><strong>Pure Shape Studio Team</strong></p>
  </div>
  
  <!-- Footer -->
  <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
    <p>ul. Kościuszki 11A, Bibice<br>Tel: 698 190 880</p>
    <p>
      <a href="[UNSUBSCRIBE_LINK]" style="color: #999;">Wypisz się z listy oczekujących</a>
    </p>
  </div>
  
</body>
</html>
```

### Variables do zastąpienia:
- `[IMIĘ]` - firstName
- `[NAZWISKO]` - lastName
- `[DATA]` - formatted date
- `[GODZINA]` - time slot
- `[DZIEŃ_1]`, `[DZIEŃ_2]` - days of week
- `[LISTA_GODZIN]` - comma separated hours
- `[LISTA_DNI]` - comma separated days
- `[LICZBA_DNI]` - days on waitlist
- `[INSTRUKTOR]` - instructor name
- `[TYP]` - class type
- `[UNSUBSCRIBE_LINK]` - unsubscribe URL
