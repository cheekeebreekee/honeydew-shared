"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMembershipNotificationLevel = void 0;
const aws_sdk_1 = require("aws-sdk");
const logger_1 = require("../../../../utils/logger");
const update_membership_notification_level_1 = __importDefault(require("../../queries/update-membership-notification-level"));
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
const updateMembershipNotificationLevel = async (id, level) => {
    (0, logger_1.logInfo)("Updating membership notification level of the patient in DB", {
        id,
        level,
    });
    const { Attributes } = await dynamoDb
        .update((0, update_membership_notification_level_1.default)(id, level))
        .promise();
    (0, logger_1.logInfo)("Patient has been updated successfully");
    return Attributes;
};
exports.updateMembershipNotificationLevel = updateMembershipNotificationLevel;
//# sourceMappingURL=index.js.map