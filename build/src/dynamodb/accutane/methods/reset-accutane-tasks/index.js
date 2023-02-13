"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetAccutaneTasks = void 0;
const aws_sdk_1 = require("aws-sdk");
const index_1 = require("../../../index");
const logger_1 = require("../../../../utils/logger");
const reset_accutane_tasks_male_1 = __importDefault(require("../../queries/reset-accutane-tasks-male"));
const reset_accutane_tasks_female_1 = __importDefault(require("../../queries/reset-accutane-tasks-female"));
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
const resetAccutaneTasks = async (patient) => {
    (0, logger_1.logInfo)("Resetting accutane tasks for patient", { patient });
    const accutane = await index_1.DynamoDBService.accutane.getByPatientId(patient.id);
    if (!(accutane === null || accutane === void 0 ? void 0 : accutane.id)) {
        const message = "Accutane record not found in database";
        (0, logger_1.logError)(message);
        throw new Error(message);
    }
    (0, logger_1.logInfo)("Resetting accutane tasks for accutane record", accutane);
    const query = accutane.gender === "Female"
        ? (0, reset_accutane_tasks_female_1.default)(accutane)
        : (0, reset_accutane_tasks_male_1.default)(accutane);
    const { Attributes } = await dynamoDb.update(query).promise();
    (0, logger_1.logInfo)("Resetting accutane tasks was successfully done", Attributes);
    return Attributes;
};
exports.resetAccutaneTasks = resetAccutaneTasks;
//# sourceMappingURL=index.js.map