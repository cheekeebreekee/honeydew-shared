import { trimPhoneNumber } from "../../../utils/trim-phone-number";
import { getDatePretty } from "../../../utils/get-date-pretty";
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
    appointmentDate: string;
    phone: string;
  };
}

export const cancelledAppointment = async ({ patient, provider }: Props) => {
  logDebug("Sending SMS message to provider about cancelled appointment", {
    provider,
    patient,
  });
  const { firstName, lastName, phone } = provider;
  const payload: HoneydewNotificationEvent = {
    type: NOTIFICATION_TYPES.SMS,
    targetAddresses: [trimPhoneNumber(phone)],
    template: "cancelled-appointment",
    data: {
      fullName: `${firstName} ${lastName}`,
      patient: {
        initials: getInitials(patient.fullName),
        dateOfBirth: patient.dateOfBirth,
        appointmentDate: getDatePretty(patient.appointmentDate),
        phone: patient.phone,
      },
    },
  };

  await publishEvent(JSON.stringify(payload), DETAIL_TYPES.NOTIFICATIONS);
  // logDebug("SMS message disabled");
  logDebug("Provider notified successfully");
};
