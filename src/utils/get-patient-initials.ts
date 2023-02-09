import { Patient } from "../types/Patient";

export function getPatientInitials(patient: Patient) {
  const fullNameWords = patient.full_name.split(" ");
  const firstNameInitial = fullNameWords.shift()?.[0]?.toUpperCase() || "";
  const lastNameInitial = fullNameWords.pop()?.[0]?.toUpperCase() || "";

  const initials = `${firstNameInitial ? `${firstNameInitial}.` : ""}${
    lastNameInitial ? `${lastNameInitial}.` : ""
  }`;

  return initials;
}
