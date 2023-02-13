"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../../constants");
const logger_1 = require("../../../utils/logger");
exports.default = (id, chatInfo) => {
    const query = {
        TableName: constants_1.ENV.USERS_TABLE,
        Key: {
            id,
        },
        UpdateExpression: "set #chatInfo=:CHAT_INFO",
        ExpressionAttributeNames: {
            "#chatInfo": "chatInfo",
        },
        ExpressionAttributeValues: {
            ":CHAT_INFO": chatInfo,
        },
        ReturnValues: "ALL_NEW",
    };
    (0, logger_1.logInfo)("DynamoDB query", query);
    return query;
};
//# sourceMappingURL=update-chat-time.js.map