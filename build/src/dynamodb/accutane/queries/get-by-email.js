"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../../constants");
const logger_1 = require("../../../utils/logger");
exports.default = (email) => {
    const query = {
        TableName: constants_1.ENV.USERS_TABLE,
        FilterExpression: "#email = :EMAIL",
        ExpressionAttributeNames: {
            "#email": "email",
        },
        ExpressionAttributeValues: {
            ":EMAIL": email,
        },
    };
    (0, logger_1.logInfo)("DynamoDB query", query);
    return query;
};
//# sourceMappingURL=get-by-email.js.map