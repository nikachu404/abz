import { getToken } from './getToken';

export const registerUser = async (
  positionId: string,
  name: string,
  email: string,
  phone: string,
  photo: string | File,
) => {
  const formData = new FormData();
  formData.append('position_id', positionId);
  formData.append('name', name.toString());
  formData.append('email', email.toString());
  formData.append('phone', phone);
  formData.append('photo', photo);

  const response = await fetch(
    'https://frontend-test-assignment-api.abz.agency/api/v1/users',
    {
      method: 'POST',
      body: formData,
      headers: { Token: await getToken() },
    },
  );

  if (response.status >= 200 && response.status < 300) {
    return response.json();
  } else {
    throw new Error('Registration failed');
  }
};
