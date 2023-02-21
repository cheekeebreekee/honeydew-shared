import { trimPhoneNumber } from "../../../utils/trim-phone-number";
import { CareCoordinator } from "../../../types/CareCoordinator";
import { Patient } from "../../../types/Patient";
import { getDatePretty } from "../../../utils/get-date-pretty";
import { getPatientInitials } from "../../../utils/get-patient-initials";
import { logDebug } from "../../../utils/logger";
import { HoneydewNotificationEvent, NOTIFICATION_TYPES } from "../../../types";

export const newAppointment = async (careCoordinator: CareCoordinator, patient: Patient) => {
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
