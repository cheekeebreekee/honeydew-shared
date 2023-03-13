import { DETAIL_TYPES } from "../../events/detail-types";
import { UpdateInternalCreditEvent } from "../../types";

export const updateInternalCreditEvent = (
  customerId: string,
  amount: number,
  description: string
) => ({
  payload: {
    customerId,
    amount,
    description,
  } as UpdateInternalCreditEvent,
  eventType: DETAIL_TYPES.UPDATE_INTERNAL_CREDIT,
});
