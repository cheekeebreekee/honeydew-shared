"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllDocumentRelated = void 0;
const aws_sdk_1 = require("aws-sdk");
const logger_1 = require("../../../../utils/logger");
const delete_all_document_related_1 = __importDefault(require("../../queries/delete-all-document-related"));
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
const deleteAllDocumentRelated = async (tasks) => {
    (0, logger_1.logInfo)("Deleting document related tasks from DB", {
        tasks,
    });
    const { UnprocessedItems } = await dynamoDb
        .batchWrite((0, delete_all_document_related_1.default)(tasks))
        .promise();
    if (UnprocessedItems === null || UnprocessedItems === void 0 ? void 0 : UnprocessedItems.length) {
        const message = `Document related tasks wasn't fully deleted`;
        (0, logger_1.logError)(message, { failedToDeleteTasks: UnprocessedItems });
    }
    (0, logger_1.logInfo)(`Document related tasks delete successfully`, UnprocessedItems);
};
exports.deleteAllDocumentRelated = deleteAllDocumentRelated;
//# sourceMappingURL=index.js.map