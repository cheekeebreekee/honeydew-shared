"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../../constants");
const logger_1 = require("../../../utils/logger");
exports.default = (id, notes) => {
    const query = {
        TableName: constants_1.ENV.USERS_TABLE,
        Key: {
            id,
        },
        UpdateExpression: "set #notes=:NOTES",
        ExpressionAttributeNames: {
            "#notes": "notes",
        },
        ExpressionAttributeValues: {
            ":NOTES": notes,
        },
        ReturnValues: "ALL_NEW",
    };
    (0, logger_1.logInfo)("DynamoDB query", query);
    return query;
};
//# sourceMappingURL=update-notes.js.map