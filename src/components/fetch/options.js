const getFetchingOption = (token) => {
  return {
    headers: {
      'accept': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  };
}

const API_URL = "http://192.168.1.18/3proj_api/public/api";

export { getFetchingOption, API_URL };
