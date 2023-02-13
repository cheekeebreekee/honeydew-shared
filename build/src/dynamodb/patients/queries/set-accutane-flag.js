"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../../constants");
const logger_1 = require("../../../utils/logger");
exports.default = (id, accutaneFlag) => {
    const query = {
        TableName: constants_1.ENV.USERS_TABLE,
        Key: {
            id,
        },
        UpdateExpression: "set #isAccutane=:IS_ACCUTANE",
        ExpressionAttributeNames: {
            "#isAccutane": "isAccutane",
        },
        ExpressionAttributeValues: {
            ":IS_ACCUTANE": accutaneFlag,
        },
        ReturnValues: "ALL_NEW",
    };
    (0, logger_1.logInfo)("DynamoDB query", query);
    return query;
};
//# sourceMappingURL=set-accutane-flag.js.map