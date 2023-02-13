import { getUserByReferralId } from "./methods/get-user-by-referral-id";
import { getUserByCode } from "./methods/get-user-by-code";
import { createUser } from "./methods/create-user";
import { qualifyUserByReferralId } from "./methods/qualify-user-by-referral-id";

export const ReferralFactoryService = {
  qualifyUserByReferralId,
  getUserByReferralId,
  getUserByCode,
  createUser,
};
