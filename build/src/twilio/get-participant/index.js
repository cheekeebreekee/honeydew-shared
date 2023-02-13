"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getParticipant = void 0;
const logger_1 = require("../../utils/logger");
const shared_1 = require("../shared");
const getParticipant = async (conversationSid, participantSid) => {
    (0, logger_1.logInfo)("Get participants of the chat conversation", {
        conversationSid,
        participantSid,
    });
    const participants = await shared_1.twilioClient.conversations
        .conversations(conversationSid)
        .participants(participantSid)
        .fetch();
    (0, logger_1.logInfo)("Participants found", participants);
    return participants;
};
exports.getParticipant = getParticipant;
//# sourceMappingURL=index.js.map