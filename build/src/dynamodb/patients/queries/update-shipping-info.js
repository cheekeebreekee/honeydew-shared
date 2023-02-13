"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../../constants");
const logger_1 = require("../../../utils/logger");
exports.default = (id, { addressLine1, addressLine2, city, firstName, lastName, state, zipCode, }) => {
    const query = {
        TableName: constants_1.ENV.USERS_TABLE,
        Key: {
            id,
        },
        UpdateExpression: "set #shippingInfo=:SHIPPING_INFO",
        ExpressionAttributeNames: {
            "#shippingInfo": "shippingInfo",
        },
        ExpressionAttributeValues: {
            ":SHIPPING_INFO": {
                addressLine1,
                addressLine2,
                city,
                firstName,
                lastName,
                state,
                zipCode,
            },
        },
        ReturnValues: "ALL_NEW",
    };
    (0, logger_1.logInfo)("DynamoDB query", query);
    return query;
};
//# sourceMappingURL=update-shipping-info.js.map