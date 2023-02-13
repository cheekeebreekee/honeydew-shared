"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addComment = void 0;
const aws_sdk_1 = require("aws-sdk");
const logger_1 = require("../../../../utils/logger");
const add_comment_1 = __importDefault(require("../../queries/add-comment"));
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
const addComment = async (id, comment, patientId, signedBy) => {
    (0, logger_1.logInfo)("Adding comment to accutane document record in DB", {
        id,
        comment,
        patientId,
        signedBy,
    });
    // const accutaneDocument = await DynamoDBService.accutaneDocuments.get(id);
    const updatedDocument = await dynamoDb
        .update((0, add_comment_1.default)(id, comment, patientId, signedBy))
        .promise();
    (0, logger_1.logInfo)("Comment was added successfully", updatedDocument);
};
exports.addComment = addComment;
//# sourceMappingURL=index.js.map