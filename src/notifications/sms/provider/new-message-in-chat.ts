import { trimPhoneNumber } from "../../../utils/trim-phone-number";
import { Patient } from "../../../types/Patient";
import { Provider } from "../../../types/Provider";
import { getPatientInitials } from "../../../utils/get-patient-initials";
import { logDebug } from "../../../utils/logger";
import { publishEvent } from "../../../events";
import { DETAIL_TYPES } from "../../../events/detail-types";
import { HoneydewNotificationEvent, NOTIFICATION_TYPES } from "../../../types";

export const newMessageInChat = async (patient: Patient, provider: Provider) => {
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
        dateOfBirth: patient.basicInfo.birthdate,
        initials: getPatientInitials(patient),
      },
    },
  };

  await publishEvent(JSON.stringify(payload), DETAIL_TYPES.NOTIFICATIONS);
  logDebug("Provider notified successfully");
};
