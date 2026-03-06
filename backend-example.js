// Example Node.js Backend for Waitlist Management
// This is a complete backend example with email notifications

const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Schema
const waitlistSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  days: [{ type: String, required: true }], // Days of week
  hours: [{ type: String, required: true }],
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  notificationsSent: [{
    date: Date,
    dayOfWeek: String,
    hour: String,
    sentAt: Date
  }]
});

const Waitlist = mongoose.model('Waitlist', waitlistSchema);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Email configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // e.g., smtp.gmail.com
  port: process.env.SMTP_PORT, // e.g., 587
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Routes

// Add to waitlist
app.post('/api/waitlist', async (req, res) => {
  try {
    const { firstName, lastName, email, days, hours } = req.body;

    // Validation
    if (!firstName || !lastName || !email || !days || days.length === 0 || !hours || hours.length === 0) {
      return res.status(400).json({ 
        error: 'All fields are required' 
      });
    }

    // Check if email already exists
    const existing = await Waitlist.findOne({ email, active: true });
    if (existing) {
      // Update days and hours instead of creating duplicate
      existing.days = [...new Set([...existing.days, ...days])];
      existing.hours = [...new Set([...existing.hours, ...hours])];
      await existing.save();
      
      return res.json({ 
        message: 'Waitlist updated successfully',
        id: existing._id 
      });
    }

    // Create new entry
    const waitlistEntry = new Waitlist({
      firstName,
      lastName,
      email,
      days,
      hours
    });

    await waitlistEntry.save();

    // Send confirmation email
    await sendConfirmationEmail(waitlistEntry);

    res.status(201).json({ 
      message: 'Added to waitlist successfully',
      id: waitlistEntry._id 
    });
  } catch (error) {
    console.error('Error adding to waitlist:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all waitlist entries (admin only - add authentication!)
app.get('/api/waitlist', async (req, res) => {
  try {
    const entries = await Waitlist.find({ active: true })
      .sort({ createdAt: -1 });
    res.json(entries);
  } catch (error) {
    console.error('Error fetching waitlist:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Remove from waitlist
app.delete('/api/waitlist/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const entry = await Waitlist.findById(id);
    
    if (!entry) {
      return res.status(404).json({ error: 'Entry not found' });
    }

    entry.active = false;
    await entry.save();

    res.json({ message: 'Removed from waitlist' });
  } catch (error) {
    console.error('Error removing from waitlist:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Notify about available slot (called when cancellation happens)
app.post('/api/notify-available-slot', async (req, res) => {
  try {
    const { date, hour } = req.body;
    
    // Get day of week from date
    const dateObj = new Date(date);
    const daysOfWeek = ['niedziela', 'poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota'];
    const dayOfWeek = daysOfWeek[dateObj.getDay()];

    // Find all people interested in this hour and day
    const interestedPeople = await Waitlist.find({
      active: true,
      hours: hour,
      $or: [
        { days: dayOfWeek },
        { days: 'dowolny' }
      ]
    });

    console.log(`Found ${interestedPeople.length} people interested in ${dayOfWeek} at ${hour}`);

    // Send notifications
    const notifications = interestedPeople.map(async (person) => {
      await sendSlotAvailableEmail(person, date, hour, dayOfWeek);
      
      // Record notification
      person.notificationsSent.push({
        date: new Date(date),
        dayOfWeek,
        hour,
        sentAt: new Date()
      });
      await person.save();
    });

    await Promise.all(notifications);

    res.json({ 
      message: `Notified ${interestedPeople.length} people`,
      count: interestedPeople.length,
      dayOfWeek
    });
  } catch (error) {
    console.error('Error notifying people:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Email functions
async function sendConfirmationEmail(person) {
  const mailOptions = {
    from: process.env.EMAIL_FROM || 'noreply@fitness-total.training',
    to: person.email,
    subject: 'Zapisano na listę oczekujących - Pure Shape Studio',
    html: `
      <h2>Cześć ${person.firstName}!</h2>
      <p>Dziękujemy za zapisanie się na listę oczekujących Pure Shape Studio.</p>
      <p><strong>Twoje preferowane dni:</strong></p>
      <ul>
        ${person.days.map(day => `<li>${day.charAt(0).toUpperCase() + day.slice(1)}</li>`).join('')}
      </ul>
      <p><strong>Twoje preferowane godziny:</strong></p>
      <ul>
        ${person.hours.map(hour => `<li>${hour}</li>`).join('')}
      </ul>
      <p>Powiadomimy Cię emailem, gdy zwolni się miejsce w jednym z wybranych dni i godzin.</p>
      <br>
      <p>Pozdrawiamy,<br>Pure Shape Studio Team</p>
      <hr>
      <p style="font-size: 12px; color: #666;">
        Nie chcesz już otrzymywać powiadomień? 
        <a href="${process.env.APP_URL}/unsubscribe/${person._id}">Wypisz się</a>
      </p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Confirmation email sent to ${person.email}`);
  } catch (error) {
    console.error('Error sending confirmation email:', error);
  }
}

async function sendSlotAvailableEmail(person, date, hour, dayOfWeek) {
  const formattedDate = new Date(date).toLocaleDateString('pl-PL', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM || 'noreply@fitness-total.training',
    to: person.email,
    subject: '🎉 Wolne miejsce w Pure Shape Studio!',
    html: `
      <h2>Świetne wiadomości, ${person.firstName}!</h2>
      <p>Właśnie zwolniło się miejsce na zajęcia:</p>
      <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 5px 0;"><strong>📅 Data:</strong> ${formattedDate}</p>
        <p style="margin: 5px 0;"><strong>🕐 Godzina:</strong> ${hour}</p>
      </div>
      <p>Nie czekaj - miejsca szybko się zapełniają!</p>
      <a href="https://app.fitssey.com/total-training" 
         style="display: inline-block; background-color: #ff6b6b; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; margin: 20px 0;">
        Zarezerwuj teraz
      </a>
      <br><br>
      <p>Pozdrawiamy,<br>Pure Shape Studio Team</p>
      <hr>
      <p style="font-size: 12px; color: #666;">
        ul. Kościuszki 11A, Bibice<br>
        Tel: 698 190 880
      </p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Slot notification sent to ${person.email} for ${dayOfWeek} ${hour}`);
  } catch (error) {
    console.error('Error sending slot notification:', error);
  }
}

// Webhook endpoint for Fitssey (if they support it)
app.post('/api/webhook/fitssey-cancellation', async (req, res) => {
  try {
    // Verify webhook signature (implement based on Fitssey docs)
    // const signature = req.headers['x-fitssey-signature'];
    // if (!verifySignature(signature, req.body)) {
    //   return res.status(401).json({ error: 'Invalid signature' });
    // }

    const { event, data } = req.body;

    if (event === 'booking.cancelled') {
      const { date, time } = data;
      
      // Notify people on waitlist
      await fetch(`${process.env.APP_URL}/api/notify-available-slot`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date, hour: time })
      });
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Waitlist server running on port ${PORT}`);
  console.log(`📧 Email configured: ${!!process.env.SMTP_HOST}`);
  console.log(`💾 Database: ${mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'}`);
});

module.exports = app;
