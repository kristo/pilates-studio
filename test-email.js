// Test Email Sender
// Prosty skrypt do testowania wysyłki emaili

const nodemailer = require('nodemailer');
require('dotenv').config();

// Konfiguracja
const testRecipient = process.env.TEST_EMAIL || 'your-email@example.com';

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

// Test emails
const testEmails = {
  confirmation: {
    subject: 'Zapisano na listę oczekujących - Pure Shape Studio',
    html: `
      <h2>Cześć Jan!</h2>
      <p>Dziękujemy za zapisanie się na listę oczekujących Pure Shape Studio.</p>
      <p><strong>Twoje preferowane dni:</strong></p>
      <ul>
        <li>Poniedziałek</li>
        <li>Środa</li>
        <li>Piątek</li>
      </ul>
      <p><strong>Twoje preferowane godziny:</strong></p>
      <ul>
        <li>09:00</li>
        <li>10:00</li>
        <li>17:00</li>
      </ul>
      <p>Powiadomimy Cię emailem, gdy zwolni się miejsce w jednym z wybranych dni i godzin.</p>
      <br>
      <p>Pozdrawiamy,<br>Pure Shape Studio Team</p>
    `
  },
  
  slotAvailable: {
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
          
          <p>Świetne wiadomości, <strong>Jan</strong>!</p>
          
          <p>Właśnie zwolniło się miejsce na zajęcia:</p>
          
          <div style="background-color: white; padding: 20px; border-left: 4px solid #ff6b6b; margin: 20px 0; border-radius: 4px;">
            <p style="margin: 5px 0;"><strong>📅 Data:</strong> Piątek, 10 stycznia 2026</p>
            <p style="margin: 5px 0;"><strong>🕐 Godzina:</strong> 17:00</p>
            <p style="margin: 5px 0;"><strong>👩‍🏫 Instruktor:</strong> Małgorzata Pilińska-Babula</p>
            <p style="margin: 5px 0;"><strong>🧘 Typ:</strong> Pilates na reformerze</p>
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
            To powiadomienie zostało wysłane, ponieważ zapisałeś się na listę oczekujących dla tej godziny.
          </p>
        </div>
        
      </body>
      </html>
    `
  }
};

// Test function
async function testEmail(type) {
  const emailData = testEmails[type];
  
  if (!emailData) {
    console.error(`❌ Unknown email type: ${type}`);
    console.log('Available types:', Object.keys(testEmails).join(', '));
    return;
  }

  const mailOptions = {
    from: process.env.EMAIL_FROM || 'noreply@fitness-total.training',
    to: testRecipient,
    subject: emailData.subject,
    html: emailData.html
  };

  console.log(`📧 Sending test email: ${type}`);
  console.log(`📬 To: ${testRecipient}`);
  console.log(`📝 Subject: ${emailData.subject}`);

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully!');
    console.log('📨 Message ID:', info.messageId);
    console.log('\nCheck your inbox:', testRecipient);
  } catch (error) {
    console.error('❌ Error sending email:', error.message);
    console.log('\n📋 Troubleshooting:');
    console.log('1. Check your .env file settings');
    console.log('2. Verify SMTP credentials');
    console.log('3. Check if less secure apps are enabled (Gmail)');
    console.log('4. Try using an App Password (Gmail)');
  }
}

// CLI
const emailType = process.argv[2] || 'slotAvailable';

console.log('🧪 Email Test Script');
console.log('='.repeat(50));
console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
console.log(`SMTP Host: ${process.env.SMTP_HOST || 'NOT SET'}`);
console.log(`SMTP User: ${process.env.SMTP_USER || 'NOT SET'}`);
console.log('='.repeat(50));
console.log('');

testEmail(emailType)
  .then(() => {
    console.log('\n✨ Test completed!');
    process.exit(0);
  })
  .catch(err => {
    console.error('\n💥 Test failed:', err);
    process.exit(1);
  });

// Usage examples:
// node test-email.js                    // Tests slotAvailable email
// node test-email.js confirmation       // Tests confirmation email
// TEST_EMAIL=test@example.com node test-email.js  // Override recipient
