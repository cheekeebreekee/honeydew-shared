import { logDebug } from "src/utils";
import { NotificationEvent, NOTIFICATION_TYPES } from "src/types";
import { DETAIL_TYPES } from "src/events/detail-types";
import { publishEvent } from "src/events";

export const newMessageInChat = async (phone: string) => {
  logDebug("Sending SMS message about new message in chat");
  const payload: NotificationEvent = {
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
