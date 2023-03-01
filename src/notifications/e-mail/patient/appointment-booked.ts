import { publishEvent } from "../../../events";
import { DETAIL_TYPES } from "../../../events/detail-types";
import { HoneydewNotificationEvent, NOTIFICATION_TYPES, Patient, Provider } from "../../../types";
import { logDebug } from "../../../utils";

interface Props {
  patient: {
    email: string;
    parentsEmail?: string;
    fullName: string;
    phone: string;
    appointmentDate: string;
  };
  provider: {
    firstName: string;
    lastName: string;
  };
}

export const appointmentBooked = async ({ patient, provider }: Props) => {
  logDebug("Sending email message to patient about booked appointment", {
    patient,
    provider,
  });

  const emails = [
    patient.email,
    "info@honeydewcare.com", // TODO: move to env config
  ];

  if (patient.parentsEmail) emails.push(patient.parentsEmail);

  const payload: HoneydewNotificationEvent = {
    type: NOTIFICATION_TYPES.EMAIL,
    targetAddresses: emails,
    template: "appointment-booked",
    data: {
      patient: {
        fullName: patient.fullName,
        phone: patient.phone,
        email: patient.email,
        appointmentTime: patient.appointmentDate,
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
