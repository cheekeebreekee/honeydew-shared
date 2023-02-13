"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../../constants");
const logger_1 = require("../../../utils/logger");
const NEXT_CONFIRMATION_DATE_OFFSET = 30;
exports.default = (id, { lastConfirmationDate, nextConfirmationDate, enrollmentDate, remsNumber, }) => {
    const query = {
        TableName: constants_1.ENV.ACCUTANE_TABLE,
        Key: {
            id,
        },
        UpdateExpression: "set #lastConfirmationDate=:LAST_CONFIRMATION_DATE, #nextConfirmationDate=:NEXT_CONFIRMATION_DATE, #remsNumber=:REMS_NUMBER, #enrollmentDate=:ENROLLMENT_DATE",
        ExpressionAttributeNames: {
            "#lastConfirmationDate": "lastConfirmationDate",
            "#nextConfirmationDate": "nextConfirmationDate",
            "#remsNumber": "remsNumber",
            "#enrollmentDate": "enrollmentDate",
            // "#ttl": "ttl",
        },
        ExpressionAttributeValues: {
            ":ENROLLMENT_DATE": enrollmentDate,
            ":REMS_NUMBER": remsNumber,
            ":LAST_CONFIRMATION_DATE": lastConfirmationDate,
            ":NEXT_CONFIRMATION_DATE": nextConfirmationDate,
            // ":TTL": new Date(nextConfirmationDate as string).getTime() / 1000,
        },
        ReturnValues: "ALL_NEW",
    };
    (0, logger_1.logInfo)("DynamoDB query", query);
    return query;
};
//# sourceMappingURL=update-ipledge-details.js.map