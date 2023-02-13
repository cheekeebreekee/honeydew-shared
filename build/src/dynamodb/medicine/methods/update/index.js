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
const update = async (_medicine) => {
    (0, logger_1.logInfo)("Updating medicine in DB", _medicine);
    const medicine = await index_1.DynamoDBService.medicine.get(_medicine.id);
    (0, logger_1.logInfo)("Medicine to update");
    const updatedMedicine = {
        ...medicine,
        ..._medicine,
    };
    (0, logger_1.logInfo)("Updated medicine data");
    const { Attributes } = await dynamoDb
        .update((0, update_1.default)(_medicine.id, updatedMedicine))
        .promise();
    (0, logger_1.logInfo)("Medicine updated successfully");
    return Attributes;
};
exports.update = update;
//# sourceMappingURL=index.js.map