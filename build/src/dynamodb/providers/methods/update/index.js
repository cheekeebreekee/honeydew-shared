"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = void 0;
const aws_sdk_1 = require("aws-sdk");
const index_1 = require("../../../index");
const logger_1 = require("../../../../utils/logger");
const update_1 = __importDefault(require("../../queries/update"));
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
const update = async (providerPartial) => {
    (0, logger_1.logInfo)("Updating provider in DB", providerPartial);
    if (!providerPartial.id) {
        const message = "No provider ID found in partial";
        (0, logger_1.logError)(message);
        throw new Error(message);
    }
    const provider = await index_1.DynamoDBService.providers.get(providerPartial.id || "");
    (0, logger_1.logInfo)("Provider to update", provider);
    const updatedProvider = {
        ...provider,
        ...providerPartial,
    };
    (0, logger_1.logInfo)("Updated provider data", updatedProvider);
    const { Attributes } = await dynamoDb
        .update((0, update_1.default)(updatedProvider))
        .promise();
    return Attributes;
};
exports.update = update;
//# sourceMappingURL=index.js.map