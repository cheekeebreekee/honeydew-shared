"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointmentBooked = void 0;
const aws_sdk_1 = require("aws-sdk");
const logger_1 = require("../../../../../utils/logger");
const dynamodb_1 = require("../../../../../dynamodb");
const appointment_booked_1 = require("../../../templates/appointment-booked");
const sesPublisher = new aws_sdk_1.SES({ region: "us-east-1" });
const appointmentBooked = async (patient) => {
    (0, logger_1.logInfo)("Sending email message to patient about booked appointment");
    const provider = await dynamodb_1.DynamoDBService.providers.get(patient.provider_id);
    (0, logger_1.logInfo)("Provider to notify");
    const query = (0, appointment_booked_1.appointmentBoookedEmailTemplate)(patient, provider);
    await sesPublisher.sendEmail(query).promise();
    (0, logger_1.logInfo)("Email message sent successfully");
};
exports.appointmentBooked = appointmentBooked;
//# sourceMappingURL=index.js.map