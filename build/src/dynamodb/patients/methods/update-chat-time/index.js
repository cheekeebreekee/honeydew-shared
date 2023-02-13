"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateChatTime = void 0;
const aws_sdk_1 = require("aws-sdk");
const update_chat_time_1 = __importDefault(require("../../queries/update-chat-time"));
const logger_1 = require("../../../../utils/logger");
const index_1 = require("../../../index");
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
const updateChatTime = async (id, role, timestamp) => {
    (0, logger_1.logInfo)("Update chat time of the patient in DB", { id, role, timestamp });
    const patient = await index_1.DynamoDBService.patients.get(id);
    (0, logger_1.logInfo)("Patient to update", patient);
    const chatPayload = {
        ...(patient.chatInfo || {}),
        lastMessageSentTimestamp: timestamp,
        lastMessageSentByRole: role,
    };
    (0, logger_1.logInfo)("Updated chat payload data", chatPayload);
    const { Attributes } = await dynamoDb
        .update((0, update_chat_time_1.default)(id, chatPayload))
        .promise();
    (0, logger_1.logInfo)("Patient has been updated successfully");
    return Attributes;
};
exports.updateChatTime = updateChatTime;
//# sourceMappingURL=index.js.map