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
  constructor(card) {
    this.card = card;
    // des qu'on crée un constructor, on utilisera this
  }

  createPhotographerCard() {
    const wrapper = document.querySelector('.photographer-wrapper');

    const photographerCardWrapper = document.createElement('div');
    photographerCardWrapper.className = 'photographer-card-wrapper';

    /**
     * CARD PORTRAIT
     */
    const photographerPicture = document.createElement('img');
    photographerPicture.src =
      '/assets/photographers/Photographers ID Photos/' + this.card.portrait;

    const photographerName = document.createElement('h2');
    photographerName.appendChild(document.createTextNode(this.card.name));

    const photographerPortrait = document.createElement('div');
    photographerPortrait.className = 'photographer-portrait';
    photographerPortrait.appendChild(photographerPicture);
    photographerPortrait.appendChild(photographerName);
    /**
     * CARD INFO
     */
    const photographerInfo = document.createElement('div');
    photographerInfo.className = 'photographer-info';
    const photographerLocation = document.createElement('h1');
    photographerLocation.appendChild(document.createTextNode(this.card.city));

    // les append font apparaitre la div et sa classe
    photographerCardWrapper.appendChild(photographerPortrait);
    photographerInfo.appendChild(photographerLocation);
    photographerCardWrapper.appendChild(photographerInfo);
    wrapper.appendChild(photographerCardWrapper);
  }
}

class App {
  constructor() {
    this.photographerCardApi = new Api('/data/photographers.json');
  }

  async main() {
    const { photographers: cards } = await this.photographerCardApi.get();
    for (const card of cards) {
      const template = new PhotographerCard(card);
      template.createPhotographerCard();
    }

    // cards.forEach((card) => {
    //   const template = new PhotographerCard(card);
    //   template.createPhotographerCard();
    // });
  }
}

const app = new App();
app.main();

// new App().main()
