"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../../constants");
const logger_1 = require("../../../utils/logger");
exports.default = (accutaneId) => {
    const query = {
        TableName: constants_1.ENV.ACCUTANE_TABLE,
        Key: {
            id: accutaneId,
        },
        UpdateExpression: "SET #iPledgeConsent.#inviteId=:INVITE_ID",
        ExpressionAttributeNames: {
            "#iPledgeConsent": "iPledgeConsent",
            "#inviteId": "inviteId",
        },
        ExpressionAttributeValues: {
            ":INVITE_ID": null,
        },
        ReturnValues: "ALL_NEW",
    };
    (0, logger_1.logInfo)("DynamoDB query", query);
    return query;
};
//# sourceMappingURL=reset-ipledge-invite-id.js.map