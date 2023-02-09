import { ChatInfo } from "../types/Patient";

export const generateChatInfoPayload = (
  identity: string,
  messageCreatedTimestamp: string,
  chatInfo: ChatInfo
) => ({
  ...chatInfo,
  lastMessageSentTimestamp: messageCreatedTimestamp,
  lastMessageSentByRole: identity,
});
