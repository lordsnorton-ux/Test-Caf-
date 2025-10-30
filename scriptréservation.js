
document.addEventListener('DOMContentLoaded', () => {

  // === BOUTON COLORÉ ALÉATOIREMENT ===
  function randomColor() {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgb(${r}, ${g}, ${b})`;
  }

  setInterval(() => {
    const btn = document.querySelector('.btn');
    if (btn) {
      btn.style.background = randomColor();
      btn.style.outline = 'none';
      btn.style.border = 'none';
    }
  }, 2000);


  // === MENU HAMBURGER ===
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  }


  // === FORMULAIRE RÉSERVATION ===
  const form = document.querySelector('.reservation-form');
  const dateInput = document.getElementById('date');
  const timeInput = document.getElementById('time');
  const messageDiv = document.getElementById('formMessage');
  const dateError = document.getElementById('dateError');
  const timeError = document.getElementById('timeError');

  const today = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(today.getFullYear() + 1);

  dateInput.setAttribute('min', today.toISOString().split('T')[0]);
  dateInput.setAttribute('max', maxDate.toISOString().split('T')[0]);


  function validateDate() {
    const selectedDate = new Date(dateInput.value);
    if(!dateInput.value || selectedDate < today || selectedDate > maxDate){
      dateError.innerHTML = '<div class="message error">Date invalide (aujourd’hui ou dans l’année à venir).</div>';
      return false;
    } else {
      dateError.innerHTML = '';
      return true;
    }
  }

  function validateTime() {
    if(!timeInput.value){
      timeError.innerHTML = '<div class="message error">Veuillez saisir une heure.</div>';
      return false;
    }
    const selectedHour = parseInt(timeInput.value.split(':')[0]);
    if(selectedHour < 18 || selectedHour > 23){
      timeError.innerHTML = '<div class="message error">L’heure doit être comprise entre 18h00 et 23h00.</div>';
      return false;
    } else {
      timeError.innerHTML = '';
      return true;
    }
  }

  function validateRequiredField(field, fieldName){
    if(!field.value.trim()){
      messageDiv.innerHTML = `<div class="message error">Le champ ${fieldName} est obligatoire.</div>`;
      return false;
    }
    return true;
  }

  // Validation en temps réel
  dateInput.addEventListener('input', validateDate);
  timeInput.addEventListener('input', validateTime);
  form.name.addEventListener('input', () => { if(form.name.value.trim()) messageDiv.innerHTML = ''; });
  form.email.addEventListener('input', () => { if(form.email.value.trim()) messageDiv.innerHTML = ''; });
  form.phone.addEventListener('input', () => { if(form.phone.value.trim()) messageDiv.innerHTML = ''; });

  // Validation et envoi
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    messageDiv.innerHTML = '';

    const dateValid = validateDate();
    const timeValid = validateTime();
    const nameValid = validateRequiredField(form.name, "Nom");
    const emailValid = validateRequiredField(form.email, "Email");
    const phoneValid = validateRequiredField(form.phone, "Téléphone");

    if(!dateValid || !timeValid || !nameValid || !emailValid || !phoneValid) return;

    const formData = new FormData(form);
    const action = form.getAttribute('action');

    try {
      const response = await fetch(action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if(response.ok){
        messageDiv.innerHTML = '<div class="message success">Merci ! Votre réservation a été envoyée.</div>';
        form.reset();
      } else {
        messageDiv.innerHTML = '<div class="message error">Erreur lors de l’envoi. Veuillez réessayer.</div>';
      }
    } catch (error) {
      messageDiv.innerHTML = '<div class="message error">Erreur réseau. Vérifiez votre connexion.</div>';
    }
  });

});

