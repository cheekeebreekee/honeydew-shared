"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMedBackgroundFillingNotificationStatus = void 0;
const aws_sdk_1 = require("aws-sdk");
const logger_1 = require("../../../../utils/logger");
const update_med_background_filling_notification_status_1 = __importDefault(require("../../queries/update-med-background-filling-notification-status"));
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
const updateMedBackgroundFillingNotificationStatus = async (id, status) => {
    (0, logger_1.logInfo)("Update med background filling notification status of the patient in DB", { id, status });
    const { Attributes } = await dynamoDb
        .update((0, update_med_background_filling_notification_status_1.default)(id, status))
        .promise();
    (0, logger_1.logInfo)("Patient has been successfully updated in DB");
    return Attributes;
};
exports.updateMedBackgroundFillingNotificationStatus = updateMedBackgroundFillingNotificationStatus;
//# sourceMappingURL=index.js.map