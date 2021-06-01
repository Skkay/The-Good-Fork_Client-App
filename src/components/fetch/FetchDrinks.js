import { getFetchingOption, API_URL } from './options';

const fetchDrinks = (token) => {
  const options = getFetchingOption(token);

  return fetch(`${API_URL}/drinks`, options)
    .then((res) => res.json())
    .then((json) => json)
    .catch((err) => console.log(err.message));
}

export default fetchDrinks;
