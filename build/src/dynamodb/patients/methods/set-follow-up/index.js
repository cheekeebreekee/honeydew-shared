"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setFollowUp = void 0;
const aws_sdk_1 = require("aws-sdk");
const index_1 = require("../../../index");
const logger_1 = require("../../../../utils/logger");
const set_skin_images_1 = __importDefault(require("../../queries/set-skin-images"));
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
const setFollowUp = async (payload, followUp) => {
    (0, logger_1.logInfo)("Setting new follow up to patient in DB", { payload, followUp });
    const patient = typeof payload === "string"
        ? await index_1.DynamoDBService.patients.get(payload)
        : payload;
    (0, logger_1.logInfo)("Patient to update", patient);
    const { skinImages } = patient.medicalBackground;
    if (!skinImages) {
        const message = "Cannot submit follow up for the new patient";
        (0, logger_1.logError)(message);
        throw new Error(message);
    }
    if (!skinImages[skinImages.length - 1].treatmentPlanData) {
        const message = "Follow up was submitted already";
        (0, logger_1.logError)(message);
        throw new Error(message);
    }
    skinImages.push(followUp);
    (0, logger_1.logInfo)("Updated patient's skin images data", skinImages);
    const { Attributes } = await dynamoDb
        .update((0, set_skin_images_1.default)(patient.id, skinImages))
        .promise();
    (0, logger_1.logInfo)("Patient has been updated successfully");
    return Attributes;
};
exports.setFollowUp = setFollowUp;
//# sourceMappingURL=index.js.map