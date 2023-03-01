export interface Medication {
  instructions: string[];
  refillExpirationDate: number | null;
  medicineKey: string;
  specialInstructions: string | null;
  refillsCount: number;
}

export interface TreatmentPlanData {
  messageText: string;
  treatmentPlanPreset: string;
  nextFollowUpDate: number;
  providerName: string;
  providerId?: string;
  timestamp: number;
  treatmentPlan: Medication[];
  isReadByCareCoordinator?: boolean;
  isReadByPatient?: boolean;
  isUserNotifiedAboutFollowUp?: boolean;
}

export interface SkinImages {
  list: string[] | null;
  timestamp: number;
  treatmentPlanData?: TreatmentPlanData;
  followUpData?: { [p: string]: string };
}

// export interface MedicalBackground {
//   skinImages: SkinImages[] | null;
//   birthControlMeds: string[] | null;
//   pregnancy: boolean | null;
//   isRegularMenstruationCycle: boolean | null;
//   isPcos: boolean | null;
//   skinSensitivity: string | null;
//   currentPrescriptions: string[] | null;
//   currentNonPrescriptions: string | null;
//   skinDryness: string | null;
//   prescriptionPills: string[];
//   prescriptionCreams: string[];
//   isAnyMedicalConditionPillsInUse: boolean | null;
//   isAnyPrescriptionAllergies: boolean | null;
//   medications: string | null;
//   isAnyPrescriptionsInUse: boolean | null;
//   previousAcneProductsTaken: string[] | null;
//   isBirthControlTaken: boolean | null;
//   menstruationBreakout: string | null;
//   stressLevel: string | null;
//   sleepAmount: string | null;
//   dairyConsumption: string | null;
//   notifiedAboutFillingBeforeAppointment?: boolean;
//   prescriptionAllergies: string | null;
// }

export interface BasicInfo {
  zipCode: string;
  acnePeriod: string;
  birthdate: string;
  gender: string;
  parentsEmail: string | null;
  parentsPhone: string | null;
  isChild: boolean;
}

export interface Membership {
  hasSubscription: boolean;
  membershipType?: string;
  subscriptionExpirationDate?: number;
  notificationLevel?: number;
}

export interface PaymentInfo {
  customerId?: string;
  currency?: string;
  amount?: number;
}

export interface PatientNote {
  date: string;
  value: string;
  fullName: string;
}

export interface Appointment {
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

export interface AppointmentStatus {
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

export interface MedicalBackground {
  sex?: string;
  weight?: number;
  height?: number;
  dateOfBirth: string;
  zipCode: string;
  skinSurvey: SkinSurveyAnswer[];
}

export interface Patient {
  id: string;
  accountId: string;
  appointmentId?: string;
  phone?: string;
  referralId?: string;
  careTeam: string[];
  medicalBackground: MedicalBackground;
  insurance?: InsuranceInfo;
  timezone: string;
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
