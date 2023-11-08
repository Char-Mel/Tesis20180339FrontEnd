export const validatePhoneNumber = (phoneNumber) => {
  // eslint-disable-next-line no-useless-escape
  const pattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  return pattern.test(phoneNumber);
};

export const validateEmail = (email) => {
  // eslint-disable-next-line no-useless-escape
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/u;
  return pattern.test(email);
};
