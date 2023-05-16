/* eslint-disable no-useless-escape */
export const validatePhone = (phone: string) => {
  const patternPhone = /^[\+]{0,1}380([0-9]{9})$/;

  return patternPhone.test(phone);
};