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
    const header = document.querySelector('.photograph-profile');

    /**
     * Profil du photographe
     */
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
  constructor(media, photographers) {
    this.media = media;
    this.photographers = photographers;
  }

  createPhotographerMedia() {
    const wrapper = document.querySelector('.photograph-media-wrapper');
    const typeMedia = this.media.image.split('.').pop();
    let photographerPhotos;

    if (typeMedia === 'mp4') {
      // creation de l'element source
      const source = document.createElement('source');
      source.src = '/assets/photographers/' + this.media.image;
      source.type = 'video/mp4';
      // creation de l'element vidéo
      photographerPhotos = document.createElement('video');
      photographerPhotos.src = '/assets/photographers/' + this.media.image;
      photographerPhotos.setAttribute('controls', 'controls');
      photographerPhotos.appendChild(source);
    } else {
      photographerPhotos = document.createElement('img');
      photographerPhotos.src = '/assets/photographers/' + this.media.image;
    }

    const mediaCard = document.createElement('div');
    mediaCard.className = 'media-card';

    const mediaInfo = document.createElement('div');
    mediaInfo.className = 'media-info';

    const mediaName = document.createElement('div');
    mediaName.className = 'media-name';
    mediaName.appendChild(document.createTextNode(this.media.title));

    const mediaLikes = document.createElement('div');
    mediaLikes.className = 'media-likes';
    mediaLikes.appendChild(document.createTextNode(this.media.likes));

    wrapper.appendChild(photographerPhotos);
    wrapper.appendChild(mediaCard);
    mediaCard.appendChild(photographerPhotos);
    mediaCard.appendChild(mediaInfo);
    mediaInfo.appendChild(mediaName);
    mediaInfo.appendChild(mediaLikes);
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

    const profile = new PhotographerProfile(photographer);
    profile.createPhotographerProfile();

    // on filtre les medias selon l'id du photographe avec un .filter
    const photographerMedia = json.media.filter((element) => {
      return element.photographerId === id;
    });

    for (const media of photographerMedia) {
      const mediaTemplate = new PhotographerMedia(media, photographer);
      mediaTemplate.createPhotographerMedia();
    }

    Array.from(
      document.querySelectorAll(
        '.photograph-media-wrapper .media-card img, .photograph-media-wrapper .media-card video'
      )
    ).forEach(function (element) {
      element.addEventListener('click', (event) => {
        // cet innerHTML sert a vider le wrapper a chaque clic sur un media
        document.querySelector('.lightbox-wrapper').innerHTML = '';
        const mediaLightbox = document.createElement('div');
        mediaLightbox.className = 'media-lightbox';
        const lightboxWrapper = document.querySelector('.lightbox-wrapper');
        const typeMedia = event.target.getAttribute('src').split('.').pop();
        const mediaImage = event.target.getAttribute('src');
        console.log(typeMedia);
        let photographerPhotos;

        if (typeMedia === 'mp4') {
          // creation de l'element source
          const source = document.createElement('source');
          source.src = mediaImage;
          source.type = 'video/mp4';
          // creation de l'element vidéo
          photographerPhotos = document.createElement('video');
          photographerPhotos.src = mediaImage;
          photographerPhotos.appendChild(source);
        } else {
          photographerPhotos = document.createElement('img');
          photographerPhotos.src = mediaImage;
        }

        mediaLightbox.appendChild(photographerPhotos);
        lightboxWrapper.appendChild(mediaLightbox);
      });
    });
  }

  async displayLightbox() {
    const json = await this.photographerProfileApi.get();
    const params = new URL(document.location).searchParams;
    const id = parseInt(params.get('id'));
    const photographerMedia = json.media.filter((element) => {
      return element.photographerId === id;
    });
    const lightboxWrapper = document.querySelector('.lightbox-wrapper');
    console.log(photographerMedia);

    lightboxWrapper.style.display = 'block';
  }

  closeLightbox() {}

  nextMedia() {}

  previousMedia() {}
}

const app = new App();
app.main();

// creation de l'array des medias
app.displayLightbox();

Array.from(document.querySelectorAll('.filtreMedia')).forEach(function (element) {
  element.addEventListener('click', (event) => {
    console.log(event.target.getAttribute('data-filtre'));
    // il faudra utiliser switch pour le tri
  });
});
