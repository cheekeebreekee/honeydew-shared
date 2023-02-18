import { NotificationEvent, NOTIFICATION_TYPES } from "src/types";
import { publishEvent } from "src/events";
import { DETAIL_TYPES } from "src/events/detail-types";
import { logDebug } from "src/utils";

interface Props {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  title?: string;
}

export const newAccount = async ({
  firstName,
  lastName,
  password,
  email,
  title,
}: Props) => {
  logDebug("Sending email message about new account");

  const payload: NotificationEvent = {
    type: NOTIFICATION_TYPES.EMAIL,
    targetAddresses: [email],
    template: "new-account",
    data: {
      emailSubject: "Welcome to Honeydew!",
      firstName,
      lastName,
      password,
      title,
    },
  };

  await publishEvent(JSON.stringify(payload), DETAIL_TYPES.NOTIFICATIONS);
};
