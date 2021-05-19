import getFetchingOption from './options';

const fetchUser = (token, id) => {
  const option = getFetchingOption(token);

  return fetch(`http://192.168.1.18/3proj_api/public/api/users/${id}`, option)
    .then((res) => res.json())
    .then((json) => json)
    .catch((err) => console.log(err));
}

export default fetchUser;
