import { photographerTemplate } from '../factories/index.js'

async function getPhotographers () {
  const photographers = await fetch('../../data/photographers.json', {
    method: 'GET'
  })
    .then(res => res.json())
    .then(res => {
      const photographers = res.photographers
      return photographers
    })
  return ({ photographers: [...photographers] })
}

async function displayData (photographers) {
  const photographersSection = document.querySelector('.photographer_section')

  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer)
    const userCardDOM = photographerModel.getUserCardDOM()
    photographersSection.appendChild(userCardDOM)
  })
}

async function init () {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers()
  displayData(photographers)
}

init()
