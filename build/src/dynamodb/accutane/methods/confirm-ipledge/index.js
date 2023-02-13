"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmIpledge = void 0;
const aws_sdk_1 = require("aws-sdk");
const index_1 = require("../../../index");
const logger_1 = require("../../../../utils/logger");
const confirm_ipledge_male_1 = __importDefault(require("../../queries/confirm-ipledge-male"));
const confirm_ipledge_female_1 = __importDefault(require("../../queries/confirm-ipledge-female"));
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
const confirmIpledge = async (patient, confirmed) => {
    (0, logger_1.logInfo)("Confirming IPledge of Accutane record", patient.id);
    const accutane = await index_1.DynamoDBService.accutane.getByPatientId(patient.id);
    if (!accutane) {
        const message = "Accutane record not found in database";
        (0, logger_1.logError)(message);
        throw new Error(message);
    }
    (0, logger_1.logInfo)("Confirming IPledge in Accutane record", accutane);
    const query = accutane.gender === "Female"
        ? (0, confirm_ipledge_female_1.default)(patient, accutane, confirmed)
        : (0, confirm_ipledge_male_1.default)(patient, accutane, confirmed);
    const { Attributes } = await dynamoDb.update(query).promise();
    (0, logger_1.logInfo)("IPledge was successfully confirmed", Attributes);
    return Attributes;
};
exports.confirmIpledge = confirmIpledge;
//# sourceMappingURL=index.js.map