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
    profilePicture.src = '/assets/photographers/Photographers ID Photos/' + this.profile.portrait;

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
      photographerPhotos.setAttribute('data-id', this.media.id);
      photographerPhotos.appendChild(source);
    } else {
      photographerPhotos = document.createElement('img');
      photographerPhotos.src = '/assets/photographers/' + this.media.image;
      photographerPhotos.setAttribute('data-id', this.media.id);
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

    const mediaPopularity = document.createElement('div');
    mediaPopularity.className = 'media-popularity';

    const mediaLikes = document.createElement('div');
    mediaLikes.className = 'media-likes';
    mediaLikes.appendChild(document.createTextNode(this.media.likes));

    const mediaHeart = document.createElement('div');
    mediaHeart.className = 'media-heart';
    mediaHeart.innerHTML = '<div><ion-icon name="heart"></ion-icon></div>';

    wrapper.appendChild(photographerPhotos);
    wrapper.appendChild(mediaCard);
    mediaCard.appendChild(photographerPhotos);
    mediaCard.appendChild(mediaInfo);
    mediaInfo.appendChild(mediaName);
    mediaInfo.appendChild(mediaPopularity);
    mediaPopularity.appendChild(mediaLikes);
    mediaPopularity.appendChild(mediaHeart);
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
     * en paramètre d'une nouvelle instance de la classe PhotographerProfile
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
        const idMedia = event.target.getAttribute('data-id');

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
          photographerMedia.setAttribute('data-id', idMedia);
          photographerMedia.appendChild(source);
        } else {
          photographerMedia = document.createElement('img');
          photographerMedia.src = mediaImage;
          photographerMedia.setAttribute('data-id', idMedia);
        }

        mediaLightbox.appendChild(photographerMedia);
        lightboxPreview.appendChild(mediaLightbox);

        this.openLightbox();
        this.closeLightbox();
        this.nextMedia();
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

  async nextMedia() {
    const next = document.querySelector('.lightbox-next');
    const json = await this.photographerProfileApi.get();
    const params = new URL(document.location).searchParams;
    const id = parseInt(params.get('id'));

    // on filtre les medias selon l'id du photographe avec un .filter
    const photographerMedias = json.media.filter((element) => {
      return element.photographerId === id;
    });
    next.addEventListener('click', (event) => {
      event.preventDefault();

      const currentImage = parseInt(
        document.querySelector('.lightbox-preview img, .lightbox-preview video').getAttribute('data-id')
      );

      let currentMedia = photographerMedias.findIndex((element) => {
        return element.id === currentImage;
      });

      let nextMedia = currentMedia + 1;
      const typeMedia = photographerMedias[nextMedia].image.split('.').pop();
      let photographerMedia;

      console.log(photographerMedias[nextMedia], typeMedia);
      if (typeMedia === 'mp4') {
        // creation de l'element source
        const source = document.createElement('source');
        source.src = '/assets/photographers/' + photographerMedias[nextMedia].image;
        source.type = 'video/mp4';
        // creation de l'element vidéo
        photographerMedia = document.createElement('video');
        photographerMedia.src = '/assets/photographers/' + photographerMedias[nextMedia].image;
        photographerMedia.setAttribute('controls', 'controls');
        photographerMedia.setAttribute('data-id', photographerMedias[nextMedia].id);
        photographerMedia.appendChild(source);
      } else {
        photographerMedia = document.createElement('img');
        photographerMedia.src = '/assets/photographers/' + photographerMedias[nextMedia].image;
        photographerMedia.setAttribute('data-id', photographerMedias[nextMedia].id);
      }

      document.querySelector('.lightbox-preview').innerHTML = '';
      document.querySelector('.lightbox-preview').appendChild(photographerMedia);
    });
  }

  previousMedia() {
    const previous = document.querySelector('.lightbox-previous');
    previous.addEventListener('click', (event) => {
      event.preventDefault();
    });
  }
}

const body = document.querySelector('body');
body.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    document.querySelector('.lightbox-close').click();
  }
});

body.addEventListener('keydown', function (event) {
  if (event.key === 'ArrowRight') {
    document.querySelector('.lightbox-next').click();
  }
});

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
