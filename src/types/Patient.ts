import { EMPLOYEE_ROLES } from "./Employee";

export interface Medication {
  instructions: string[];
  refillExpirationDate: number | null;
  medicineKey: string;
  specialInstructions: string | null;
  refillsCount: number;
}

export interface PatientNote {
  date: string;
  value: string;
  fullName: string;
}

export interface CalendlyAppointment {
  cancelled_at: null;
  invitee_start_time: string;
  invitee_start_time_pretty: string;
  end_time: string;
  created_at: string;
  type: {
    name: string;
    duration: number;
    owner: {
      type: string;
      uuid: string;
    };
    id: string;
    kind: string;
  };
  start_time: string;
  invitee_end_time: string;
  invitee_end_time_pretty: string;
  cancel_reason: null;
  start_time_pretty: string;
  end_time_pretty: string;
  cancelled: boolean;
  id: string;
  canceller_name: null;
  assigned_to: {
    name: string;
    email: string;
    primary: boolean;
  }[];
}

export interface CalendlyAppointmentStatus {
  status: string;
  timestamp: number;
  reason?: string;
}

export interface ShippingInfo {
  firstName: string;
  lastName: string;
  zipCode: string;
  city: string;
  addressLine1: string;
  addressLine2: string;
  state: string;
}

export type ChatIdentityType = "user" | "provider" | "care-coordinator" | "admin";

export type ChatIdentity = {
  [p in ChatIdentityType]?: {
    chatInitTimestamp: string;
    highlight?: string;
  };
};

export interface ChatInfo extends ChatIdentity {
  lastMessageSentTimestamp?: string;
  lastMessageSentByRole?: string;
  conversationId: string;
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

export interface PatientEmailCheckInfo {
  member: boolean;
  id: string;
  fullName: string;
}

export interface UnsupportedPatient {
  id: string;
  phone: string;
  email: string;
  zipCode: string;
}
