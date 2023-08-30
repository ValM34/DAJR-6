function photographerComponents(data, images) {
  
  const { name, portrait, price, tagline, id, country, city } = data[0];
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
    portrait.setAttribute('alt', "");

    return portrait;
  }

  function getSelectDOM() {
    const selectContainer = document.createElement('div');
    selectContainer.classList.add("select-container");
    selectContainer.setAttribute('id', 'select_container');

    const label = document.createElement('p');
    label.classList.add('label-select');
    label.textContent = "Trier par";

    const selectSubContainer = document.createElement('div');
    selectSubContainer.classList.add("select-sub-container");
    selectSubContainer.setAttribute('id', 'select_sub_container');
    selectSubContainer.setAttribute('data-selected', 'closed');

    selectContainer.appendChild(label);
    selectContainer.appendChild(selectSubContainer);

    const popularity = document.createElement('p');
    popularity.textContent = "popularité";
    popularity.setAttribute('data-selected', 'true');
    popularity.setAttribute('data-filter', 'popularity');
    const date = document.createElement('p');
    date.textContent = "date";
    date.setAttribute('data-selected', 'false');
    date.setAttribute('data-filter', 'date');
    const title = document.createElement('p');
    title.textContent = "title";
    title.setAttribute('data-selected', 'false');
    title.setAttribute('data-filter', 'title');
    const chevron = document.createElement('img');
    chevron.setAttribute('src', './assets/icons/chevron-white.svg');
    chevron.setAttribute('id', 'chevron_select');
    chevron.classList.add('icon-chevron-white-select');

    selectSubContainer.appendChild(chevron);
    selectSubContainer.appendChild(popularity);
    selectSubContainer.appendChild(date);
    selectSubContainer.appendChild(title);

    return selectContainer;
  }

  function getGalleryDOM(filter = 'popularity') {
    const container = document.createElement('div');
    container.classList.add('gallery-container');

    // Copy images[0]
    let imagesCopy = images[0].slice();
    // Filter imagesCopy
    if(filter === 'popularity') {
      imagesCopy.sort((a, b) => b.likes - a.likes);
    } else if(filter === 'date') {
      imagesCopy.sort((a, b) => {
        let firstDate = new Date(a.date);
        let secondDate = new Date(b.date);

        return secondDate - firstDate;
      });
    } else if(filter === 'title') {
      imagesCopy.sort((a, b) => a.title.localeCompare(b.title));
    }

    imagesCopy.forEach(image => {
      const imageCard = document.createElement('div');
      imageCard.classList.add('gallery-img-card')
      
      let img;
      if(image.image !== undefined) {
        img = document.createElement('img');
        img.setAttribute('src', `./assets/gallery/${id}/${image.image}`);
        img.setAttribute('id', `media-${image.id}`);
        img.classList.add('gallery-img-card-media');
      }
      let video;
      if(image.video !== undefined) {
        video = document.createElement('video');
        const source = document.createElement('source');
        source.setAttribute('src', `./assets/gallery/${id}/${image.video}`);
        source.setAttribute('type', 'video/mp4');
        video.appendChild(source);
        video.setAttribute('id', `media-${image.id}`);
        video.classList.add('gallery-img-card-media');
      }
      
      const infos = document.createElement('div');
      infos.classList.add('gallery-image-card-infos-container')
      const nameEl = document.createElement('p');
      nameEl.textContent = image.title;

      const likesContainer = document.createElement('div');
      likesContainer.classList.add('likes-container');

      const heartContainer = document.createElement('div');
      heartContainer.classList.add('icon-heart-container');
      const heart = document.createElement('img');
      heart.setAttribute('src', '../../assets/icons/heart-solid-red.svg');
      heart.classList.add('icon-heart');
      heart.setAttribute('alt', 'likes');
      heartContainer.appendChild(heart);

      const likesNumberContainer = document.createElement('div');
      const likes = document.createElement('div');
      likes.classList.add('likes-number');
      likes.textContent = image.likes;
      likesNumberContainer.appendChild(likes);

      likesContainer.appendChild(likesNumberContainer);
      likesContainer.appendChild(heartContainer);
      
      infos.appendChild(nameEl);
      infos.appendChild(likesContainer);
  
      if(image.image !== undefined) {
        imageCard.appendChild(img);
      }
      if(image.video !== undefined) {
        imageCard.appendChild(video);
      }

      imageCard.appendChild(infos);
  
      container.appendChild(imageCard);
    })

    return container;
  }

  function getDailyPriceDOM(totalOfLikes) {
    const container = document.createElement('div');
    container.classList.add('daily-price-container');
    const likesContainer = document.createElement('div');
    likesContainer.classList.add('TJM-likes-container');
    const likesNumber = document.createElement('p');
    likesNumber.setAttribute('id', 'TJM_likes_number');
    likesNumber.textContent = totalOfLikes;
    const likesHeart = document.createElement('img');
    likesHeart.setAttribute('src', '../../assets/icons/heart-solid-black.svg');
    likesHeart.classList.add('icon-heart');

    likesContainer.appendChild(likesNumber);
    likesContainer.appendChild(likesHeart);



    const priceEl = document.createElement('p');
    priceEl.textContent = price + "€/jour";

    container.appendChild(likesContainer);
    container.appendChild(priceEl);

    return container;
  }

  function getModalMediaDOM() {
    const container = document.createElement('div');
    container.classList.add('container-modal-media');
    container.setAttribute('id', 'container_modal_media');
    const closeModalMediaEl = document.createElement('img');
    closeModalMediaEl.setAttribute('src', './assets/icons/close.svg');
    closeModalMediaEl.classList.add('close-modal-media');
    closeModalMediaEl.setAttribute('id', 'close_modal_media');
    const prevModalMedia = document.createElement('img');
    prevModalMedia.setAttribute('src', './assets/icons/chevron.svg');
    prevModalMedia.classList.add('prev-modal-media');
    prevModalMedia.setAttribute('id', 'prev_modal_media');
    const nextModalMedia = document.createElement('img');
    nextModalMedia.setAttribute('src', './assets/icons/chevron.svg');
    nextModalMedia.classList.add('next-modal-media');
    nextModalMedia.setAttribute('id', 'next_modal_media');
    const imgEl = document.createElement('div');
    imgEl.setAttribute('id', 'container_image_modal_media');
    imgEl.classList.add('container-image-modal-media');

    container.appendChild(imgEl);
    container.appendChild(closeModalMediaEl);
    container.appendChild(prevModalMedia);
    container.appendChild(nextModalMedia);

    return container;
  }

  function getModalElementMediaDOM(media) {

    const titleEl = document.createElement('h3');
    titleEl.classList.add('title-modal-media');
    titleEl.textContent = media.title;

    let mediaEl;
    if(media.image !== undefined) {
      const img = document.createElement('img');
      img.setAttribute('src', `./assets/gallery/${media.photographerId}/${media.image}`);
      img.setAttribute('data-media-id', `${media.id}`);
      img.classList.add('img-modal-media');
    
      mediaEl = img;
    } else {
      const video = document.createElement('video');
      video.setAttribute('controls', '');
      const source = document.createElement('source');
      source.setAttribute('src', `./assets/gallery/${media.photographerId}/${media.video}`);
      source.setAttribute('type', 'video/mp4');
      video.setAttribute('data-media-id', `${media.id}`);
      video.classList.add('img-modal-media');
  
      video.appendChild(source);
  
      mediaEl = video;
    }

    return [mediaEl, titleEl];
  }

  return { getPersonalDataDOM, getPortraitDOM, getSelectDOM, getGalleryDOM, getDailyPriceDOM, getModalMediaDOM, getModalElementMediaDOM };
}
