import { DETAIL_TYPES } from "../../events/detail-types";
import { AppointmentScheduledFbEvent } from "../../types/EventBridge";

export const appointmentScheduledFbEvent = (payload: AppointmentScheduledFbEvent) => ({
  payload: {
    patientId: payload.email,
  },
  eventType: DETAIL_TYPES.MARKETING_FACEBOOK_EVENT,
});
