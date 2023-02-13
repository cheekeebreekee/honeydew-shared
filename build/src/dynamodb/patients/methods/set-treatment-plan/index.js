"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setTreatmentPlan = void 0;
const aws_sdk_1 = require("aws-sdk");
const index_1 = require("../../../index");
const logger_1 = require("../../../../utils/logger");
const set_skin_images_1 = __importDefault(require("../../queries/set-skin-images"));
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
const setTreatmentPlan = async (id, treatmentPlanData) => {
    (0, logger_1.logInfo)("Setting new treatment plan to the patient in DB", {
        id,
        treatmentPlanData,
    });
    const patient = await index_1.DynamoDBService.patients.get(id);
    (0, logger_1.logInfo)("Patient to update", patient);
    let { skinImages } = patient.medicalBackground;
    if (!skinImages) {
        skinImages = [
            {
                timestamp: Date.now(),
                list: [],
            },
        ];
    }
    const lastSkinImages = skinImages[skinImages.length - 1];
    lastSkinImages.treatmentPlanData = treatmentPlanData;
    (0, logger_1.logInfo)("Updated skin images of the patient data", skinImages);
    const { Attributes } = await dynamoDb
        .update((0, set_skin_images_1.default)(id, skinImages))
        .promise();
    (0, logger_1.logInfo)("Patient has been updated successfully");
    return Attributes;
};
exports.setTreatmentPlan = setTreatmentPlan;
//# sourceMappingURL=index.js.map