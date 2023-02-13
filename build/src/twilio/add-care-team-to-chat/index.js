"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCareTeamToChat = void 0;
const dynamodb_1 = require("../../dynamodb");
const __1 = require("..");
const logger_1 = require("../../utils/logger");
const addCareTeamToChat = async (conversationUniqueName, patient) => {
    (0, logger_1.logInfo)("Adding care team to chat", {
        patient,
        conversationUniqueName,
    });
    const conversation = await __1.TwilioService.getConversation(conversationUniqueName);
    if (!conversation) {
        (0, logger_1.logWarn)("An attempt to add care team to non-existing chat appeared");
        return;
    }
    const participants = await conversation.participants().list();
    if (patient.provider_id) {
        const provider = await dynamodb_1.DynamoDBService.providers.get(patient.provider_id);
        if (!participants.find((participant) => participant.identity === provider.email)) {
            (0, logger_1.logInfo)("Adding provider to chat");
            await conversation.participants().create({
                identity: provider.email,
                attributes: JSON.stringify({
                    userId: patient.id,
                    userFullName: patient.full_name,
                    identityType: "provider",
                    userPhone: patient.phone,
                }),
            });
            await conversation.update({
                attributes: JSON.stringify({
                    conversationParticipantList: [
                        ...JSON.parse(conversation.attributes)
                            .conversationParticipantList,
                        {
                            userId: provider.id,
                            userFullName: `${provider.firstName} ${provider.lastName}`,
                            identity: provider.email,
                            identityType: "provider",
                            identityTypeFriendly: "Provider",
                        },
                    ],
                }),
            });
        }
        else {
            (0, logger_1.logInfo)("This provider is already in the chat");
        }
    }
    if (patient.care_coordinator_id) {
        const careCoordinator = await dynamodb_1.DynamoDBService.careCoordinators.get(patient.care_coordinator_id);
        if (!participants.find((participant) => participant.identity === careCoordinator.email)) {
            (0, logger_1.logInfo)("Adding care coordinator to chat");
            await conversation.participants().create({
                identity: careCoordinator.email,
                attributes: JSON.stringify({
                    userId: patient.id,
                    userFullName: patient.full_name,
                    identityType: "care-coordinator",
                    userPhone: patient.phone,
                }),
            });
            await conversation.update({
                attributes: JSON.stringify({
                    conversationParticipantList: [
                        ...JSON.parse(conversation.attributes)
                            .conversationParticipantList,
                        {
                            userId: careCoordinator.id,
                            userFullName: `${careCoordinator.firstName} ${careCoordinator.lastName}`,
                            identity: careCoordinator.email,
                            identityType: "care-coordinator",
                            identityTypeFriendly: "Care Coordinator",
                        },
                    ],
                }),
            });
        }
        else {
            (0, logger_1.logInfo)("This care coordinator is already in the chat");
        }
    }
};
exports.addCareTeamToChat = addCareTeamToChat;
//# sourceMappingURL=index.js.map