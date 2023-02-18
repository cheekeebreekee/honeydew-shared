import { NotificationEvent, NOTIFICATION_TYPES } from "src/types";
import { DETAIL_TYPES } from "src/events/detail-types";
import { publishEvent } from "src/events";
import { trimPhoneNumber } from "src/utils";
import { logDebug } from "../../../utils/logger";

export const newFollowUp = async (phone: string) => {
  logDebug("Sending SMS message to provider about new follow-up");

  const payload: NotificationEvent = {
    type: NOTIFICATION_TYPES.SMS,
    targetAddresses: [trimPhoneNumber(phone)],
    template: "new-follow-up",
    data: {
      phone,
    },
  };

  await publishEvent(JSON.stringify(payload), DETAIL_TYPES.NOTIFICATIONS);
  logDebug("Provider notified successfully");
};
