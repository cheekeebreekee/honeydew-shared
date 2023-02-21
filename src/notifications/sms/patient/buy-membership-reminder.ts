import { trimPhoneNumber } from "../../../utils/trim-phone-number";
import { logDebug } from "../../../utils/logger";
import { publishEvent } from "../../../events";
import { DETAIL_TYPES } from "../../../events/detail-types";
import { HoneydewNotificationEvent, NOTIFICATION_TYPES } from "../../../types";

const generateNotification = (step: number) => async (phone: string) => {
  logDebug("Sending SMS message about buying membership");
  const payload: HoneydewNotificationEvent = {
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
