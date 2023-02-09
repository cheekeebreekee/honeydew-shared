import { Patient } from "src/types/Patient";
import Stripe from "stripe";

export const mapToFemaleAccutaneModel = (
  id: string,
  patient: Patient,
  subscription: Stripe.Subscription,
  timestamp: Date
) => ({
  id,
  patientId: patient.id,
  gender: patient.basicInfo.gender,
  paymentDetails: {
    id: subscription.id,
    customerId: patient.paymentInfo.customerId as string,
    createdAt: new Date(subscription.created).toISOString(),
  },
  bloodWork: {
    createdAt: "",
    completed: false,
    populated: false,
    updatedAt: "",
    confirmed: false,
  },
  birthControl: {
    createdAt: "",
    updatedAt: "",
    primaryForm: "",
    secondaryForm: "",
    completed: false,
  },
  pregnancyTest: {
    createdAt: "",
    updatedAt: "",
    eSignature: "",
    photos: [],
    completed: false,
  },
  iPledgeConsent: {
    createdAt: timestamp.toISOString(),
    updatedAt: timestamp.toISOString(),
    signed: false,
    confirmed: false,
  },
  remsNumber: "",
  ttl: Math.round(
    new Date(timestamp.setDate(timestamp.getDate() + 30)).getTime() / 1000
  ),
  isOnboarding: true,
});
