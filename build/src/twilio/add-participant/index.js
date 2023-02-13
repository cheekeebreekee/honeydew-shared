"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addParticipant = void 0;
const __1 = require("..");
const logger_1 = require("../../utils/logger");
const employeesTypes = {
    provider: {
        code: "provider",
        label: "Provider",
    },
    "care-coordinator": {
        code: "care-coordinator",
        label: "Care Coordinator",
    },
};
const addParticipant = async (patient, employeeType, employee) => {
    (0, logger_1.logInfo)("Adding a participant to chat", {
        patient,
        employee,
    });
    const conversation = await __1.TwilioService.getConversation(patient.id);
    if (!conversation) {
        (0, logger_1.logError)("An attempt to add care team to non-existing chat appeared");
        return;
    }
    const { label, code } = employeesTypes[employeeType];
    const participants = await conversation.participants().list();
    if (participants.some(({ identity }) => identity === employee.email)) {
        (0, logger_1.logInfo)("This employee already exists in chat");
        return;
    }
    await conversation.participants().create({
        identity: employee.email,
        attributes: JSON.stringify({
            userId: patient.id,
            userFullName: patient.full_name,
            identityType: code,
            userPhone: patient.phone,
        }),
    });
    const attributes = JSON.parse(conversation.attributes);
    attributes.conversationParticipantList =
        attributes.conversationParticipantList.filter(({ userId }) => userId !== employee.id);
    await conversation.update({
        attributes: JSON.stringify({
            conversationParticipantList: [
                ...attributes.conversationParticipantList,
                {
                    userId: employee.id,
                    userFullName: `${employee.firstName} ${employee.lastName}`,
                    identity: employee.email,
                    identityType: code,
                    identityTypeFriendly: label,
                },
            ],
        }),
    });
};
exports.addParticipant = addParticipant;
//# sourceMappingURL=index.js.map