import { createConversation } from "./create-conversation";
import { addParticipant } from "./add-participant";
import { removeParticipant } from "./remove-participant";
import { deleteConversation } from "./delete-conversation";

export const ChatService = {
  createConversation,
  addParticipant,
  removeParticipant,
  deleteConversation,
};
