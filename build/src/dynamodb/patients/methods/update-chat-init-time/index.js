"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateChatInitTime = void 0;
const aws_sdk_1 = require("aws-sdk");
const update_chat_time_1 = __importDefault(require("../../queries/update-chat-time"));
const logger_1 = require("../../../../utils/logger");
const index_1 = require("../../../index");
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
const updateChatInitTime = async ({ id, identity, initTimestamp, highlight, }) => {
    var _a, _b, _c, _d, _e;
    (0, logger_1.logInfo)("Update chat init time of the patient in DB", {
        id,
        identity,
        initTimestamp,
        highlight,
    });
    const patient = await index_1.DynamoDBService.patients.get(id);
    (0, logger_1.logInfo)("Patient to update", patient);
    const chatPayload = {
        ...(patient.chatInfo || {}),
        [identity]: {
            chatInitTimestamp: initTimestamp || ((_b = (_a = patient.chatInfo) === null || _a === void 0 ? void 0 : _a[identity]) === null || _b === void 0 ? void 0 : _b.chatInitTimestamp),
            highlight: highlight || ((_d = (_c = patient.chatInfo) === null || _c === void 0 ? void 0 : _c[identity]) === null || _d === void 0 ? void 0 : _d.highlight),
        },
        conversationId: (_e = patient.chatInfo) === null || _e === void 0 ? void 0 : _e.conversationId,
    };
    (0, logger_1.logInfo)("Updated chat payload data", chatPayload);
    const { Attributes } = await dynamoDb
        .update((0, update_chat_time_1.default)(id, chatPayload))
        .promise();
    (0, logger_1.logInfo)("Patient has been updated successfully");
    return Attributes;
};
exports.updateChatInitTime = updateChatInitTime;
//# sourceMappingURL=index.js.map