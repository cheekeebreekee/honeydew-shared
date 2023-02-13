"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = void 0;
const aws_sdk_1 = require("aws-sdk");
const index_1 = require("../../../index");
const logger_1 = require("../../../../utils/logger");
const update_1 = __importDefault(require("../../queries/update"));
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
const update = async (_treatmentPlan) => {
    (0, logger_1.logInfo)("Updating treatment plan in DB", { _treatmentPlan });
    const treatmentPlan = await index_1.DynamoDBService.treatmentPlans.get(_treatmentPlan.id);
    (0, logger_1.logInfo)("Treatment plan to update", treatmentPlan);
    const updatedTreatmentPlan = {
        ...treatmentPlan,
        ..._treatmentPlan,
    };
    (0, logger_1.logInfo)("Updated treatment plan data", updatedTreatmentPlan);
    const { Attributes } = await dynamoDb
        .update((0, update_1.default)(_treatmentPlan.id, updatedTreatmentPlan))
        .promise();
    (0, logger_1.logInfo)("Treatment plan has been updated successfully");
    return Attributes;
};
exports.update = update;
//# sourceMappingURL=index.js.map