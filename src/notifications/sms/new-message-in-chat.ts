import { publishEvent } from "../../events";
import { DETAIL_TYPES } from "../../events/detail-types";
import { HoneydewNotificationEvent, NOTIFICATION_TYPES } from "../../types";
import { logDebug } from "../../utils";

export const newMessageInChat = async (phone: string) => {
  logDebug("Sending SMS message about new message in chat");
  const payload: HoneydewNotificationEvent = {
    type: NOTIFICATION_TYPES.SMS,
    targetAddresses: [phone],
    template: "new-chat-message",
    data: {
      phone,
    },
  };

  await publishEvent(JSON.stringify(payload), DETAIL_TYPES.NOTIFICATIONS);
  logDebug("Notification sent successfully");
};
