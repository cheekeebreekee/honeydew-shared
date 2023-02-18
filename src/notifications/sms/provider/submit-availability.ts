import { NotificationEvent, NOTIFICATION_TYPES } from "src/types";
import { DETAIL_TYPES } from "src/events/detail-types";
import { publishEvent } from "src/events";
import { trimPhoneNumber } from "../../../utils/trim-phone-number";
import { Provider } from "../../../types/Provider";
import { logDebug } from "../../../utils/logger";

export const submitAvailability = async (provider: Provider) => {
  logDebug("Sending SMS message to provider about submitting availability", {
    provider,
  });
  const { title, firstName, lastName, phone } = provider;
  const payload: NotificationEvent = {
    type: NOTIFICATION_TYPES.SMS,
    targetAddresses: [trimPhoneNumber(phone)],
    template: "submit-availability",
    data: {
      title,
      firstName,
      lastName,
    },
  };

  await publishEvent(JSON.stringify(payload), DETAIL_TYPES.NOTIFICATIONS);
  logDebug("Provider notified successfully");
};
