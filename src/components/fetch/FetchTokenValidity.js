const fetchTokenValidity = (token) => {
  return fetch(`http://192.168.1.18/3proj_api/public/api/token_validity?token=${token}`, { headers: { 'accept': 'application/json' } })
    .then((res) => res.json())
    .then((json) => json)
    .catch((err) => console.log(err.message));
}

export default fetchTokenValidity;
