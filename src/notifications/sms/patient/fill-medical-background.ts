import { trimPhoneNumber } from "../../../utils/trim-phone-number";
import { logDebug } from "../../../utils/logger";
import { publishEvent } from "../../../events";
import { DETAIL_TYPES } from "../../../events/detail-types";
import { HoneydewNotificationEvent, NOTIFICATION_TYPES } from "../../../types";
import { getMomentDate } from "../../../utils";

export const fillMedicalBackground = async (
  phone: string,
  appointmentDate: string | number | Date
) => {
  logDebug("Sending SMS message to patient about filling medical background");
  const payload: HoneydewNotificationEvent = {
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
