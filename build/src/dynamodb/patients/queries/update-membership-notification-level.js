"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../../constants");
const logger_1 = require("../../../utils/logger");
exports.default = (id, level) => {
    const query = {
        TableName: constants_1.ENV.USERS_TABLE,
        Key: {
            id,
        },
        UpdateExpression: "set #membership.#notificationLevel=:NOTIFICATION_LEVEL",
        ExpressionAttributeNames: {
            "#membership": "membership",
            "#notificationLevel": "notificationLevel",
        },
        ExpressionAttributeValues: {
            ":NOTIFICATION_LEVEL": level,
        },
        ReturnValues: "ALL_NEW",
    };
    (0, logger_1.logInfo)("DynamoDB query", query);
    return query;
};
//# sourceMappingURL=update-membership-notification-level.js.map