"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../../constants");
const logger_1 = require("../../../utils/logger");
exports.default = (id, skinImages) => {
    const query = {
        TableName: constants_1.ENV.USERS_TABLE,
        Key: {
            id,
        },
        UpdateExpression: "set #medicalBackground.#skinImages=:SKIN_IMAGES",
        ExpressionAttributeNames: {
            "#skinImages": "skinImages",
            "#medicalBackground": "medicalBackground",
        },
        ExpressionAttributeValues: {
            ":SKIN_IMAGES": skinImages,
        },
        ReturnValues: "ALL_NEW",
    };
    (0, logger_1.logInfo)("DynamoDB query", query);
    return query;
};
//# sourceMappingURL=set-skin-images.js.map