"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllDocumentRelated = void 0;
const aws_sdk_1 = require("aws-sdk");
const logger_1 = require("../../../../utils/logger");
const get_all_document_related_1 = __importDefault(require("../../queries/get-all-document-related"));
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
const getAllDocumentRelated = async (documentId) => {
    (0, logger_1.logInfo)("Getting document related tasks from DB", {
        documentId,
    });
    const { Items } = await dynamoDb
        .scan((0, get_all_document_related_1.default)(documentId))
        .promise();
    if (!(Items === null || Items === void 0 ? void 0 : Items.length)) {
        const message = `Document related tasks wasn't found`;
        (0, logger_1.logError)(message);
        return [];
    }
    (0, logger_1.logInfo)(`Document related tasks found`, Items);
    return Items;
};
exports.getAllDocumentRelated = getAllDocumentRelated;
//# sourceMappingURL=index.js.map