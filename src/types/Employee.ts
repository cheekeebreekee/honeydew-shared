export enum EMPLOYEE_TYPES {
  PROVIDER = "provider",
  CARE_COORDINATOR = "care-coordinator",
  ENROLLMENT_COORDINATOR = "enrollment-coordinator",
  ADMIN = "admin",
}

export interface Employee {
  id: string;
  type: EMPLOYEE_TYPES;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  image: string;
  title?: string;
}

export interface Provider extends Employee {
  npiNumber?: string;
  title?: string;
  availableStates?: string[];
}

export interface CareCoordinator extends Employee {
  detachedFromNewPatients?: boolean;
}

export interface EnrollmentCoordinator extends Employee {
  detachedFromNewPatients?: boolean;
}

export interface Administrator extends Employee {
  group?: string;
  groupFriendly?: string;
  fullName?: string;
}
