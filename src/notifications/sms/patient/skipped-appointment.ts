import { trimPhoneNumber } from "../../../utils/trim-phone-number";
import { logDebug } from "../../../utils/logger";
import { publishEvent } from "../../../events";
import { DETAIL_TYPES } from "../../../events/detail-types";
import { HoneydewNotificationEvent, NOTIFICATION_TYPES } from "../../../types";
import { getMomentDate } from "../../../utils";

export const skippedAppointment = async (
  patientId: string,
  phone: string,
  appointmentDate: string | number | Date
) => {
  logDebug("Sending SMS message to patient about skipped appointment", {
    patientId,
    appointmentDate,
  });
  const payload: HoneydewNotificationEvent = {
    type: NOTIFICATION_TYPES.SMS,
    targetAddresses: [trimPhoneNumber(phone)],
    template: "skipped-appointment",
    data: {
      appointmentDate: getMomentDate(appointmentDate).format("MMMM Do, h:mm A"),
      patientId,
    },
  };

  await publishEvent(JSON.stringify(payload), DETAIL_TYPES.NOTIFICATIONS);
  logDebug("Patient notified successfully");
};
