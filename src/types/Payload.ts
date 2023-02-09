import {
  BasicInfo,
  ChatIdentityType,
  MedicalBackground,
  PatientNote,
  SkinImages,
  TreatmentPlanData,
} from "./Patient";

export interface InsurancceInfoPayload {
  insuranceName: string;
  policyHolderName: string;
  groupNumber: string;
  memberId: string;
}

export interface ShippingInfoPayload {
  addressLine1: string;
  addressLine2: string;
  city: string;
  firstName: string;
  lastName: string;
  state: string;
  zipCode: string;
}

export interface SkinSurveyResultPayload {
  id: string;
  skinSensitivity?: string;
  skinDryness: string | null;
  pregnancy: boolean | null;
  menstruationBreakout: string | null;
  isRegularMenstruationCycle: boolean;
  isBirthControlTaken: boolean | null;
  birthControlMeds: string[] | null;
  isPcos: boolean;
  previousAcneProductsTaken: string[];
  prescriptionPills?: string[];
  prescriptionCreams?: string[];
  currentNonPrescriptions?: string | null;
  isAnyPrescriptionsInUse: boolean | null;
  currentPrescriptions?: string | null;
  isAnyMedicalConditionPillsInUse: boolean | null;
  medications: string | null;
  isAnyPrescriptionAllergies: boolean | null;
  stressLevel?: string;
  sleepAmount?: string;
  dairyConsumption?: string;
  skinImages: SkinImages[];
}

export interface AddPatientNotesPayload {
  id: string;
  note: PatientNote;
}

export interface UpdateChatInitTimestampPayload {
  id: string;
  identity: ChatIdentityType;
  initTimestamp?: string;
  highlight?: string;
}

export interface SubmitTreatmentPlanPayload {
  isEdit: boolean;
  isSubmittedByCareCoordinator: boolean;
  userId: string;
  treatmentPlanData: TreatmentPlanData;
}

export interface SubmitFollowUpPayload {
  userId: string;
  list: string[];
  followUpData: { [p: string]: string };
  timestamp: number;
}

export interface UpdateMedicalBackgroundPayload {
  userId: string;
  medicalBackground: Partial<MedicalBackground>;
  basicInfo: Partial<BasicInfo>;
}

export interface ImagePayload {
  image: {
    filename: string;
    contentType: string;
    source: string;
    eSignature: string;
  };
}

export interface DocumentPayload {
  document: {
    signedBy?: { id: string; name: string; role: string; createdAt: string };
    filename: string;
    contentType: string;
    source: string;
    title: string;
    uploadedBy: {
      id: string;
      name: string;
    };
    comment: string;
    type: string;
    assignedTo?: {
      id: string;
      name: string;
      role: string;
    } | null;
    taskName?: string | null;
  };
}

export interface ProcessCheckoutInboundPayload {
  customerId: string;
  email: string;
  paymentMethod: {
    billing_details: {
      address: {
        city: string;
        country: string | null;
        line1: string;
        line2: string;
        postal_code: string;
        state: string;
      };
      email: string;
      name: string;
      phone: string | null;
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    card: any;
    created: number;
    customer: null;
    id: string;
    livemode: boolean;
    object: string;
    type: string;
  };
  purchasedProductsPriceIds: {
    discounts: {
      coupon: string;
      discount: string;
    }[];
    price: string;
    quantity: number;
  }[];
}
