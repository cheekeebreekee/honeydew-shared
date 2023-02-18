import { NotificationEvent, NOTIFICATION_TYPES } from "src/types";
import { getDatePretty, getPatientInitials } from "src/utils";
import { CareCoordinator } from "../../../types/CareCoordinator";
import { Patient } from "../../../types/Patient";
import { logDebug } from "../../../utils/logger";

export const appointmentToDecline = async (
  careCoordinator: CareCoordinator,
  patient: Patient
) => {
  const { firstName, lastName, phone } = careCoordinator;
  logDebug(
    "Sending SMS message to care coordinator about appointment to decline",
    {
      careCoordinator,
    }
  );
  const payload: NotificationEvent = {
    type: NOTIFICATION_TYPES.SMS,
    targetAddresses: [phone],
    template: "appointment-to-decline",
    data: {
      fullName: `${firstName} ${lastName}`,
      patient: {
        initials: getPatientInitials(patient),
        dateOfBirth: patient.basicInfo.birthdate,
        appointmentDate: getDatePretty(patient.appointments[0].start_time),
        phone: patient.phone,
      },
    },
  };

  // await publishEvent(JSON.stringify(payload), DETAIL_TYPES.NOTIFICATIONS);
  logDebug("SMS message disabled");
  // logInfo("Care coordinator notified successfully");
};
