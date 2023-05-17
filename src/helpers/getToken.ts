import axios from 'axios';

export const getToken = async () => {
  try {
    const response = await axios.get(
      'https://frontend-test-assignment-api.abz.agency/api/v1/token',
    );
    return response.data.token;
  } catch (error) {
    return error;
  }
};
