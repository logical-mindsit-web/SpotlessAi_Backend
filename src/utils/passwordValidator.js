const passwordValidator = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;

export const validatePassword = (password) => {
  return passwordValidator.test(password);
};
