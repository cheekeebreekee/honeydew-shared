export function getInitials(fullName: string) {
  const fullNameWords = fullName.split(" ");
  const firstNameInitial = fullNameWords.shift()?.[0]?.toUpperCase() || "";
  const lastNameInitial = fullNameWords.pop()?.[0]?.toUpperCase() || "";

  const initials = `${firstNameInitial ? `${firstNameInitial}.` : ""}${
    lastNameInitial ? `${lastNameInitial}.` : ""
  }`;

  return initials;
}
