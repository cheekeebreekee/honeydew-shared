import { publishEvent } from "../../../events";
import { DETAIL_TYPES } from "../../../events/detail-types";
import { HoneydewNotificationEvent, NOTIFICATION_TYPES, Patient, Provider } from "../../../types";
import { logDebug } from "../../../utils";

export const appointmentBooked = async (patient: Patient, provider: Provider) => {
  logDebug("Sending email message to patient about booked appointment", {
    patient,
    provider,
  });

  const emails = [
    patient.email,
    "info@honeydewcare.com", // TODO: move to env config
  ];

  if (patient.basicInfo.parentsEmail) emails.push(patient.basicInfo.parentsEmail);

  const payload: HoneydewNotificationEvent = {
    type: NOTIFICATION_TYPES.EMAIL,
    targetAddresses: emails,
    template: "appointment-booked",
    data: {
      patient: {
        fullName: patient.full_name,
        phone: patient.phone,
        email: patient.email,
        appointmentTime: patient.appointments[0].start_time_pretty,
      },
      provider: {
        firstName: provider.firstName,
        lastName: provider.lastName,
      },
      emailSubject: "New appointment booked!",
    },
  };

  await publishEvent(JSON.stringify(payload), DETAIL_TYPES.NOTIFICATIONS);
  logDebug("Email message sent successfully");
};
