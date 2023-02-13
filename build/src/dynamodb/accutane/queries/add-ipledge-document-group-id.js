"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../../constants");
const logger_1 = require("../../../utils/logger");
exports.default = (accutaneId, documentGroupId) => {
    const query = {
        TableName: constants_1.ENV.ACCUTANE_TABLE,
        Key: {
            id: accutaneId,
        },
        UpdateExpression: "SET #iPledgeConsent.#documentGroupId=:DOCUMENT_GROUP_ID",
        ExpressionAttributeNames: {
            "#iPledgeConsent": "iPledgeConsent",
            "#documentGroupId": "documentGroupId",
        },
        ExpressionAttributeValues: {
            ":DOCUMENT_GROUP_ID": documentGroupId,
        },
        ReturnValues: "ALL_NEW",
    };
    (0, logger_1.logInfo)("DynamoDB query", query);
    return query;
};
//# sourceMappingURL=add-ipledge-document-group-id.js.map