import { NotificationEvent, NOTIFICATION_TYPES } from "src/types";
import { DETAIL_TYPES } from "src/events/detail-types";
import { publishEvent } from "src/events";
import { trimPhoneNumber } from "../../../utils/trim-phone-number";
import { logDebug } from "../../../utils/logger";

export const newFollowUpNotes = async (phone: string) => {
  logDebug("Sending SMS message to patient about new follow-up notes", {
    phone,
  });
  const payload: NotificationEvent = {
    type: NOTIFICATION_TYPES.SMS,
    targetAddresses: [trimPhoneNumber(phone)],
    template: "new-follow-up-notes",
    data: {},
  };

  await publishEvent(JSON.stringify(payload), DETAIL_TYPES.NOTIFICATIONS);
  logDebug("Patient notified successfully");
};
