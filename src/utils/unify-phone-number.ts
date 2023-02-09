export function unifyPhoneNumber(phone: string) {
  return phone.replace(/\D/g, "");
}
