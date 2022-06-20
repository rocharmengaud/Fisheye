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

    // Condition pour importer la vidéo et les images
    if (typeMedia === 'mp4') {
      // creation de l'element source contenant le type="video/mp4"
      const source = document.createElement('source');
      source.src = '/assets/photographers/' + this.media.image;
      source.type = 'video/mp4';
      // creation de l'element vidéo ansi que l'ajout des contrôles
      photographerPhotos = document.createElement('video');
      photographerPhotos.src = '/assets/photographers/' + this.media.image;
      photographerPhotos.setAttribute('controls', 'controls');
      photographerPhotos.appendChild(source);
    } else {
      photographerPhotos = document.createElement('img');
      photographerPhotos.src = '/assets/photographers/' + this.media.image;
    }

    /**
     * Media card
     */
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
  // recuperation des données du json en local
  constructor() {
    this.photographerProfileApi = new Api('/data/photographers.json');
  }

  async main() {
    // on GET le json et on extrait l'id dans l'url du site
    const json = await this.photographerProfileApi.get();
    const params = new URL(document.location).searchParams;
    const id = parseInt(params.get('id'));

    // ici on va return  l'id d'un seul photographe
    const photographer = json.photographers.find((element) => {
      // element ici n'est pas une propriété définie
      return element.id === id;
    });

    /**
     * on se sert de l'id qu'on a return juste avant ici
     * en paramètre d'une nouvelle instance
     */
    const profile = new PhotographerProfile(photographer);
    profile.createPhotographerProfile();

    // on filtre les medias selon l'id du photographe avec un .filter
    const photographerMedia = json.media.filter((element) => {
      return element.photographerId === id;
    });

    // on fait une boucle pour importer chaque media un par un
    for (const media of photographerMedia) {
      const mediaTemplate = new PhotographerMedia(media, photographer);
      mediaTemplate.createPhotographerMedia();
    }
    /**
     * LIGHTBOX
     */
    Array.from(
      document.querySelectorAll(
        '.photograph-media-wrapper .media-card img, .photograph-media-wrapper .media-card video'
      )
      // Initialisation de la lightbox avec un clic sur un média
    ).forEach((element) => {
      element.addEventListener('click', (event) => {
        // cet innerHTML sert a vider le wrapper a chaque clic sur un media
        document.querySelector('.lightbox-preview').innerHTML = '';
        const mediaLightbox = document.createElement('div');
        mediaLightbox.className = 'lightbox-preview';
        const lightboxPreview = document.querySelector('.lightbox-preview');
        const typeMedia = event.target.getAttribute('src').split('.').pop();
        const mediaImage = event.target.getAttribute('src');

        let photographerMedia;

        if (typeMedia === 'mp4') {
          // creation de l'element source
          const source = document.createElement('source');
          source.src = mediaImage;
          source.type = 'video/mp4';
          // creation de l'element vidéo
          photographerMedia = document.createElement('video');
          photographerMedia.src = mediaImage;
          photographerMedia.setAttribute('controls', 'controls');
          photographerMedia.appendChild(source);
        } else {
          photographerMedia = document.createElement('img');
          photographerMedia.src = mediaImage;
        }

        mediaLightbox.appendChild(photographerMedia);
        lightboxPreview.appendChild(mediaLightbox);

        this.openLightbox();
        this.closeLightbox();
      });
    });
  }

  async openLightbox() {
    const lightboxWrapper = document.querySelector('.lightbox-wrapper');
    lightboxWrapper.style.display = 'block';
  }

  closeLightbox() {
    const cross = document.querySelector('.lightbox-close');
    const lightbox = document.querySelector('.lightbox-wrapper');
    cross.addEventListener('click', (event) => {
      event.preventDefault();
      lightbox.style.display = 'none';
    });
  }

  nextMedia() {
    const next = document.querySelector('.lightbox-next');
    next.addEventListener('click', (event) => {
      event.preventDefault();
    });
  }

  previousMedia() {
    const previous = document.querySelector('.lightbox-previous');
    previous.addEventListener('click', (event) => {
      event.preventDefault();
    });
  }
}

const app = new App();
app.main();

// creation de l'array des medias
// app.openLightbox();

Array.from(document.querySelectorAll('.filtreMedia')).forEach(function (element) {
  element.addEventListener('click', (event) => {
    console.log(event.target.getAttribute('data-filtre'));
    // il faudra utiliser switch pour le tri
  });
});
