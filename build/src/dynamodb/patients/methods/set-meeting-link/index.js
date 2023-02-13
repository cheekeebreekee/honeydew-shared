"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setMeetingLink = void 0;
const aws_sdk_1 = require("aws-sdk");
const logger_1 = require("../../../../utils/logger");
const set_meeting_link_1 = __importDefault(require("../../queries/set-meeting-link"));
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
const setMeetingLink = async (id, link) => {
    (0, logger_1.logInfo)("Set meeting link in DB", { id, link });
    const { Attributes } = await dynamoDb
        .update((0, set_meeting_link_1.default)(id, link))
        .promise();
    (0, logger_1.logInfo)("Patient has been updated successfully");
    return Attributes;
};
exports.setMeetingLink = setMeetingLink;
//# sourceMappingURL=index.js.map