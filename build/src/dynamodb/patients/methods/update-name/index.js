"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateName = void 0;
const aws_sdk_1 = require("aws-sdk");
const logger_1 = require("../../../../utils/logger");
const update_name_1 = __importDefault(require("../../queries/update-name"));
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
const updateName = async (id, name) => {
    (0, logger_1.logInfo)("Updating patient's name in DB", { id, name });
    const { Attributes } = await dynamoDb
        .update((0, update_name_1.default)(id, name))
        .promise();
    (0, logger_1.logInfo)("Patient has been updated successfully");
    return Attributes;
};
exports.updateName = updateName;
//# sourceMappingURL=index.js.map