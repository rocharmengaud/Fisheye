let totalLikes = 0;
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
      photographerPhotos.setAttribute('data-name', this.media.title);

      photographerPhotos.appendChild(source);
    } else {
      photographerPhotos = document.createElement('img');
      photographerPhotos.src = '/assets/photographers/' + this.media.image;
      photographerPhotos.setAttribute('data-id', this.media.id);
      photographerPhotos.setAttribute('data-name', this.media.title);
    }

    /**
     * Media card
     */
    const mediaCard = document.createElement('div');
    mediaCard.className = 'media-card';

    mediaCard.setAttribute('data-name', this.media.title);
    mediaCard.setAttribute('data-date', this.media.date);
    mediaCard.setAttribute('data-likes', this.media.likes);

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
    mediaHeart.innerHTML = '<ion-icon name="heart"></ion-icon>';

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

class Stats {
  constructor(profile) {
    this.profile = profile;
  }

  totalLike() {
    Array.from(document.querySelectorAll('.media-card')).forEach((element) => {
      totalLikes += parseInt(element.dataset.likes);
    });
  }

  totalStats() {
    const main = document.querySelector('#main');

    const frame = document.createElement('div');
    frame.className = 'stats-frame';

    const stats = document.createElement('div');
    stats.className = 'stats-info';

    const likes = document.createElement('div');
    likes.className = 'stats-likes';

    const price = document.createElement('div');
    price.className = 'stats-price';
    price.innerHTML = this.profile.price + ' €/jour';

    likes.innerHTML = totalLikes + '<ion-icon name="heart"></ion-icon>';

    main.appendChild(frame);
    frame.appendChild(stats);
    stats.appendChild(likes);
    stats.appendChild(price);
  }

  formName() {
    const modalHeader = document.querySelector('.modal header');
    const photographer = document.createElement('div');

    photographer.className = 'photographer-name';
    photographer.innerHTML = this.profile.name;

    modalHeader.appendChild(photographer);
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

    // ici on importe les likes et le prix du photographe dans l'encadré
    const frameStats = new Stats(photographer);
    frameStats.totalLike();
    frameStats.totalStats();
    frameStats.formName();
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
        const dataName = event.target.getAttribute('data-name');

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
          photographerMedia.setAttribute('data-name', dataName);
          photographerMedia.appendChild(source);
        } else {
          photographerMedia = document.createElement('img');
          photographerMedia.src = mediaImage;
          photographerMedia.setAttribute('data-id', idMedia);
          photographerMedia.setAttribute('data-name', dataName);
        }

        const description = document.createElement('div');
        description.className = 'lightbox-media-title';
        description.innerHTML = dataName;

        mediaLightbox.appendChild(photographerMedia);
        lightboxPreview.appendChild(mediaLightbox);
        lightboxPreview.appendChild(description);

        this.openLightbox();
        this.closeLightbox();
        this.nextMedia();
        this.previousMedia();
      });
    });

    Array.from(document.querySelectorAll('.media-heart')).forEach((element) => {
      element.addEventListener('click', (event) => {
        let mediaHeart = event.target.parentNode.parentNode.querySelector('.md.hydrated');
        let mediaPopularity = event.target.parentNode.parentNode.querySelector('.media-likes');

        mediaHeart.classList.toggle('liked');
        if (mediaHeart.classList.contains('liked')) {
          mediaPopularity.textContent = parseInt(mediaPopularity.textContent) + 1;
        } else {
          mediaPopularity.textContent = parseInt(mediaPopularity.textContent) - 1;
        }
      });
    });
  }

  openLightbox() {
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

      const description = document.createElement('div');
      description.className = 'lightbox-media-title';
      description.innerHTML = photographerMedias[nextMedia].title;

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
      document.querySelector('.lightbox-preview').appendChild(description);
    });
  }

  async previousMedia() {
    const previous = document.querySelector('.lightbox-previous');
    const json = await this.photographerProfileApi.get();
    const params = new URL(document.location).searchParams;
    const id = parseInt(params.get('id'));

    // on filtre les medias selon l'id du photographe avec un .filter
    const photographerMedias = json.media.filter((element) => {
      return element.photographerId === id;
    });
    previous.addEventListener('click', (event) => {
      event.preventDefault();

      // on crée une variable contenant le media actuel
      const currentImage = parseInt(
        document.querySelector('.lightbox-preview img, .lightbox-preview video').getAttribute('data-id')
      );

      // on crée une variable pour se positionner sur le media actuel
      let currentMedia = photographerMedias.findIndex((element) => {
        return element.id === currentImage;
      });

      let nextMedia = currentMedia - 1;
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
}

// Closing the lightbox when hitting escape key
const body = document.querySelector('body');
body.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    document.querySelector('.lightbox-close').click();
  }
});

// Switching picture to next when hitting arrowright
body.addEventListener('keydown', function (event) {
  if (event.key === 'ArrowRight') {
    document.querySelector('.lightbox-next').click();
  }
});

// Switching picture to previous when hitting arrowleft
body.addEventListener('keydown', function (event) {
  if (event.key === 'ArrowLeft') {
    document.querySelector('.lightbox-previous').click();
  }
});

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
