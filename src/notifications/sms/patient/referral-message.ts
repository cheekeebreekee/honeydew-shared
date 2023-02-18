import { NotificationEvent, NOTIFICATION_TYPES } from "src/types";
import { publishEvent } from "src/events";
import { DETAIL_TYPES } from "src/events/detail-types";
import { trimPhoneNumber } from "../../../utils/trim-phone-number";
import { logDebug } from "../../../utils/logger";

const generateNotification = (isReferrer: boolean) => async (phone: string) => {
  logDebug("Sending SMS message to patient about referral earnings");
  const payload: NotificationEvent = {
    type: NOTIFICATION_TYPES.SMS,
    targetAddresses: [trimPhoneNumber(phone)],
    template: "referral-message",
    data: {
      isReferrer,
    },
  };

  await publishEvent(JSON.stringify(payload), DETAIL_TYPES.NOTIFICATIONS);
  logDebug("Patient notified successfully");
};

export const referralMessage = {
  referrer: generateNotification(true),
  referree: generateNotification(false),
};
