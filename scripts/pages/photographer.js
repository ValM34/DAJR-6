async function getPhotographer() {
  const photographer = await fetch('../../data/photographers.json', {
    method: 'GET',
  })
    .then(res => res.json())
    .then(res => {
      // Get photographer id
      const photographerId = getIdByParam();

      // Get photographer data
      const photographerIndex = res.photographers.findIndex(photographer => photographer.id === photographerId)
      const photographer = res.photographers[photographerIndex];
      
      return [photographer];
    })

  return ({ photographer : [...photographer]});
}

async function getImagesByPhotographer() {
  const images = await fetch('../../data/photographers.json', {
    method: 'GET',
  })
    .then(res => res.json())
    .then(res => {
      // Get photographer id
      const photographerId = getIdByParam();

      // Get photographer images
      const images = res.media.filter(media => media.photographerId === photographerId);
      
      return [images];
    })

  return ({ images : [...images]});
}

function getIdByParam() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const photographerId = urlParams.get('id');

  return parseInt(photographerId);
}


async function displayData(photographer, images) {
  // Display header photographer
  const photographersSection = document.querySelector(".photograph-header");
  const photographerModel = photographerComponents(photographer, images);
  const personalDataDOM = photographerModel.getPersonalDataDOM();
  const portraitDOM = photographerModel.getPortraitDOM();
  photographersSection.appendChild(personalDataDOM);
  photographersSection.appendChild(document.querySelector('#contact_button'));
  photographersSection.appendChild(portraitDOM);

  // Display select
  const main = document.querySelector('#main');
  const selectDOM = photographerModel.getSelectDOM();
  main.appendChild(selectDOM);
  // Handle select
  const selectEl = document.querySelector('#order_by');
  console.log(selectEl.value)
  selectEl.addEventListener('change', () => {
    console.log(selectEl.value)
    const galleryDOMFiltered = photographerModel.getGalleryDOM(selectEl.value);
    const elementsInGalleryDOM = document.querySelectorAll('.gallery-container > *');
    elementsInGalleryDOM.forEach(elementInGalleryDOM => elementInGalleryDOM.remove());
    main.appendChild(galleryDOMFiltered);
    alimenteModalMedia();
    handleLikes();
  })

  // Display gallery
  const galleryDOM = photographerModel.getGalleryDOM();
  main.appendChild(galleryDOM);

  // Display daily price
  let totalOfLikes = 0;
  images[0].forEach(image => totalOfLikes += image.likes);
  const dailyPriceDOM = photographerModel.getDailyPriceDOM(totalOfLikes);
  main.appendChild(dailyPriceDOM);

  // Handle likes
  function handleLikes() {
    const likesContainerArray = document.querySelectorAll('.likes-container');
    const TJMLikesNumber = document.querySelector('#TJM_likes_number');
    likesContainerArray.forEach(likesContainer => {
      const likesNumber = likesContainer.querySelector('.likes-number');
      likesContainer.addEventListener('click', () => {
        if(likesNumber.classList.contains('likes-number-modified')) {
          likesNumber.textContent = parseInt(likesNumber.textContent) - 1;
          TJMLikesNumber.textContent = parseInt(TJMLikesNumber.textContent) - 1;
        } else {
          likesNumber.textContent = parseInt(likesNumber.textContent) + 1;
          TJMLikesNumber.textContent = parseInt(TJMLikesNumber.textContent) + 1;
        }
        likesNumber.classList.toggle('likes-number-modified');
      })
    })
  }
  handleLikes();

  // Display modal media
  const modalMediaDOM = photographerModel.getModalMediaDOM();
  main.appendChild(modalMediaDOM);

  // Alimente modal media
  const modalMediaEl = document.querySelector('.container-modal-media');
  function alimenteModalMedia() {
    images[0].forEach(image => {
      const imgLinkEl = document.querySelector(`#media-${image.id}`);
      imgLinkEl.addEventListener('click', (e) => {
        e.preventDefault();
        const mediaIndex = images[0].findIndex(media => media.id === image.id);
        const [modalMediaDOM, modalTitleDOM] = photographerModel.getModalElementMediaDOM(images[0][mediaIndex]);
        const containerImgEl = document.querySelector('#container_image_modal_media');
        containerImgEl.appendChild(modalMediaDOM);
        containerImgEl.appendChild(modalTitleDOM);
        modalMediaEl.classList.add('is-open');
      })
    })
  }
  alimenteModalMedia();

  // Close modal media
  const closeModalMediaEl = document.querySelector('#close_modal_media');
  closeModalMediaEl.addEventListener('click', () => {
    const containerImgEl = document.querySelectorAll('#container_image_modal_media > *');
    console.log(containerImgEl)
    containerImgEl.forEach(imgEl => {
      imgEl.remove();
    })
    modalMediaEl.classList.remove('is-open');
  })

  // prev modal media
  const prevModalMedia = document.querySelector('#prev_modal_media');
  prevModalMedia.addEventListener('click', () => {
    const containerMediaEl = document.querySelectorAll('#container_image_modal_media > *');
    // Trouve l'id de l'ancienne image
    const lastImgId = containerMediaEl[0].getAttribute('data-media-id');
    let lastMediaIndex = images[0].findIndex(media => media.id === parseInt(lastImgId));
    let newMediaIndex;
    if(lastMediaIndex === 0) {
      newMediaIndex = images[0].length - 1;
    } else {
      newMediaIndex = lastMediaIndex - 1;
    }
    // Supprime l'ancienne image
    containerMediaEl.forEach(imgEl => {
      imgEl.remove();
    })
    // Ajoute l'image précédente grâce à l'id de l'ancienne image
    const [modalMediaDOM, modalTitleDOM] = photographerModel.getModalElementMediaDOM(images[0][newMediaIndex]);
    const containerImgEl2 = document.querySelector('#container_image_modal_media');
    containerImgEl2.appendChild(modalMediaDOM);
    containerImgEl2.appendChild(modalTitleDOM);
  })

  // next modal media
  const nextModalMedia = document.querySelector('#next_modal_media');
  nextModalMedia.addEventListener('click', () => {
    const containerMediaEl = document.querySelectorAll('#container_image_modal_media > *');
    // Trouve l'id de l'ancienne image
    const lastImgId = containerMediaEl[0].getAttribute('data-media-id');
    let lastMediaIndex = images[0].findIndex(media => media.id === parseInt(lastImgId));
    let newMediaIndex;
    if(lastMediaIndex === images[0].length - 1) {
      newMediaIndex = 0;
    } else {
      newMediaIndex = lastMediaIndex + 1;
    }
    // Supprime l'ancienne image
    containerMediaEl.forEach(imgEl => {
      imgEl.remove();
    })
    // Ajoute l'image suivante grâce à l'id de l'ancienne image
    const [modalMediaDOM, modalTitleDOM] = photographerModel.getModalElementMediaDOM(images[0][newMediaIndex]);
    const containerImgEl2 = document.querySelector('#container_image_modal_media');
    containerImgEl2.appendChild(modalMediaDOM);
    containerImgEl2.appendChild(modalTitleDOM);
  })

  // Handle lightbox with keyboard
  document.addEventListener('keydown', (e) => {
    if(e.key === 'ArrowLeft'){
      const containerMediaEl = document.querySelectorAll('#container_image_modal_media > *');
      // Trouve l'id de l'ancienne image
      const lastImgId = containerMediaEl[0].getAttribute('data-media-id');
      let lastMediaIndex = images[0].findIndex(media => media.id === parseInt(lastImgId));
      let newMediaIndex;
      if(lastMediaIndex === 0) {
        newMediaIndex = images[0].length - 1;
      } else {
        newMediaIndex = lastMediaIndex - 1;
      }
      // Supprime l'ancienne image
      containerMediaEl.forEach(imgEl => {
        imgEl.remove();
      })
      // Ajoute l'image précédente grâce à l'id de l'ancienne image
      const [modalMediaDOM, modalTitleDOM] = photographerModel.getModalElementMediaDOM(images[0][newMediaIndex]);
      const containerImgEl2 = document.querySelector('#container_image_modal_media');
      containerImgEl2.appendChild(modalMediaDOM);
      containerImgEl2.appendChild(modalTitleDOM);
    } else if(e.key === 'ArrowRight'){
      const containerMediaEl = document.querySelectorAll('#container_image_modal_media > *');
      // Trouve l'id de l'ancienne image
      const lastImgId = containerMediaEl[0].getAttribute('data-media-id');
      let lastMediaIndex = images[0].findIndex(media => media.id === parseInt(lastImgId));
      let newMediaIndex;
      if(lastMediaIndex === images[0].length - 1) {
        newMediaIndex = 0;
      } else {
        newMediaIndex = lastMediaIndex + 1;
      }
      // Supprime l'ancienne image
      containerMediaEl.forEach(imgEl => {
        imgEl.remove();
      })
      // Ajoute l'image suivante grâce à l'id de l'ancienne image
      const [modalMediaDOM, modalTitleDOM] = photographerModel.getModalElementMediaDOM(images[0][newMediaIndex]);
      const containerImgEl2 = document.querySelector('#container_image_modal_media');
      containerImgEl2.appendChild(modalMediaDOM);
      containerImgEl2.appendChild(modalTitleDOM);
    } else if(e.key === 'Escape') {
      const containerImgEl = document.querySelectorAll('#container_image_modal_media > *');
      console.log(containerImgEl)
      containerImgEl.forEach(imgEl => {
        imgEl.remove();
      })
      modalMediaEl.classList.remove('is-open');
    }
  })

  // Add artist name to contact modal
  const contactArtisteName = document.querySelector('#contact_artist_name');
  contactArtisteName.textContent = photographer[0].name;
  // Close contact modal with keyboard
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') {
      closeModal();
    }
  })
}


async function init() {
  // Récupère les datas des photographes
  const { photographer } = await getPhotographer();
  const { images } = await getImagesByPhotographer();
  displayData(photographer, images);
}

init();
