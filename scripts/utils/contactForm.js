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

const submit = document.querySelector('.submit_button');
const first = document.querySelector('#first');
const last = document.querySelector('#last');
const email = document.querySelector('#email');
const message = document.querySelector('#message');

submit.addEventListener('click', (event) => {
  closeModal();
  // console.log(first.value, last.value, email.value, message.value);
});
