"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addAppointmentStatus = void 0;
const aws_sdk_1 = require("aws-sdk");
const logger_1 = require("../../../../utils/logger");
const update_appointment_status_1 = __importDefault(require("../../queries/update-appointment-status"));
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
const addAppointmentStatus = async (patient, status, cancelReason) => {
    (0, logger_1.logInfo)("Adding appointment status to DB", { patient, status, cancelReason });
    const { Attributes } = await dynamoDb
        .update((0, update_appointment_status_1.default)(patient, status, cancelReason))
        .promise();
    (0, logger_1.logInfo)("New appointment status has been added to patient in DB");
    return Attributes;
};
exports.addAppointmentStatus = addAppointmentStatus;
//# sourceMappingURL=index.js.map