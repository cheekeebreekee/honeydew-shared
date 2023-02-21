import { publishEvent } from "../../events";
import { DETAIL_TYPES } from "../../events/detail-types";
import { HoneydewNotificationEvent, NOTIFICATION_TYPES } from "../../types";
import { logDebug } from "../../utils";

interface Props {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  title?: string;
}

export const newAccount = async ({ firstName, lastName, password, email, title }: Props) => {
  logDebug("Sending email message about new account");

  const payload: HoneydewNotificationEvent = {
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
