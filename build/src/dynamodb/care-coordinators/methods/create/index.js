"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const aws_sdk_1 = require("aws-sdk");
const logger_1 = require("../../../../utils/logger");
const create_1 = __importDefault(require("../../queries/create"));
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
const create = async (careCoordinator) => {
    (0, logger_1.logInfo)("Creating care coordinator in DB", careCoordinator);
    await dynamoDb.put((0, create_1.default)(careCoordinator)).promise();
    (0, logger_1.logInfo)("Created successfully");
};
exports.create = create;
//# sourceMappingURL=index.js.map