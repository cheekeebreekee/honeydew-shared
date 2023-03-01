import { publishEvent } from "../../../events";
import { DETAIL_TYPES } from "../../../events/detail-types";
import { HoneydewNotificationEvent, NOTIFICATION_TYPES } from "../../../types";
import { logDebug } from "../../../utils";

interface Props {
  email: string;
  firstName: string;
  lastName: string;
}

export const newVisitNotes = async (props: Props) => {
  logDebug("Sending email to care coordinator about new visit notes submitted", props);

  const payload: HoneydewNotificationEvent = {
    type: NOTIFICATION_TYPES.EMAIL,
    targetAddresses: [props.email],
    template: "new-visit-notes",
    data: {
      emailSubject: "New visit submission!",
      fullName: `${props.firstName} ${props.lastName}`,
    },
  };

  await publishEvent(JSON.stringify(payload), DETAIL_TYPES.NOTIFICATIONS);
};
