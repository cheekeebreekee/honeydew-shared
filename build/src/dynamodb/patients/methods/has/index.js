"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.has = void 0;
const aws_sdk_1 = require("aws-sdk");
const logger_1 = require("../../../../utils/logger");
const get_1 = __importDefault(require("../../queries/get"));
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
const has = async (id) => {
    (0, logger_1.logInfo)("Checking patient existence in DB", { id });
    const { Item } = await dynamoDb.get((0, get_1.default)(id)).promise();
    (0, logger_1.logInfo)("Patient existence check", {
        exists: !!Item,
    });
    return !!Item;
};
exports.has = has;
//# sourceMappingURL=index.js.map