import { publishEvent } from "../events";
import { DETAIL_TYPES } from "../events/detail-types";
import { ChatActionEventPayload, CHAT_ACTIONS_TYPES } from "../types";
import { USER_ROLES } from "../types/Main";
import { logDebug } from "../utils";

type AddParticipantProps = {
  chatUniqueName: string;
  userId: string;
  userRole: USER_ROLES;
};

export const addParticipant = async (props: AddParticipantProps) => {
  logDebug("Sending participant creation in chat event", props);

  const payload: ChatActionEventPayload = {
    chatUniqueName: props.chatUniqueName,
    payload: {
      type: CHAT_ACTIONS_TYPES.ADD_PARTICIPANT,
      body: {
        userId: props.userId,
        role: props.userRole,
      },
    },
  };

  await publishEvent(JSON.stringify(payload), DETAIL_TYPES.CHAT_ACTIONS);
};
