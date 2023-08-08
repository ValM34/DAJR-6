function photographerComponents(data, images) {
  const { name, portrait, price, tagline, id, country, city } = data[0];
  
  console.log(images)
  //const { name, portrait, price, tagline, id, country, city } = data[0];

  const picture = `assets/photographers/${portrait}`;

  function getPersonalDataDOM() {

    const divInfos = document.createElement('div');
    
    const nameEl = document.createElement( 'h1' );
    nameEl.textContent = name;
    const location = document.createElement( 'p' );
    location.textContent = `${city}, ${country}`;
    const taglineEl = document.createElement( 'p' );
    taglineEl.textContent = tagline;

    divInfos.appendChild(nameEl);
    divInfos.appendChild(location);
    divInfos.appendChild(taglineEl);

    return divInfos;
  }

  function getPortraitDOM() {
    const portrait = document.createElement('img');
    portrait.setAttribute('src', picture);

    return portrait;
  }

  function getSelectDOM() {
    const selectContainer = document.createElement('div');
    selectContainer.classList.add('select-filter-container');
    const label = document.createElement('label');
    label.textContent = "Trier par";

    const select = document.createElement('select');
    select.classList.add('select-filter');

    const popularityOption = document.createElement('option');
    popularityOption.textContent = 'Popularité';

    const dateOption = document.createElement('option');
    dateOption.textContent = 'Date';

    const titleOption = document.createElement('option');
    titleOption.textContent = 'Titre';

    select.appendChild(popularityOption);
    select.appendChild(dateOption);
    select.appendChild(titleOption);
    selectContainer.appendChild(label);
    selectContainer.appendChild(select);

    return selectContainer;
  }

  function getGalleryDOM() {
    const container = document.createElement('div');
    container.classList.add('gallery-container');

    images[0].forEach(image => {
      const imageCard = document.createElement('div');
      imageCard.classList.add('gallery-img-card')
      const img = document.createElement('img');
      img.setAttribute('src', `./assets/gallery/${id}/${image.image}`);
      const infos = document.createElement('div');
      infos.classList.add('gallery-image-card-infos-container')
      const nameEl = document.createElement('p');
      nameEl.textContent = image.title;
      const likes = document.createElement('p');
      likes.textContent = image.likes + "icon heart";
      
      infos.appendChild(nameEl);
      infos.appendChild(likes);
  
      imageCard.appendChild(img);
      imageCard.appendChild(infos);
  
      container.appendChild(imageCard);
    })

    return container;
  }

  function getDailyPriceDOM() {
    const container = document.createElement('div');
    container.classList.add('daily-price-container');
    const likesEl = document.createElement('p');
    likesEl.textContent = "@TODO";
    const priceEl = document.createElement('p');
    priceEl.textContent = price + "€/jour";

    container.appendChild(likesEl);
    container.appendChild(priceEl);

    return container;
  }



  return { getPersonalDataDOM, getPortraitDOM, getSelectDOM, getGalleryDOM, getDailyPriceDOM };
}
