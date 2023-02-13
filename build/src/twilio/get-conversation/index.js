"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConversation = void 0;
const logger_1 = require("../../utils/logger");
const shared_1 = require("../shared");
const getConversation = async (patientId) => {
    (0, logger_1.logInfo)("Checking chat existence", {
        patientId,
    });
    try {
        const conversation = await shared_1.twilioClient.conversations.conversations
            .get(patientId)
            .fetch();
        (0, logger_1.logInfo)("Conversation found", conversation);
        return conversation;
    }
    catch (e) {
        if (e.status === 404) {
            (0, logger_1.logInfo)("No such conversation found");
            return null;
        }
        throw e;
    }
};
exports.getConversation = getConversation;
//# sourceMappingURL=index.js.map