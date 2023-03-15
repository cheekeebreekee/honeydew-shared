import { DETAIL_TYPES } from "../../events/detail-types";
import { ChatActionEventPayload, CHAT_ACTIONS_TYPES, USER_ROLES } from "../../types";

type AddParticipantProps = {
  chatUniqueName: string;
  userId: string;
  userRole: USER_ROLES;
};

export const addParticipantEvent = ({ chatUniqueName, userId, userRole }: AddParticipantProps) => ({
  payload: {
    chatUniqueName,
    payload: {
      type: CHAT_ACTIONS_TYPES.ADD_PARTICIPANT,
      body: {
        userId,
        role: userRole,
      },
    },
  } as ChatActionEventPayload,
  eventType: DETAIL_TYPES.CHAT_ACTIONS,
});
