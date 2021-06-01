import { API_URL } from './options';

const fetchTokenValidity = (token) => {
  return fetch(`${API_URL}/token_validity?token=${token}`, { headers: { 'accept': 'application/json' } })
    .then((res) => res.json())
    .then((json) => json)
    .catch((err) => console.log(err.message));
}

export default fetchTokenValidity;
