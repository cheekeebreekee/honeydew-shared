import { HoneydewNotificationEvent, NOTIFICATION_TYPES } from "../../../types";
import { getDatePretty, getInitials } from "../../../utils";
import { logDebug } from "../../../utils/logger";

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

export const appointmentToDecline = async ({ patient, careCoordinator }: Props) => {
  const { firstName, lastName, phone } = careCoordinator;
  logDebug("Sending SMS message to care coordinator about appointment to decline", {
    careCoordinator,
  });
  const payload: HoneydewNotificationEvent = {
    type: NOTIFICATION_TYPES.SMS,
    targetAddresses: [phone],
    template: "appointment-to-decline",
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
