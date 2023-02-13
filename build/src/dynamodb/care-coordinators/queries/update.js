"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../../constants");
const logger_1 = require("../../../utils/logger");
exports.default = ({ id, firstName, lastName, phone, }) => {
    const query = {
        TableName: constants_1.ENV.CARE_COORDINATORS_TABLE,
        Key: {
            id,
        },
        UpdateExpression: "set #firstName=:FIRST_NAME, #lastName=:LAST_NAME, #phone=:PHONE",
        ExpressionAttributeNames: {
            "#firstName": "firstName",
            "#lastName": "lastName",
            "#phone": "phone",
        },
        ExpressionAttributeValues: {
            ":FIRST_NAME": firstName,
            ":LAST_NAME": lastName,
            ":PHONE": phone,
        },
        ReturnValues: "ALL_NEW",
    };
    (0, logger_1.logInfo)("DynamoDB query", query);
    return query;
};
//# sourceMappingURL=update.js.map