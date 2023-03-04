import { EMPLOYEE_ROLES } from "./Employee";

export enum PATIENT_ROLE {
  PATIENT = "patient",
}

export const USER_ROLES = { ...PATIENT_ROLE, ...EMPLOYEE_ROLES };
export type USER_ROLES = typeof USER_ROLES;
