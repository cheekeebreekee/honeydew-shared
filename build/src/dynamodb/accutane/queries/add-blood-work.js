"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../../constants");
const logger_1 = require("../../../utils/logger");
exports.default = (id, { createdAt, completed, confirmed, updatedAt }) => {
    const query = {
        TableName: constants_1.ENV.ACCUTANE_TABLE,
        Key: {
            id,
        },
        UpdateExpression: "set #bloodWork.#createdAt=:CREATED_AT, #bloodWork.#updatedAt=:UPDATED_AT, #bloodWork.#completed=:COMPLETED, #bloodWork.#confirmed=:CONFIRMED",
        ExpressionAttributeNames: {
            "#bloodWork": "bloodWork",
            "#completed": "completed",
            "#confirmed": "confirmed",
            "#createdAt": "createdAt",
            "#updatedAt": "updatedAt",
        },
        ExpressionAttributeValues: {
            ":CREATED_AT": createdAt,
            ":COMPLETED": completed,
            ":CONFIRMED": confirmed,
            ":UPDATED_AT": updatedAt,
        },
        ReturnValues: "ALL_NEW",
    };
    (0, logger_1.logInfo)("DynamoDB query", query);
    return query;
};
//# sourceMappingURL=add-blood-work.js.map