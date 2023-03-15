import { DETAIL_TYPES } from "../../events/detail-types";
import { ChatActionEventPayload, CHAT_ACTIONS_TYPES, USER_ROLES } from "../../types";

type DeleteConversationProps = {
  chatUniqueName: string;
};

export const deleteConversationEvent = ({ chatUniqueName }: DeleteConversationProps) => ({
  payload: {
    chatUniqueName,
    payload: {
      type: CHAT_ACTIONS_TYPES.DELETE_CONVERSATION,
    },
  } as ChatActionEventPayload,
  eventType: DETAIL_TYPES.CHAT_ACTIONS,
});
