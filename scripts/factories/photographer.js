function photographerTemplate(data) {
    console.log(data);
    const { name, portrait, price, tagline, id, country, city } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );

        const linkContainer = document.createElement('a');
        linkContainer.setAttribute("href", `/photographer.html?id=${id}`);
        linkContainer.setAttribute("alt", name);
        article.appendChild(linkContainer);

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        linkContainer.appendChild(img);
        linkContainer.appendChild(h2);

        // div infos container
        const infosContainer = document.createElement('div');
        infosContainer.classList.add('photographer-card-description');
        article.appendChild(infosContainer);

        const location = document.createElement( 'p' );
        location.textContent = `${city}, ${country}`;
        const taglineEl = document.createElement( 'p' );
        taglineEl.textContent = tagline;
        const priceEl = document.createElement( 'p' );
        priceEl.textContent = `${price}€/jour`;

        infosContainer.appendChild(location);
        infosContainer.appendChild(taglineEl);
        infosContainer.appendChild(priceEl);

        return (article);
    }
    return { getUserCardDOM };
}