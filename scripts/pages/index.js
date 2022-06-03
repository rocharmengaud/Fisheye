class Api {
  constructor(url) {
    this._url = url;
  }

  async get() {
    return fetch(this._url)
      .then((res) => res.json())
      .then((res) => res.photographers)
      .catch((err) => console.log('an error occurs', err));
  }
}
// on va chercher les donnees dans le json

class MovieCard {
  constructor(movie) {
    this._movie = movie;
    // des qu'on crée un constructor, on utilisera this
  }

  createMovieCard() {
    const $wrapper = document.querySelector('.photographer-wrapper');

    const movieCard =
      `<h3>` +
      this._movie.name +
      `</h3><img src="/assets/photographers/Photographers ID Photos/` +
      this._movie.portrait +
      `" />`;

    $wrapper.innerHTML += movieCard;
  }
}

class App {
  constructor() {
    this.moviesApi = new Api('/data/photographers.json');
    // les classes demarrent toujours avec une majuscule (ici MovieApi)
  }

  async main() {
    const movies = await this.moviesApi.get();

    movies.forEach((movie) => {
      const Template = new MovieCard(movie);
      Template.createMovieCard();
    });
  }
}

const app = new App();
app.main();
