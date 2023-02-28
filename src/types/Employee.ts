export enum EmployeeType {
  "provider",
  "care-coordinator",
  "enrollment-coordinator",
  "admin",
}

export interface Employee {
  id: string;
  type: EmployeeType;
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
