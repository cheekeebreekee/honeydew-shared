"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConversation = void 0;
const constants_1 = require("../../constants");
const logger_1 = require("../../utils/logger");
const dynamodb_1 = require("../../dynamodb");
const shared_1 = require("../shared");
const createConversation = async (patient) => {
    (0, logger_1.logInfo)("Creating new chat conversation", { patient });
    const conversation = await shared_1.twilioClient.conversations.conversations.create({
        uniqueName: patient.id,
        friendlyName: patient.full_name,
    });
    (0, logger_1.logInfo)("Chat coversation has been created successfully");
    (0, logger_1.logInfo)("Attaching patient to the chat");
    await shared_1.twilioClient.conversations
        .conversations(conversation.sid)
        .participants.create({
        identity: patient.email,
        attributes: JSON.stringify({
            userId: patient.id,
            userFullName: patient.full_name,
            identityType: "user",
            userPhone: patient.phone,
        }),
    });
    (0, logger_1.logInfo)("Patient has been attached to the chat");
    const provider = await dynamodb_1.DynamoDBService.providers.get(patient.provider_id);
    const careCoordinator = await dynamodb_1.DynamoDBService.careCoordinators.get(patient.care_coordinator_id);
    (0, logger_1.logInfo)("Attaching provider to the chat", provider);
    await shared_1.twilioClient.conversations
        .conversations(conversation.sid)
        .participants.create({
        identity: provider.email,
        attributes: JSON.stringify({
            userId: patient.id,
            userFullName: patient.full_name,
            identityType: "provider",
            userPhone: patient.phone,
        }),
    });
    (0, logger_1.logInfo)("Provider successfully attached to the chat");
    (0, logger_1.logInfo)("Attaching care coordinator to the chat", careCoordinator);
    await shared_1.twilioClient.conversations
        .conversations(conversation.sid)
        .participants.create({
        identity: careCoordinator.email,
        attributes: JSON.stringify({
            userId: patient.id,
            userFullName: patient.full_name,
            identityType: "care-coordinator",
            userPhone: patient.phone,
        }),
    });
    (0, logger_1.logInfo)("Care coordinator successfully attached to the chat");
    (0, logger_1.logInfo)("Attaching administrators to the chat", constants_1.ADMINS_LIST);
    await Promise.all(constants_1.ADMINS_LIST.map((admin) => shared_1.twilioClient.conversations
        .conversations(conversation.sid)
        .participants.create({
        identity: admin.email,
        attributes: JSON.stringify({
            userId: patient.id,
            userFullName: patient.full_name,
            identityType: "admin",
            userPhone: patient.phone,
        }),
    })));
    (0, logger_1.logInfo)("Administrators successfully attached to the chat");
    (0, logger_1.logInfo)("Performing chat attributes update");
    await shared_1.twilioClient.conversations.conversations(conversation.sid).update({
        attributes: JSON.stringify({
            conversationParticipantList: [
                {
                    userId: patient.id,
                    userFullName: patient.full_name,
                    identity: patient.email,
                    identityType: "user",
                    identityTypeFriendly: "Patient",
                },
                {
                    userId: provider.id,
                    userFullName: `${provider.firstName} ${provider.lastName}`,
                    identity: provider.email,
                    identityType: "provider",
                    identityTypeFriendly: "Provider",
                },
                {
                    userId: careCoordinator.id,
                    userFullName: `${careCoordinator.firstName} ${careCoordinator.lastName}`,
                    identity: careCoordinator.email,
                    identityType: "care-coordinator",
                    identityTypeFriendly: "Care Coordinator",
                },
                ...constants_1.ADMINS_LIST.map((admin) => ({
                    userId: admin.cognitoUserId,
                    userFullName: admin.fullName,
                    identity: admin.email,
                    identityType: "admin",
                    identityTypeFriendly: "Administrator",
                })),
            ],
        }),
    });
    (0, logger_1.logInfo)("Chat attributes successfully updated");
    (0, logger_1.logInfo)("Chat has been set up successfully");
};
exports.createConversation = createConversation;
//# sourceMappingURL=index.js.map