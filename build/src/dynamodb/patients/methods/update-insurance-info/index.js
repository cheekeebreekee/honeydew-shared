"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateInsuranceInfo = void 0;
const aws_sdk_1 = require("aws-sdk");
const logger_1 = require("../../../../utils/logger");
const update_insurance_info_1 = __importDefault(require("../../queries/update-insurance-info"));
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
const updateInsuranceInfo = async (id, insuranceInfo) => {
    (0, logger_1.logInfo)("Updating insurance info of the patient in DB", {
        id,
        insuranceInfo,
    });
    const { Attributes } = await dynamoDb
        .update((0, update_insurance_info_1.default)(id, insuranceInfo))
        .promise();
    (0, logger_1.logInfo)("Patient has been updated successfully");
    return Attributes;
};
exports.updateInsuranceInfo = updateInsuranceInfo;
//# sourceMappingURL=index.js.map