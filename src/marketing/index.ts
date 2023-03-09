import { publishEvent } from "../events";
import { DETAIL_TYPES } from "../events/detail-types";
import { logInfo } from "../utils/logger";

async function setStatusTag(patientId: string, statusName: string, isActive: boolean) {
  logInfo("Setting marketing tag to the patient", {
    patientId,
    statusName,
    isActive,
  });
  await publishEvent(
    JSON.stringify({
      patientId,
      tag: statusName,
      add: isActive,
    }),
    DETAIL_TYPES.MARKETING_UPDATES
  );
}

export const MarketingService = {
  setStatusTag,
};
