import { USER_ROLES } from "./Main";

export enum CHAT_ACTIONS_TYPES {
  CREATE = "create",
  ADD_PARTICIPANT = "add-participant",
  REMOVE_PARTICIPANT = "remove-participant",
  DELETE_CONVERSATION = "delete-conversation",
}

export type ChatCreateActionEvent = {
  type: CHAT_ACTIONS_TYPES.CREATE;
  body: {
    patientFullName: string;
  };
};

export type ChatAddParticipantActionEvent = {
  type: CHAT_ACTIONS_TYPES.ADD_PARTICIPANT;
  body: {
    userId: string;
    role: USER_ROLES;
  };
};

export type ChatRemoveParticipantActionEvent = {
  type: CHAT_ACTIONS_TYPES.REMOVE_PARTICIPANT;
  body: {
    userId: string;
  };
};

export type ChatDeleteConversationActionEvent = {
  type: CHAT_ACTIONS_TYPES.DELETE_CONVERSATION;
};

export type ChatActionEvent =
  | ChatCreateActionEvent
  | ChatAddParticipantActionEvent
  | ChatRemoveParticipantActionEvent
  | ChatDeleteConversationActionEvent;

export interface ChatActionEventPayload {
  chatUniqueName: string;
  payload: ChatActionEvent;
}

export interface Attachment {
  type: string;
  data: string | any;
}
