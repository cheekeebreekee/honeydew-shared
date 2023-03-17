import { EMPLOYEE_ROLES } from "./Employee";

export interface ShippingInfo {
  zipCode: string;
  city: string;
  addressLine1: string;
  addressLine2: string;
  state: string;
}

// export interface Patient {
//   id: string;
//   archived?: boolean;
//   medicalBackground: MedicalBackground;
//   basicInfo: BasicInfo;
//   created_at: string;
//   phone: string;
//   notificationPhone: string;
//   provider_id: string;
//   care_coordinator_id: string;
//   first_log_in: boolean;
//   full_name: string;
//   email: string;
//   membership: Membership;
//   multiAccList?: string[];
//   paymentInfo: PaymentInfo;
//   timezone: string;
//   calendly_invitee_id: string;
//   notes?: PatientNote[];
//   appointments: Appointment[];
//   appointmentStatus: AppointmentStatus[];
//   notifiedAboutUpcomingAppointment: boolean;
//   shippingInfo?: ShippingInfo;
//   isAppointmentSkipped?: boolean;
//   chatInfo?: ChatInfo;
//   referralId: number;
//   isAccutane?: boolean;
// }

export interface InsuranceInfo {
  insuranceName?: string;
  policyHolderName?: string;
  groupNumber?: string;
  memberId?: string;
}

export interface SkinSurveyAnswer {
  id: string;
  answer: string | string[] | boolean;
}

export interface MedicalBackgroundItem {
  id: string;
  answer: string; // TODO: add more answer types and consider adding medical background item type
}

export interface MedicalBackground {
  sex: string;
  height: number;
  weight: number;
  skinSurvey: MedicalBackgroundItem[];
}

export interface PatientParentsInfo {
  name: string;
  email: string;
  phone: string;
}

export type CareTeamItem = {
  id: string;
  role: EMPLOYEE_ROLES;
};

export interface Patient {
  patientId: string;
  accountId: string;
  state: string;
  dateOfBirth: string;
  fullName: string;
  email: string;
  medicalBackground?: MedicalBackground;
  customerId?: string;
  phone?: string;
  careTeam?: CareTeamItem[];
  insurance?: InsuranceInfo;
  timezone?: string;
  parentInfo?: PatientParentsInfo;
  shippingInfo?: ShippingInfo;
  scheduleLink?: string;
}
