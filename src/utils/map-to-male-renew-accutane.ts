import { Accutane } from "src/types/Accutane";

const NEXT_CONFIRMATION_DATE_OFFSET = 30;

export const mapToMaleRenewAccutaneModel = (
  data: Accutane,
  timestamp: Date
): Accutane => ({
  id: data.id,
  patientId: data.patientId,
  gender: data.gender,
  enrollmentDateOffset: data.enrollmentDateOffset,
  lastConfirmationDate: data.lastConfirmationDate,
  nextConfirmationDate: data.nextConfirmationDate,
  enrollmentDate: data.enrollmentDate,
  paymentDetails: {
    id: data.paymentDetails.id,
    customerId: data.paymentDetails.customerId,
    createdAt: data.paymentDetails.createdAt as string,
  },
  bloodWork: {
    createdAt: data.bloodWork?.createdAt as string,
    completed: data.bloodWork?.completed as boolean,
    populated: data.bloodWork?.populated as boolean,
    updatedAt: data.bloodWork?.updatedAt as string,
    confirmed: data.bloodWork?.confirmed as boolean,
  },
  iPledgeConsent: {
    createdAt: data.iPledgeConsent.createdAt as string,
    updatedAt: data.iPledgeConsent.updatedAt as string,
    signed: data.iPledgeConsent.signed,
    confirmed: data.iPledgeConsent.confirmed,
  },
  remsNumber: data.remsNumber,
  ttl: Math.round(
    new Date(timestamp.setDate(timestamp.getDate() + 30)).getTime() / 1000
  ),
  isOnboarding: false,
});
