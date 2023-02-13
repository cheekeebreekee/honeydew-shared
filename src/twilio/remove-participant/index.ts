import { CareCoordinator } from "src/types/CareCoordinator";
import { Patient } from "src/types/Patient";
import { Provider } from "src/types/Provider";
import { TwilioService } from "..";
import { logError, logInfo } from "../../utils/logger";

export const removeParticipant = async (
  patient: Patient,
  employee: Provider | CareCoordinator
) => {
  logInfo("Removing a participant to chat", {
    patient,
    employee,
  });
  const conversation = await TwilioService.getConversation(patient.id);
  if (!conversation) {
    logError("An attempt to add care team to non-existing chat appeared");
    return;
  }

  const participants = await conversation.participants().list();
  const participantToRemove = participants.find(
    ({ identity }) => identity === employee.email
  );
  if (!participantToRemove) {
    logInfo("No chat participant found to be removed");
  } else {
    await participantToRemove.remove();
    logInfo("Participant has been removed successfully");
  }
};
