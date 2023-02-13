"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketingService = void 0;
const aws_sdk_1 = require("aws-sdk");
const constants_1 = require("src/constants");
const logger_1 = require("../utils/logger");
const sqs = new aws_sdk_1.SQS({ apiVersion: "latest" });
async function setStatusTag(patient, statusName, isActive) {
    (0, logger_1.logInfo)("Setting marketing tag to the patient", {
        patient,
        statusName,
        isActive,
    });
    await sqs
        .sendMessage({
        QueueUrl: constants_1.ENV.MARKETING_SERVICE_SQS_URL,
        MessageBody: JSON.stringify({
            patientId: patient.id,
            tag: statusName,
            add: isActive,
        }),
    })
        .promise();
}
exports.MarketingService = {
    setStatusTag,
};
//# sourceMappingURL=index.js.map