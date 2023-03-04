import { publishEvent } from "../events";
import { DETAIL_TYPES } from "../events/detail-types";
import { ChatActionEventPayload, CHAT_ACTIONS_TYPES } from "../types";
import { logDebug } from "../utils";

type CreateConversationProps = {
  chatUniqueName: string;
  patientFullName: string;
};

export const createConversation = async (props: CreateConversationProps) => {
  logDebug("Sending chat conversation creation event", props);

  const payload: ChatActionEventPayload = {
    chatUniqueName: props.chatUniqueName,
    payload: {
      type: CHAT_ACTIONS_TYPES.CREATE,
      body: {
        patientFullName: props.patientFullName,
      },
    },
  };

  await publishEvent(JSON.stringify(payload), DETAIL_TYPES.CHAT_ACTIONS);
};
