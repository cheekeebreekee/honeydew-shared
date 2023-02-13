"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = void 0;
const aws_sdk_1 = require("aws-sdk");
const logger_1 = require("../../../../utils/logger");
const delete_1 = __importDefault(require("../../queries/delete"));
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
const remove = async (id) => {
    (0, logger_1.logInfo)("Deleting medicine from DB", { id });
    await dynamoDb.delete((0, delete_1.default)(id)).promise();
    (0, logger_1.logInfo)("Medicine deleted successfully");
};
exports.remove = remove;
//# sourceMappingURL=index.js.map