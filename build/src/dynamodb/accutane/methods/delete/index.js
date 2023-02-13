"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItem = void 0;
const aws_sdk_1 = require("aws-sdk");
const logger_1 = require("../../../../utils/logger");
const get_1 = __importDefault(require("../../queries/get"));
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
const deleteItem = async (id) => {
    (0, logger_1.logInfo)("Deleting accutane record from DB", { id });
    const { Attributes } = await dynamoDb.delete((0, get_1.default)(id)).promise();
    (0, logger_1.logInfo)(`Accutane record was deleted`, Attributes);
};
exports.deleteItem = deleteItem;
//# sourceMappingURL=index.js.map