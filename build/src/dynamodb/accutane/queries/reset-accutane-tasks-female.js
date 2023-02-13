"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../../constants");
const logger_1 = require("../../../utils/logger");
exports.default = (accutane) => {
    const query = {
        TableName: constants_1.ENV.ACCUTANE_TABLE,
        Key: {
            id: accutane.id,
        },
        UpdateExpression: "set #birthControl.#completed=:COMPLETED, #birthControl.#updatedAt=:UPDATED_AT, #bloodWork.#updatedAt=:UPDATED_AT, #bloodWork.#completed=:COMPLETED, #isOnboarding=:IS_ONBOARDING",
        ExpressionAttributeNames: {
            "#birthControl": "birthControl",
            "#bloodWork": "bloodWork",
            "#updatedAt": "updatedAt",
            "#completed": "completed",
            "#isOnboarding": "isOnboarding",
        },
        ExpressionAttributeValues: {
            ":UPDATED_AT": new Date().toISOString(),
            ":COMPLETED": false,
            ":IS_ONBOARDING": false,
        },
        ReturnValues: "ALL_NEW",
    };
    (0, logger_1.logInfo)("DynamoDB query", query);
    return query;
};
//# sourceMappingURL=reset-accutane-tasks-female.js.map