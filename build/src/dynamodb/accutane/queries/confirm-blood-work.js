"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../../constants");
const logger_1 = require("../../../utils/logger");
exports.default = (id, confirmed) => {
    const query = {
        TableName: constants_1.ENV.ACCUTANE_TABLE,
        Key: {
            id,
        },
        UpdateExpression: "set #bloodWork.#updatedAt=:UPDATED_AT, #bloodWork.#confirmed=:CONFIRMED",
        ExpressionAttributeNames: {
            "#bloodWork": "bloodWork",
            "#confirmed": "confirmed",
            "#updatedAt": "updatedAt",
        },
        ExpressionAttributeValues: {
            ":UPDATED_AT": new Date().toISOString(),
            ":CONFIRMED": confirmed,
        },
        ReturnValues: "ALL_NEW",
    };
    (0, logger_1.logInfo)("DynamoDB query", query);
    return query;
};
//# sourceMappingURL=confirm-blood-work.js.map