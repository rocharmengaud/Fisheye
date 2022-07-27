const dropDown = document.querySelector('.dropdown');
const textBox = document.querySelector('.textBox');

// On ajoute la classe active quand on click sur le dropdown menu
dropDown.onclick = function () {
  dropDown.classList.toggle('active');
};

// L'option du dropdown selectionnée reste affichée
Array.from(document.querySelectorAll('.filtreMedia')).forEach(function (element) {
  element.addEventListener('click', (event) => {
    textBox.value = event.target.getAttribute('data-sort');
    const textboxValue = event.target.getAttribute('data-sort');

    const mediacardList = Array.from(document.querySelectorAll('.media-card'));

    const mediaWrapper = document.querySelector('.photograph-media-wrapper');

    switch (textboxValue) {
      case 'Popularité':
        const dataLikes = mediacardList.sort((a, b) => {
          return b.dataset.likes - a.dataset.likes;
        });
        // innerhtml vide pour vider le container des medias avant le tri
        mediaWrapper.innerHTML = '';

        dataLikes.forEach((element) => {
          mediaWrapper.appendChild(element);
        });
        break;
      case 'Date':
        const dataDate = mediacardList.sort((a, b) => {
          return new Date(b.dataset.date) - new Date(a.dataset.date);
        });
        mediaWrapper.innerHTML = '';

        dataDate.forEach((element) => {
          mediaWrapper.appendChild(element);
        });
        break;
      case 'Titre':
        const dataName = mediacardList.sort((a, b) => {
          return a.dataset.name.localeCompare(b.dataset.name);
        });
        mediaWrapper.innerHTML = '';

        dataName.forEach((element) => {
          mediaWrapper.appendChild(element);
        });
        break;
      default:
        console.log('Should never happen');
    }
  });
});

dropDown.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    textBox.click();
  }
});

Array.from(document.querySelectorAll('.filtreMedia')).forEach(function (element) {
  element.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      element.click();
    }
  });
});
