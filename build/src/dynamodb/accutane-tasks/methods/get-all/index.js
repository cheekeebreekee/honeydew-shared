"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = void 0;
const aws_sdk_1 = require("aws-sdk");
const logger_1 = require("../../../../utils/logger");
const get_all_1 = __importDefault(require("../../queries/get-all"));
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
const getAll = async (id) => {
    (0, logger_1.logInfo)("Getting accutane document record from DB", { id });
    const { Items } = await dynamoDb.scan((0, get_all_1.default)(id)).promise();
    if (!(Items === null || Items === void 0 ? void 0 : Items.length)) {
        const message = `Accutane document record with ID ${id} is not found`;
        (0, logger_1.logError)(message);
        return [];
    }
    (0, logger_1.logInfo)(`Accutane document record found`, Items);
    return Items;
};
exports.getAll = getAll;
//# sourceMappingURL=index.js.map