const dropDown = document.querySelector('.dropdown');
const textBox = document.querySelector('.textBox');

// On ajoute la classe active quand on click sur le dropdown menu
dropDown.onclick = function () {
  dropDown.classList.toggle('active');
};

// L'option du dropdown selectionnée reste affichée
Array.from(document.querySelectorAll('.filtreMedia')).forEach(function (element) {
  element.addEventListener('click', (event) => {
    textBox.value = event.target.getAttribute('data-filtre');
  });
});
