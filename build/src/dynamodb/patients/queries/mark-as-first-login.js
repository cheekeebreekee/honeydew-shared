"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../../constants");
const logger_1 = require("../../../utils/logger");
exports.default = (id) => {
    const query = {
        TableName: constants_1.ENV.USERS_TABLE,
        Key: {
            id,
        },
        UpdateExpression: "set #firstLogin=:FIRST_LOGIN",
        ExpressionAttributeNames: {
            "#firstLogin": "first_log_in",
        },
        ExpressionAttributeValues: {
            ":FIRST_LOGIN": true,
        },
        ReturnValues: "ALL_NEW",
    };
    (0, logger_1.logInfo)("DynamoDB query", query);
    return query;
};
//# sourceMappingURL=mark-as-first-login.js.map