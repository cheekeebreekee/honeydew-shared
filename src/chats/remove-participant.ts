import { publishEvent } from "../events";
import { DETAIL_TYPES } from "../events/detail-types";
import { ChatActionEventPayload, CHAT_ACTIONS_TYPES } from "../types";
import { logDebug } from "../utils";

type RemoveParticipantProps = {
  chatUniqueName: string;
  userId: string;
};

export const removeParticipant = async (props: RemoveParticipantProps) => {
  logDebug("Sending participant removal from chat event", props);

  const payload: ChatActionEventPayload = {
    chatUniqueName: props.chatUniqueName,
    payload: {
      type: CHAT_ACTIONS_TYPES.REMOVE_PARTICIPANT,
      body: {
        userId: props.userId,
      },
    },
  };

  await publishEvent(JSON.stringify(payload), DETAIL_TYPES.CHAT_ACTIONS);
};
