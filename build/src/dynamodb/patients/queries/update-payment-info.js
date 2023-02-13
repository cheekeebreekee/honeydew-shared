"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../../constants");
const logger_1 = require("../../../utils/logger");
exports.default = (id, membership, paymentInfo) => {
    const query = {
        TableName: constants_1.ENV.USERS_TABLE,
        Key: {
            id,
        },
        UpdateExpression: "set #membership=:MEMBERSHIP, #paymentInfo=:PAYMENT_INFO",
        ExpressionAttributeNames: {
            "#membership": "membership",
            "#paymentInfo": "paymentInfo",
        },
        ExpressionAttributeValues: {
            ":MEMBERSHIP": membership,
            ":PAYMENT_INFO": paymentInfo,
        },
        ReturnValues: "ALL_NEW",
    };
    (0, logger_1.logInfo)("DynamoDB query", query);
    return query;
};
//# sourceMappingURL=update-payment-info.js.map