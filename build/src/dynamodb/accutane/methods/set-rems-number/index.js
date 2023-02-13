"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setRemsNumber = void 0;
const aws_sdk_1 = require("aws-sdk");
const index_1 = require("../../../index");
const logger_1 = require("../../../../utils/logger");
const set_rems_number_1 = __importDefault(require("../../queries/set-rems-number"));
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
const setRemsNumber = async (id, remsNumber) => {
    (0, logger_1.logInfo)("Setting REMS number", remsNumber);
    const accutane = await index_1.DynamoDBService.accutane.get(id);
    if (!accutane.id) {
        const message = "Accutane record not found in database";
        (0, logger_1.logError)(message);
        throw new Error(message);
    }
    (0, logger_1.logInfo)("Setting REMS number to accutane record", accutane);
    const { Attributes } = await dynamoDb
        .update((0, set_rems_number_1.default)(id, remsNumber))
        .promise();
    (0, logger_1.logInfo)("REMS number was successfully set to accutane record", Attributes);
    return Attributes;
};
exports.setRemsNumber = setRemsNumber;
//# sourceMappingURL=index.js.map