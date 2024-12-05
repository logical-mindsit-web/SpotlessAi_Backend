const emailValidator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateEmail = (email) => {
  return emailValidator.test(email);
};
