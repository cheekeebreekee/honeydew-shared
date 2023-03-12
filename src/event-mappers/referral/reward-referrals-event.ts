import { DETAIL_TYPES } from "../../events/detail-types";

export const rewardReferralsEvent = (patientId: string) => ({
  payload: {
    patientId,
  },
  eventType: DETAIL_TYPES.REWARD_REFERRALS,
});
