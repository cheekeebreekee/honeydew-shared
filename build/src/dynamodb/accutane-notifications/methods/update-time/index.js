"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTime = void 0;
const aws_sdk_1 = require("aws-sdk");
const logger_1 = require("../../../../utils/logger");
const update_time_1 = __importDefault(require("../../queries/update-time"));
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
const updateTime = async (id, updatedTime) => {
    (0, logger_1.logInfo)("Updating time in accutane notification record", {
        id,
        updatedTime,
    });
    const updatedNotification = await dynamoDb
        .update((0, update_time_1.default)(id, updatedTime))
        .promise();
    (0, logger_1.logInfo)("Time was updated successfully", updatedNotification);
};
exports.updateTime = updateTime;
//# sourceMappingURL=index.js.map