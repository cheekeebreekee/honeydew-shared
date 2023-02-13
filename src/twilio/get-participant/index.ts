import { logInfo } from "../../utils/logger";
import { twilioClient } from "../shared";

export const getParticipant = async (
  conversationSid: string,
  participantSid: string
) => {
  logInfo("Get participants of the chat conversation", {
    conversationSid,
    participantSid,
  });
  const participants = await twilioClient.conversations
    .conversations(conversationSid)
    .participants(participantSid)
    .fetch();
  logInfo("Participants found", participants);
  return participants;
};
