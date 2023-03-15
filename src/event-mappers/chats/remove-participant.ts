import { DETAIL_TYPES } from "../../events/detail-types";
import { ChatActionEventPayload, CHAT_ACTIONS_TYPES, USER_ROLES } from "../../types";

type RemoveParticipantProps = {
  chatUniqueName: string;
  userId: string;
};

export const removeParticipantEvent = ({ chatUniqueName, userId }: RemoveParticipantProps) => ({
  payload: {
    chatUniqueName,
    payload: {
      type: CHAT_ACTIONS_TYPES.REMOVE_PARTICIPANT,
      body: {
        userId,
      },
    },
  } as ChatActionEventPayload,
  eventType: DETAIL_TYPES.CHAT_ACTIONS,
});
