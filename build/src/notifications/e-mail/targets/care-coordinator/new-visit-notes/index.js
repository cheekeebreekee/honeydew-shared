"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newVisitNotes = void 0;
const aws_sdk_1 = require("aws-sdk");
const logger_1 = require("../../../../../utils/logger");
const dynamodb_1 = require("../../../../../dynamodb");
const new_visit_notes_1 = require("../../../templates/new-visit-notes");
const sesPublisher = new aws_sdk_1.SES({ region: "us-east-1" });
const newVisitNotes = async (payload) => {
    (0, logger_1.logInfo)("Sending email to care coordinator about new visit notes submitted");
    const careCoordinator = typeof payload === "string"
        ? await dynamodb_1.DynamoDBService.careCoordinators.get(payload)
        : payload;
    (0, logger_1.logInfo)("Care coordinator to notify", careCoordinator);
    const query = (0, new_visit_notes_1.newVisitNotesSubmittedEmailTemplate)(careCoordinator.email, `${careCoordinator.firstName} ${careCoordinator.lastName}`);
    await sesPublisher.sendEmail(query).promise();
    (0, logger_1.logInfo)("Email message sent successfully");
};
exports.newVisitNotes = newVisitNotes;
//# sourceMappingURL=index.js.map