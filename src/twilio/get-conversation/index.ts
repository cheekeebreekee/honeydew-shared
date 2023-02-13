import { logInfo } from "../../utils/logger";
import { twilioClient } from "../shared";

export const getConversation = async (patientId: string) => {
  logInfo("Checking chat existence", {
    patientId,
  });
  try {
    const conversation = await twilioClient.conversations.conversations
      .get(patientId)
      .fetch();
    logInfo("Conversation found", conversation);
    return conversation;
  } catch (e: any) {
    if (e.status === 404) {
      logInfo("No such conversation found");
      return null;
    }
    throw e;
  }
};
