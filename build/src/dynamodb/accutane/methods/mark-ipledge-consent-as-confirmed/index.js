"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.markIpledgeConsentAsConfirmed = void 0;
const aws_sdk_1 = require("aws-sdk");
const logger_1 = require("../../../../utils/logger");
const mark_ipledge_consent_as_confirmed_1 = __importDefault(require("../../queries/mark-ipledge-consent-as-confirmed"));
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
const markIpledgeConsentAsConfirmed = async (accutaneId) => {
    (0, logger_1.logInfo)("Marking iPledge consent as confirmed", { accutaneId });
    const { Attributes } = await dynamoDb
        .update((0, mark_ipledge_consent_as_confirmed_1.default)(accutaneId))
        .promise();
    (0, logger_1.logInfo)("IPledge consent was successfully marked as confirmed", Attributes);
    return Attributes;
};
exports.markIpledgeConsentAsConfirmed = markIpledgeConsentAsConfirmed;
//# sourceMappingURL=index.js.map