class Api {
  constructor(url) {
    this.url = url;
  }

  async get() {
    const httpResponse = await fetch(this.url);
    const httpData = await httpResponse.json();
    return httpData;
  }
}
// on va chercher les donnees dans le json

class PhotographerCard {
  // "this" grosso modo correspond au nom de la classe (ici PhotographerCard)
  constructor(card) {
    this.card = card;
    // des qu'on crée un constructor, on utilisera this
  }

  createPhotographerCard() {
    const wrapper = document.querySelector('.photographer-wrapper');

    const photographerCardWrapper = document.createElement('div');
    photographerCardWrapper.className = 'photographer-card-wrapper center focussable';
    /**
     * CARD PORTRAIT
     */
    // Ici le système permettant d'afficher l'id du photographe dans l'url
    const photographerPortrait = document.createElement('a');
    photographerPortrait.setAttribute('href', 'photographer.html?id=' + this.card.id);
    // photographer.html?id=xxx
    photographerPortrait.className = 'photographer-portrait center';

    const photographerPicture = document.createElement('img');
    photographerPicture.src = '/assets/photographers/Photographers ID Photos/' + this.card.portrait;
    photographerPicture.setAttribute('alt', this.card.name);

    const photographerName = document.createElement('h2');
    photographerName.className = 'photographer-name';
    photographerName.appendChild(document.createTextNode(this.card.name));

    photographerPortrait.appendChild(photographerPicture);
    photographerPortrait.appendChild(photographerName);
    /**
     * CARD INFO
     */
    const photographerInfo = document.createElement('div');
    photographerInfo.className = 'photographer-info center';

    const photographerLocation = document.createElement('div');
    photographerLocation.className = 'photographer-location';

    const photographerCity = document.createElement('div');
    photographerCity.appendChild(document.createTextNode(this.card.city));

    const photographerCountry = document.createElement('div');
    photographerCountry.appendChild(document.createTextNode(', ' + this.card.country));

    const photographerTagline = document.createElement('div');
    photographerTagline.className = 'photographer-tagline';
    photographerTagline.appendChild(document.createTextNode(this.card.tagline));

    const photographerPrice = document.createElement('div');
    photographerPrice.className = 'photographer-price';
    photographerPrice.appendChild(document.createTextNode(this.card.price + ' €/jour'));
    /**
     * CARD APPENDS
     */
    wrapper.appendChild(photographerCardWrapper);

    photographerCardWrapper.appendChild(photographerPortrait);
    photographerCardWrapper.appendChild(photographerInfo);

    photographerInfo.appendChild(photographerLocation);
    photographerLocation.appendChild(photographerCity);
    photographerLocation.appendChild(photographerCountry);

    photographerInfo.appendChild(photographerTagline);
    photographerInfo.appendChild(photographerPrice);
  }
}

class App {
  constructor() {
    this.photographerCardApi = new Api('/data/photographers.json');
  }

  async main() {
    const json = await this.photographerCardApi.get();
    for (const card of json.photographers) {
      // json.photographers = json.la clé dans le json ici "photographers"
      const template = new PhotographerCard(card);
      template.createPhotographerCard();
    }

    // ci-dessous une autre méthode au lieu de For of pour faire la boucle :
    // cards.forEach((card) => {
    //   const template = new PhotographerCard(card);
    //   template.createPhotographerCard();
    // });
  }
}

document.addEventListener('keydown', function (event) {
  if (event.key === 'Tab') {
    //add all elements we want to include in our selection
    var focussableElements =
      'a:not([disabled]), button:not([disabled]), input[type=text]:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])';
    if (document.activeElement && document.activeElement.form) {
      var focussable = Array.prototype.filter.call(
        document.activeElement.form.querySelectorAll(focussableElements),
        function (element) {
          //check for visibility while always include the current activeElement
          return element.offsetWidth > 0 || element.offsetHeight > 0 || element === document.activeElement;
        }
      );
      var index = focussable.indexOf(document.activeElement);
      if (index > -1) {
        var nextElement = focussable[index + 1] || focussable[0];
        nextElement.focus();
      }
    }
  }
});

const app = new App();
app.main();

// new App().main()
