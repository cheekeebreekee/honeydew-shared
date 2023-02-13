"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateChatInfoPayload = void 0;
const generateChatInfoPayload = (identity, messageCreatedTimestamp, chatInfo) => ({
    ...chatInfo,
    lastMessageSentTimestamp: messageCreatedTimestamp,
    lastMessageSentByRole: identity,
});
exports.generateChatInfoPayload = generateChatInfoPayload;
//# sourceMappingURL=generate-chat-info-payload.js.map