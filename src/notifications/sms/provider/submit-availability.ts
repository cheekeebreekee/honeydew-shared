import { trimPhoneNumber } from "../../../utils/trim-phone-number";
import { Provider } from "../../../types/Provider";
import { logDebug } from "../../../utils/logger";
import { publishEvent } from "../../../events";
import { DETAIL_TYPES } from "../../../events/detail-types";
import { HoneydewNotificationEvent, NOTIFICATION_TYPES } from "../../../types";

export const submitAvailability = async (provider: Provider) => {
  logDebug("Sending SMS message to provider about submitting availability", {
    provider,
  });
  const { title, firstName, lastName, phone } = provider;
  const payload: HoneydewNotificationEvent = {
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
