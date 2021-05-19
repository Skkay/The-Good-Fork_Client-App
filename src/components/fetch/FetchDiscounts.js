import getFetchingOption from './options';

const fetchDiscounts = (token) => {
  const options = getFetchingOption(token);

  return fetch('http://192.168.1.18/3proj_api/public/api/discounts', options)
    .then((res) => res.json())
    .then((json) => json)
    .catch((err) => console.log(err));
}

export default fetchDiscounts;
