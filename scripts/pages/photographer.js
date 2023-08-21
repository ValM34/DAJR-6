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
  const selectContainerEl = document.querySelector("#select_container");
  optionsElArr = document.querySelectorAll('#select_container > p');
  optionsElArr.forEach((option) => {
    option.addEventListener('click', () => {
      if(option.getAttribute('data-selected') === 'true') {
        selectContainerEl.classList.toggle('is-open');

      } else if(option.getAttribute('data-selected') === 'false') {
        // reset all options to data-selected = false
        optionsElArr.forEach((option2) => {
          option2.setAttribute('data-selected', 'false');
        })
        // Replace elements by filter
        option.setAttribute('data-selected', 'true');
        selectContainerEl.classList.remove('is-open');
        galleryDOM.remove();
        const filter = option.getAttribute('data-filter');
        const galleryDOMFiltered = photographerModel.getGalleryDOM(filter);
        const elementsInGalleryDOM = document.querySelectorAll('.gallery-container > *');
        elementsInGalleryDOM.forEach(elementInGalleryDOM => elementInGalleryDOM.remove());
        main.appendChild(galleryDOMFiltered);
      }
    })
  })

  // Display gallery
  const galleryDOM = photographerModel.getGalleryDOM();
  main.appendChild(galleryDOM);

  // Display daily price
  const dailyPriceDOM = photographerModel.getDailyPriceDOM();
  main.appendChild(dailyPriceDOM);
  
 

  // Display modal media
  const modalMediaDOM = photographerModel.getModalMediaDOM();
  main.appendChild(modalMediaDOM);

  // Alimente modal media
  const modalMediaEl = document.querySelector('.container-modal-media');
  images[0].forEach(image => {
    const imgEl = document.querySelector(`#media-${image.id}`);
    imgEl.addEventListener('click', () => {
      const mediaIndex = images[0].findIndex(media => media.id === image.id);
      const [modalMediaDOM, modalTitleDOM] = photographerModel.getModalElementMediaDOM(images[0][mediaIndex]);
      const containerImgEl = document.querySelector('#container_image_modal_media');
      containerImgEl.appendChild(modalMediaDOM);
      containerImgEl.appendChild(modalTitleDOM);
      modalMediaEl.classList.add('is-open');
    })
  })

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
}


async function init() {
  // Récupère les datas des photographes
  const { photographer } = await getPhotographer();
  const { images } = await getImagesByPhotographer();
  displayData(photographer, images);
}

init();
