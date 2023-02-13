"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../../constants");
const logger_1 = require("../../../utils/logger");
exports.default = (id, insuranceInfo) => {
    const query = {
        TableName: constants_1.ENV.USERS_TABLE,
        Key: {
            id,
        },
        UpdateExpression: "set #insurance=:INSURANCE",
        ExpressionAttributeNames: {
            "#insurance": "insurance",
        },
        ExpressionAttributeValues: {
            ":INSURANCE": insuranceInfo,
        },
        ReturnValues: "ALL_NEW",
    };
    (0, logger_1.logInfo)("DynamoDB query", query);
    return query;
};
//# sourceMappingURL=update-insurance-info.js.map