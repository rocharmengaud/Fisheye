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
console.log();

// recup id url
// recup json
// créer la page en affichant les données du json correspondant a l'id
