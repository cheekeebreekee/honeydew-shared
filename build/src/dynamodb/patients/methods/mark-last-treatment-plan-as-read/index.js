"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.markLastTreatmentPlanAsRead = void 0;
const aws_sdk_1 = require("aws-sdk");
const index_1 = require("../../../index");
const logger_1 = require("../../../../utils/logger");
const set_skin_images_1 = __importDefault(require("../../queries/set-skin-images"));
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
const issuersList = {
    patient: "patient",
    careCoordinator: "careCoordinator",
};
function markAsRead(issuer) {
    return async (payload) => {
        (0, logger_1.logInfo)("Marking patient's last treatment plan as read in DB", {
            payload,
            issuer,
        });
        const patient = typeof payload === "string"
            ? await index_1.DynamoDBService.patients.get(payload)
            : payload;
        (0, logger_1.logInfo)("Patient to update", patient);
        const { skinImages } = patient.medicalBackground;
        if (!skinImages) {
            const message = "Cannot mark treatment plan as read: patient have no follow ups";
            (0, logger_1.logError)(message, patient);
            throw new Error(message);
        }
        const { treatmentPlanData } = skinImages[skinImages.length - 1];
        if (!treatmentPlanData) {
            const message = "Cannot mark treatment plan as read: treatment plan is not found";
            (0, logger_1.logError)(message, patient);
            throw new Error(message);
        }
        switch (issuer) {
            case issuersList.patient:
                (0, logger_1.logInfo)("Mark as read by patient");
                treatmentPlanData.isReadByPatient = true;
                break;
            case issuersList.careCoordinator:
                (0, logger_1.logInfo)("Mark as read by care coordinator");
                treatmentPlanData.isReadByCareCoordinator = true;
                break;
            default:
                (0, logger_1.logWarn)(`Unknown issuer "${issuer}"`);
                break;
        }
        (0, logger_1.logInfo)("Updated patient's last treatment plan data", treatmentPlanData);
        const { Attributes } = await dynamoDb
            .update((0, set_skin_images_1.default)(patient.id, skinImages))
            .promise();
        (0, logger_1.logInfo)("Patient has been updated successfully");
        return Attributes;
    };
}
exports.markLastTreatmentPlanAsRead = {
    byPatient: markAsRead(issuersList.patient),
    byCareCoordinator: markAsRead(issuersList.careCoordinator),
};
//# sourceMappingURL=index.js.map