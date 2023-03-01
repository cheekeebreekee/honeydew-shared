import { trimPhoneNumber } from "../../../utils/trim-phone-number";
import { logDebug } from "../../../utils/logger";
import { publishEvent } from "../../../events";
import { DETAIL_TYPES } from "../../../events/detail-types";
import { HoneydewNotificationEvent, NOTIFICATION_TYPES } from "../../../types";
import { getInitials } from "../../../utils";

interface Props {
  provider: {
    firstName: string;
    lastName: string;
    phone: string;
  };
  patient: {
    fullName: string;
    dateOfBirth: string;
    phone: string;
  };
}

export const newMessageInChat = async ({ patient, provider }: Props) => {
  logDebug("Sending SMS message to provider about new message in chat", {
    patient,
    provider,
  });
  const { firstName, lastName, phone } = provider;
  const payload: HoneydewNotificationEvent = {
    type: NOTIFICATION_TYPES.SMS,
    targetAddresses: [trimPhoneNumber(phone)],
    template: "new-chat-message",
    data: {
      fullName: `${firstName} ${lastName}`,
      patient: {
        dateOfBirth: patient.dateOfBirth,
        initials: getInitials(patient.fullName),
      },
    },
  };

  await publishEvent(JSON.stringify(payload), DETAIL_TYPES.NOTIFICATIONS);
  logDebug("Provider notified successfully");
};
