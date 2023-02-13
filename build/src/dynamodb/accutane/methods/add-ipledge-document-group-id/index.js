"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addIpledgeDocumentGroupId = void 0;
const aws_sdk_1 = require("aws-sdk");
const logger_1 = require("../../../../utils/logger");
const add_ipledge_document_group_id_1 = __importDefault(require("../../queries/add-ipledge-document-group-id"));
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
const addIpledgeDocumentGroupId = async (accutaneId, documentGroupId) => {
    (0, logger_1.logInfo)("Adding IPledge document group ID", { documentGroupId });
    const { Attributes } = await dynamoDb
        .update((0, add_ipledge_document_group_id_1.default)(accutaneId, documentGroupId))
        .promise();
    (0, logger_1.logInfo)("IPledge document group ID was successfully added to accutane record", Attributes);
    return Attributes;
};
exports.addIpledgeDocumentGroupId = addIpledgeDocumentGroupId;
//# sourceMappingURL=index.js.map