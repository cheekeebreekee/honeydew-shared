"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../../constants");
const logger_1 = require("../../../utils/logger");
exports.default = (id, list) => {
    const query = {
        TableName: constants_1.ENV.USERS_TABLE,
        Key: {
            id,
        },
        UpdateExpression: "set #multiAccList=:MULTIACC_LIST",
        ExpressionAttributeNames: {
            "#multiAccList": "multiAccList",
        },
        ExpressionAttributeValues: {
            ":MULTIACC_LIST": list,
        },
        ReturnValues: "ALL_NEW",
    };
    (0, logger_1.logInfo)("DynamoDB query", query);
    return query;
};
//# sourceMappingURL=update-multi-acc-list.js.map