"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../../constants");
const logger_1 = require("../../../utils/logger");
exports.default = (documentId) => {
    const query = {
        TableName: constants_1.ENV.ACCUTANE_TASKS_TABLE,
        FilterExpression: "contains(compositeKey, :DOCUMENT_ID)",
        ExpressionAttributeValues: {
            ":DOCUMENT_ID": documentId,
        },
    };
    (0, logger_1.logInfo)("DynamoDB query", query);
    return query;
};
//# sourceMappingURL=get-all-document-related.js.map