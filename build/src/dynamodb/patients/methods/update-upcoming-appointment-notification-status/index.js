"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUpcomingAppointmentNotificationStatus = void 0;
const aws_sdk_1 = require("aws-sdk");
const logger_1 = require("../../../../utils/logger");
const update_upcoming_appointment_notification_status_1 = __importDefault(require("../../queries/update-upcoming-appointment-notification-status"));
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
const updateUpcomingAppointmentNotificationStatus = async (id, status) => {
    (0, logger_1.logInfo)("Updating patient's upcoming appointment notification status in DB", {
        id,
        status,
    });
    const { Attributes } = await dynamoDb
        .update((0, update_upcoming_appointment_notification_status_1.default)(id, status))
        .promise();
    (0, logger_1.logInfo)("Patient has been updated successfully");
    return Attributes;
};
exports.updateUpcomingAppointmentNotificationStatus = updateUpcomingAppointmentNotificationStatus;
//# sourceMappingURL=index.js.map