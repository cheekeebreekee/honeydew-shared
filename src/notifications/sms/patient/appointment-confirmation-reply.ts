import { NotificationEvent, NOTIFICATION_TYPES } from "src/types";
import { publishEvent } from "src/events";
import { DETAIL_TYPES } from "src/events/detail-types";
import { trimPhoneNumber } from "../../../utils/trim-phone-number";
import { logDebug } from "../../../utils/logger";

export const appointmentConfirmationReply = async (phone: string) => {
  logDebug(
    "Sending SMS reply message to patient about appointment confirmation",
    {
      phone,
    }
  );
  const payload: NotificationEvent = {
    type: NOTIFICATION_TYPES.SMS,
    targetAddresses: [trimPhoneNumber(phone)],
    template: "appointment-notification-reply",
    data: {
      phone,
      isCancellation: false,
    },
  };

  await publishEvent(JSON.stringify(payload), DETAIL_TYPES.NOTIFICATIONS);
  logDebug("Patient notified successfully");
};
