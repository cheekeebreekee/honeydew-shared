"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.markAsNotifiedAboutUpcomingFollowUp = void 0;
const aws_sdk_1 = require("aws-sdk");
const index_1 = require("../../../index");
const logger_1 = require("../../../../utils/logger");
const set_skin_images_1 = __importDefault(require("../../queries/set-skin-images"));
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
const markAsNotifiedAboutUpcomingFollowUp = async (payload) => {
    (0, logger_1.logInfo)("Marking patient as notified about upcoming follow up in DB", {
        payload,
    });
    const patient = typeof payload === "string"
        ? await index_1.DynamoDBService.patients.get(payload)
        : payload;
    (0, logger_1.logInfo)("Patient to update", patient);
    const { skinImages } = patient.medicalBackground;
    if (!skinImages) {
        const message = "Cannot update upcoming follow up notification flag: patient doesn't have follow ups";
        (0, logger_1.logError)(message, patient);
        throw new Error(message);
    }
    const lastTreatmentPlan = skinImages[skinImages.length - 1].treatmentPlanData;
    if (!lastTreatmentPlan) {
        const message = "Cannot update upcoming follow up notification flag: patient doesn't have treatment plan yet";
        (0, logger_1.logError)(message, patient);
        throw new Error(message);
    }
    lastTreatmentPlan.isUserNotifiedAboutFollowUp = true;
    (0, logger_1.logInfo)("Updated last treatment plan data", lastTreatmentPlan);
    const { Attributes } = await dynamoDb
        .update((0, set_skin_images_1.default)(patient.id, skinImages))
        .promise();
    (0, logger_1.logInfo)("Patient has been updated successfuly");
    return Attributes;
};
exports.markAsNotifiedAboutUpcomingFollowUp = markAsNotifiedAboutUpcomingFollowUp;
//# sourceMappingURL=index.js.map