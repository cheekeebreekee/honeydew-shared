export const adjustParentEmail = (email: string) => {
  const splittedParentEmail = email.split("@");
  // Adding +1 at the end of email to prevent case if patient and parent email are similar because SignNow not allowing to have similar emails for multiple invitees
  const parentEmail = `${splittedParentEmail[0]}+1@${splittedParentEmail[1]}`;

  return parentEmail;
};
