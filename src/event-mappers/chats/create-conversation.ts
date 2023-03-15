import { DETAIL_TYPES } from "../../events/detail-types";
import { ChatActionEventPayload, CHAT_ACTIONS_TYPES, USER_ROLES } from "../../types";

type CreateConversationProps = {
  chatUniqueName: string;
  patientFullName: string;
};

export const createConversationEvent = ({
  chatUniqueName,
  patientFullName,
}: CreateConversationProps) => ({
  payload: {
    chatUniqueName,
    payload: {
      type: CHAT_ACTIONS_TYPES.CREATE,
      body: {
        patientFullName,
      },
    },
  } as ChatActionEventPayload,
  eventType: DETAIL_TYPES.CHAT_ACTIONS,
});
