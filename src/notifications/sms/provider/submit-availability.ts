import { trimPhoneNumber } from "../../../utils/trim-phone-number";
import { logDebug } from "../../../utils/logger";
import { publishEvent } from "../../../events";
import { DETAIL_TYPES } from "../../../events/detail-types";
import { HoneydewNotificationEvent, NOTIFICATION_TYPES } from "../../../types";

interface Props {
  title: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export const submitAvailability = async (props: Props) => {
  logDebug("Sending SMS message to provider about submitting availability", {
    props,
  });
  const { title, firstName, lastName, phone } = props;
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
