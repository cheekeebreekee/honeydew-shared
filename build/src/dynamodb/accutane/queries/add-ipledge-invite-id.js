"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../../constants");
const logger_1 = require("../../../utils/logger");
exports.default = (accutaneId, inviteId) => {
    const query = {
        TableName: constants_1.ENV.ACCUTANE_TABLE,
        Key: {
            id: accutaneId,
        },
        UpdateExpression: "SET #iPledgeConsent.#inviteId=:DOCUMENT_GROUP_ID",
        ExpressionAttributeNames: {
            "#iPledgeConsent": "iPledgeConsent",
            "#inviteId": "inviteId",
        },
        ExpressionAttributeValues: {
            ":DOCUMENT_GROUP_ID": inviteId,
        },
        ReturnValues: "ALL_NEW",
    };
    (0, logger_1.logInfo)("DynamoDB query", query);
    return query;
};
//# sourceMappingURL=add-ipledge-invite-id.js.map