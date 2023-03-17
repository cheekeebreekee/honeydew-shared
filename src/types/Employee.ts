import { USER_ROLES } from "./Main";

export type EMPLOYEE_ROLES =
  | USER_ROLES.PROVIDER
  | USER_ROLES.CARE_COORDINATOR
  | USER_ROLES.ENROLLMENT_COORDINATOR
  | USER_ROLES.ADMINISTRATOR;

export interface Employee {
  id: string;
  role: EMPLOYEE_ROLES;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  image: string;
}

export interface Provider extends Employee {
  npiNumber?: string;
  title?: string;
  availableStates?: string[];
}

export interface CareCoordinator extends Employee {
  detachedFromNewPatients?: boolean;
}

export type EnrollmentCoordinator = Employee;

export type Administrator = Employee;
