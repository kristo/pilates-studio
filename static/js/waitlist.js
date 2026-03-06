// Waitlist Form Handler
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('waitlistForm');
  const successMessage = document.getElementById('successMessage');
  const errorMessage = document.getElementById('errorMessage');

  if (!form) return;

  // Handle "Dowolny dzień" checkbox
  const anyDayCheckbox = document.getElementById('day-any');
  const dayCheckboxes = document.querySelectorAll('input[name="days"]:not(#day-any)');

  if (anyDayCheckbox) {
    anyDayCheckbox.addEventListener('change', function() {
      if (this.checked) {
        // Uncheck all other day checkboxes when "Dowolny" is selected
        dayCheckboxes.forEach(cb => {
          cb.checked = false;
        });
      }
    });

    // Uncheck "Dowolny" when any specific day is selected
    dayCheckboxes.forEach(cb => {
      cb.addEventListener('change', function() {
        if (this.checked && anyDayCheckbox.checked) {
          anyDayCheckbox.checked = false;
        }
      });
    });
  }

  form.addEventListener('submit', async function(e) {
    e.preventDefault();

    // Hide previous messages
    successMessage.classList.add('hidden');
    errorMessage.classList.add('hidden');

    // Get form data
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    
    // Get selected days
    const dayCheckboxes = document.querySelectorAll('input[name="days"]:checked');
    const selectedDays = Array.from(dayCheckboxes).map(cb => cb.value);
    
    // Get selected hours
    const hourCheckboxes = document.querySelectorAll('input[name="hours"]:checked');
    const selectedHours = Array.from(hourCheckboxes).map(cb => cb.value);

    // Validation
    if (!firstName || !lastName || !email) {
      errorMessage.querySelector('p:last-child').textContent = 'Proszę wypełnić wszystkie wymagane pola.';
      errorMessage.classList.remove('hidden');
      return;
    }

    if (selectedDays.length === 0) {
      errorMessage.querySelector('p:last-child').textContent = 'Proszę wybrać przynajmniej jeden dzień tygodnia.';
      errorMessage.classList.remove('hidden');
      return;
    }

    if (selectedHours.length === 0) {
      errorMessage.querySelector('p:last-child').textContent = 'Proszę wybrać przynajmniej jedną godzinę.';
      errorMessage.classList.remove('hidden');
      return;
    }

    // Prepare data
    const formData = {
      firstName,
      lastName,
      email,
      days: selectedDays,
      hours: selectedHours,
      timestamp: new Date().toISOString()
    };

    try {
      // Option 1: Using Netlify Forms (recommended if hosted on Netlify)
      // Uncomment this section if you're using Netlify
      /*
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'waitlist',
          ...formData,
          days: selectedDays.join(', '),
          hours: selectedHours.join(', ')
        }).toString()
      });
      */

      // Option 2: Using Formspree (easy setup)
      // Replace YOUR_FORM_ID with your Formspree form ID
      const response = await fetch('https://formspree.io/f/xlgdzqzz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      // Option 3: Using your own backend API
      // Uncomment and modify this if you have your own backend
      /*
      const response = await fetch('YOUR_API_ENDPOINT/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      */

      if (response.ok) {
        // Show success message
        successMessage.classList.remove('hidden');
        
        // Reset form
        form.reset();
        
        // Uncheck all checkboxes
        dayCheckboxes.forEach(cb => cb.checked = false);
        hourCheckboxes.forEach(cb => cb.checked = false);
        
        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        throw new Error('Server error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      errorMessage.classList.remove('hidden');
      errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
});
