"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pauseAccutane = void 0;
const aws_sdk_1 = require("aws-sdk");
const index_1 = require("../../../index");
const logger_1 = require("../../../../utils/logger");
const pause_accutane_1 = __importDefault(require("../../queries/pause-accutane"));
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
const pauseAccutane = async (id, daysAmount) => {
    (0, logger_1.logInfo)("Pausing accutane for provided amount of days", { daysAmount });
    const accutane = await index_1.DynamoDBService.accutane.get(id);
    if (!accutane.id) {
        const message = "Accutane record not found in database";
        (0, logger_1.logError)(message);
        throw new Error(message);
    }
    (0, logger_1.logInfo)("Pausing accutane", accutane);
    const { Attributes } = await dynamoDb
        .update((0, pause_accutane_1.default)(id, daysAmount, accutane.ttl, accutane.nextConfirmationDate))
        .promise();
    (0, logger_1.logInfo)("Accutane was successfully paused", Attributes);
    return Attributes;
};
exports.pauseAccutane = pauseAccutane;
//# sourceMappingURL=index.js.map