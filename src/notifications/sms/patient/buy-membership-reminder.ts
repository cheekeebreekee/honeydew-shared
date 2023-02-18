import { NotificationEvent, NOTIFICATION_TYPES } from "src/types";
import { publishEvent } from "src/events";
import { DETAIL_TYPES } from "src/events/detail-types";
import { trimPhoneNumber } from "../../../utils/trim-phone-number";
import { logDebug } from "../../../utils/logger";

const generateNotification = (step: number) => async (phone: string) => {
  logDebug("Sending SMS message about buying membership");
  const payload: NotificationEvent = {
    type: NOTIFICATION_TYPES.SMS,
    targetAddresses: [trimPhoneNumber(phone)],
    template: "buy-membership-reminder",
    data: {
      step,
    },
  };

  await publishEvent(JSON.stringify(payload), DETAIL_TYPES.NOTIFICATIONS);
  logDebug("Notificaton sent successfully");
};

export const buyMembership = {
  afterAppointment: generateNotification(0),
  afterTwoHours: generateNotification(1),
  afterOneDay: generateNotification(2),
  afterThreeDays: generateNotification(3),
  afterOneWeek: generateNotification(4),
};
