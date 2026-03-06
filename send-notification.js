#!/usr/bin/env node
// Skrypt do ręcznego wysyłania powiadomień o wolnych miejscach
// Użycie: node send-notification.js

const nodemailer = require('nodemailer');
const readline = require('readline');
require('dotenv').config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Email transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

function question(prompt) {
  return new Promise(resolve => {
    rl.question(prompt, resolve);
  });
}

async function sendNotification(recipientEmail, recipientName, dayOfWeek, date, hour) {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: recipientEmail,
    subject: '🎉 Wolne miejsce w Pure Shape Studio!',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
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
          
          <p>Świetne wiadomości, <strong>${recipientName}</strong>!</p>
          
          <p>Właśnie zwolniło się miejsce na zajęcia:</p>
          
          <div style="background-color: white; padding: 20px; border-left: 4px solid #ff6b6b; margin: 20px 0; border-radius: 4px;">
            <p style="margin: 5px 0;"><strong>📅 Dzień:</strong> ${dayOfWeek}</p>
            <p style="margin: 5px 0;"><strong>📆 Data:</strong> ${date}</p>
            <p style="margin: 5px 0;"><strong>🕐 Godzina:</strong> ${hour}</p>
          </div>
          
          <p><strong>Nie czekaj - miejsca szybko się zapełniają!</strong></p>
          
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
          <p style="margin-top: 15px;">
            <a href="https://instagram.com/gosia.pilinska" style="color: #999; text-decoration: none; margin: 0 10px;">Instagram</a>
            <span style="color: #ccc;">|</span>
            <a href="https://fitness-total.training" style="color: #999; text-decoration: none; margin: 0 10px;">Strona WWW</a>
          </p>
          <p style="margin-top: 15px; font-size: 11px; color: #999;">
            To powiadomienie zostało wysłane, ponieważ zapisałeś się na listę oczekujących.
          </p>
        </div>
        
      </body>
      </html>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`   ✅ Wysłano do: ${recipientEmail}`);
    return true;
  } catch (error) {
    console.error(`   ❌ Błąd wysyłki do ${recipientEmail}:`, error.message);
    return false;
  }
}

async function main() {
  console.log('═══════════════════════════════════════════════════════');
  console.log('  📧 Pure Shape Studio - Wysyłka Powiadomień');
  console.log('═══════════════════════════════════════════════════════\n');

  // Check configuration
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error('❌ Błąd: Brak konfiguracji w pliku .env');
    console.log('\nUpewnij się, że plik .env zawiera:');
    console.log('  SMTP_HOST=smtp.gmail.com');
    console.log('  SMTP_PORT=587');
    console.log('  SMTP_USER=twoj-email@gmail.com');
    console.log('  SMTP_PASS=twoje-haslo-aplikacji');
    console.log('  EMAIL_FROM=twoj-email@gmail.com\n');
    process.exit(1);
  }

  console.log('📋 Informacje o odwołaniu:\n');

  const dayOfWeek = await question('Dzień tygodnia (np. Piątek): ');
  const date = await question('Data (np. 10 stycznia 2026): ');
  const hour = await question('Godzina (np. 17:00): ');

  console.log('\n👥 Dane odbiorcy (z listy oczekujących w Formspree):\n');
  
  const recipients = [];
  let addMore = true;
  let count = 1;

  while (addMore) {
    console.log(`\nOsoba #${count}:`);
    const name = await question('  Imię: ');
    if (!name) break;
    
    const email = await question('  Email: ');
    if (!email) break;

    recipients.push({ name, email });
    count++;

    const more = await question('\nDodać kolejną osobę? (t/n): ');
    addMore = more.toLowerCase() === 't' || more.toLowerCase() === 'tak';
  }

  if (recipients.length === 0) {
    console.log('\n⚠️  Brak odbiorców. Anulowano.');
    rl.close();
    return;
  }

  console.log('\n═══════════════════════════════════════════════════════');
  console.log('📝 Podsumowanie:');
  console.log('═══════════════════════════════════════════════════════');
  console.log(`Dzień: ${dayOfWeek}`);
  console.log(`Data: ${date}`);
  console.log(`Godzina: ${hour}`);
  console.log(`Liczba odbiorców: ${recipients.length}`);
  console.log('\nOdbiorcy:');
  recipients.forEach((r, i) => {
    console.log(`  ${i + 1}. ${r.name} (${r.email})`);
  });
  console.log('═══════════════════════════════════════════════════════\n');

  const confirm = await question('Wysłać powiadomienia? (t/n): ');
  
  if (confirm.toLowerCase() !== 't' && confirm.toLowerCase() !== 'tak') {
    console.log('\n⚠️  Anulowano wysyłkę.');
    rl.close();
    return;
  }

  console.log('\n📤 Wysyłam powiadomienia...\n');

  let success = 0;
  let failed = 0;

  for (const recipient of recipients) {
    const sent = await sendNotification(
      recipient.email,
      recipient.name,
      dayOfWeek,
      date,
      hour
    );
    
    if (sent) success++;
    else failed++;

    // Small delay between emails
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log('\n═══════════════════════════════════════════════════════');
  console.log('✅ Zakończono!');
  console.log(`   Wysłano: ${success}`);
  if (failed > 0) console.log(`   Błędy: ${failed}`);
  console.log('═══════════════════════════════════════════════════════\n');

  rl.close();
}

main().catch(err => {
  console.error('\n💥 Błąd:', err);
  rl.close();
  process.exit(1);
});
