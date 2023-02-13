"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMultiAccList = void 0;
const aws_sdk_1 = require("aws-sdk");
const logger_1 = require("../../../../utils/logger");
const update_multi_acc_list_1 = __importDefault(require("../../queries/update-multi-acc-list"));
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
const updateMultiAccList = async (id, list) => {
    (0, logger_1.logInfo)("Updating patient's multi account list in DB", { id, list });
    const { Attributes } = await dynamoDb
        .update((0, update_multi_acc_list_1.default)(id, list))
        .promise();
    (0, logger_1.logInfo)("Patient has been updated successfully");
    return Attributes;
};
exports.updateMultiAccList = updateMultiAccList;
//# sourceMappingURL=index.js.map