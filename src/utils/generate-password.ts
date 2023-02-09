import generatePassword from "password-generator";

const maxLength = 12;
const minLength = 8;

export const generateTemporaryPassword = () => {
  const randomLength =
    Math.floor(Math.random() * (maxLength - minLength)) + minLength;
  const password = generatePassword(randomLength, false, /[A-Za-z0-9]/);

  return password;
};
