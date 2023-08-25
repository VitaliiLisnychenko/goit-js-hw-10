import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';

const breedSlctEl = document.querySelector('.breed-select');
const catInfoEl = document.querySelector('.cat-info');

breedSlctEl.addEventListener('change', onBreedSlct);


function createMarkupSlct(breeds) {
  const markupSlctBreeds = breeds
    .map(breed => {
      return `<option value="${breed.id}">${breed.name}</option>`;
    })
    .join('');

  breedSlctEl.innerHTML = markupSlctBreeds;

  breedSlctEl.style.visibility = 'inherit';
  new SlimSelect({
    select: '.breed-select',
  });
}

function createMarkupCard(data) {
  const markupSlctCat = el => {
    return `<h1>${el.breeds[0].name}</h1>
    <p><strong>Description: </strong>${el.breeds[0].description}</p>
    <p><strong>Temperament: </strong>${el.breeds[0].temperament}</p>
    <img src="${el.url}" alt="${el.breeds[0].name}"></img>`;
  };

  catInfoEl.innerHTML = markupSlctCat(data[0]);
}

function onBreedSlct(evt) {
  Notiflix.Loading.hourglass('Loading data, please wait...');
  catInfoEl.innerHTML = '';

  const breedOpt = fetchCatByBreed(evt.target.velue);

  breedOpt
    .then(data => {
      createMarkupCard(data);
      Notiflix.Loading.remove();
    })
    .catch(err => errorMsg(err));
}

Notiflix.Loading.hourglass('Loading data, please wait...');

fetchBreeds()
  .then(breeds => {
    createMarkupSlct(breeds);

    Notiflix.Loading.remove();
  })
  .catch(err => errorMsg(err));

function errorMsg() {
  Notiflix.Loading.remove();
  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page!'
  );
}
