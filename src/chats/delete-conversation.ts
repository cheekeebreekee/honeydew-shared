import { publishEvent } from "../events";
import { DETAIL_TYPES } from "../events/detail-types";
import { ChatActionEventPayload, CHAT_ACTIONS_TYPES } from "../types";
import { logDebug } from "../utils";

type DeleteConversationProps = {
  chatUniqueName: string;
};

export const deleteConversation = async (props: DeleteConversationProps) => {
  logDebug("Sending conversation deletion event", props);

  const payload: ChatActionEventPayload = {
    chatUniqueName: props.chatUniqueName,
    payload: {
      type: CHAT_ACTIONS_TYPES.DELETE_CONVERSATION,
    },
  };

  await publishEvent(JSON.stringify(payload), DETAIL_TYPES.CHAT_ACTIONS);
};
