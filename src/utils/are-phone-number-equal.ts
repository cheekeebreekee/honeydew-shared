import { unifyPhoneNumber } from "./unify-phone-number";

export const arePhoneNumbersEqual = (phone1: string, phone2: string) =>
  unifyPhoneNumber(phone1) === unifyPhoneNumber(phone2);
