import { publishEvent } from "src/events";
import { DETAIL_TYPES } from "src/events/detail-types";
import { NotificationEvent, NOTIFICATION_TYPES } from "src/types";
import { trimPhoneNumber } from "../../../utils/trim-phone-number";
import { logDebug } from "../../../utils/logger";

export const treatmentPlansToDo = async (phone: string) => {
  logDebug("Sending SMS message to provider about treatment plans to do", {
    phone,
  });
  const payload: NotificationEvent = {
    type: NOTIFICATION_TYPES.SMS,
    targetAddresses: [trimPhoneNumber(phone)],
    template: "treatment-plans-to-do",
    data: {
      phone,
    },
  };

  await publishEvent(JSON.stringify(payload), DETAIL_TYPES.NOTIFICATIONS);
  logDebug("Provider notified successfully");
};
