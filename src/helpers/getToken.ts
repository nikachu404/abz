export const getToken = () =>
  fetch('https://frontend-test-assignment-api.abz.agency/api/v1/token')
    .then(response => response.json())
    .then(data => data.token)
    .catch(error => error);
