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

  // Display gallery
  const galleryDOM = photographerModel.getGalleryDOM();
  main.appendChild(galleryDOM);

  // Display daily price
  const dailyPriceDOM = photographerModel.getDailyPriceDOM();
  main.appendChild(dailyPriceDOM);
}



async function init() {
  // Récupère les datas des photographes
  const { photographer } = await getPhotographer();
  const { images } = await getImagesByPhotographer();
  displayData(photographer, images);
}

init();
