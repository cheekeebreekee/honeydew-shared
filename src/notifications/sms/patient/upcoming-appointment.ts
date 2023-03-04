import { trimPhoneNumber } from "../../../utils/trim-phone-number";
import { logDebug } from "../../../utils/logger";
import { publishEvent } from "../../../events";
import { DETAIL_TYPES } from "../../../events/detail-types";
import { HoneydewNotificationEvent, NOTIFICATION_TYPES } from "../../../types";

export const upcomingAppointment = async (
  phone: string,
  appointmentDate: string | number | Date,
  patientId: string
) => {
  logDebug("Sending SMS notifications to patients about upcoming appointment", {
    phone,
  });
  const payload: HoneydewNotificationEvent = {
    type: NOTIFICATION_TYPES.INTERACTIVE_SMS,
    targetAddresses: [trimPhoneNumber(phone)],
    template: "upcoming-appointment",
    data: {
      appointmentDate,
    },
    patientId,
  };

  await publishEvent(JSON.stringify(payload), DETAIL_TYPES.NOTIFICATIONS);
  logDebug("Patients notified successfully");
};
