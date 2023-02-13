"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeParticipant = void 0;
const __1 = require("..");
const logger_1 = require("../../utils/logger");
const removeParticipant = async (patient, employee) => {
    (0, logger_1.logInfo)("Removing a participant to chat", {
        patient,
        employee,
    });
    const conversation = await __1.TwilioService.getConversation(patient.id);
    if (!conversation) {
        (0, logger_1.logError)("An attempt to add care team to non-existing chat appeared");
        return;
    }
    const participants = await conversation.participants().list();
    const participantToRemove = participants.find(({ identity }) => identity === employee.email);
    if (!participantToRemove) {
        (0, logger_1.logInfo)("No chat participant found to be removed");
    }
    else {
        await participantToRemove.remove();
        (0, logger_1.logInfo)("Participant has been removed successfully");
    }
};
exports.removeParticipant = removeParticipant;
//# sourceMappingURL=index.js.map