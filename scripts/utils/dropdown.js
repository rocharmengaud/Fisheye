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

    let mediacardList = Array.from(document.querySelectorAll('.media-card'));
    console.log(mediacardList);

    const dataLikes = document.querySelectorAll('[data-likes]');
    console.log(dataLikes);

    switch (textboxValue) {
      case 'Popularité':
        mediacardList.sort(function (a, b) {
          // console.log(b.dataLikes);
          // return b.getAttribute('data-likes')('Popularité') - b.getAttribute('data-likes')('Popularité');
        });
        break;
      case 'Date':
        break;
      case 'Titre':
        break;
      default:
        console.log('Should never happen');
    }
  });
});
