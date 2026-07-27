// Mobile nav toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('nav.main');
  if(toggle && nav){
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
  }

  // Treatment page tabs
  const tabBtns = document.querySelectorAll('.tab-btn');
  if(tabBtns.length){
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(btn.dataset.tab).classList.add('active');
        window.scrollTo({ top: document.querySelector('.tabs').offsetTop - 90, behavior: 'smooth' });
      });
    });
    // Deep link support: treatments.html#tab-offers opens that tab directly
    const hash = location.hash.replace('#','');
    if(hash){
      const target = document.querySelector(`.tab-btn[data-tab="${hash}"]`);
      if(target) target.click();
    }
  }

  // Booking form: live count of selected treatments
  const treatmentChecks = document.getElementById('treatmentChecks');
  const selectedCount = document.getElementById('selectedCount');
  function updateSelectedCount(){
    if(!treatmentChecks || !selectedCount) return;
    const checked = treatmentChecks.querySelectorAll('input[type="checkbox"]:checked');
    selectedCount.textContent = checked.length === 0
      ? 'No treatments selected yet'
      : `${checked.length} treatment${checked.length > 1 ? 's' : ''} selected`;
  }
  if(treatmentChecks){
    treatmentChecks.addEventListener('change', updateSelectedCount);
  }

  // Booking form -> mailto
  const bookForm = document.getElementById('bookingForm');
  if(bookForm){
    bookForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('b-name').value;
      const email = document.getElementById('b-email').value;
      const phone = document.getElementById('b-phone').value;
      const checked = Array.from(document.querySelectorAll('#treatmentChecks input[type="checkbox"]:checked')).map(c => c.value);
      const treatment = checked.length ? checked.join(', ') : 'Not specified';
      const date = document.getElementById('b-date').value;
      const time = document.getElementById('b-time').value;
      const notes = document.getElementById('b-notes').value;

      const subject = encodeURIComponent(`Appointment Request — ${checked[0] || 'danA Wellness'}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nRequested Treatment(s): ${treatment}\nPreferred Date: ${date}\nPreferred Time: ${time}\nNotes: ${notes}`
      );
      window.location.href = `mailto:contact@danawellness.com?subject=${subject}&body=${body}`;

      const success = document.getElementById('bookSuccess');
      if(success){ success.classList.add('show'); }
      bookForm.reset();
      updateSelectedCount();
    });
  }

  // Contact form -> mailto
  const contactForm = document.getElementById('contactForm');
  if(contactForm){
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('c-name').value;
      const email = document.getElementById('c-email').value;
      const message = document.getElementById('c-message').value;

      const subject = encodeURIComponent(`Message from ${name} — danA Wellness Website`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
      window.location.href = `mailto:contact@danawellness.com?subject=${subject}&body=${body}`;

      const success = document.getElementById('contactSuccess');
      if(success){ success.classList.add('show'); }
      contactForm.reset();
    });
  }
});
