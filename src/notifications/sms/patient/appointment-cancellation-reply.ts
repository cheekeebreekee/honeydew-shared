import { NotificationEvent, NOTIFICATION_TYPES } from "src/types";
import { DETAIL_TYPES } from "src/events/detail-types";
import { publishEvent } from "src/events";
import { trimPhoneNumber } from "../../../utils/trim-phone-number";
import { logDebug } from "../../../utils/logger";

export const appointmentCancellationReply = async (
  patientId: string,
  phone: string
) => {
  logDebug(
    "Sending SMS reply message to patient about rescheduling an appointment",
    {
      patientId,
      phone,
    }
  );
  const payload: NotificationEvent = {
    type: NOTIFICATION_TYPES.SMS,
    targetAddresses: [trimPhoneNumber(phone)],
    template: "appointment-notification-reply",
    data: {
      phone,
      patientId,
      isCancellation: true,
    },
  };

  await publishEvent(JSON.stringify(payload), DETAIL_TYPES.NOTIFICATIONS);
  logDebug("Patient notified successfully");
};
