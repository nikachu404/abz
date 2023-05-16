export const validateName = (name: string) =>
  name.length < 60 && name.length > 2;
