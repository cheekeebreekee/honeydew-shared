"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addBirthControl = void 0;
const aws_sdk_1 = require("aws-sdk");
const index_1 = require("../../../index");
const logger_1 = require("../../../../utils/logger");
const add_birth_control_1 = __importDefault(require("../../queries/add-birth-control"));
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
const addBirthControl = async (id, birthControl) => {
    (0, logger_1.logInfo)("Adding birth control", birthControl);
    const accutane = await index_1.DynamoDBService.accutane.get(id);
    if (!accutane.id) {
        const message = "Accutane record not found in database";
        (0, logger_1.logError)(message);
        throw new Error(message);
    }
    (0, logger_1.logInfo)("Adding birth control info to accutane record", accutane);
    const { Attributes } = await dynamoDb
        .update((0, add_birth_control_1.default)(id, birthControl))
        .promise();
    (0, logger_1.logInfo)("Birth control was successfully added to accutane record", Attributes);
    return Attributes;
};
exports.addBirthControl = addBirthControl;
//# sourceMappingURL=index.js.map