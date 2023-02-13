"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getByEmail = void 0;
const aws_sdk_1 = require("aws-sdk");
const logger_1 = require("../../../../utils/logger");
const get_by_email_1 = __importDefault(require("../../queries/get-by-email"));
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
const getByEmail = async (email) => {
    (0, logger_1.logInfo)("Getting Accutane from DB by email", { email });
    const { Items } = await dynamoDb
        .query((0, get_by_email_1.default)(email))
        .promise();
    if (!Items) {
        const message = `Accutane with email ${email} is not found`;
        (0, logger_1.logError)(message);
        throw new Error(message);
    }
    (0, logger_1.logInfo)(`Accutane found`, Items);
    return Items[0];
};
exports.getByEmail = getByEmail;
//# sourceMappingURL=index.js.map