import { EVENTBRIDGE_EVENT_TYPES, SetStatusTagEventPayload } from "../types/EventBridge";

export const mapToMarketingSetStatusTagEvent = (payload: SetStatusTagEventPayload) => {
  return {
    payload: {
      patientId: payload.patientId,
      statusTag: payload.statusTag,
      isActive: payload.isActive,
    },
    eventType: EVENTBRIDGE_EVENT_TYPES.MARKETING_SET_STATUS_TAG,
  };
};
