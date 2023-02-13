"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addBloodWork = void 0;
const aws_sdk_1 = require("aws-sdk");
const index_1 = require("../../../index");
const logger_1 = require("../../../../utils/logger");
const add_blood_work_1 = __importDefault(require("../../queries/add-blood-work"));
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
const addBloodWork = async (id, bloodWork) => {
    (0, logger_1.logInfo)("Adding blood work", bloodWork);
    const accutane = await index_1.DynamoDBService.accutane.get(id);
    if (!accutane.id) {
        const message = "Accutane record not found in database";
        (0, logger_1.logError)(message);
        throw new Error(message);
    }
    (0, logger_1.logInfo)("Adding blood work info to accutane record", accutane);
    const { Attributes } = await dynamoDb
        .update((0, add_blood_work_1.default)(id, bloodWork))
        .promise();
    (0, logger_1.logInfo)("blood work was successfully added to accutane record", Attributes);
    return Attributes;
};
exports.addBloodWork = addBloodWork;
//# sourceMappingURL=index.js.map