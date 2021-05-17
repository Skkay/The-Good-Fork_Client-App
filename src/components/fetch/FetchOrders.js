import getFetchingOption from './options';

const fetchOrders = (token, id) => {
  const options = getFetchingOption(token);

  return fetch(`http://192.168.1.18/3proj_api/public/api/users/${id}/orders`, options)
    .then((res) => res.json())
    .then((json) => json)
    .catch((err) => console.log(err.message));
}

export default fetchOrders;
