import { ParticipantInstance } from "twilio/lib/rest/conversations/v1/conversation/participant";
import { ChatParticipantAttributes } from "../types/Chat";

export const mapChatParticipantAttributes = (
  participant: ParticipantInstance
): ChatParticipantAttributes => JSON.parse(participant.attributes);
