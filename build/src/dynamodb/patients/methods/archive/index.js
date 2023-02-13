"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.archive = void 0;
const aws_sdk_1 = require("aws-sdk");
const logger_1 = require("../../../../utils/logger");
const archive_1 = __importDefault(require("../../queries/archive"));
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
const archive = async (id, state) => {
    (0, logger_1.logInfo)("Changing archive status of the patient in DB", { id, state });
    const { Attributes } = await dynamoDb
        .update((0, archive_1.default)(id, state))
        .promise();
    (0, logger_1.logInfo)("Patient's 'archive' status has been changed successfully in DB");
    return Attributes;
};
exports.archive = archive;
//# sourceMappingURL=index.js.map