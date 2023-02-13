"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../../constants");
const logger_1 = require("../../../utils/logger");
exports.default = (id, { createdAt }, { enrollmentDate, enrollmentDateOffset, lastConfirmationDate, nextConfirmationDate, }) => {
    const query = {
        TableName: constants_1.ENV.ACCUTANE_TABLE,
        Key: {
            id,
        },
        UpdateExpression: "set #iPledgeConsent.#createdAt=:CREATED_AT, #enrollmentDate=:ENROLLMENT_DATE, #enrollmentDateOffset=:ENROLLMENT_OFFSET, #lastConfirmationDate=:LAST_CONFIRMATION_DATE, #nextConfirmationDate=:NEXT_CONFIRMATION_DATE",
        ExpressionAttributeNames: {
            "#iPledgeConsent": "iPledgeConsent",
            "#createdAt": "createdAt",
            "#enrollmentDate": "enrollmentDate",
            "#enrollmentDateOffset": "enrollmentDateOffset",
            "#lastConfirmationDate": "lastConfirmationDate",
            "#nextConfirmationDate": "nextConfirmationDate",
        },
        ExpressionAttributeValues: {
            ":CREATED_AT": createdAt,
            ":ENROLLMENT_DATE": enrollmentDate,
            ":ENROLLMENT_OFFSET": enrollmentDateOffset,
            ":LAST_CONFIRMATION_DATE": lastConfirmationDate,
            ":NEXT_CONFIRMATION_DATE": nextConfirmationDate,
        },
        ReturnValues: "ALL_NEW",
    };
    (0, logger_1.logInfo)("DynamoDB query", query);
    return query;
};
//# sourceMappingURL=add-ipledge-consent.js.map