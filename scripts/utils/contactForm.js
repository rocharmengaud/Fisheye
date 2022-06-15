function displayModal() {
  const modal = document.querySelector('#contact_modal');
  const overlay = document.querySelector('.overlay-modal');
  modal.style.display = 'block';
  overlay.style.display = 'block';
}

function closeModal() {
  const modal = document.querySelector('#contact_modal');
  const overlay = document.querySelector('.overlay-modal');
  modal.style.display = 'none';
  overlay.style.display = 'none';
}
