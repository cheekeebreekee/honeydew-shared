import { publishEvent } from "src/events";
import { DETAIL_TYPES } from "src/events/detail-types";
import {
  CareCoordinator,
  NotificationEvent,
  NOTIFICATION_TYPES,
} from "src/types";
import { logDebug } from "src/utils";

export const newVisitNotes = async (careCoordinator: CareCoordinator) => {
  logDebug(
    "Sending email to care coordinator about new visit notes submitted",
    careCoordinator
  );

  const payload: NotificationEvent = {
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
