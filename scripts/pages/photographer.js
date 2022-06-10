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

    const profile = document.createElement('div');
    profile.className = 'profile';

    const profileName = document.createElement('div');
    profileName.className = 'profile-name';
    profileName.appendChild(document.createTextNode(this.profile.name));

    const profileInfo = document.createElement('div');
    profileInfo.className = 'profile-info';

    const profileLocation = document.createElement('div');
    profileLocation.className = 'profile-location';

    const profileCity = document.createElement('div');
    profileCity.className = 'profile-city';
    profileCity.appendChild(document.createTextNode(this.profile.city));
    const profileCountry = document.createElement('div');
    profileCountry.className = 'profile-country';
    profileCountry.appendChild(document.createTextNode(', ' + this.profile.country));

    const profileTagline = document.createElement('div');
    profileTagline.className = 'profile-tagline';
    profileTagline.appendChild(document.createTextNode(this.profile.tagline));

    const profilePicture = document.createElement('img');
    profilePicture.className = 'profile-picture';
    profilePicture.src =
      '/assets/photographers/Photographers ID Photos/' + this.profile.portrait;

    header.appendChild(profile);
    header.appendChild(profileName);
    header.appendChild(profileInfo);
    header.appendChild(profilePicture);
    profile.appendChild(profileName);
    profile.appendChild(profileInfo);
    profileInfo.appendChild(profileLocation);
    profileInfo.appendChild(profileTagline);
    profileLocation.appendChild(profileCity);
    profileLocation.appendChild(profileCountry);
  }
}

class PhotographerMedia {
  constructor(media) {
    this.media = media;
  }

  createPhotographerMedia() {
    const wrapper = document.querySelector('.photograph-media-wrapper');

    const photographerPhotos = document.createElement('img');
    photographerPhotos.src = '/assets/photographers/' + this.media.image;
    // console.log(this.media);

    wrapper.appendChild(photographerPhotos);
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

    const photographer = json.photographers.find((element) => {
      // element ici n'est pas une propriété définie
      return element.id === id;
    });
    // console.log(photographer);

    const template = new PhotographerProfile(photographer);
    template.createPhotographerProfile();

    // on filtre les medias selon l'id du photographe avec un .filter
    const mediasFilter = json.media.filter((element) => {
      return element.photographerId === id;
    });
    // console.log(mediasFilter);

    for (const media of json.media) {
      const mediaTemplate = new PhotographerMedia(media);
      mediaTemplate.createPhotographerMedia();
    }
  }
}

const app = new App();
app.main();
