"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = void 0;
const aws_sdk_1 = require("aws-sdk");
const logger_1 = require("../../../../utils/logger");
const get_1 = __importDefault(require("../../queries/get"));
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
const get = async (id) => {
    (0, logger_1.logInfo)("Getting accutane notification record from DB", { id });
    const { Item } = await dynamoDb
        .get((0, get_1.default)(id))
        .promise();
    if (!Item) {
        const message = `Accutane notification record with ID ${id} is not found`;
        (0, logger_1.logError)(message);
        throw new Error(message);
    }
    (0, logger_1.logInfo)(`Accutane notification record found`, Item);
    return Item;
};
exports.get = get;
//# sourceMappingURL=index.js.map