const getFetchingOption = (token) => {
  return {
    headers: {
      'accept': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  };
}

export default getFetchingOption;
