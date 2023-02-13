"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllByPartialCompositeKey = void 0;
const aws_sdk_1 = require("aws-sdk");
const logger_1 = require("../../../../utils/logger");
const get_all_by_partial_composite_key_1 = __importDefault(require("../../queries/get-all-by-partial-composite-key"));
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
const getAllByPartialCompositeKey = async (partialCompositeKey) => {
    (0, logger_1.logInfo)("Getting all tasks by partial composite key from DB", {
        partialCompositeKey,
    });
    const { Items } = await dynamoDb
        .scan((0, get_all_by_partial_composite_key_1.default)(partialCompositeKey))
        .promise();
    if (!(Items === null || Items === void 0 ? void 0 : Items.length)) {
        const message = `Failed to get all tasks by partial composite key`;
        (0, logger_1.logError)(message);
    }
    (0, logger_1.logInfo)(`Getting all tasks by partial composite key was successfully`, {
        Items,
    });
    return Items;
};
exports.getAllByPartialCompositeKey = getAllByPartialCompositeKey;
//# sourceMappingURL=index.js.map