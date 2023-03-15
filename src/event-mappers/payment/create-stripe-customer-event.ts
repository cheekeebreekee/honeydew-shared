import { DETAIL_TYPES } from "../../events/detail-types";

export const createStripeCustomerEvent = (patientId: string, email: string, name: string) => ({
  payload: {
    patientId,
    email,
    name,
  },
  eventType: DETAIL_TYPES.CREATE_STRIPE_CUSTOMER,
});
