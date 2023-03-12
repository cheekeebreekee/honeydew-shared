import { DETAIL_TYPES } from "../../events/detail-types";
import { SetStatusTagEventPayload } from "../../types/EventBridge";

export const marketingSetStatusTagEvent = (payload: SetStatusTagEventPayload) => ({
  payload: {
    patientId: payload.patientId,
    tag: payload.tag,
    add: payload.add,
  },
  eventType: DETAIL_TYPES.MARKETING_SET_STATUS_TAG,
});
