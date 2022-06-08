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
class PhotographerProfile {
  constructor(profile) {
    this.profile = profile;
  }

  createPhotographerProfile() {
    const header = document.querySelector('.photograph-header');

    const profileName = document.createElement('div');
    profileName.className = 'profile-name';
    profileName.appendChild(document.createTextNode(this.profile.name));

    header.appendChild(profileName);
  }
}

class App {
  constructor() {
    this.photographerProfileApi = new Api('/data/photographers.json');
  }

  async main() {
    const json = await this.photographerProfileApi.get();
    const params = new URL(document.location).searchParams;
    const id = parseInt(params.get('id'));

    const photographersFilter = json.photographers.filter((element) => {
      // element ici n'est pas une propriété définie
      return element.id === id;
    });

    const template = new PhotographerProfile(photographersFilter[0]);
    template.createPhotographerProfile();
  }
}

const app = new App();
app.main();

// recup id url
// recup json
// créer la page en affichant les données du json correspondant a l'id
