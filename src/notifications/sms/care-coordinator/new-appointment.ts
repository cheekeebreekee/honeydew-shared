import { trimPhoneNumber } from "../../../utils/trim-phone-number";
import { getDatePretty } from "../../../utils/get-date-pretty";
import { logDebug } from "../../../utils/logger";
import { HoneydewNotificationEvent, NOTIFICATION_TYPES } from "../../../types";
import { getInitials } from "../../../utils";

interface Props {
  patient: {
    dateOfbirth: string;
    appointmentDate: string;
    fullName: string;
    phone: string;
  };
  careCoordinator: {
    firstName: string;
    lastName: string;
    phone: string;
  };
}

export const newAppointment = async ({ patient, careCoordinator }: Props) => {
  const { firstName, lastName, phone } = careCoordinator;
  logDebug("Sending SMS message to care coordinator about new appointment", {
    careCoordinator,
    patient,
  });
  const payload: HoneydewNotificationEvent = {
    type: NOTIFICATION_TYPES.SMS,
    targetAddresses: [trimPhoneNumber(phone)],
    template: "new-appointment",
    data: {
      fullName: `${firstName} ${lastName}`,
      patient: {
        initials: getInitials(patient.fullName),
        dateOfBirth: patient.dateOfbirth,
        appointmentDate: getDatePretty(patient.appointmentDate),
        phone: patient.phone,
      },
    },
  };

  // await publishEvent(JSON.stringify(payload), DETAIL_TYPES.NOTIFICATIONS);
  logDebug("SMS message disabled");
  // logInfo("Care coordinator notified successfully");
};
