import { NotificationEvent, NOTIFICATION_TYPES } from "src/types";
import { publishEvent } from "src/events";
import { DETAIL_TYPES } from "src/events/detail-types";
import { getMomentDate } from "src/utils";
import { trimPhoneNumber } from "../../../utils/trim-phone-number";
import { logDebug } from "../../../utils/logger";

export const skippedAppointment = async (
  patientId: string,
  phone: string,
  appointmentDate: string | number | Date
) => {
  logDebug("Sending SMS message to patient about skipped appointment", {
    patientId,
    appointmentDate,
  });
  const payload: NotificationEvent = {
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
