export interface BloodWork {
  createdAt: string;
  completed: boolean;
  confirmed: boolean;
  populated: boolean;
  updatedAt?: string;
}

export interface IPledgeConsent {
  documentGroupId?: string;
  inviteId?: string;
  createdAt: string;
  updatedAt?: string;
  signed: boolean;
  confirmed: boolean;
}

export interface BirthControl {
  createdAt: string;
  updatedAt?: string;
  primaryForm: string;
  secondaryForm: string;
  completed: boolean;
}

export interface PregnancyTestPhoto {
  url: string;
  createdAt: string;
  documentId: string;
}

export interface PregnancyTest {
  createdAt: string;
  updatedAt?: string;
  eSignature: string;
  completed: boolean;
  photos: PregnancyTestPhoto[];
}

export interface PaymentDetails {
  id: string;
  customerId: string;
  createdAt: string;
}

export interface Accutane {
  id: string;
  patientId: string;
  gender: string;
  enrollmentDate?: string;
  enrollmentDateOffset?: number;
  lastConfirmationDate?: string;
  nextConfirmationDate?: string;
  birthControl?: BirthControl;
  pregnancyTest?: PregnancyTest;
  iPledgeConsent: IPledgeConsent;
  bloodWork?: BloodWork;
  paymentDetails: PaymentDetails;
  ttl: number;
  remsNumber: string;
  isOnboarding?: boolean;
}
