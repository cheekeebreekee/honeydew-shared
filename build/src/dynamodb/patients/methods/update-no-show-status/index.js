"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateNoShowStatus = void 0;
const aws_sdk_1 = require("aws-sdk");
const logger_1 = require("../../../../utils/logger");
const update_no_show_status_1 = __importDefault(require("../../queries/update-no-show-status"));
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
const updateNoShowStatus = async (id, status) => {
    (0, logger_1.logInfo)("Updating patient's NoShow status in DB", { id, status });
    const { Attributes } = await dynamoDb
        .update((0, update_no_show_status_1.default)(id, status))
        .promise();
    (0, logger_1.logInfo)("Patient has been updated successfully");
    return Attributes;
};
exports.updateNoShowStatus = updateNoShowStatus;
//# sourceMappingURL=index.js.map