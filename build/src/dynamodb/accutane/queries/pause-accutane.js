"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../../constants");
const logger_1 = require("../../../utils/logger");
exports.default = (id, daysAmount, currentTtl, nextConfirmationDate) => {
    (0, logger_1.logInfo)("Current TTL value", { currentTtl });
    const shiftedTtl = currentTtl + daysAmount * 24 * 60 * 60;
    const shiftedNextConfirmationDate = new Date(nextConfirmationDate).getTime() + daysAmount * 24 * 60 * 60 * 1000;
    (0, logger_1.logInfo)("Shifted TTL value", { shiftedTtl });
    const query = {
        TableName: constants_1.ENV.ACCUTANE_TABLE,
        Key: {
            id,
        },
        UpdateExpression: "set #ttl=:TTL, #nextConfirmationDate=:NEXT_CONFIRMATION_DATE",
        ExpressionAttributeNames: {
            "#ttl": "ttl",
            "#nextConfirmationDate": "nextConfirmationDate",
        },
        ExpressionAttributeValues: {
            ":TTL": shiftedTtl,
            ":NEXT_CONFIRMATION_DATE": new Date(shiftedNextConfirmationDate).toISOString(),
        },
        ReturnValues: "ALL_NEW",
    };
    (0, logger_1.logInfo)("DynamoDB query", query);
    return query;
};
//# sourceMappingURL=pause-accutane.js.map