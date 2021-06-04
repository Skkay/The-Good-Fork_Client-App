import { API_URL } from '../../../config';

const getFetchingOption = (token) => {
  return {
    headers: {
      'accept': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  };
}

export { getFetchingOption, API_URL };
