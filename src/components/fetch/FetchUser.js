import { getFetchingOption, API_URL } from './options';

const fetchUser = (token, id) => {
  const option = getFetchingOption(token);

  return fetch(`${API_URL}/users/${id}`, option)
    .then((res) => res.json())
    .then((json) => json)
    .catch((err) => console.log(err));
}

export default fetchUser;
