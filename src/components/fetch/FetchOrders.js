import { getFetchingOption, API_URL } from './options';

const fetchOrders = (token, id) => {
  const options = getFetchingOption(token);

  return fetch(`${API_URL}/users/${id}/orders`, options)
    .then((res) => res.json())
    .then((json) => json)
    .catch((err) => console.log(err.message));
}

export default fetchOrders;
