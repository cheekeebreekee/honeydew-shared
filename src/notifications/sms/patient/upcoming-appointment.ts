import { NotificationEvent, NOTIFICATION_TYPES } from "src/types";
import { publishEvent } from "src/events";
import { DETAIL_TYPES } from "src/events/detail-types";
import { trimPhoneNumber } from "../../../utils/trim-phone-number";
import { logDebug } from "../../../utils/logger";

export const upcomingAppointment = async (
  phone: string,
  appointmentDate: string | number | Date
) => {
  logDebug("Sending SMS notifications to patients about upcoming appointment", {
    phone,
  });
  const payload: NotificationEvent = {
    type: NOTIFICATION_TYPES.INTERACTIVE_SMS,
    targetAddresses: [trimPhoneNumber(phone)],
    template: "upcoming-appointment",
    data: {
      appointmentDate,
    },
  };

  await publishEvent(JSON.stringify(payload), DETAIL_TYPES.NOTIFICATIONS);
  logDebug("Patients notified successfully");
};
