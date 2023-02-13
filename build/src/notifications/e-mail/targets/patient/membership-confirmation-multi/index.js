"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.membershipConfirmationMulti = void 0;
const aws_sdk_1 = require("aws-sdk");
const logger_1 = require("../../../../../utils/logger");
const patient_membership_confirmation_multi_1 = require("../../../templates/patient-membership-confirmation-multi");
const sesPublisher = new aws_sdk_1.SES({ region: "us-east-1" });
const membershipConfirmationMulti = async (patient, subscriptionType, amount, discount) => {
    (0, logger_1.logInfo)("Sending email message to patient about membership confirmaion (multi account)", {
        patient,
        subscriptionType,
        amount,
        discount,
    });
    const queries = [
        (0, patient_membership_confirmation_multi_1.membershipConfirmationMultiTemplate)(patient.email, subscriptionType, amount, discount),
    ];
    if (patient.basicInfo.parentsPhone) {
        (0, logger_1.logInfo)("Send email also to parents");
        queries.push((0, patient_membership_confirmation_multi_1.membershipConfirmationMultiTemplate)(patient.basicInfo.parentsPhone, subscriptionType, amount, discount));
    }
    await Promise.all(queries.map((query) => sesPublisher.sendEmail(query).promise()));
    (0, logger_1.logInfo)("Email message sent successfully");
};
exports.membershipConfirmationMulti = membershipConfirmationMulti;
//# sourceMappingURL=index.js.map