import { getMomentDate } from "src/utils/get-date-pretty";
import { NotificationEvent, NOTIFICATION_TYPES } from "src/types";
import { publishEvent } from "src/events";
import { DETAIL_TYPES } from "src/events/detail-types";
import { trimPhoneNumber } from "../../../utils/trim-phone-number";
import { logDebug } from "../../../utils/logger";

export const fillMedicalBackground = async (
  phone: string,
  appointmentDate: string | number | Date
) => {
  logDebug("Sending SMS message to patient about filling medical background");
  const payload: NotificationEvent = {
    type: NOTIFICATION_TYPES.SMS,
    targetAddresses: [trimPhoneNumber(phone)],
    template: "fill-medical-background",
    data: {
      appointmentDate: getMomentDate(appointmentDate).format("MMMM Do, h:mm A"),
    },
  };

  await publishEvent(JSON.stringify(payload), DETAIL_TYPES.NOTIFICATIONS);
  logDebug("Patient notified successfully");
};
