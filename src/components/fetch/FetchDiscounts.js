import { getFetchingOption, API_URL } from './options';

const fetchDiscounts = (token) => {
  const options = getFetchingOption(token);

  return fetch(`${API_URL}/discounts`, options)
    .then((res) => res.json())
    .then((json) => json)
    .catch((err) => console.log(err));
}

export default fetchDiscounts;
