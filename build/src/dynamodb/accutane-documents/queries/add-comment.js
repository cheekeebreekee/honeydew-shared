"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../../constants");
const logger_1 = require("../../../utils/logger");
exports.default = (id, comment, patientId, signedBy) => {
    (0, logger_1.logInfo)("Query input", { id, comment, patientId });
    const query = {
        TableName: constants_1.ENV.ACCUTANE_DOCUMENTS_TABLE,
        Key: {
            id,
            compositeKey: `${patientId}_${id}`,
        },
        UpdateExpression: "set #comment=:COMMENT, #signedBy.#id = :ID, #signedBy.#name = :NAME, #signedBy.#role = :ROLE, #signedBy.#createdAt = :CREATED_AT",
        ExpressionAttributeNames: {
            "#comment": "comment",
            "#signedBy": "signedBy",
            "#id": "id",
            "#name": "name",
            "#role": "role",
            "#createdAt": "createdAt",
        },
        ExpressionAttributeValues: {
            ":COMMENT": comment,
            ":NAME": signedBy.name,
            ":ROLE": signedBy.role,
            ":ID": signedBy.id,
            ":CREATED_AT": new Date().toISOString(),
        },
        ReturnValues: "ALL_NEW",
    };
    (0, logger_1.logInfo)("DynamoDB query", query);
    return query;
};
//# sourceMappingURL=add-comment.js.map