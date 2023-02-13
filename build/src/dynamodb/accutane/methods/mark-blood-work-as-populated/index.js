"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.markBloodWorkAsPopulated = void 0;
const aws_sdk_1 = require("aws-sdk");
const logger_1 = require("../../../../utils/logger");
const mark_blood_work_as_populated_1 = __importDefault(require("../../queries/mark-blood-work-as-populated"));
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
const markBloodWorkAsPopulated = async (accutaneId) => {
    (0, logger_1.logInfo)("Marking blood work as populated", { accutaneId });
    const { Attributes } = await dynamoDb
        .update((0, mark_blood_work_as_populated_1.default)(accutaneId))
        .promise();
    (0, logger_1.logInfo)("Blood work was successfully marked as populated", Attributes);
    return Attributes;
};
exports.markBloodWorkAsPopulated = markBloodWorkAsPopulated;
//# sourceMappingURL=index.js.map