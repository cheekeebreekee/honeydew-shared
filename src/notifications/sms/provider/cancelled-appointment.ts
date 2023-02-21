import { trimPhoneNumber } from "../../../utils/trim-phone-number";
import { Patient } from "../../../types/Patient";
import { Provider } from "../../../types/Provider";
import { getDatePretty } from "../../../utils/get-date-pretty";
import { getPatientInitials } from "../../../utils/get-patient-initials";
import { logDebug } from "../../../utils/logger";
import { publishEvent } from "../../../events";
import { DETAIL_TYPES } from "../../../events/detail-types";
import { HoneydewNotificationEvent, NOTIFICATION_TYPES } from "../../../types";

export const cancelledAppointment = async (provider: Provider, patient: Patient) => {
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
        initials: getPatientInitials(patient),
        dateOfBirth: patient.basicInfo.birthdate,
        appointmentDate: getDatePretty(patient.appointments[0].start_time),
        phone: patient.phone,
      },
    },
  };

  await publishEvent(JSON.stringify(payload), DETAIL_TYPES.NOTIFICATIONS);
  // logDebug("SMS message disabled");
  logDebug("Provider notified successfully");
};
