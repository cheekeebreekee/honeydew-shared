"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../../constants");
const logger_1 = require("../../../utils/logger");
const NEXT_CONFIRMATION_DATE_OFFSET = 30;
const getExpressionAttributeNames = (gender) => gender === "Female"
    ? {
        "#iPledgeConsent": "iPledgeConsent",
        "#confirmed": "confirmed",
        "#completed": "completed",
        "#updatedAt": "updatedAt",
        "#birthControl": "birthControl",
        "#pregnancyTest": "pregnancyTest",
        "#bloodWork": "bloodWork",
        "#nextConfirmationDate": "nextConfirmationDate",
        "#lastConfirmationDate": "lastConfirmationDate",
    }
    : {
        "#iPledgeConsent": "iPledgeConsent",
        "#confirmed": "confirmed",
        "#completed": "completed",
        "#updatedAt": "updatedAt",
        "#bloodWork": "bloodWork",
        "#nextConfirmationDate": "nextConfirmationDate",
        "#lastConfirmationDate": "lastConfirmationDate",
    };
const getUpdateExpression = (gender) => gender === "Female"
    ? "set #iPledgeConsent.#updatedAt=:UPDATED_AT, #iPledgeConsent.#confirmed=:CONFIRMED, #nextConfirmationDate=:NEXT_CONFIRMATION_DATE, #lastConfirmationDate=:LAST_CONFIRMATION_DATE, #birthControl.#completed=:COMPLETED, #pregnancyTest.#completed=:COMPLETED, #bloodWork.#completed=:COMPLETED, #bloodWork.#confirmed=:CONFIRMED"
    : "set #iPledgeConsent.#updatedAt=:UPDATED_AT, #iPledgeConsent.#confirmed=:CONFIRMED, #nextConfirmationDate=:NEXT_CONFIRMATION_DATE, #lastConfirmationDate=:LAST_CONFIRMATION_DATE, #bloodWork.#completed=:COMPLETED, #bloodWork.#confirmed=:CONFIRMED";
exports.default = (patient, accutane, confirmed) => {
    const query = {
        TableName: constants_1.ENV.ACCUTANE_TABLE,
        Key: {
            id: accutane.id,
        },
        UpdateExpression: "set #iPledgeConsent.#updatedAt=:UPDATED_AT, #iPledgeConsent.#confirmed=:CONFIRMED, #nextConfirmationDate=:NEXT_CONFIRMATION_DATE, #lastConfirmationDate=:LAST_CONFIRMATION_DATE, #bloodWork.#completed=:COMPLETED, #bloodWork.#confirmed=:CONFIRMED",
        ExpressionAttributeNames: {
            "#iPledgeConsent": "iPledgeConsent",
            "#confirmed": "confirmed",
            "#completed": "completed",
            "#updatedAt": "updatedAt",
            "#bloodWork": "bloodWork",
            "#nextConfirmationDate": "nextConfirmationDate",
            "#lastConfirmationDate": "lastConfirmationDate",
        },
        ExpressionAttributeValues: {
            ":UPDATED_AT": new Date().toISOString(),
            ":CONFIRMED": confirmed,
            ":COMPLETED": true,
            ":NEXT_CONFIRMATION_DATE": new Date(new Date().getTime() +
                NEXT_CONFIRMATION_DATE_OFFSET * 24 * 60 * 60 * 1000).toISOString(),
            ":LAST_CONFIRMATION_DATE": new Date().toISOString(),
        },
        ReturnValues: "ALL_NEW",
    };
    (0, logger_1.logInfo)("DynamoDB query", query);
    return query;
};
//# sourceMappingURL=confirm-ipledge-male.js.map