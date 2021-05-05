import getFetchingOption from './options';

const fetchDrinks = (token) => {
  const options = getFetchingOption(token);

  return fetch('http://192.168.1.18/3proj_api/public/api/drinks', options)
    .then((res) => res.json())
    .then((json) => json)
    .catch((err) => console.log(err.message));
}

export default fetchDrinks;
