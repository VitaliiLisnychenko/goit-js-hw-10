import axios from 'axios';

const API_KEY =
  'live_OjKKYyLyBQTKLrWMctAafmdElcxC4c2A5yrcrTcnx7tUESOLQ3jp0XyhfDTr4CqA';

axios.defaults.headers.common['x-api-key'] = API_KEY;

export function fetchBreeds() {
  const url = `https://api.thecatapi.com/v1/breeds`;
  return axios.get(url).then(response => response.data);
}

export function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
  return axios.get(url).then(response => response.data);
}

console.log(fetchBreeds());
// console.log(fetchCatByBreed());
// console.log(response.data);
// console.log(axios.isCancel('something'));

// export function fetchCatByBreed(breedId) {
//   const URL_SEARCH = 'https://api.thecatapi.com/v1/images/search';
//   // breedId = breeds.id(value);
//   // console.log(`${breedId}`);
//   return axios
//     .get(`${URL_SEARCH}?api_key=${API_KEY}&breed_ids=${breedId}`)
//     .then(response => {
//       return response.data;
//     })
// }
