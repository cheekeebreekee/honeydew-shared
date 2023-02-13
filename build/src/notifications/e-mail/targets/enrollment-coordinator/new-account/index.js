"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newAccount = void 0;
const aws_sdk_1 = require("aws-sdk");
const logger_1 = require("../../../../../utils/logger");
const dynamodb_1 = require("../../../../../dynamodb");
const new_enrollment_coordinator_account_1 = require("../../../templates/new-enrollment-coordinator-account");
const sesPublisher = new aws_sdk_1.SES({ region: "us-east-1" });
const newAccount = async (payload, password) => {
    (0, logger_1.logInfo)("Sending Email to enrollment coordinator about new account", {
        payload,
        password,
    });
    const enrollmentCoordinator = typeof payload === "string"
        ? await dynamodb_1.DynamoDBService.enrollmentCoordinators.get(payload)
        : payload;
    (0, logger_1.logInfo)("Enrollment coordinator to notify", enrollmentCoordinator);
    const query = (0, new_enrollment_coordinator_account_1.newEnrollmentCoordinatorAccountEmailTemplate)(enrollmentCoordinator, password);
    await sesPublisher.sendEmail(query).promise();
    (0, logger_1.logInfo)("Email message sent successfully");
};
exports.newAccount = newAccount;
//# sourceMappingURL=index.js.map