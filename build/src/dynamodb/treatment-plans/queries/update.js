"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../../constants");
const logger_1 = require("../../../utils/logger");
exports.default = (id, { name, groups }) => {
    const query = {
        TableName: constants_1.ENV.TREATMENT_PLANS_TABLE,
        Key: {
            id,
        },
        UpdateExpression: "set #name=:NAME, #groups=:GROUPS",
        ExpressionAttributeNames: {
            "#name": "name",
            "#groups": "groups",
        },
        ExpressionAttributeValues: {
            ":NAME": name,
            ":GROUPS": groups,
        },
        ReturnValues: "ALL_NEW",
    };
    (0, logger_1.logInfo)("DynamoDB query", query);
    return query;
};
//# sourceMappingURL=update.js.map