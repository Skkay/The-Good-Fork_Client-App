import { getFetchingOption, API_URL } from './options';

const fetchReservations = (token, id, today) => {
  const options = getFetchingOption(token);
  const dateStart = new Date();
  const dateEnd = new Date();
  
  if (!today) {
    dateEnd.setDate(dateEnd.getDate() + 6)
  }

  return fetch(`${API_URL}/users/${id}/reservations?date%5Bbefore%5D=${dateEnd.toISOString()}&date%5Bafter%5D=${dateStart.toISOString()}`, options)
    .then((res) => res.json())
    .then((json) => json)
    .catch((err) => console.log(err.message));
}

export default fetchReservations;
