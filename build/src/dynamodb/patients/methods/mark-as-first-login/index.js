"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.markAsFirstLogin = void 0;
const aws_sdk_1 = require("aws-sdk");
const logger_1 = require("../../../../utils/logger");
const mark_as_first_login_1 = __importDefault(require("../../queries/mark-as-first-login"));
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
const markAsFirstLogin = async (id) => {
    (0, logger_1.logInfo)("Markin patient as first login in DB", { id });
    const { Attributes } = await dynamoDb
        .update((0, mark_as_first_login_1.default)(id))
        .promise();
    (0, logger_1.logInfo)("Patient has been marked as first login successfully in DB");
    return Attributes;
};
exports.markAsFirstLogin = markAsFirstLogin;
//# sourceMappingURL=index.js.map