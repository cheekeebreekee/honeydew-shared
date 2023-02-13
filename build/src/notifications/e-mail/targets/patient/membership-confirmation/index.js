"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.membershipConfirmation = void 0;
const aws_sdk_1 = require("aws-sdk");
const logger_1 = require("../../../../../utils/logger");
const patient_membership_confirmation_1 = require("../../../templates/patient-membership-confirmation");
const sesPublisher = new aws_sdk_1.SES({ region: "us-east-1" });
const membershipConfirmation = async (patient, subscriptionType, amount, discount) => {
    (0, logger_1.logInfo)("Sending email to patient about membership confirmation", {
        patient,
        subscriptionType,
        amount,
        discount,
    });
    const queries = [
        (0, patient_membership_confirmation_1.membershipConfirmationTemplate)(patient.email, patient.email, subscriptionType, amount, discount),
    ];
    if (patient.basicInfo.parentsEmail) {
        (0, logger_1.logInfo)("Sending email also to parents");
        queries.push((0, patient_membership_confirmation_1.membershipConfirmationTemplate)(patient.basicInfo.parentsEmail, patient.email, subscriptionType, amount, discount));
    }
    await Promise.all(queries.map((query) => sesPublisher.sendEmail(query).promise()));
    (0, logger_1.logInfo)("Email message sent successfully");
};
exports.membershipConfirmation = membershipConfirmation;
//# sourceMappingURL=index.js.map