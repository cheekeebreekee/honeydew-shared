import { trimPhoneNumber } from "../../../utils/trim-phone-number";
import { logDebug } from "../../../utils/logger";
import { HoneydewNotificationEvent, NOTIFICATION_TYPES } from "../../../types";
import { publishEvent } from "../../../events";
import { DETAIL_TYPES } from "../../../events/detail-types";

export const appointmentCancellationReply = async (patientId: string, phone: string) => {
  logDebug("Sending SMS reply message to patient about rescheduling an appointment", {
    patientId,
    phone,
  });
  const payload: HoneydewNotificationEvent = {
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
