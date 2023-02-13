"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../../constants");
const logger_1 = require("../../../utils/logger");
exports.default = (id, updatedTime) => {
    (0, logger_1.logInfo)("Query input", { id, updatedTime });
    const query = {
        TableName: constants_1.ENV.ACCUTANE_NOTIFICATIONS_TABLE,
        Key: {
            id,
        },
        UpdateExpression: "set #ttl=:TTL",
        ExpressionAttributeNames: {
            "#ttl": "ttl",
        },
        ExpressionAttributeValues: {
            ":TTL": updatedTime,
        },
        ReturnValues: "ALL_NEW",
    };
    (0, logger_1.logInfo)("DynamoDB query", query);
    return query;
};
//# sourceMappingURL=update-time.js.map