import { DETAIL_TYPES } from "../../events/detail-types";

export const createReferralUserByCodeEvent = (referralCode: string) => ({
  payload: {
    referralCode,
  },
  eventType: DETAIL_TYPES.CREATE_REFERRAL_USER,
});

export const createReferralUserEvent = (fullName: string, email: string) => ({
  payload: {
    fullName,
    email,
  },
  eventType: DETAIL_TYPES.CREATE_REFERRAL_USER,
});
