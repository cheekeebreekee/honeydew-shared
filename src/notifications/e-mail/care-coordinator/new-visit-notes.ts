import { publishEvent } from "../../../events";
import { DETAIL_TYPES } from "../../../events/detail-types";
import { CareCoordinator, HoneydewNotificationEvent, NOTIFICATION_TYPES } from "../../../types";
import { logDebug } from "../../../utils";

export const newVisitNotes = async (careCoordinator: CareCoordinator) => {
  logDebug("Sending email to care coordinator about new visit notes submitted", careCoordinator);

  const payload: HoneydewNotificationEvent = {
    type: NOTIFICATION_TYPES.EMAIL,
    targetAddresses: [careCoordinator.email],
    template: "new-visit-notes",
    data: {
      emailSubject: "New visit submission!",
      fullName: `${careCoordinator.firstName} ${careCoordinator.lastName}`,
    },
  };

  await publishEvent(JSON.stringify(payload), DETAIL_TYPES.NOTIFICATIONS);
};
