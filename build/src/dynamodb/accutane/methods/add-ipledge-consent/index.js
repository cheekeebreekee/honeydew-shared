"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addIpledgeConsent = void 0;
const aws_sdk_1 = require("aws-sdk");
const index_1 = require("../../../index");
const logger_1 = require("../../../../utils/logger");
const add_ipledge_consent_1 = __importDefault(require("../../queries/add-ipledge-consent"));
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
const addIpledgeConsent = async (id, iPledgeConsent, { enrollmentDate, enrollmentDateOffset, lastConfirmationDate, nextConfirmationDate, }) => {
    (0, logger_1.logInfo)("Adding IPledge consent", iPledgeConsent);
    const accutane = await index_1.DynamoDBService.accutane.get(id);
    if (!accutane.id) {
        const message = "Accutane record not found in database";
        (0, logger_1.logError)(message);
        throw new Error(message);
    }
    (0, logger_1.logInfo)("Adding IPledge consent info to accutane record", accutane);
    const { Attributes } = await dynamoDb
        .update((0, add_ipledge_consent_1.default)(id, iPledgeConsent, {
        enrollmentDate,
        enrollmentDateOffset,
        lastConfirmationDate,
        nextConfirmationDate,
    }))
        .promise();
    (0, logger_1.logInfo)("IPledge consent was successfully added to accutane record", Attributes);
    return Attributes;
};
exports.addIpledgeConsent = addIpledgeConsent;
//# sourceMappingURL=index.js.map