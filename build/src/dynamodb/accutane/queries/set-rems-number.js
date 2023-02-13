"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../../constants");
const logger_1 = require("../../../utils/logger");
exports.default = (id, remsNumber) => {
    const query = {
        TableName: constants_1.ENV.ACCUTANE_TABLE,
        Key: {
            id,
        },
        UpdateExpression: "set #remsNumber=:REMS_NUMBER",
        ExpressionAttributeNames: {
            "#remsNumber": "remsNumber",
        },
        ExpressionAttributeValues: {
            ":REMS_NUMBER": remsNumber,
        },
        ReturnValues: "ALL_NEW",
    };
    (0, logger_1.logInfo)("DynamoDB query", query);
    return query;
};
//# sourceMappingURL=set-rems-number.js.map