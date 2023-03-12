import { EVENTBRIDGE_EVENT_TYPES, SetStatusTagEventPayload } from "../types/EventBridge";

export const mapToMarketingSetStatusTagEvent = (payload: SetStatusTagEventPayload) => {
  return {
    payload: {
      patientId: payload.patientId,
      tag: payload.tag,
      add: payload.add,
    },
    eventType: EVENTBRIDGE_EVENT_TYPES.MARKETING_SET_STATUS_TAG,
  };
};
