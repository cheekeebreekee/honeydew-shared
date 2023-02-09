import { Accutane, PregnancyTestPhoto } from "src/types/Accutane";

const NEXT_CONFIRMATION_DATE_OFFSET = 30;

export const mapToFemaleRenewAccutaneModel = (
  data: Accutane,
  timestamp: Date
) => ({
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
  birthControl: {
    createdAt: data.birthControl?.createdAt as string,
    updatedAt: data.birthControl?.updatedAt as string,
    primaryForm: data.birthControl?.primaryForm as string,
    secondaryForm: data.birthControl?.secondaryForm as string,
    completed: data.birthControl?.completed as boolean,
  },
  pregnancyTest: {
    createdAt: data.pregnancyTest?.createdAt as string,
    updatedAt: data.pregnancyTest?.updatedAt as string,
    eSignature: data.pregnancyTest?.eSignature as string,
    photos: data.pregnancyTest?.photos as PregnancyTestPhoto[],
    completed: data.pregnancyTest?.completed as boolean,
  },
  iPledgeConsent: {
    createdAt: data.iPledgeConsent.createdAt as string,
    updatedAt: data.iPledgeConsent.updatedAt as string,
    // confirm if we need to reset iPledge each month or just on the first time and then just confirm it
    signed: data.iPledgeConsent.signed as boolean,
    confirmed: data.iPledgeConsent.confirmed as boolean,
  },
  remsNumber: data.remsNumber,
  ttl: Math.round(
    new Date(timestamp.setDate(timestamp.getDate() + 30)).getTime() / 1000
  ),
  isOnboarding: false,
});
