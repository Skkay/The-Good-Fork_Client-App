import getFetchingOption from './options';

const fetchReservations = (token, id) => {
  const options = getFetchingOption(token);
  const date = new Date().toISOString();

  return fetch(`http://192.168.1.18/3proj_api/public/api/users/${id}/reservations?date%5Bbefore%5D=${date}&date%5Bafter%5D=${date}`, options)
    .then((res) => res.json())
    .then((json) => json)
    .catch((err) => console.log(err.message));
}

export default fetchReservations;
